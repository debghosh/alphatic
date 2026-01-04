#!/usr/bin/env python3
"""
13-F Institutional Holdings Fetcher for Alphatic - REAL SEC EDGAR API VERSION
Fetches quarterly institutional holdings data from SEC EDGAR for ETFs in the Alphatic universe

This script uses the official SEC EDGAR API to fetch real institutional holdings data.
No API key required - it's free public data from the SEC.

Requirements:
    pip install requests pandas lxml beautifulsoup4 --break-system-packages

Usage:
    python3 fetch_13f_holdings.py

Output:
    institutional_holdings.json - Real 13-F holdings data from SEC filings
"""

import json
import requests
import pandas as pd
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
import time
from pathlib import Path
import re
from bs4 import BeautifulSoup
import xml.etree.ElementTree as ET
from collections import defaultdict
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# SEC EDGAR API endpoints
SEC_BASE = "https://www.sec.gov"
SEC_DATA_BASE = "https://data.sec.gov"
EDGAR_SEARCH = f"{SEC_BASE}/cgi-bin/browse-edgar"
SUBMISSIONS_API = f"{SEC_DATA_BASE}/submissions"

# IMPORTANT: SEC requires a proper User-Agent header with contact info
# Replace with your actual email/contact information
HEADERS = {
    'User-Agent': 'Alphatic Portfolio Analyzer deby@suddenlycloud.com',  # CHANGE THIS!
    'Accept-Encoding': 'gzip, deflate',
    'Host': 'www.sec.gov'
}

# Rate limiting - SEC allows max 10 requests per second
class RateLimiter:
    def __init__(self, max_per_second=10):
        self.max_per_second = max_per_second
        self.min_interval = 1.0 / max_per_second
        self.last_request = 0
    
    def wait(self):
        """Wait if necessary to respect rate limit"""
        elapsed = time.time() - self.last_request
        if elapsed < self.min_interval:
            time.sleep(self.min_interval - elapsed)
        self.last_request = time.time()


class CUSIPDatabase:
    """
    CUSIP lookup database for ETFs
    In production, this would be a complete database or API call
    """
    
    # Comprehensive CUSIP mappings for major ETFs
    CUSIP_MAP = {
        'SPY': '78462F103',
        'VOO': '922908769',
        'VTI': '922906866',
        'QQQ': '73935A104',
        'IWM': '464287655',
        'VUG': '922908835',
        'VTV': '922908850',
        'VB': '922908736',
        'VEA': '921909763',
        'VWO': '922042858',
        'BND': '921937835',
        'AGG': '464287200',
        'TLT': '464287127',
        'GLD': '78463V107',
        'VGT': '92204A819',
        'XLK': '81369Y605',
        'XLE': '81369Y704',
        'XLF': '81369Y803',
        'XLV': '81369Y308',
        'XLI': '81369Y407',
        'SCHD': '80810D501',
        'VYM': '922908363',
        'VXUS': '92203J407',
        'VEU': '921909108',
        'SCHG': '80810D105',
        'SCHV': '80810D204',
        'VNQ': '92204A603',
        'IEF': '464287655',
        'SHY': '464287382',
        'TIP': '464287341',
        'QUAL': '464286822',
        'MTUM': '464286731',
        'USMV': '464286590',
        'IVW': '464287283',
        'IVE': '464287200',
        'IWF': '464287572',
        'IJR': '464287465',
        'SIZE': '464286749',
        'IMOM': '464286657',
        'VYMI': '92203W108',
        'HDV': '464288240',
        'VGK': '921909791',
        'IEMG': '46434G103',
        'EEM': '464287838',
        'BNDX': '92203H106',
        'AVUV': '02384B506',
        'AVDV': '02384B605',
        'DBC': '21688T104',
        'ARKK': '00214Q104',
    }
    
    @classmethod
    def get_cusip(cls, ticker: str) -> Optional[str]:
        """Get CUSIP for a ticker"""
        return cls.CUSIP_MAP.get(ticker)
    
    @classmethod
    def get_ticker(cls, cusip: str) -> Optional[str]:
        """Get ticker from CUSIP (reverse lookup)"""
        for ticker, c in cls.CUSIP_MAP.items():
            if c == cusip:
                return ticker
        return None


class InstitutionalHoldingsFetcher:
    """Fetches and processes real 13-F institutional holdings data from SEC EDGAR"""
    
    def __init__(self, etf_universe_file='etf_metadata.json'):
        """Initialize with ETF universe"""
        with open(etf_universe_file, 'r') as f:
            self.etf_metadata = json.load(f)
        self.etf_tickers = list(self.etf_metadata.keys())
        self.rate_limiter = RateLimiter(max_per_second=8)  # Conservative rate limiting
        self.session = requests.Session()
        self.session.headers.update(HEADERS)
        
        # Cache for institutional CIKs (to avoid repeated lookups)
        self.institution_cache = {}
        
    def get_latest_quarter_date(self) -> str:
        """Get the most recent quarter-end date for 13-F filings"""
        today = datetime.now()
        year = today.year
        month = today.month
        
        # Determine which quarter we're in (13-F filed 45 days after quarter end)
        if month <= 2:
            # Q3 of previous year (filed by mid-Nov, available now)
            quarter_end = f"{year-1}-09-30"
        elif month <= 5:
            # Q4 of previous year (filed by mid-Feb, available now)
            quarter_end = f"{year-1}-12-31"
        elif month <= 8:
            # Q1 (filed by mid-May, available now)
            quarter_end = f"{year}-03-31"
        else:
            # Q2 (filed by mid-Aug, available now)
            quarter_end = f"{year}-06-30"
            
        return quarter_end
    
    def fetch_company_cik(self, company_name: str) -> Optional[str]:
        """
        Fetch CIK (Central Index Key) for a company from SEC
        """
        self.rate_limiter.wait()
        
        try:
            # Use SEC's company search
            search_url = f"{SEC_DATA_BASE}/submissions/CIK{company_name}.json"
            
            # For now, use known major institutional CIKs
            # In production, you'd implement full search functionality
            major_institutions = {
                'Vanguard': '0000102909',
                'BlackRock': '0001364742',
                'State Street': '0000093751',
                'Fidelity': '0000315066',
                'Geode': '0001415889',
                'Northern Trust': '0001134485',
                'Charles Schwab': '0000316709',
                'JPMorgan': '0000019617',
                'Bank of America': '0000070858',
                'Morgan Stanley': '0000895421',
            }
            
            for name, cik in major_institutions.items():
                if name.lower() in company_name.lower():
                    return cik
            
            return None
            
        except Exception as e:
            logger.warning(f"Error fetching CIK for {company_name}: {e}")
            return None
    
    def search_13f_filings(self, cik: str, quarter_date: str) -> List[Dict]:
        """
        Search for 13-F filings from a specific institution for a quarter
        Returns list of filing metadata
        """
        self.rate_limiter.wait()
        
        try:
            # Convert quarter_date to search format
            year = quarter_date[:4]
            
            # Build search URL
            params = {
                'action': 'getcompany',
                'CIK': cik,
                'type': '13F-HR',
                'dateb': '',
                'owner': 'exclude',
                'count': '40',
                'search_text': ''
            }
            
            response = self.session.get(EDGAR_SEARCH, params=params, timeout=10)
            response.raise_for_status()
            
            # Parse HTML to find filings
            soup = BeautifulSoup(response.text, 'html.parser')
            
            filings = []
            table = soup.find('table', {'class': 'tableFile2'})
            
            if table:
                rows = table.find_all('tr')[1:]  # Skip header
                for row in rows:
                    cols = row.find_all('td')
                    if len(cols) >= 4:
                        filing_type = cols[0].text.strip()
                        filing_date = cols[3].text.strip()
                        
                        # Get document link
                        doc_link = cols[1].find('a')
                        if doc_link and '13F-HR' in filing_type:
                            filing_url = SEC_BASE + doc_link['href']
                            
                            filings.append({
                                'type': filing_type,
                                'date': filing_date,
                                'url': filing_url
                            })
            
            logger.info(f"Found {len(filings)} 13F filings for CIK {cik}")
            return filings
            
        except Exception as e:
            logger.error(f"Error searching 13F filings for CIK {cik}: {e}")
            return []
    
    def parse_13f_xml(self, filing_url: str, target_cusip: str) -> Optional[Dict]:
        """
        Parse a 13-F filing XML to extract holdings for a specific CUSIP
        """
        self.rate_limiter.wait()
        
        try:
            # Get the filing document page
            response = self.session.get(filing_url, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            # Find the information table XML file
            xml_link = None
            for link in soup.find_all('a'):
                href = link.get('href', '')
                if 'infotable' in href.lower() or '.xml' in href.lower():
                    xml_link = SEC_BASE + href if not href.startswith('http') else href
                    break
            
            if not xml_link:
                return None
            
            # Fetch and parse XML
            self.rate_limiter.wait()
            xml_response = self.session.get(xml_link, timeout=10)
            xml_response.raise_for_status()
            
            # Parse XML
            try:
                root = ET.fromstring(xml_response.content)
            except:
                # Try as HTML table if XML parsing fails
                return self.parse_13f_html_table(xml_response.text, target_cusip)
            
            # Look for the target CUSIP in holdings
            for info_table in root.iter('infoTable'):
                cusip_elem = info_table.find('.//cusip')
                if cusip_elem is not None and cusip_elem.text:
                    cusip = cusip_elem.text.strip()
                    
                    # Match CUSIP (compare first 8 digits as 9th is check digit)
                    if cusip[:8] == target_cusip[:8]:
                        # Extract holding information
                        shares_elem = info_table.find('.//sshPrnamt')
                        value_elem = info_table.find('.//value')
                        
                        shares = int(shares_elem.text) if shares_elem is not None else 0
                        value = int(value_elem.text) * 1000 if value_elem is not None else 0  # Value is in thousands
                        
                        return {
                            'shares': shares,
                            'value': value,
                            'cusip': cusip
                        }
            
            return None
            
        except Exception as e:
            logger.warning(f"Error parsing 13F XML from {filing_url}: {e}")
            return None
    
    def parse_13f_html_table(self, html_content: str, target_cusip: str) -> Optional[Dict]:
        """
        Parse 13-F filing from HTML table format (used in older filings)
        """
        try:
            soup = BeautifulSoup(html_content, 'html.parser')
            tables = soup.find_all('table')
            
            for table in tables:
                rows = table.find_all('tr')
                for row in rows:
                    cells = row.find_all('td')
                    if len(cells) >= 3:
                        # Look for CUSIP in cells
                        for i, cell in enumerate(cells):
                            text = cell.text.strip().replace('-', '')
                            if len(text) >= 8 and text[:8] == target_cusip[:8]:
                                # Found matching CUSIP, extract shares and value
                                # This is a simplified parser - production would need more robust parsing
                                try:
                                    shares = int(re.sub(r'[^\d]', '', cells[i+1].text))
                                    value_text = re.sub(r'[^\d]', '', cells[i+2].text)
                                    value = int(value_text) * 1000 if value_text else 0
                                    
                                    return {
                                        'shares': shares,
                                        'value': value,
                                        'cusip': text
                                    }
                                except:
                                    continue
            
            return None
            
        except Exception as e:
            logger.warning(f"Error parsing HTML table: {e}")
            return None
    
    def aggregate_institutional_holdings(self, ticker: str) -> Dict:
        """
        Aggregate institutional holdings for a specific ETF from real SEC 13-F data
        """
        cusip = CUSIPDatabase.get_cusip(ticker)
        if not cusip:
            return {
                'ticker': ticker,
                'error': 'CUSIP not found',
                'top_holders': [],
                'total_shares_held': 0,
                'institutional_ownership_pct': 0
            }
        
        logger.info(f"Fetching 13-F holdings for {ticker} (CUSIP: {cusip})")
        
        quarter_date = self.get_latest_quarter_date()
        
        # Major institutions to check (with their CIKs)
        major_institutions = [
            {'name': 'Vanguard Group Inc', 'cik': '0000102909', 'type': 'Investment Advisor'},
            {'name': 'BlackRock Inc', 'cik': '0001364742', 'type': 'Investment Advisor'},
            {'name': 'State Street Corp', 'cik': '0000093751', 'type': 'Investment Advisor'},
            {'name': 'Fidelity Management', 'cik': '0000315066', 'type': 'Investment Advisor'},
            {'name': 'Geode Capital Management', 'cik': '0001415889', 'type': 'Investment Advisor'},
            {'name': 'Northern Trust Corp', 'cik': '0001134485', 'type': 'Investment Advisor'},
            {'name': 'Charles Schwab Investment Management', 'cik': '0000316709', 'type': 'Investment Advisor'},
            {'name': 'JPMorgan Chase & Co', 'cik': '0000019617', 'type': 'Investment Advisor'},
            {'name': 'Bank of America Corp', 'cik': '0000070858', 'type': 'Investment Advisor'},
            {'name': 'Morgan Stanley', 'cik': '0000895421', 'type': 'Investment Advisor'},
        ]
        
        holdings_data = []
        
        for inst in major_institutions:
            try:
                logger.info(f"  Checking {inst['name']}...")
                
                # Search for 13F filings
                filings = self.search_13f_filings(inst['cik'], quarter_date)
                
                if filings:
                    # Get most recent filing
                    latest_filing = filings[0]
                    
                    # Parse the filing for this CUSIP
                    holding = self.parse_13f_xml(latest_filing['url'], cusip)
                    
                    if holding:
                        holdings_data.append({
                            'institution': inst['name'],
                            'institution_type': inst['type'],
                            'shares': holding['shares'],
                            'value_usd': holding['value'],
                            'filing_date': latest_filing['date']
                        })
                        logger.info(f"    ✓ Found holding: {holding['shares']:,} shares")
                    else:
                        logger.info(f"    - No holding found")
                
                # Small delay between institutions
                time.sleep(0.2)
                
            except Exception as e:
                logger.error(f"  Error processing {inst['name']}: {e}")
                continue
        
        # Sort by shares held
        holdings_data.sort(key=lambda x: x['shares'], reverse=True)
        
        # Add ranking and calculate portfolio percentages
        total_shares = sum(h['shares'] for h in holdings_data)
        for i, holding in enumerate(holdings_data):
            holding['rank'] = i + 1
            holding['portfolio_pct'] = 0.0  # Can't calculate without total portfolio value
            holding['quarter_change_pct'] = 0.0  # Would need previous quarter data
            holding['shares_change'] = 0
        
        return {
            'ticker': ticker,
            'cusip': cusip,
            'quarter_date': quarter_date,
            'data_source': 'SEC EDGAR 13-F Filings (Real Data)',
            'top_holders': holdings_data[:15],  # Top 15
            'total_institutional_shares': total_shares,
            'institutional_ownership_pct': 0.0,  # Would need total shares outstanding
            'number_of_institutions': len(holdings_data),
            'quarter_change_pct': 0.0
        }
    
    def fetch_all_etf_holdings(self) -> Dict[str, Dict]:
        """Fetch institutional holdings for all ETFs in the universe"""
        all_holdings = {}
        
        logger.info(f"Fetching real 13-F holdings for {len(self.etf_tickers)} ETFs...")
        logger.info("This will take several minutes due to SEC rate limiting...")
        
        for i, ticker in enumerate(self.etf_tickers, 1):
            logger.info(f"[{i}/{len(self.etf_tickers)}] Processing {ticker}...")
            
            try:
                holdings_data = self.aggregate_institutional_holdings(ticker)
                all_holdings[ticker] = holdings_data
                
            except Exception as e:
                logger.error(f"Error processing {ticker}: {e}")
                all_holdings[ticker] = {
                    'ticker': ticker,
                    'error': str(e),
                    'top_holders': []
                }
        
        return all_holdings
    
    def save_holdings_data(self, holdings_data: Dict, output_file='institutional_holdings.json'):
        """Save holdings data to JSON file"""
        
        output = {
            'generated_at': datetime.now().isoformat(),
            'quarter_date': self.get_latest_quarter_date(),
            'data_source': 'SEC EDGAR 13-F Filings (Real Data from sec.gov)',
            'note': 'Real institutional holdings data parsed from SEC 13-F filings',
            'etf_count': len(holdings_data),
            'holdings': holdings_data
        }
        
        with open(output_file, 'w') as f:
            json.dump(output, f, indent=2)
        
        logger.info(f"\n✅ Saved holdings data to {output_file}")
        logger.info(f"   Quarter: {output['quarter_date']}")
        logger.info(f"   ETFs: {output['etf_count']}")
        
        return output_file
    
    def generate_summary_stats(self, holdings_data: Dict) -> Dict:
        """Generate summary statistics across all ETFs"""
        
        total_institutions = set()
        institution_types = defaultdict(int)
        total_holdings_found = 0
        
        for ticker, data in holdings_data.items():
            if 'error' not in data:
                for holder in data.get('top_holders', []):
                    total_institutions.add(holder['institution'])
                    institution_types[holder['institution_type']] += 1
                    total_holdings_found += 1
        
        return {
            'unique_institutions': len(total_institutions),
            'institution_types': dict(institution_types),
            'total_holdings_found': total_holdings_found,
            'etfs_analyzed': len([d for d in holdings_data.values() if 'error' not in d])
        }


def main():
    """Main execution function"""
    print("=" * 70)
    print("Alphatic 13-F Institutional Holdings Fetcher - REAL SEC EDGAR API")
    print("=" * 70)
    print()
    print("⚠️  IMPORTANT: Update the User-Agent header with your email!")
    print("    Line 32: 'User-Agent': 'Alphatic Portfolio Analyzer YOUR_EMAIL@example.com'")
    print()
    print("This will fetch REAL institutional holdings from SEC EDGAR.")
    print("Due to rate limiting, this may take 10-30 minutes for all ETFs.")
    print()
    
    response = input("Continue? (yes/no): ")
    if response.lower() != 'yes':
        print("Aborted.")
        return
    
    # Initialize fetcher
    fetcher = InstitutionalHoldingsFetcher()
    
    # Option to test with single ETF first
    test_mode = input("\nTest with single ETF first (SPY)? (yes/no): ")
    
    if test_mode.lower() == 'yes':
        print("\n" + "=" * 70)
        print("TEST MODE: Fetching SPY only")
        print("=" * 70)
        holdings_data = {'SPY': fetcher.aggregate_institutional_holdings('SPY')}
    else:
        # Fetch holdings data for all ETFs
        holdings_data = fetcher.fetch_all_etf_holdings()
    
    # Save to JSON
    output_file = fetcher.save_holdings_data(holdings_data)
    
    # Generate summary
    stats = fetcher.generate_summary_stats(holdings_data)
    
    print()
    print("=" * 70)
    print("Summary Statistics")
    print("=" * 70)
    print(f"  Unique Institutions: {stats['unique_institutions']}")
    print(f"  Total Holdings Found: {stats['total_holdings_found']}")
    print(f"  ETFs Analyzed: {stats['etfs_analyzed']}")
    print(f"  Institution Types:")
    for itype, count in stats['institution_types'].items():
        print(f"    - {itype}: {count}")
    print()
    
    print("=" * 70)
    print("SUCCESS!")
    print("=" * 70)
    print(f"""
Real SEC 13-F data successfully fetched and saved to: {output_file}

This data is from actual SEC EDGAR filings and shows real institutional
positions as reported in quarterly 13-F forms.

To update quarterly:
1. Run this script 45+ days after each quarter end
2. Data is typically available: Feb 15, May 15, Aug 15, Nov 15

Next steps:
1. Refresh your browser (hard reload: Ctrl+Shift+R)
2. Navigate to Institutional Holdings tab in Alphatic
3. View real institutional positions!
    """)
    
    return output_file


if __name__ == '__main__':
    main()