#!/usr/bin/env python3
"""
13-F Institutional Holdings Fetcher for Alphatic
Fetches quarterly institutional holdings data from SEC EDGAR for ETFs in the Alphatic universe
"""

import json
import requests
import pandas as pd
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import time
from pathlib import Path

# SEC EDGAR API endpoints
SEC_API_BASE = "https://data.sec.gov"
EDGAR_BASE = "https://www.sec.gov/cgi-bin/browse-edgar"

# User agent for SEC requests (required by SEC)
HEADERS = {
    'User-Agent': 'Alphatic Portfolio Analyzer [email protected]',
    'Accept-Encoding': 'gzip, deflate',
    'Host': 'www.sec.gov'
}

class InstitutionalHoldingsFetcher:
    """Fetches and processes 13-F institutional holdings data"""
    
    def __init__(self, etf_universe_file='etf_metadata.json'):
        """Initialize with ETF universe"""
        with open(etf_universe_file, 'r') as f:
            self.etf_metadata = json.load(f)
        self.etf_tickers = list(self.etf_metadata.keys())
        
    def get_latest_quarter_date(self) -> str:
        """Get the most recent quarter-end date for 13-F filings"""
        today = datetime.now()
        year = today.year
        month = today.month
        
        # Determine which quarter we're in
        if month <= 3:
            # Q4 of previous year (filed by mid-Feb)
            quarter_end = f"{year-1}-12-31"
        elif month <= 6:
            # Q1 (filed by mid-May)
            quarter_end = f"{year}-03-31"
        elif month <= 9:
            # Q2 (filed by mid-Aug)
            quarter_end = f"{year}-06-30"
        else:
            # Q3 (filed by mid-Nov)
            quarter_end = f"{year}-09-30"
            
        return quarter_end
    
    def get_cusip_from_ticker(self, ticker: str) -> Optional[str]:
        """
        Get CUSIP for a ticker
        Using a simple mapping for major ETFs - in production would query a CUSIP database
        """
        # Common CUSIP mappings for major ETFs
        cusip_map = {
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
            'SCHD': '80810D501',
            'VYM': '922908769',
            'VXUS': '92203J407',
            'SCHG': '80810D105',
            'SCHV': '80810D204',
            'VNQ': '92204A603',
            'IEF': '464287200',
            'SHY': '464287382',
            'TIP': '464287341',
            'QUAL': '464286822',
            'MTUM': '464286731',
            'USMV': '464286590',
        }
        return cusip_map.get(ticker)
    
    def search_13f_filings(self, cik: str, quarter_date: str) -> List[Dict]:
        """
        Search for 13-F filings from a specific institution for a quarter
        Using SEC EDGAR full-text search
        """
        # This is a simplified version - in production, you'd use the full SEC API
        # or a commercial data provider like sec-api.io
        
        # For demonstration, returning mock data structure
        # Real implementation would query SEC EDGAR API
        
        return []
    
    def aggregate_institutional_holdings(self, ticker: str) -> Dict:
        """
        Aggregate institutional holdings for a specific ETF
        Returns top holders, ownership %, and changes
        """
        cusip = self.get_cusip_from_ticker(ticker)
        if not cusip:
            return {
                'ticker': ticker,
                'error': 'CUSIP not found',
                'top_holders': [],
                'total_shares_held': 0,
                'institutional_ownership_pct': 0
            }
        
        # In a real implementation, this would:
        # 1. Query all 13-F filings for the latest quarter
        # 2. Find all filings that include this CUSIP
        # 3. Aggregate holdings by institution
        # 4. Calculate ownership percentages
        # 5. Compare to previous quarter for changes
        
        # For demonstration purposes, returning realistic mock data
        # This would be replaced with actual SEC data parsing
        
        mock_top_holders = self._generate_mock_holdings(ticker)
        
        return {
            'ticker': ticker,
            'cusip': cusip,
            'quarter_date': self.get_latest_quarter_date(),
            'data_source': 'Mock data - replace with SEC EDGAR in production',
            'top_holders': mock_top_holders,
            'total_institutional_shares': sum(h['shares'] for h in mock_top_holders),
            'institutional_ownership_pct': 85.5,  # Mock value
            'number_of_institutions': len(mock_top_holders) + 450,  # Mock total
            'quarter_change_pct': 2.3  # Mock quarterly change
        }
    
    def _generate_mock_holdings(self, ticker: str) -> List[Dict]:
        """
        Generate realistic mock institutional holdings
        In production, this would parse actual 13-F XML/HTML filings
        """
        
        # Major institutional investors (realistic names)
        institutions = [
            {'name': 'Vanguard Group Inc', 'type': 'Investment Advisor'},
            {'name': 'BlackRock Inc', 'type': 'Investment Advisor'},
            {'name': 'State Street Corp', 'type': 'Investment Advisor'},
            {'name': 'Geode Capital Management LLC', 'type': 'Investment Advisor'},
            {'name': 'Northern Trust Corp', 'type': 'Investment Advisor'},
            {'name': 'Charles Schwab Investment Management', 'type': 'Investment Advisor'},
            {'name': 'Bank of America Corp', 'type': 'Investment Advisor'},
            {'name': 'Morgan Stanley', 'type': 'Investment Advisor'},
            {'name': 'Goldman Sachs Group Inc', 'type': 'Investment Advisor'},
            {'name': 'JPMorgan Chase & Co', 'type': 'Investment Advisor'},
            {'name': 'UBS Group AG', 'type': 'Investment Advisor'},
            {'name': 'Invesco Ltd', 'type': 'Investment Advisor'},
            {'name': 'Capital Research Global Investors', 'type': 'Investment Advisor'},
            {'name': 'Two Sigma Investments', 'type': 'Hedge Fund'},
            {'name': 'Renaissance Technologies LLC', 'type': 'Hedge Fund'},
            {'name': 'Bridgewater Associates', 'type': 'Hedge Fund'},
            {'name': 'AQR Capital Management', 'type': 'Hedge Fund'},
            {'name': 'Citadel Advisors LLC', 'type': 'Hedge Fund'},
            {'name': 'Millennium Management LLC', 'type': 'Hedge Fund'},
            {'name': 'D E Shaw & Co Inc', 'type': 'Hedge Fund'},
        ]
        
        # Generate realistic holdings with variation by ticker
        import random
        random.seed(hash(ticker))  # Deterministic based on ticker
        
        top_holders = []
        base_shares = 50_000_000 if ticker in ['SPY', 'VOO', 'VTI'] else 5_000_000
        
        for i, inst in enumerate(institutions[:15]):  # Top 15 holders
            shares = int(base_shares * (0.95 ** i) * random.uniform(0.8, 1.2))
            value = shares * random.uniform(100, 500)  # Mock price
            change = random.uniform(-0.15, 0.25)  # Quarterly change
            
            top_holders.append({
                'rank': i + 1,
                'institution': inst['name'],
                'institution_type': inst['type'],
                'shares': shares,
                'value_usd': int(value),
                'portfolio_pct': round(random.uniform(0.1, 5.0), 2),
                'quarter_change_pct': round(change * 100, 2),
                'shares_change': int(shares * change)
            })
        
        return top_holders
    
    def fetch_all_etf_holdings(self) -> Dict[str, Dict]:
        """Fetch institutional holdings for all ETFs in the universe"""
        all_holdings = {}
        
        print(f"Fetching institutional holdings for {len(self.etf_tickers)} ETFs...")
        
        for i, ticker in enumerate(self.etf_tickers, 1):
            print(f"  [{i}/{len(self.etf_tickers)}] Processing {ticker}...")
            
            try:
                holdings_data = self.aggregate_institutional_holdings(ticker)
                all_holdings[ticker] = holdings_data
                
                # Rate limiting for SEC requests (10 requests per second max)
                time.sleep(0.15)
                
            except Exception as e:
                print(f"    Error processing {ticker}: {e}")
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
            'data_source': 'SEC EDGAR 13-F Filings (Mock Data - Replace with actual SEC parsing)',
            'note': 'This is mock data for demonstration. Production version would parse actual SEC EDGAR 13-F XML/HTML filings',
            'etf_count': len(holdings_data),
            'holdings': holdings_data
        }
        
        with open(output_file, 'w') as f:
            json.dump(output, f, indent=2)
        
        print(f"\n✅ Saved holdings data to {output_file}")
        print(f"   Quarter: {output['quarter_date']}")
        print(f"   ETFs: {output['etf_count']}")
        
        return output_file
    
    def generate_summary_stats(self, holdings_data: Dict) -> Dict:
        """Generate summary statistics across all ETFs"""
        
        total_institutions = set()
        institution_types = {}
        
        for ticker, data in holdings_data.items():
            if 'error' not in data:
                for holder in data.get('top_holders', []):
                    total_institutions.add(holder['institution'])
                    inst_type = holder['institution_type']
                    institution_types[inst_type] = institution_types.get(inst_type, 0) + 1
        
        return {
            'unique_institutions': len(total_institutions),
            'institution_types': institution_types,
            'avg_institutional_ownership': 85.5,  # Mock
            'etfs_analyzed': len([d for d in holdings_data.values() if 'error' not in d])
        }


def main():
    """Main execution function"""
    print("=" * 70)
    print("Alphatic 13-F Institutional Holdings Fetcher")
    print("=" * 70)
    print()
    
    # Initialize fetcher
    fetcher = InstitutionalHoldingsFetcher()
    
    # Fetch holdings data
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
    print(f"  ETFs Analyzed: {stats['etfs_analyzed']}")
    print(f"  Institution Types:")
    for itype, count in stats['institution_types'].items():
        print(f"    - {itype}: {count}")
    print()
    
    print("=" * 70)
    print("IMPORTANT NOTES")
    print("=" * 70)
    print("""
This script currently generates MOCK DATA for demonstration purposes.

To use REAL SEC EDGAR data in production:

1. OPTION A - Free SEC EDGAR API:
   - Parse 13-F XML filings directly from SEC EDGAR
   - Implement CUSIP lookup and filing parsing
   - Handle rate limiting (10 requests/second)
   - Parse XML/HTML formats (varies pre/post 2013)

2. OPTION B - Commercial API (Recommended):
   - sec-api.io: $50-200/month, clean JSON format
   - Financial Modeling Prep: $30-100/month
   - Intrinio: Enterprise pricing
   
3. Replace _generate_mock_holdings() with actual SEC parsing
4. Implement proper CUSIP database integration
5. Add error handling for missing/delayed filings

The data structure is production-ready and matches the format
that Alphatic expects for integration.
    """)
    
    return output_file


if __name__ == '__main__':
    main()
