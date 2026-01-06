// Technical Analysis Module
// Provides SMA, EMA, RSI, MACD analysis for any ETF

function showTechnicalAnalysis(ticker) {
    // Display comprehensive technical analysis for an ETF
    
    const data = ETF_DATA[ticker];
    if (!data) {
        alert(`No data available for ${ticker}`);
        return;
    }
    
    const prices = data.prices;
    const dates = data.dates;
    
    // Calculate all indicators
    const sma20 = calculateSMA_MarketConditions(prices, 20);
    const sma50 = calculateSMA_MarketConditions(prices, 50);
    const sma200 = calculateSMA_MarketConditions(prices, 200);
    const ema12 = calculateEMA_MarketConditions(prices, 12);
    const ema26 = calculateEMA_MarketConditions(prices, 26);
    const rsi = calculateRSI_MarketConditions(prices, 14);
    const macd = calculateMACD_MarketConditions(prices);
    
    // Get latest values
    const currentPrice = prices[prices.length - 1];
    const currentSMA20 = sma20[sma20.length - 1];
    const currentSMA50 = sma50[sma50.length - 1];
    const currentSMA200 = sma200[sma200.length - 1];
    const currentRSI = rsi[rsi.length - 1];
    const currentMACD = macd.macd[macd.macd.length - 1];
    const currentSignal = macd.signal[macd.signal.length - 1];
    const currentHistogram = macd.histogram[macd.histogram.length - 1];
    
    // Determine signals
    const trendSignal = determineTrendSignal(currentPrice, currentSMA20, currentSMA50, currentSMA200);
    const rsiSignal = determineRSISignal(currentRSI);
    const macdSignal = determineMACDSignal(currentMACD, currentSignal, currentHistogram);
    
    // Overall signal
    const overallSignal = combineSignals([trendSignal, rsiSignal, macdSignal]);
    
    // Generate HTML
    const container = document.getElementById('technical-analysis-content');
    
    const html = `
        <div class="max-w-6xl mx-auto">
            <!-- Header -->
            <div class="mb-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-2">
                    📊 Technical Analysis: ${ticker}
                </h2>
                <p class="text-gray-600">${ETF_LOOKUP[ticker]?.name || ''}</p>
            </div>
            
            <!-- Overall Signal Card -->
            <div class="bg-gradient-to-r ${overallSignal.color} rounded-lg shadow-lg p-6 mb-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-xl font-bold text-white mb-2">Overall Signal</h3>
                        <p class="text-white text-opacity-90">${overallSignal.description}</p>
                    </div>
                    <div class="text-6xl">${overallSignal.icon}</div>
                </div>
                <div class="mt-4 flex gap-4">
                    <div class="flex-1 bg-white bg-opacity-20 rounded p-3">
                        <div class="text-sm text-white text-opacity-80">Current Price</div>
                        <div class="text-2xl font-bold text-white">$${currentPrice.toFixed(2)}</div>
                    </div>
                    <div class="flex-1 bg-white bg-opacity-20 rounded p-3">
                        <div class="text-sm text-white text-opacity-80">Signal Strength</div>
                        <div class="text-2xl font-bold text-white">${overallSignal.strength}/10</div>
                    </div>
                    <div class="flex-1 bg-white bg-opacity-20 rounded p-3">
                        <div class="text-sm text-white text-opacity-80">Recommendation</div>
                        <div class="text-2xl font-bold text-white">${overallSignal.action}</div>
                    </div>
                </div>
            </div>
            
            <!-- Indicators Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <!-- Moving Averages -->
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <span class="text-2xl mr-2">📈</span>
                        Moving Averages (Trend)
                    </h3>
                    
                    <div class="space-y-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-medium">SMA 20</div>
                                <div class="text-sm text-gray-600">Short-term trend</div>
                            </div>
                            <div class="text-right">
                                <div class="text-lg font-bold">${currentSMA20.toFixed(2)}</div>
                                <div class="text-sm ${currentPrice > currentSMA20 ? 'text-green-600' : 'text-red-600'}">
                                    ${currentPrice > currentSMA20 ? '↑ Above' : '↓ Below'}
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-medium">SMA 50</div>
                                <div class="text-sm text-gray-600">Medium-term trend</div>
                            </div>
                            <div class="text-right">
                                <div class="text-lg font-bold">${currentSMA50.toFixed(2)}</div>
                                <div class="text-sm ${currentPrice > currentSMA50 ? 'text-green-600' : 'text-red-600'}">
                                    ${currentPrice > currentSMA50 ? '↑ Above' : '↓ Below'}
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between">
                            <div>
                                <div class="font-medium">SMA 200</div>
                                <div class="text-sm text-gray-600">Long-term trend</div>
                            </div>
                            <div class="text-right">
                                <div class="text-lg font-bold">${currentSMA200.toFixed(2)}</div>
                                <div class="text-sm ${currentPrice > currentSMA200 ? 'text-green-600' : 'text-red-600'}">
                                    ${currentPrice > currentSMA200 ? '↑ Above' : '↓ Below'}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-4 p-3 ${trendSignal.bgColor} rounded">
                        <div class="font-semibold ${trendSignal.textColor}">${trendSignal.signal}</div>
                        <div class="text-sm ${trendSignal.textColor} opacity-80">${trendSignal.explanation}</div>
                    </div>
                </div>
                
                <!-- RSI -->
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <span class="text-2xl mr-2">🎯</span>
                        RSI (Momentum)
                    </h3>
                    
                    <div class="mb-4">
                        <div class="flex justify-between mb-2">
                            <span class="text-sm text-gray-600">Oversold (30)</span>
                            <span class="text-sm text-gray-600">Overbought (70)</span>
                        </div>
                        <div class="h-8 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded relative">
                            <div class="absolute h-full w-1 bg-gray-900" style="left: ${currentRSI}%">
                                <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs font-bold">
                                    ${currentRSI.toFixed(1)}
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-between mt-1">
                            <span class="text-xs text-gray-500">0</span>
                            <span class="text-xs text-gray-500">50</span>
                            <span class="text-xs text-gray-500">100</span>
                        </div>
                    </div>
                    
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Current RSI:</span>
                            <span class="font-bold">${currentRSI.toFixed(1)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Status:</span>
                            <span class="font-bold ${rsiSignal.color}">${rsiSignal.status}</span>
                        </div>
                    </div>
                    
                    <div class="mt-4 p-3 ${rsiSignal.bgColor} rounded">
                        <div class="font-semibold ${rsiSignal.textColor}">${rsiSignal.signal}</div>
                        <div class="text-sm ${rsiSignal.textColor} opacity-80">${rsiSignal.explanation}</div>
                    </div>
                </div>
                
                <!-- MACD -->
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <span class="text-2xl mr-2">📉</span>
                        MACD (Trend Strength)
                    </h3>
                    
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">MACD Line:</span>
                            <span class="font-bold">${currentMACD.toFixed(2)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Signal Line:</span>
                            <span class="font-bold">${currentSignal.toFixed(2)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Histogram:</span>
                            <span class="font-bold ${currentHistogram > 0 ? 'text-green-600' : 'text-red-600'}">
                                ${currentHistogram.toFixed(2)}
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Crossover:</span>
                            <span class="font-bold">${currentMACD > currentSignal ? 'Bullish ↑' : 'Bearish ↓'}</span>
                        </div>
                    </div>
                    
                    <div class="mt-4 p-3 ${macdSignal.bgColor} rounded">
                        <div class="font-semibold ${macdSignal.textColor}">${macdSignal.signal}</div>
                        <div class="text-sm ${macdSignal.textColor} opacity-80">${macdSignal.explanation}</div>
                    </div>
                </div>
                
                <!-- Action Plan -->
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <span class="text-2xl mr-2">💡</span>
                        Action Plan
                    </h3>
                    
                    <div class="space-y-3">
                        ${overallSignal.actions.map(action => `
                            <div class="flex items-start">
                                <span class="text-blue-600 mr-2">•</span>
                                <span class="text-gray-700">${action}</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                        <div class="text-sm text-yellow-800">
                            <strong>⚠️ Important:</strong> Technical analysis is one tool among many. Always consider fundamental factors, market conditions, and your investment goals.
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- ETF Selector -->
            <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Analyze Another ETF</h3>
                <select 
                    id="technical-analysis-etf-selector" 
                    onchange="showTechnicalAnalysis(this.value)"
                    class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                >
                    ${Object.keys(ETF_DATA).sort().map(t => `
                        <option value="${t}" ${t === ticker ? 'selected' : ''}>
                            ${t} - ${ETF_LOOKUP[t]?.name || ''}
                        </option>
                    `).join('')}
                </select>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// Signal determination functions
function determineTrendSignal(price, sma20, sma50, sma200) {
    const above20 = price > sma20;
    const above50 = price > sma50;
    const above200 = price > sma200;
    
    if (above20 && above50 && above200) {
        return {
            signal: "Strong Bullish Trend",
            explanation: "Price above all major moving averages - strong uptrend",
            bgColor: "bg-green-100",
            textColor: "text-green-800"
        };
    } else if (!above20 && !above50 && !above200) {
        return {
            signal: "Strong Bearish Trend",
            explanation: "Price below all major moving averages - strong downtrend",
            bgColor: "bg-red-100",
            textColor: "text-red-800"
        };
    } else if (above50 && above200) {
        return {
            signal: "Moderate Bullish Trend",
            explanation: "Price above medium/long-term averages - uptrend intact",
            bgColor: "bg-green-50",
            textColor: "text-green-700"
        };
    } else if (!above50 && !above200) {
        return {
            signal: "Moderate Bearish Trend",
            explanation: "Price below medium/long-term averages - downtrend",
            bgColor: "bg-red-50",
            textColor: "text-red-700"
        };
    } else {
        return {
            signal: "Neutral/Mixed",
            explanation: "Price trading between averages - no clear trend",
            bgColor: "bg-gray-100",
            textColor: "text-gray-800"
        };
    }
}

function determineRSISignal(rsi) {
    if (rsi < 30) {
        return {
            signal: "Oversold - Potential Buy",
            explanation: "RSI below 30 suggests oversold conditions, possible bounce ahead",
            status: "Oversold",
            color: "text-green-600",
            bgColor: "bg-green-100",
            textColor: "text-green-800"
        };
    } else if (rsi > 70) {
        return {
            signal: "Overbought - Potential Sell",
            explanation: "RSI above 70 suggests overbought conditions, possible pullback",
            status: "Overbought",
            color: "text-red-600",
            bgColor: "bg-red-100",
            textColor: "text-red-800"
        };
    } else if (rsi >= 50) {
        return {
            signal: "Bullish Momentum",
            explanation: "RSI above 50 indicates positive momentum",
            status: "Bullish",
            color: "text-green-600",
            bgColor: "bg-green-50",
            textColor: "text-green-700"
        };
    } else {
        return {
            signal: "Bearish Momentum",
            explanation: "RSI below 50 indicates negative momentum",
            status: "Bearish",
            color: "text-red-600",
            bgColor: "bg-red-50",
            textColor: "text-red-700"
        };
    }
}

function determineMACDSignal(macd, signal, histogram) {
    if (macd > signal && histogram > 0) {
        return {
            signal: "Bullish - MACD Above Signal",
            explanation: "MACD crossed above signal line - bullish momentum building",
            bgColor: "bg-green-100",
            textColor: "text-green-800"
        };
    } else if (macd < signal && histogram < 0) {
        return {
            signal: "Bearish - MACD Below Signal",
            explanation: "MACD crossed below signal line - bearish momentum building",
            bgColor: "bg-red-100",
            textColor: "text-red-800"
        };
    } else {
        return {
            signal: "Neutral - Waiting for Crossover",
            explanation: "MACD and signal line close - no strong signal",
            bgColor: "bg-gray-100",
            textColor: "text-gray-800"
        };
    }
}

function combineSignals(signals) {
    // Count bullish vs bearish signals
    let bullishCount = 0;
    let bearishCount = 0;
    
    signals.forEach(signal => {
        if (signal.signal.toLowerCase().includes('bullish') || 
            signal.signal.toLowerCase().includes('buy')) {
            bullishCount++;
        } else if (signal.signal.toLowerCase().includes('bearish') || 
                   signal.signal.toLowerCase().includes('sell')) {
            bearishCount++;
        }
    });
    
    // Determine overall signal
    if (bullishCount >= 2) {
        return {
            signal: "BUY",
            action: "BUY",
            description: "Multiple bullish signals detected",
            icon: "📈",
            color: "from-green-500 to-green-600",
            strength: Math.min(10, bullishCount * 3),
            actions: [
                "Consider adding to position",
                "Momentum is positive",
                "Set stop loss below recent support"
            ]
        };
    } else if (bearishCount >= 2) {
        return {
            signal: "SELL",
            action: "SELL",
            description: "Multiple bearish signals detected",
            icon: "📉",
            color: "from-red-500 to-red-600",
            strength: Math.min(10, bearishCount * 3),
            actions: [
                "Consider reducing position",
                "Momentum is negative",
                "Wait for technical improvement"
            ]
        };
    } else {
        return {
            signal: "HOLD",
            action: "HOLD",
            description: "Mixed signals - no clear direction",
            icon: "⏸️",
            color: "from-gray-500 to-gray-600",
            strength: 5,
            actions: [
                "Wait for clearer signals",
                "Monitor for trend development",
                "Maintain current position"
            ]
        };
    }
}

console.log('✓ Technical Analysis module loaded');
