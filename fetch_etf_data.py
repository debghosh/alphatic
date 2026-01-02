#!/usr/bin/env python3
"""
Alphatic Educational Edition - ETF Data Fetcher
Fetches real historical data for complete ETF universe including all educational portfolios
"""

import yfinance as yf
import json
from datetime import datetime, timedelta
import numpy as np
import os

# =============================================================================
# COMPLETE ETF UNIVERSE - ALL EDUCATIONAL PORTFOLIOS COVERED
# =============================================================================

ETFS = [
    # Core Market Exposure
    'SPY', 'VTI', 'VOO', 'QQQ',
    
    # Growth Factors
    'VUG', 'SCHG', 'IVW', 'IWF',
    
    # Value Factors (including educational portfolio ETFs)
    'VTV', 'SCHV', 'IVE', 'AVUV', 'AVDV',
    
    # Size Factor (Small Cap)
    'VB', 'IJR', 'IWM', 'SIZE',
    
    # Factor Tilts (Momentum, Quality, Low Vol)
    'MTUM', 'QUAL', 'USMV', 'IMOM',
    
    # Dividend/Income Strategies
    'SCHD', 'VYM', 'VYMI', 'HDV',
    
    # International Developed
    'VXUS', 'VEU', 'VEA', 'VGK',
    
    # Emerging Markets
    'VWO', 'IEMG', 'EEM',
    
    # Sector Concentration
    'VGT', 'XLK', 'XLF', 'XLE', 'XLV', 'XLI',
    
    # Real Estate
    'VNQ',
    
    # Fixed Income (Defensive Ballast)
    'BND', 'BNDX', 'AGG', 'TLT', 'IEF', 'TIP', 'SHY',
    
    # Alternatives & Commodities
    'GLD', 'DBC',
    
    # Aggressive Growth
    'ARKK'
]

# ETF metadata including inception dates for historical data fetching
ETF_METADATA = {
    'SPY': {'category': 'Core', 'factor': 'Market', 'expense': 0.0945, 'inception': '1993-01-22'},
    'VTI': {'category': 'Core', 'factor': 'Market', 'expense': 0.03, 'inception': '2001-05-31'},
    'VOO': {'category': 'Core', 'factor': 'Market', 'expense': 0.03, 'inception': '2010-09-07'},
    'QQQ': {'category': 'Core', 'factor': 'Tech/Growth', 'expense': 0.20, 'inception': '1999-03-10'},
    'VUG': {'category': 'Growth', 'factor': 'Growth', 'expense': 0.04, 'inception': '2004-01-26'},
    'SCHG': {'category': 'Growth', 'factor': 'Growth', 'expense': 0.04, 'inception': '2009-12-11'},
    'IVW': {'category': 'Growth', 'factor': 'Growth', 'expense': 0.18, 'inception': '2000-05-22'},
    'IWF': {'category': 'Growth', 'factor': 'Growth', 'expense': 0.19, 'inception': '2000-05-22'},
    'VTV': {'category': 'Value', 'factor': 'Value', 'expense': 0.04, 'inception': '2004-01-26'},
    'SCHV': {'category': 'Value', 'factor': 'Value', 'expense': 0.04, 'inception': '2009-12-11'},
    'IVE': {'category': 'Value', 'factor': 'Value', 'expense': 0.18, 'inception': '2000-05-22'},
    'AVUV': {'category': 'Factor - Value/Small', 'factor': 'Value + Size', 'expense': 0.25, 'inception': '2019-09-24'},
    'AVDV': {'category': 'Factor - Intl Value', 'factor': 'Intl Value + Size', 'expense': 0.36, 'inception': '2019-09-24'},
    'VB': {'category': 'Small Cap', 'factor': 'Size', 'expense': 0.05, 'inception': '2004-01-26'},
    'IJR': {'category': 'Small Cap', 'factor': 'Size', 'expense': 0.06, 'inception': '2000-05-22'},
    'IWM': {'category': 'Small Cap', 'factor': 'Size', 'expense': 0.19, 'inception': '2000-05-22'},
    'SIZE': {'category': 'Factor - Size', 'factor': 'Size', 'expense': 0.15, 'inception': '2013-04-16'},
    'MTUM': {'category': 'Factor - Momentum', 'factor': 'Momentum', 'expense': 0.15, 'inception': '2013-04-16'},
    'IMOM': {'category': 'Factor - Intl Momentum', 'factor': 'Intl Momentum', 'expense': 0.30, 'inception': '2014-01-28'},
    'QUAL': {'category': 'Factor - Quality', 'factor': 'Quality', 'expense': 0.15, 'inception': '2013-07-16'},
    'USMV': {'category': 'Factor - Low Volatility', 'factor': 'Low Vol', 'expense': 0.15, 'inception': '2011-10-18'},
    'SCHD': {'category': 'Dividend', 'factor': 'Dividend', 'expense': 0.06, 'inception': '2011-10-20'},
    'VYM': {'category': 'Dividend', 'factor': 'Dividend', 'expense': 0.06, 'inception': '2006-11-10'},
    'VYMI': {'category': 'Dividend - Intl', 'factor': 'Intl Dividend', 'expense': 0.22, 'inception': '2016-02-25'},
    'HDV': {'category': 'Dividend', 'factor': 'Dividend', 'expense': 0.08, 'inception': '2011-03-29'},
    'VXUS': {'category': 'International', 'factor': 'International', 'expense': 0.07, 'inception': '2011-01-26'},
    'VEU': {'category': 'International', 'factor': 'International', 'expense': 0.07, 'inception': '2007-03-02'},
    'VEA': {'category': 'International', 'factor': 'International', 'expense': 0.05, 'inception': '2007-07-20'},
    'VGK': {'category': 'International', 'factor': 'International', 'expense': 0.08, 'inception': '2005-03-04'},
    'VWO': {'category': 'Emerging Markets', 'factor': 'Emerging', 'expense': 0.08, 'inception': '2005-03-04'},
    'IEMG': {'category': 'Emerging Markets', 'factor': 'Emerging', 'expense': 0.11, 'inception': '2012-10-18'},
    'EEM': {'category': 'Emerging Markets', 'factor': 'Emerging', 'expense': 0.70, 'inception': '2003-04-07'},
    'VGT': {'category': 'Sector - Tech', 'factor': 'Tech', 'expense': 0.10, 'inception': '2004-01-26'},
    'XLK': {'category': 'Sector - Tech', 'factor': 'Tech', 'expense': 0.10, 'inception': '1998-12-16'},
    'XLF': {'category': 'Sector - Financials', 'factor': 'Financials', 'expense': 0.10, 'inception': '1998-12-16'},
    'XLE': {'category': 'Sector - Energy', 'factor': 'Energy', 'expense': 0.10, 'inception': '1998-12-16'},
    'XLV': {'category': 'Sector - Healthcare', 'factor': 'Healthcare', 'expense': 0.10, 'inception': '1998-12-16'},
    'XLI': {'category': 'Sector - Industrials', 'factor': 'Industrials', 'expense': 0.10, 'inception': '1998-12-16'},
    'VNQ': {'category': 'Real Estate', 'factor': 'Real Estate', 'expense': 0.12, 'inception': '2004-09-23'},
    'BND': {'category': 'Defensive Ballast', 'factor': 'Bonds', 'expense': 0.03, 'inception': '2007-04-03'},
    'BNDX': {'category': 'Defensive Ballast - Intl', 'factor': 'Intl Bonds', 'expense': 0.07, 'inception': '2013-05-31'},
    'AGG': {'category': 'Defensive Ballast', 'factor': 'Bonds', 'expense': 0.03, 'inception': '2003-09-22'},
    'TLT': {'category': 'Defensive Ballast', 'factor': 'Long Bonds', 'expense': 0.15, 'inception': '2002-07-22'},
    'IEF': {'category': 'Defensive Ballast', 'factor': 'Intermediate Bonds', 'expense': 0.15, 'inception': '2002-07-22'},
    'TIP': {'category': 'Defensive Ballast', 'factor': 'Inflation Protection', 'expense': 0.19, 'inception': '2003-12-04'},
    'SHY': {'category': 'Defensive Ballast', 'factor': 'Short Bonds', 'expense': 0.15, 'inception': '2002-07-22'},
    'GLD': {'category': 'Safe Haven', 'factor': 'Gold', 'expense': 0.40, 'inception': '2004-11-18'},
    'DBC': {'category': 'Commodities', 'factor': 'Commodities', 'expense': 0.87, 'inception': '2006-02-03'},
    'ARKK': {'category': 'Aggressive Growth', 'factor': 'Innovation', 'expense': 0.75, 'inception': '2014-10-31'},
    'XLF': {'category': 'Sector - Financials', 'factor': 'Financials', 'expense': 0.10},
    'XLE': {'category': 'Sector - Energy', 'factor': 'Energy', 'expense': 0.10},
    'XLI': {'category': 'Sector - Industrials', 'factor': 'Industrials', 'expense': 0.10},
    'VNQ': {'category': 'Real Estate', 'factor': 'Real Estate', 'expense': 0.12},
    'SCHD': {'category': 'High Dividend Yield', 'factor': 'Dividend', 'expense': 0.06},
    'VYM': {'category': 'High Dividend Yield', 'factor': 'Dividend', 'expense': 0.06},
    'VYMI': {'category': 'International Dividend', 'factor': 'Intl Dividend', 'expense': 0.22}
}

def fetch_etf_data(max_retries=3):
    """Fetch historical data for all ETFs with retries and error handling"""
    print("=" * 80)
    print("ALPHATIC EDUCATIONAL EDITION - ETF DATA FETCHER")
    print("=" * 80)
    print(f"Total ETFs to fetch: {len(ETFS)}")
    print(f"Time range: From inception to present (maximum available)")
    print(f"Data source: Yahoo Finance (real market data)")
    print("=" * 80)
    
    end_date = datetime.now()
    
    all_data = {}
    failed_etfs = []
    
    for idx, symbol in enumerate(ETFS, 1):
        # Get inception date for this ETF, or use 20 years ago as fallback
        metadata = ETF_METADATA.get(symbol, {})
        inception_str = metadata.get('inception', None)
        
        if inception_str:
            start_date = datetime.strptime(inception_str, '%Y-%m-%d')
        else:
            # Fallback: 20 years ago
            start_date = end_date - timedelta(days=365*20)
        
        years_of_data = (end_date - start_date).days / 365.25
        
        print(f"\n[{idx}/{len(ETFS)}] Fetching {symbol} ({years_of_data:.1f}y)...", end=" ")
        
        success = False
        for attempt in range(max_retries):
            try:
                ticker = yf.Ticker(symbol)
                df = ticker.history(start=start_date, end=end_date)
                
                if len(df) == 0:
                    if attempt == max_retries - 1:
                        print(f"ERROR: No data available")
                        failed_etfs.append(symbol)
                    continue
                
                # Extract adjusted close prices
                prices = df['Close'].tolist()
                dates = [date.strftime('%Y-%m-%d') for date in df.index]
                
                # Calculate daily returns
                returns = [0.0]  # First return is 0
                for i in range(1, len(prices)):
                    daily_return = (prices[i] - prices[i-1]) / prices[i-1]
                    returns.append(daily_return)
                
                # Store in format expected by app.js
                if not metadata:
                    metadata = {
                        'category': 'Other',
                        'factor': 'Unknown',
                        'expense': 0.0
                    }
                
                all_data[symbol] = {
                    'symbol': symbol,
                    'dates': dates,
                    'prices': [round(p, 4) for p in prices],
                    'returns': [round(r, 6) for r in returns],
                    'category': metadata.get('category', 'Other'),
                    'factor': metadata.get('factor', 'Unknown'),
                    'expense_ratio': metadata.get('expense', 0.0),
                    'inception': metadata.get('inception', 'Unknown')
                }
                
                # Calculate and display statistics
                total_return = (prices[-1] / prices[0] - 1) * 100
                annual_returns = [r for r in returns if r != 0]
                volatility = np.std(annual_returns) * np.sqrt(252) * 100 if len(annual_returns) > 0 else 0
                years = len(dates) / 252
                cagr = (np.power(prices[-1] / prices[0], 1/years) - 1) * 100 if years > 0 else 0
                
                print(f"OK")
                print(f"     • {len(dates)} days ({dates[0]} to {dates[-1]})")
                print(f"     • CAGR: {cagr:+.2f}% | Vol: {volatility:.2f}% | Total: {total_return:+.2f}%")
                
                success = True
                break
                
            except Exception as e:
                if attempt == max_retries - 1:
                    print(f"ERROR: {str(e)[:50]}")
                    failed_etfs.append(symbol)
        
        if not success and attempt < max_retries - 1:
            print(f"  (retry {attempt + 1}/{max_retries})", end="")
    
    # Summary
    print("\n" + "=" * 80)
    print(f"SUCCESS: Successfully fetched: {len(all_data)}/{len(ETFS)} ETFs")
    if failed_etfs:
        print(f"WARNING: Failed to fetch: {len(failed_etfs)} ETFs")
        print(f"  Failed: {', '.join(failed_etfs)}")
    print("=" * 80)
    
    return all_data

def save_to_js(data):
    """Save data to JavaScript file compatible with app.js"""
    
    # Use ensure_ascii=True to avoid Unicode issues on Windows
    json_data = json.dumps(data, indent=2, ensure_ascii=True)
    
    js_content = f"""// =============================================================================
// ALPHATIC EDUCATIONAL EDITION - REAL ETF DATA
// =============================================================================
// Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
// Total ETFs: {len(data)}
// Data Source: Yahoo Finance (real market data)
// Purpose: Real capital allocation decisions + educational portfolio analysis
// =============================================================================

const ETF_DATA = {json_data};

console.log('SUCCESS: Alphatic Educational Edition: ETF data loaded');
console.log('SUCCESS: Loaded {len(data)} ETFs with real historical data');
console.log('SUCCESS: Ready for portfolio analysis and backtesting');
"""
    
    output_file = 'data.js'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"\nSUCCESS: Data saved to {output_file}")
    
    # Calculate file size
    import os
    file_size_mb = os.path.getsize(output_file) / 1024 / 1024
    print(f"  • File size: {file_size_mb:.2f} MB")
    
    # Summary statistics
    total_days = sum(len(d['dates']) for d in data.values())
    avg_days = total_days / len(data) if len(data) > 0 else 0
    print(f"  • Average data points per ETF: {avg_days:.0f} days")
    
    # Calculate date range
    if data:
        all_start_dates = [d['dates'][0] for d in data.values()]
        all_end_dates = [d['dates'][-1] for d in data.values()]
        print(f"  • Common date range: {max(all_start_dates)} to {min(all_end_dates)}")

def generate_summary_report(data):
    """Generate a detailed summary report of all ETFs"""
    print("\n" + "=" * 80)
    print("ETF DATA SUMMARY - REAL MARKET DATA")
    print("=" * 80)
    
    print(f"\n{'Symbol':<8} {'Category':<25} {'Days':<8} {'CAGR':<10} {'Vol':<8}")
    print("-" * 80)
    
    for symbol in sorted(data.keys()):
        etf = data[symbol]
        days = len(etf['dates'])
        years = days / 252
        cagr = (np.power(etf['prices'][-1] / etf['prices'][0], 1/years) - 1) * 100 if years > 0 else 0
        returns = [r for r in etf['returns'] if r != 0]
        volatility = np.std(returns) * np.sqrt(252) * 100 if len(returns) > 0 else 0
        category = etf.get('category', 'Other')
        
        print(f"{symbol:<8} {category:<25} {days:<8} {cagr:+6.2f}%  {volatility:6.2f}%")
    
    print("=" * 80)
    print("\nSUCCESS: All ETFs ready for:")
    print("  • Portfolio construction")
    print("  • Historical backtesting")
    print("  • Risk analysis") 
    print("  • Educational comparison")
    print("  • Real capital allocation decisions")
    print("=" * 80)

def save_metadata():
    """Save ETF metadata for frontend use"""
    metadata_file = 'etf_metadata.json'
    with open(metadata_file, 'w', encoding='utf-8') as f:
        json.dump(ETF_METADATA, f, indent=2, ensure_ascii=True)
    print(f"\nSUCCESS: ETF metadata saved to {metadata_file}")

if __name__ == '__main__':
    print("\n" + "=" * 80)
    print("ALPHATIC EDUCATIONAL EDITION - DATA FETCHER")
    print("   Real market data for real investment decisions + learning")
    print("=" * 80)
    
    data = fetch_etf_data()
    
    if len(data) == 0:
        print("\nERROR: No data fetched! Check your internet connection.")
        exit(1)
    
    save_to_js(data)
    save_metadata()
    generate_summary_report(data)
    
    print("\n" + "=" * 80)
    print("SUCCESS: COMPLETE! Real market data ready for Alphatic Educational Edition")
    print("=" * 80)
    print("\nNext steps:")
    print("1. Open index.html in your browser")
    print("2. Explore the 10 educational portfolios in the Learn tab")
    print("3. Build and backtest your own portfolios")
    print("4. Compare your portfolio vs educational best practices")
    print("\nREMINDER: This is real market data for real capital allocation!")
    print("=" * 80)