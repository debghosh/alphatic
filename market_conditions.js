// Market Conditions Analysis Module
// Detects current market regime and provides tactical allocation recommendations

// Market regime definitions
const MARKET_REGIMES = {
    bull_market_low_vol: {
        name: "Bull Market (Low Volatility)",
        icon: "🟢",
        description: "Steady uptrend with low fear - optimal conditions for aggressive positioning",
        conditions: {
            vix_max: 15,
            trend: "upward",
            momentum: "positive"
        },
        strategy: {
            stock_allocation: [80, 90],
            recommended_etfs: ['VTI', 'VUG', 'QQQ', 'MTUM', 'VEA'],
            avoid_etfs: ['TLT', 'GLD'],
            explanation: "Bull market with low volatility is like a batting-friendly pitch. Play aggressive with growth stocks and momentum. Minimize defensive positions."
        }
    },
    
    bull_market_high_vol: {
        name: "Bull Market (High Volatility)",
        icon: "🟡",
        description: "Uptrend but choppy - proceed with caution",
        conditions: {
            vix_range: [15, 25],
            trend: "upward",
            volatility: "elevated"
        },
        strategy: {
            stock_allocation: [70, 80],
            recommended_etfs: ['VOO', 'VTV', 'SCHD', 'QUAL', 'BND'],
            avoid_etfs: ['ARKK', 'Leveraged ETFs'],
            explanation: "Market trending up but with whipsaws. Reduce growth tilt, add quality and dividend stocks. Keep some defensive hedges."
        }
    },
    
    bear_market: {
        name: "Bear Market",
        icon: "🔴",
        description: "Downtrend with high fear - protect capital",
        conditions: {
            vix_min: 25,
            trend: "downward",
            drawdown_min: -10
        },
        strategy: {
            stock_allocation: [40, 50],
            recommended_etfs: ['USMV', 'QUAL', 'SCHD', 'BND', 'TLT', 'GLD'],
            avoid_etfs: ['QQQ', 'Growth ETFs', 'Small Caps'],
            explanation: "Bear market is like a bowling-friendly pitch. Play defensive. Reduce stocks to 40-50%, add bonds and gold. Focus on quality and low volatility."
        }
    },
    
    high_volatility: {
        name: "High Volatility (Uncertain)",
        icon: "🟠",
        description: "Whipsawing markets - no clear direction",
        conditions: {
            vix_range: [20, 30],
            trend: "sideways"
        },
        strategy: {
            stock_allocation: [60, 70],
            recommended_etfs: ['VOO', 'USMV', 'SCHD', 'BND', 'GLD'],
            avoid_etfs: ['Momentum', 'Growth', 'Small Caps'],
            explanation: "High volatility without clear trend is like a turning pitch in cricket. Stay balanced. 60-70% stocks with low-vol tilt. Add 10% gold as hedge."
        }
    },
    
    low_volatility: {
        name: "Low Volatility (Grind Higher)",
        icon: "🔵",
        description: "Steady low-drama advance - good risk/reward",
        conditions: {
            vix_max: 12,
            trend: "upward",
            momentum: "steady"
        },
        strategy: {
            stock_allocation: [75, 85],
            recommended_etfs: ['VTI', 'VTV', 'VEA', 'SCHD', 'BND'],
            avoid_etfs: ['Speculative', 'Leveraged'],
            explanation: "Low volatility grind higher is like a flat batting pitch. Can take risk but don't get greedy. 80% stocks with value tilt works well."
        }
    },
    
    sideways_choppy: {
        name: "Sideways/Choppy",
        icon: "⚪",
        description: "Range-bound with no clear trend - frustrating conditions",
        conditions: {
            trend: "sideways",
            momentum: "neutral"
        },
        strategy: {
            stock_allocation: [60, 70],
            recommended_etfs: ['SCHD', 'VYM', 'JEPI', 'JEPQ', 'BND'],
            avoid_etfs: ['Momentum', 'Growth'],
            explanation: "Sideways markets favor income strategies. Focus on dividend and covered call ETFs (JEPI, JEPQ) that generate yield regardless of direction."
        }
    }
};

// Calculate technical indicators for regime detection
function calculateSMA_MarketConditions(prices, period) {
    // Simple Moving Average
    if (prices.length < period) return null;
    
    const sma = [];
    for (let i = period - 1; i < prices.length; i++) {
        const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
        sma.push(sum / period);
    }
    return sma;
}

function calculateEMA_MarketConditions(prices, period) {
    // Exponential Moving Average
    if (prices.length < period) return null;
    
    const multiplier = 2 / (period + 1);
    const ema = [prices[0]]; // Start with first price
    
    for (let i = 1; i < prices.length; i++) {
        const value = (prices[i] - ema[i - 1]) * multiplier + ema[i - 1];
        ema.push(value);
    }
    return ema;
}

function calculateRSI_MarketConditions(prices, period = 14) {
    // Relative Strength Index
    if (prices.length < period + 1) return null;
    
    const rsi = [];
    let gains = 0;
    let losses = 0;
    
    // Calculate initial average gain/loss
    for (let i = 1; i <= period; i++) {
        const change = prices[i] - prices[i - 1];
        if (change > 0) gains += change;
        else losses += Math.abs(change);
    }
    
    let avgGain = gains / period;
    let avgLoss = losses / period;
    let rs = avgGain / avgLoss;
    rsi.push(100 - (100 / (1 + rs)));
    
    // Calculate subsequent RSI values
    for (let i = period + 1; i < prices.length; i++) {
        const change = prices[i] - prices[i - 1];
        const gain = change > 0 ? change : 0;
        const loss = change < 0 ? Math.abs(change) : 0;
        
        avgGain = (avgGain * (period - 1) + gain) / period;
        avgLoss = (avgLoss * (period - 1) + loss) / period;
        rs = avgGain / avgLoss;
        rsi.push(100 - (100 / (1 + rs)));
    }
    
    return rsi;
}

function calculateMACD_MarketConditions(prices, fastPeriod = 12, slowPeriod = 26, signalPeriod = 9) {
    // Moving Average Convergence Divergence
    const fastEMA = calculateEMA_MarketConditions(prices, fastPeriod);
    const slowEMA = calculateEMA_MarketConditions(prices, slowPeriod);
    
    if (!fastEMA || !slowEMA) return null;
    
    // MACD line = fast EMA - slow EMA
    const macdLine = fastEMA.map((fast, i) => fast - slowEMA[i]);
    
    // Signal line = EMA of MACD
    const signalLine = calculateEMA_MarketConditions(macdLine, signalPeriod);
    
    // Histogram = MACD - Signal
    const histogram = macdLine.slice(signalPeriod - 1).map((macd, i) => 
        macd - signalLine[i]
    );
    
    return {
        macd: macdLine,
        signal: signalLine,
        histogram: histogram
    };
}

function calculateVolatility_MarketConditions(prices, period = 20) {
    // Calculate rolling volatility (standard deviation of returns)
    if (prices.length < period + 1) return null;
    
    const volatility = [];
    
    for (let i = period; i < prices.length; i++) {
        const returns = [];
        for (let j = i - period + 1; j <= i; j++) {
            const ret = (prices[j] - prices[j - 1]) / prices[j - 1];
            returns.push(ret);
        }
        
        // Calculate standard deviation
        const mean = returns.reduce((a, b) => a + b) / returns.length;
        const variance = returns.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / returns.length;
        const stdDev = Math.sqrt(variance);
        
        // Annualize
        const annualizedVol = stdDev * Math.sqrt(252) * 100;
        volatility.push(annualizedVol);
    }
    
    return volatility;
}

// Detect current market regime
function detectCurrentMarketRegime(ticker = 'SPY') {
    // Analyze market conditions and determine current regime
    
    // Get SPY data (market proxy)
    const spyData = ETF_DATA[ticker];
    if (!spyData) {
        console.error('SPY data not found for regime detection');
        return null;
    }
    
    // Ensure prices are numbers, not strings
    const prices = spyData.prices.map(p => typeof p === 'string' ? parseFloat(p) : p);
    const recentPrices = prices.slice(-252); // Last year
    
    console.log(`Market regime detection: ${ticker} has ${prices.length} days of data`);
    console.log('Sample prices (last 5):', prices.slice(-5), 'types:', prices.slice(-5).map(p => typeof p));
    
    // Check for any invalid prices
    const invalidPrices = prices.filter(p => p == null || isNaN(p) || p <= 0);
    if (invalidPrices.length > 0) {
        console.error(`Found ${invalidPrices.length} invalid prices in SPY data`);
        console.error('First invalid:', invalidPrices[0]);
    }
    
    if (prices.length < 252) {
        console.error(`Not enough data for ${ticker}. Need at least 252 days, have ${prices.length}`);
        return null;
    }
    
    // Calculate indicators
    console.log('Calculating SMA 50...');
    const sma50 = calculateSMA_MarketConditions(prices, 50);
    console.log('SMA 50 result:', sma50 ? `${sma50.length} values` : 'NULL');
    
    console.log('Calculating SMA 200...');
    const sma200 = calculateSMA_MarketConditions(prices, 200);
    console.log('SMA 200 result:', sma200 ? `${sma200.length} values` : 'NULL');
    
    // Check if we have enough data
    if (!sma50 || !sma200) {
        console.error('SMA calculation failed!');
        console.error('SMA50:', sma50);
        console.error('SMA200:', sma200);
        return null;
    }
    
    // Check if arrays have values
    if (sma50.length === 0 || sma200.length === 0) {
        console.error('SMA calculation returned empty arrays');
        return null;
    }
    
    const currentPrice = prices[prices.length - 1];
    const current50 = sma50[sma50.length - 1];
    const current200 = sma200[sma200.length - 1];
    
    // Debug: Check if values are numbers
    console.log('SMA values check:', {
        currentPrice,
        current50,
        current200,
        current50_isNaN: isNaN(current50),
        current200_isNaN: isNaN(current200)
    });
    
    // Determine trend
    const aboveSMA50 = currentPrice > current50;
    const aboveSMA200 = currentPrice > current200;
    const sma50Above200 = current50 > current200;
    
    let trend;
    if (aboveSMA50 && aboveSMA200 && sma50Above200) {
        trend = "upward";
    } else if (!aboveSMA50 && !aboveSMA200) {
        trend = "downward";
    } else {
        trend = "sideways";
    }
    
    // Calculate volatility (proxy for VIX)
    console.log('Calculating volatility on', recentPrices.length, 'recent prices...');
    const volatility = calculateVolatility_MarketConditions(recentPrices, 20);
    console.log('Volatility result:', volatility ? `${volatility.length} values` : 'NULL');
    
    if (!volatility) {
        console.error('Volatility calculation failed!');
        console.error('recentPrices sample:', recentPrices.slice(-5));
        return null;
    }
    
    const currentVol = volatility[volatility.length - 1];
    console.log('Current volatility:', currentVol, 'isNaN?', isNaN(currentVol));
    
    // Estimate VIX level based on volatility
    // SPY vol of 15% ~ VIX of 15
    const estimatedVIX = currentVol;
    
    // Calculate drawdown
    const maxPrice = Math.max(...recentPrices);
    const drawdown = ((currentPrice - maxPrice) / maxPrice) * 100;
    
    // Determine regime
    let regime;
    
    if (trend === "downward" || estimatedVIX > 30) {
        regime = "bear_market";
    } else if (trend === "upward" && estimatedVIX < 15) {
        regime = "bull_market_low_vol";
    } else if (trend === "upward" && estimatedVIX >= 15 && estimatedVIX < 25) {
        regime = "bull_market_high_vol";
    } else if (estimatedVIX >= 20 && estimatedVIX < 30 && trend === "sideways") {
        regime = "high_volatility";
    } else if (estimatedVIX < 12 && trend === "upward") {
        regime = "low_volatility";
    } else {
        regime = "sideways_choppy";
    }
    
    // Debug: Log values before validation
    console.log('=== PRE-VALIDATION CHECK ===');
    console.log('Values about to validate:', {
        currentVol,
        current50,
        current200,
        estimatedVIX,
        currentPrice,
        drawdown
    });
    
    // Validate all values before creating metrics object
    const validNumber = (val) => {
        const isValid = val !== null && val !== undefined && !isNaN(val);
        console.log(`validNumber(${val}):`, isValid);
        return isValid;
    };
    
    console.log('Validating currentVol...');
    if (!validNumber(currentVol)) {
        console.error('❌ VALIDATION FAILED: Invalid volatility calculation, currentVol:', currentVol);
        console.error('Type:', typeof currentVol, 'isNaN:', isNaN(currentVol), 'isNull:', currentVol === null);
        return null;
    }
    console.log('✓ currentVol passed validation');
    
    console.log('Validating SMA values...');
    if (!validNumber(current50) || !validNumber(current200)) {
        console.error('❌ VALIDATION FAILED: Invalid SMA calculations');
        console.error('current50:', current50, 'type:', typeof current50, 'isNaN:', isNaN(current50));
        console.error('current200:', current200, 'type:', typeof current200, 'isNaN:', isNaN(current200));
        return null;
    }
    console.log('✓ SMA values passed validation');
    
    console.log('=== VALIDATION PASSED! Building regime... ===');
    
    return {
        regime: regime,
        regimeData: MARKET_REGIMES[regime],
        metrics: {
            trend: trend,
            estimatedVIX: (estimatedVIX != null && !isNaN(estimatedVIX)) ? estimatedVIX.toFixed(1) : 'N/A',
            currentPrice: (currentPrice != null && !isNaN(currentPrice)) ? currentPrice.toFixed(2) : 'N/A',
            sma50: (current50 != null && !isNaN(current50)) ? current50.toFixed(2) : 'N/A',
            sma200: (current200 != null && !isNaN(current200)) ? current200.toFixed(2) : 'N/A',
            drawdown: (drawdown != null && !isNaN(drawdown)) ? drawdown.toFixed(1) : 'N/A',
            volatility: (currentVol != null && !isNaN(currentVol)) ? currentVol.toFixed(1) : 'N/A'
        }
    };
}

// Generate tactical allocation recommendation
function getTacticalAllocation(currentPortfolio, marketRegime) {
    // Compare current portfolio to recommended allocation for market conditions
    // Suggest tactical adjustments
    
    if (!marketRegime || !marketRegime.regimeData) {
        return null;
    }
    
    const strategy = marketRegime.regimeData.strategy;
    const currentStockPct = calculateStockAllocation(currentPortfolio.allocation);
    
    const [minStock, maxStock] = strategy.stock_allocation;
    const targetStock = (minStock + maxStock) / 2;
    const stockDiff = currentStockPct - targetStock;
    
    let recommendation = {
        currentAllocation: {
            stocks: currentStockPct,
            bonds: 100 - currentStockPct
        },
        recommendedAllocation: {
            stocks: targetStock,
            bonds: 100 - targetStock
        },
        adjustment: {
            stocks: -stockDiff,
            bonds: stockDiff
        },
        needsRebalancing: Math.abs(stockDiff) > 10,
        severity: Math.abs(stockDiff) > 20 ? 'high' : Math.abs(stockDiff) > 10 ? 'medium' : 'low'
    };
    
    // Generate specific actions
    if (stockDiff > 10) {
        recommendation.actions = [
            `Reduce stock allocation by ${Math.abs(stockDiff).toFixed(0)}%`,
            `Increase bond allocation to ${(100 - targetStock).toFixed(0)}%`,
            `Consider adding: ${strategy.recommended_etfs.slice(0, 3).join(', ')}`,
            `Consider reducing exposure to growth/momentum ETFs`
        ];
    } else if (stockDiff < -10) {
        recommendation.actions = [
            `Increase stock allocation by ${Math.abs(stockDiff).toFixed(0)}%`,
            `Reduce bond allocation to ${(100 - targetStock).toFixed(0)}%`,
            `Add: ${strategy.recommended_etfs.slice(0, 3).join(', ')}`,
            `Market conditions support more aggressive positioning`
        ];
    } else {
        recommendation.actions = [
            `Current allocation is appropriate for market conditions`,
            `No immediate rebalancing needed`,
            `Monitor regime changes for future adjustments`
        ];
    }
    
    return recommendation;
}

console.log('✓ Market Conditions analysis module loaded');
