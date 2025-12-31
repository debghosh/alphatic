import yfinance as yf
import json
from datetime import datetime, timedelta
import numpy as np

# Complete ETF List - 36 ETFs covering all major factors
ETFS = [
    # US Broad Market (SPY added as primary benchmark)
    'SPY', 'VTI', 'VOO', 'QQQ',
    
    # US Growth
    'VUG', 'SCHG', 'IVW', 'IWF',
    
    # US Value
    'VTV', 'SCHV', 'IVE',
    
    # US Small Cap
    'VB', 'IJR', 'IWM',
    
    # Factor ETFs
    'MTUM', 'QUAL', 'USMV',
    
    # Dividend/Income
    'SCHD', 'VYM',
    
    # Ex-US Developed
    'VEU', 'VEA', 'VGK',
    
    # Emerging Markets
    'VWO', 'IEMG', 'EEM',
    
    # Sectors
    'VGT', 'XLK', 'XLF', 'XLE', 'XLV',
    
    # Real Estate
    'VNQ',
    
    # Bonds
    'BND', 'AGG', 'TLT', 'SHY',
    
    # Alternatives
    'GLD'
]

def fetch_etf_data():
    """Fetch historical data for all ETFs with calculated returns"""
    print("=" * 80)
    print("FETCHING REAL ETF DATA FROM YAHOO FINANCE")
    print("=" * 80)
    print(f"Total ETFs to fetch: {len(ETFS)}")
    print(f"Time range: 20 years (or max available)")
    print("=" * 80)
    
    end_date = datetime.now()
    start_date = end_date - timedelta(days=365*20)  # 20 years
    
    all_data = {}
    
    for idx, symbol in enumerate(ETFS, 1):
        print(f"\n[{idx}/{len(ETFS)}] Fetching {symbol}...")
        try:
            ticker = yf.Ticker(symbol)
            df = ticker.history(start=start_date, end=end_date)
            
            if len(df) == 0:
                print(f"  X No data available for {symbol}")
                continue
            
            # Extract adjusted close prices
            prices = df['Close'].tolist()
            dates = [date.strftime('%Y-%m-%d') for date in df.index]
            
            # Calculate daily returns
            returns = []
            for i in range(1, len(prices)):
                daily_return = (prices[i] - prices[i-1]) / prices[i-1]
                returns.append(daily_return)
            
            # First return is 0
            returns.insert(0, 0.0)
            
            # Store in format expected by app.js
            all_data[symbol] = {
                'symbol': symbol,
                'dates': dates,
                'prices': [round(p, 4) for p in prices],
                'returns': [round(r, 6) for r in returns]
            }
            
            # Calculate and display statistics
            total_return = (prices[-1] / prices[0] - 1) * 100
            annual_returns = [r for r in returns if r != 0]
            volatility = np.std(annual_returns) * np.sqrt(252) * 100
            years = len(dates) / 252
            cagr = (np.power(prices[-1] / prices[0], 1/years) - 1) * 100
            
            print(f"  OK Fetched {len(dates)} days")
            print(f"     Date range: {dates[0]} to {dates[-1]}")
            print(f"     Total return: {total_return:+.2f}%")
            print(f"     CAGR: {cagr:+.2f}%")
            print(f"     Volatility: {volatility:.2f}%")
            
        except Exception as e:
            print(f"  X Error fetching {symbol}: {e}")
    
    return all_data

def save_to_js(data):
    """Save data to JavaScript file compatible with app.js"""
    
    # Create the ETF_DATA object
    js_content = f"""// Auto-generated ETF historical data from Yahoo Finance
// Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
// Total ETFs: {len(data)}
// Data source: yfinance (real market data)

const ETF_DATA = {json.dumps(data, indent=2)};

console.log('Real ETF data loaded successfully!');
console.log(`Loaded {len(data)} ETFs with historical data`);
"""
    
    with open('data.js', 'w') as f:
        f.write(js_content)
    
    print(f"\nOK Data saved to data.js")
    print(f"   Total ETFs: {len(data)}")
    
    # Calculate file size
    file_size_mb = len(js_content) / 1024 / 1024
    print(f"   File size: {file_size_mb:.2f} MB")
    
    # Summary statistics
    total_days = sum(len(d['dates']) for d in data.values())
    avg_days = total_days / len(data)
    print(f"   Average data points per ETF: {avg_days:.0f} days")

def generate_summary_report(data):
    """Generate a summary report of all ETFs"""
    print("\n" + "=" * 80)
    print("ETF DATA SUMMARY - REAL MARKET DATA")
    print("=" * 80)
    
    print(f"\n{'Symbol':<8} {'Days':<8} {'Start Date':<12} {'End Date':<12} {'Total Return':<15}")
    print("-" * 80)
    
    for symbol in sorted(data.keys()):
        etf = data[symbol]
        days = len(etf['dates'])
        start = etf['dates'][0]
        end = etf['dates'][-1]
        total_return = (etf['prices'][-1] / etf['prices'][0] - 1) * 100
        
        print(f"{symbol:<8} {days:<8} {start:<12} {end:<12} {total_return:+.2f}%")
    
    print("=" * 80)

if __name__ == '__main__':
    print("\n" + "=" * 80)
    print("ALPHATIC - REAL ETF DATA FETCHER")
    print("USING REAL MARKET DATA FOR ACTUAL INVESTMENT DECISIONS")
    print("=" * 80)
    
    data = fetch_etf_data()
    
    if len(data) == 0:
        print("\nERROR: No data fetched! Check your internet connection.")
        exit(1)
    
    save_to_js(data)
    generate_summary_report(data)
    
    print("\n" + "=" * 80)
    print("COMPLETE! Real market data ready for analysis")
    print("=" * 80)
    print("\nNext steps:")
    print("1. Copy data.js to the same folder as index.html")
    print("2. Open index.html in your browser")
    print("3. Build your portfolio with real ETF data")
    print("4. Run optimization and backtests with actual historical returns")
    print("\nREMINDER: This is real market data for real capital allocation!")
    print("=" * 80)