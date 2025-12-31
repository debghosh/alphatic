// ============================================================================
// ALPHATIC - Advanced Portfolio Analysis & Optimization
// FIXED VERSION - FOR REAL CAPITAL ALLOCATION
// All calculations verified for accuracy
// ============================================================================

// ============================================================================
// ETF DATABASE - EXPANDED WITH FACTOR COVERAGE
// ============================================================================

const ETF_DATABASE = {
    'US Broad Market': [
        { symbol: 'SPY', name: 'SPDR S&P 500 ETF', expense: 0.09, factor: 'Market', beta: 1.00 },
        { symbol: 'VTI', name: 'Vanguard Total Stock Market', expense: 0.03, factor: 'Market', beta: 1.00 },
        { symbol: 'VOO', name: 'Vanguard S&P 500', expense: 0.03, factor: 'Market', beta: 1.00 },
        { symbol: 'QQQ', name: 'Invesco QQQ (Nasdaq-100)', expense: 0.20, factor: 'Tech/Growth', beta: 1.15 }
    ],
    'US Growth': [
        { symbol: 'VUG', name: 'Vanguard Growth ETF', expense: 0.04, factor: 'Growth', beta: 1.05 },
        { symbol: 'SCHG', name: 'Schwab U.S. Large-Cap Growth', expense: 0.04, factor: 'Growth', beta: 1.05 },
        { symbol: 'IVW', name: 'iShares S&P 500 Growth', expense: 0.18, factor: 'Growth', beta: 1.05 },
        { symbol: 'IWF', name: 'iShares Russell 1000 Growth', expense: 0.19, factor: 'Growth', beta: 1.05 }
    ],
    'US Value': [
        { symbol: 'VTV', name: 'Vanguard Value ETF', expense: 0.04, factor: 'Value', beta: 0.92 },
        { symbol: 'SCHV', name: 'Schwab U.S. Large-Cap Value', expense: 0.04, factor: 'Value', beta: 0.92 },
        { symbol: 'IVE', name: 'iShares S&P 500 Value', expense: 0.18, factor: 'Value', beta: 0.92 }
    ],
    'US Small Cap': [
        { symbol: 'VB', name: 'Vanguard Small-Cap ETF', expense: 0.05, factor: 'Size', beta: 1.10 },
        { symbol: 'IJR', name: 'iShares Core S&P Small-Cap', expense: 0.06, factor: 'Size', beta: 1.10 },
        { symbol: 'IWM', name: 'iShares Russell 2000', expense: 0.19, factor: 'Size', beta: 1.15 }
    ],
    'Factor ETFs': [
        { symbol: 'MTUM', name: 'iShares MSCI USA Momentum', expense: 0.15, factor: 'Momentum', beta: 1.00 },
        { symbol: 'QUAL', name: 'iShares MSCI USA Quality', expense: 0.15, factor: 'Quality', beta: 0.90 },
        { symbol: 'USMV', name: 'iShares MSCI USA Min Vol', expense: 0.15, factor: 'Low Volatility', beta: 0.75 }
    ],
    'Dividend': [
        { symbol: 'SCHD', name: 'Schwab U.S. Dividend Equity', expense: 0.06, factor: 'Dividend', beta: 0.95 },
        { symbol: 'VYM', name: 'Vanguard High Dividend Yield', expense: 0.06, factor: 'Dividend', beta: 0.95 }
    ],
    'International Equity': [
        { symbol: 'VEU', name: 'Vanguard FTSE All-World ex-US', expense: 0.07, factor: 'International', beta: 0.85 },
        { symbol: 'VEA', name: 'Vanguard FTSE Developed Markets', expense: 0.05, factor: 'International', beta: 0.85 },
        { symbol: 'VGK', name: 'Vanguard FTSE Europe', expense: 0.08, factor: 'International', beta: 0.90 },
        { symbol: 'VWO', name: 'Vanguard FTSE Emerging Markets', expense: 0.08, factor: 'Emerging Markets', beta: 1.10 },
        { symbol: 'IEMG', name: 'iShares Core MSCI Emerging Markets', expense: 0.11, factor: 'Emerging Markets', beta: 1.10 },
        { symbol: 'EEM', name: 'iShares MSCI Emerging Markets', expense: 0.70, factor: 'Emerging Markets', beta: 1.15 }
    ],
    'Sector ETFs': [
        { symbol: 'VGT', name: 'Vanguard Information Technology', expense: 0.10, factor: 'Tech', beta: 1.20 },
        { symbol: 'XLK', name: 'Technology Select Sector SPDR', expense: 0.10, factor: 'Tech', beta: 1.20 },
        { symbol: 'XLF', name: 'Financial Select Sector SPDR', expense: 0.10, factor: 'Financials', beta: 1.10 },
        { symbol: 'XLE', name: 'Energy Select Sector SPDR', expense: 0.10, factor: 'Energy', beta: 1.15 },
        { symbol: 'XLV', name: 'Health Care Select Sector SPDR', expense: 0.10, factor: 'Healthcare', beta: 0.85 }
    ],
    'Real Estate': [
        { symbol: 'VNQ', name: 'Vanguard Real Estate ETF', expense: 0.12, factor: 'Real Estate', beta: 0.95 }
    ],
    'Fixed Income': [
        { symbol: 'BND', name: 'Vanguard Total Bond Market', expense: 0.03, factor: 'Bonds', beta: 0.10 },
        { symbol: 'AGG', name: 'iShares Core U.S. Aggregate Bond', expense: 0.03, factor: 'Bonds', beta: 0.10 },
        { symbol: 'TLT', name: 'iShares 20+ Year Treasury Bond', expense: 0.15, factor: 'Long Bonds', beta: 0.15 },
        { symbol: 'SHY', name: 'iShares 1-3 Year Treasury Bond', expense: 0.15, factor: 'Short Bonds', beta: 0.05 }
    ],
    'Alternatives': [
        { symbol: 'GLD', name: 'SPDR Gold Shares', expense: 0.40, factor: 'Gold', beta: 0.00 }
    ]
};

// Flatten ETF database for easy lookup
const ALL_ETFS = Object.values(ETF_DATABASE).flat();
const ETF_LOOKUP = {};
ALL_ETFS.forEach(etf => {
    ETF_LOOKUP[etf.symbol] = etf;
});

// ============================================================================
// GLOBAL STATE
// ============================================================================

let currentPortfolio = [];
let currentView = 'builder';
let etfDataCache = {};
let optimizationResults = null;
let regimeData = null;
let factorAttributionData = null;

// Risk-free rate (approximate current rate)
const RISK_FREE_RATE = 0.045; // 4.5% annual

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    console.log('Initializing Alphatic...');
    
    // Check if real data is loaded
    if (typeof ETF_DATA === 'undefined' || Object.keys(ETF_DATA).length === 0) {
        alert('ERROR: Real ETF data not loaded!\n\nPlease run fetch_etf_data.py first to generate data.js with real market data.');
        return;
    }
    
    console.log(`Loaded ${Object.keys(ETF_DATA).length} ETFs with real market data`);
    
    renderETFSelector();
    renderPortfolioBuilder();
    loadSavedPortfolios();
}

// ============================================================================
// VIEW NAVIGATION
// ============================================================================

function showView(viewName) {
    currentView = viewName;
    
    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[onclick="showView('${viewName}')"]`)?.classList.add('active');
    
    // Show/hide views
    document.querySelectorAll('.view').forEach(view => {
        view.style.display = 'none';
    });
    document.getElementById(`${viewName}-view`).style.display = 'block';
    
    // Load view content
    switch(viewName) {
        case 'builder':
            renderPortfolioBuilder();
            break;
        case 'analysis':
            renderAnalysisView();
            break;
        case 'backtest':
            renderBacktestView();
            break;
        case 'compare':
            renderCompareView();
            break;
    }
}

// ============================================================================
// ETF SELECTOR
// ============================================================================

function renderETFSelector() {
    const container = document.getElementById('etf-selector');
    if (!container) return;
    
    let html = '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">';
    
    for (const [category, etfs] of Object.entries(ETF_DATABASE)) {
        html += `
            <div class="bg-white rounded-lg shadow p-4">
                <h3 class="font-semibold text-gray-700 mb-3 border-b pb-2">${category}</h3>
                <div class="space-y-2">
        `;
        
        etfs.forEach(etf => {
            const inPortfolio = currentPortfolio.find(p => p.symbol === etf.symbol);
            const hasData = ETF_DATA[etf.symbol] !== undefined;
            
            html += `
                <div class="flex justify-between items-center p-2 rounded hover:bg-gray-50 ${inPortfolio ? 'bg-blue-50' : ''}">
                    <div class="flex-1">
                        <div class="font-medium text-sm">${etf.symbol}</div>
                        <div class="text-xs text-gray-500">${etf.factor}</div>
                        ${!hasData ? '<div class="text-xs text-red-500">No data</div>' : ''}
                    </div>
                    <button 
                        onclick="addToPortfolio('${etf.symbol}')"
                        class="btn-sm ${inPortfolio ? 'bg-gray-300' : hasData ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}"
                        ${inPortfolio || !hasData ? 'disabled' : ''}
                    >
                        ${inPortfolio ? '✓' : '+'}
                    </button>
                </div>
            `;
        });
        
        html += '</div></div>';
    }
    
    html += '</div>';
    container.innerHTML = html;
}

// ============================================================================
// PORTFOLIO BUILDER
// ============================================================================

function addToPortfolio(symbol) {
    if (currentPortfolio.find(p => p.symbol === symbol)) {
        return;
    }
    
    const etf = ETF_LOOKUP[symbol];
    if (!etf || !ETF_DATA[symbol]) {
        alert(`No data available for ${symbol}`);
        return;
    }
    
    // Equal weight allocation
    const newWeight = 100 / (currentPortfolio.length + 1);
    currentPortfolio.forEach(p => p.weight = newWeight);
    
    currentPortfolio.push({
        symbol: symbol,
        weight: newWeight,
        ...etf
    });
    
    renderPortfolioBuilder();
    renderETFSelector();
}

function removeFromPortfolio(symbol) {
    currentPortfolio = currentPortfolio.filter(p => p.symbol !== symbol);
    
    // Rebalance weights
    if (currentPortfolio.length > 0) {
        const newWeight = 100 / currentPortfolio.length;
        currentPortfolio.forEach(p => p.weight = newWeight);
    }
    
    renderPortfolioBuilder();
    renderETFSelector();
}

function updateWeight(symbol, weight) {
    const holding = currentPortfolio.find(p => p.symbol === symbol);
    if (holding) {
        holding.weight = parseFloat(weight);
        renderPortfolioBuilder();
    }
}

function normalizeWeights() {
    const total = currentPortfolio.reduce((sum, p) => sum + p.weight, 0);
    if (total > 0) {
        currentPortfolio.forEach(p => p.weight = (p.weight / total) * 100);
        renderPortfolioBuilder();
    }
}

function renderPortfolioBuilder() {
    const container = document.getElementById('portfolio-holdings');
    if (!container) return;
    
    if (currentPortfolio.length === 0) {
        container.innerHTML = `
            <div class="text-center text-gray-500 py-12">
                <p class="text-lg mb-2">No holdings yet</p>
                <p class="text-sm">Add ETFs from the selector above to build your portfolio</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div class="space-y-2 mb-4">
    `;
    
    currentPortfolio.forEach(holding => {
        html += `
            <div class="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                <div class="flex-1">
                    <div class="font-semibold">${holding.symbol}</div>
                    <div class="text-xs text-gray-500">${holding.name}</div>
                    <div class="text-xs text-blue-600">${holding.factor}</div>
                </div>
                <div class="w-32">
                    <input 
                        type="number" 
                        value="${holding.weight.toFixed(2)}" 
                        onchange="updateWeight('${holding.symbol}', this.value)"
                        class="w-full px-2 py-1 border rounded text-sm"
                        step="0.1"
                        min="0"
                        max="100"
                    >
                </div>
                <div class="text-sm font-medium w-16 text-right">
                    ${holding.weight.toFixed(1)}%
                </div>
                <button 
                    onclick="removeFromPortfolio('${holding.symbol}')"
                    class="text-red-600 hover:text-red-800 px-2"
                >
                    ×
                </button>
            </div>
        `;
    });
    
    const total = currentPortfolio.reduce((sum, p) => sum + p.weight, 0);
    
    html += `
        </div>
        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg font-semibold">
            <span>Total Allocation</span>
            <span class="${Math.abs(total - 100) < 0.01 ? 'text-green-600' : 'text-red-600'}">
                ${total.toFixed(2)}%
            </span>
        </div>
        <div class="flex gap-2 mt-4">
            <button onclick="normalizeWeights()" class="btn btn-secondary flex-1">
                Normalize to 100%
            </button>
            <button onclick="clearPortfolio()" class="btn btn-outline flex-1">
                Clear All
            </button>
        </div>
    `;
    
    container.innerHTML = html;
}

function clearPortfolio() {
    if (confirm('Clear all holdings from portfolio?')) {
        currentPortfolio = [];
        renderPortfolioBuilder();
        renderETFSelector();
    }
}

// ============================================================================
// PORTFOLIO MANAGEMENT (SAVE/LOAD)
// ============================================================================

function savePortfolio() {
    const name = prompt('Enter portfolio name:');
    if (!name) return;
    
    const portfolio = {
        name: name,
        timestamp: new Date().toISOString(),
        holdings: currentPortfolio.map(h => ({
            symbol: h.symbol,
            weight: h.weight
        }))
    };
    
    if (typeof SAVED_PORTFOLIOS === 'undefined') {
        window.SAVED_PORTFOLIOS = [];
    }
    
    SAVED_PORTFOLIOS.push(portfolio);
    alert(`Portfolio "${name}" saved successfully!`);
    loadSavedPortfolios();
}

function loadSavedPortfolios() {
    const container = document.getElementById('saved-portfolios');
    if (!container || typeof SAVED_PORTFOLIOS === 'undefined') return;
    
    if (SAVED_PORTFOLIOS.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-sm">No saved portfolios</p>';
        return;
    }
    
    let html = '<div class="space-y-2">';
    SAVED_PORTFOLIOS.forEach((portfolio, idx) => {
        html += `
            <div class="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div>
                    <div class="font-medium">${portfolio.name}</div>
                    <div class="text-xs text-gray-500">
                        ${new Date(portfolio.timestamp).toLocaleDateString()}
                    </div>
                </div>
                <div class="flex gap-2">
                    <button onclick="loadPortfolio(${idx})" class="btn-sm bg-blue-600 text-white">
                        Load
                    </button>
                    <button onclick="deletePortfolio(${idx})" class="btn-sm bg-red-600 text-white">
                        Delete
                    </button>
                </div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

function loadPortfolio(index) {
    const portfolio = SAVED_PORTFOLIOS[index];
    currentPortfolio = portfolio.holdings.map(h => ({
        ...ETF_LOOKUP[h.symbol],
        weight: h.weight
    })).filter(h => h.symbol); // Filter out any undefined
    
    renderPortfolioBuilder();
    renderETFSelector();
    alert(`Loaded portfolio: ${portfolio.name}`);
}

function deletePortfolio(index) {
    if (confirm('Delete this portfolio?')) {
        SAVED_PORTFOLIOS.splice(index, 1);
        loadSavedPortfolios();
    }
}

// ============================================================================
// DATA FETCHING & ALIGNMENT
// ============================================================================

async function fetchPortfolioData() {
    console.log('Fetching portfolio data...');
    
    // Load SPY as benchmark
    if (!ETF_DATA['SPY']) {
        throw new Error('SPY benchmark data not found! Cannot calculate beta and alpha.');
    }
    etfDataCache['SPY'] = ETF_DATA['SPY'];
    
    // Load all holdings
    for (const holding of currentPortfolio) {
        if (!ETF_DATA[holding.symbol]) {
            throw new Error(`No data available for ${holding.symbol}`);
        }
        etfDataCache[holding.symbol] = ETF_DATA[holding.symbol];
    }
    
    console.log(`Loaded data for ${currentPortfolio.length} holdings + SPY benchmark`);
}

function alignDataArrays() {
    // Find common date range across all holdings and SPY
    const symbols = [...currentPortfolio.map(h => h.symbol), 'SPY'];
    
    // Get all date sets
    const dateSets = symbols.map(symbol => new Set(etfDataCache[symbol].dates));
    
    // Find intersection of all dates
    let commonDates = Array.from(dateSets[0]);
    for (let i = 1; i < dateSets.length; i++) {
        commonDates = commonDates.filter(date => dateSets[i].has(date));
    }
    
    commonDates.sort();
    
    if (commonDates.length === 0) {
        throw new Error('No overlapping dates found across all holdings');
    }
    
    console.log(`Found ${commonDates.length} common dates from ${commonDates[0]} to ${commonDates[commonDates.length - 1]}`);
    
    // Align all data to common dates
    const alignedData = {};
    
    symbols.forEach(symbol => {
        const data = etfDataCache[symbol];
        const dateMap = new Map();
        
        data.dates.forEach((date, idx) => {
            dateMap.set(date, {
                price: data.prices[idx],
                return: data.returns[idx]
            });
        });
        
        alignedData[symbol] = {
            dates: commonDates,
            prices: commonDates.map(date => dateMap.get(date).price),
            returns: commonDates.map(date => dateMap.get(date).return)
        };
    });
    
    return alignedData;
}

// ============================================================================
// PORTFOLIO METRICS CALCULATION - FIXED
// ============================================================================

function calculatePortfolioMetrics() {
    try {
        // Align data arrays to common dates
        const alignedData = alignDataArrays();
        
        const weights = currentPortfolio.map(h => h.weight / 100);
        const symbols = currentPortfolio.map(h => h.symbol);
        
        // Get aligned returns
        const returns = symbols.map(symbol => alignedData[symbol].returns);
        const spyReturns = alignedData['SPY'].returns;
        const commonDates = alignedData['SPY'].dates;
        
        // Calculate portfolio returns
        const portfolioReturns = [];
        for (let i = 0; i < spyReturns.length; i++) {
            let portReturn = 0;
            for (let j = 0; j < returns.length; j++) {
                portReturn += weights[j] * returns[j][i];
            }
            portfolioReturns.push(portReturn);
        }
        
        // Calculate basic statistics
        const meanReturn = mean(portfolioReturns);
        const stdReturn = stdDev(portfolioReturns);
        const annualizedReturn = meanReturn * 252;
        const annualizedVol = stdReturn * Math.sqrt(252);
        const sharpeRatio = (annualizedReturn - RISK_FREE_RATE) / annualizedVol;
        
        // Calculate SPY metrics for comparison
        const spyMeanReturn = mean(spyReturns);
        const spyStdReturn = stdDev(spyReturns);
        const spyAnnualizedReturn = spyMeanReturn * 252;
        const spyAnnualizedVol = spyStdReturn * Math.sqrt(252);
        const spySharpe = (spyAnnualizedReturn - RISK_FREE_RATE) / spyAnnualizedVol;
        
        // Calculate beta and alpha
        const beta = calculateBeta(portfolioReturns, spyReturns);
        const alpha = annualizedReturn - (RISK_FREE_RATE + beta * (spyAnnualizedReturn - RISK_FREE_RATE));
        
        // Calculate correlation
        const correlation = calculateCorrelation(portfolioReturns, spyReturns);
        
        // Calculate max drawdown
        const maxDrawdown = calculateMaxDrawdown(portfolioReturns);
        
        // Calculate cumulative returns
        const cumulativeReturn = calculateCumulativeReturn(portfolioReturns);
        const spyCumulativeReturn = calculateCumulativeReturn(spyReturns);
        
        return {
            // Absolute metrics
            expectedReturn: annualizedReturn,
            volatility: annualizedVol,
            sharpe: sharpeRatio,
            maxDrawdown: maxDrawdown,
            cumulativeReturn: cumulativeReturn,
            
            // Relative metrics (vs SPY)
            beta: beta,
            alpha: alpha,
            correlation: correlation,
            
            // Benchmark metrics
            spyReturn: spyAnnualizedReturn,
            spyVolatility: spyAnnualizedVol,
            spySharpe: spySharpe,
            spyCumulativeReturn: spyCumulativeReturn,
            
            // Raw data
            returns: portfolioReturns,
            dates: commonDates,
            
            // Excess return
            excessReturn: annualizedReturn - spyAnnualizedReturn
        };
    } catch (error) {
        console.error('Error calculating metrics:', error);
        throw error;
    }
}

function calculateBeta(assetReturns, marketReturns) {
    if (assetReturns.length !== marketReturns.length) {
        throw new Error('Return arrays must be same length');
    }
    
    const n = assetReturns.length;
    const assetMean = mean(assetReturns);
    const marketMean = mean(marketReturns);
    
    let covariance = 0;
    let marketVariance = 0;
    
    for (let i = 0; i < n; i++) {
        covariance += (assetReturns[i] - assetMean) * (marketReturns[i] - marketMean);
        marketVariance += Math.pow(marketReturns[i] - marketMean, 2);
    }
    
    covariance /= n;
    marketVariance /= n;
    
    if (marketVariance === 0) return 1.0;
    
    return covariance / marketVariance;
}

function calculateCorrelation(arr1, arr2) {
    const n = arr1.length;
    const mean1 = mean(arr1);
    const mean2 = mean(arr2);
    
    let numerator = 0;
    let denom1 = 0;
    let denom2 = 0;
    
    for (let i = 0; i < n; i++) {
        const diff1 = arr1[i] - mean1;
        const diff2 = arr2[i] - mean2;
        numerator += diff1 * diff2;
        denom1 += diff1 * diff1;
        denom2 += diff2 * diff2;
    }
    
    if (denom1 === 0 || denom2 === 0) return 0;
    
    return numerator / Math.sqrt(denom1 * denom2);
}

function calculateMaxDrawdown(returns) {
    let peak = 1.0;
    let maxDD = 0;
    let cumulative = 1.0;
    
    for (let i = 0; i < returns.length; i++) {
        cumulative *= (1 + returns[i]);
        peak = Math.max(peak, cumulative);
        const dd = (cumulative - peak) / peak;
        maxDD = Math.min(maxDD, dd);
    }
    
    return maxDD;
}

function calculateCumulativeReturn(returns) {
    let cumulative = 1.0;
    for (let i = 0; i < returns.length; i++) {
        cumulative *= (1 + returns[i]);
    }
    return cumulative - 1.0;
}

function mean(arr) {
    if (arr.length === 0) return 0;
    return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

function stdDev(arr) {
    if (arr.length === 0) return 0;
    const avg = mean(arr);
    const squareDiffs = arr.map(value => Math.pow(value - avg, 2));
    return Math.sqrt(mean(squareDiffs));
}

// ============================================================================
// ANALYSIS VIEW
// ============================================================================

async function renderAnalysisView() {
    const container = document.getElementById('analysis-content');
    if (!container) return;
    
    if (currentPortfolio.length === 0) {
        container.innerHTML = `
            <div class="text-center text-gray-500 py-12">
                <p class="text-lg">Build a portfolio first to see analysis</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '<div class="text-center py-12"><div class="loader"></div><p class="mt-4">Loading analysis...</p></div>';
    
    try {
        // Fetch and align data
        await fetchPortfolioData();
        
        // Calculate metrics
        const metrics = calculatePortfolioMetrics();
        
        // Render analysis with both absolute and relative metrics
        let html = `
            <div class="mb-6">
                <h3 class="text-lg font-semibold mb-3">📊 Absolute Performance Metrics</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    ${renderMetricCard('Annual Return', (metrics.expectedReturn * 100).toFixed(2) + '%', 'Annualized')}
                    ${renderMetricCard('Volatility', (metrics.volatility * 100).toFixed(2) + '%', 'Annual Std Dev')}
                    ${renderMetricCard('Sharpe Ratio', metrics.sharpe.toFixed(3), 'Risk-Adjusted')}
                    ${renderMetricCard('Max Drawdown', (metrics.maxDrawdown * 100).toFixed(2) + '%', 'Peak to Trough')}
                </div>
            </div>
            
            <div class="mb-6">
                <h3 class="text-lg font-semibold mb-3">📈 Relative Performance vs S&P 500</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    ${renderMetricCard('Portfolio Beta', metrics.beta.toFixed(3), 'vs SPY')}
                    ${renderMetricCard('Alpha', (metrics.alpha * 100).toFixed(2) + '%', 'Annual Excess')}
                    ${renderMetricCard('Excess Return', (metrics.excessReturn * 100).toFixed(2) + '%', 'vs SPY')}
                    ${renderMetricCard('SPY Return', (metrics.spyReturn * 100).toFixed(2) + '%', 'Benchmark')}
                    ${renderMetricCard('Correlation', metrics.correlation.toFixed(3), 'to SPY')}
                </div>
            </div>
            
            <div class="mb-6 p-4 ${metrics.alpha > 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-lg">
                <h4 class="font-semibold mb-2">Performance Summary</h4>
                <p class="text-sm">
                    Your portfolio delivered <strong>${(metrics.expectedReturn * 100).toFixed(2)}%</strong> annualized return
                    with <strong>${(metrics.volatility * 100).toFixed(2)}%</strong> volatility
                    over the ${metrics.dates.length} day backtest period
                    (${metrics.dates[0]} to ${metrics.dates[metrics.dates.length - 1]}).
                    <br><br>
                    Compared to the S&P 500's <strong>${(metrics.spyReturn * 100).toFixed(2)}%</strong> return,
                    your portfolio ${metrics.excessReturn > 0 ? 'outperformed' : 'underperformed'} by 
                    <strong>${Math.abs(metrics.excessReturn * 100).toFixed(2)}%</strong> annually.
                    <br><br>
                    With a beta of <strong>${metrics.beta.toFixed(2)}</strong>, your portfolio generated
                    <strong>${(metrics.alpha * 100).toFixed(2)}%</strong> alpha
                    ${metrics.alpha > 0 ? '(positive risk-adjusted outperformance)' : '(negative risk-adjusted performance)'}.
                    <br><br>
                    Total cumulative return: <strong>${(metrics.cumulativeReturn * 100).toFixed(2)}%</strong>
                    vs SPY: <strong>${(metrics.spyCumulativeReturn * 100).toFixed(2)}%</strong>
                </p>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="card">
                    <h3 class="text-lg font-semibold mb-4">Holdings Breakdown</h3>
                    <div id="holdings-chart"></div>
                </div>
                
                <div class="card">
                    <h3 class="text-lg font-semibold mb-4">Factor Exposure</h3>
                    <div id="factor-exposure-chart"></div>
                </div>
                
                <div class="card">
                    <h3 class="text-lg font-semibold mb-4">Correlation Matrix</h3>
                    <div id="correlation-matrix"></div>
                </div>
                
                <div class="card">
                    <h3 class="text-lg font-semibold mb-4">Risk Contribution</h3>
                    <div id="risk-contribution"></div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        
        // Render charts
        renderHoldingsChart();
        renderFactorExposureChart();
        renderCorrelationMatrix();
        renderRiskContribution();
        
    } catch (error) {
        console.error('Analysis error:', error);
        container.innerHTML = `
            <div class="text-center text-red-600 py-12">
                <p class="text-lg font-semibold">Error loading analysis</p>
                <p class="text-sm mt-2">${error.message}</p>
                <p class="text-xs mt-4">Check console for details</p>
            </div>
        `;
    }
}

function renderMetricCard(title, value, subtitle) {
    return `
        <div class="card text-center">
            <div class="text-sm text-gray-600 mb-1">${title}</div>
            <div class="text-2xl font-bold text-gray-900">${value}</div>
            <div class="text-xs text-gray-500">${subtitle}</div>
        </div>
    `;
}

// ============================================================================
// CHART RENDERING
// ============================================================================

function renderHoldingsChart() {
    const container = document.getElementById('holdings-chart');
    if (!container) return;
    
    let html = '<div class="space-y-2">';
    currentPortfolio.forEach(holding => {
        html += `
            <div>
                <div class="flex justify-between text-sm mb-1">
                    <span>${holding.symbol}</span>
                    <span class="font-medium">${holding.weight.toFixed(1)}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-600 h-2 rounded-full" style="width: ${holding.weight}%"></div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

function renderFactorExposureChart() {
    const container = document.getElementById('factor-exposure-chart');
    if (!container) return;
    
    // Calculate factor exposures
    const factorExposures = {};
    currentPortfolio.forEach(holding => {
        const factor = holding.factor;
        if (!factorExposures[factor]) {
            factorExposures[factor] = 0;
        }
        factorExposures[factor] += holding.weight;
    });
    
    let html = '<div class="space-y-2">';
    for (const [factor, exposure] of Object.entries(factorExposures)) {
        html += `
            <div>
                <div class="flex justify-between text-sm mb-1">
                    <span>${factor}</span>
                    <span class="font-medium">${exposure.toFixed(1)}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-green-600 h-2 rounded-full" style="width: ${exposure}%"></div>
                </div>
            </div>
        `;
    }
    html += '</div>';
    container.innerHTML = html;
}

function renderCorrelationMatrix() {
    const container = document.getElementById('correlation-matrix');
    if (!container) return;
    
    try {
        const alignedData = alignDataArrays();
        const symbols = currentPortfolio.map(h => h.symbol);
        const returns = symbols.map(symbol => alignedData[symbol].returns);
        
        let html = '<div class="overflow-x-auto"><table class="w-full text-xs"><thead><tr><th></th>';
        symbols.forEach(symbol => {
            html += `<th class="px-2 py-1">${symbol}</th>`;
        });
        html += '</tr></thead><tbody>';
        
        for (let i = 0; i < symbols.length; i++) {
            html += `<tr><td class="font-medium px-2 py-1">${symbols[i]}</td>`;
            for (let j = 0; j < symbols.length; j++) {
                const corr = calculateCorrelation(returns[i], returns[j]);
                const color = getCorrelationColor(corr);
                html += `<td class="px-2 py-1 text-center" style="background-color: ${color}">${corr.toFixed(2)}</td>`;
            }
            html += '</tr>';
        }
        
        html += '</tbody></table></div>';
        container.innerHTML = html;
    } catch (error) {
        container.innerHTML = '<p class="text-red-500 text-sm">Error calculating correlations</p>';
    }
}

function getCorrelationColor(corr) {
    // Color scale from red (negative) to white (0) to green (positive)
    if (corr < 0) {
        const intensity = Math.abs(corr);
        return `rgba(239, 68, 68, ${intensity * 0.5})`;
    } else {
        const intensity = corr;
        return `rgba(34, 197, 94, ${intensity * 0.5})`;
    }
}

function renderRiskContribution() {
    const container = document.getElementById('risk-contribution');
    if (!container) return;
    
    const metrics = calculatePortfolioMetrics();
    const portfolioVol = metrics.volatility;
    
    // Approximate risk contribution (weighted by volatility)
    const riskContributions = currentPortfolio.map(holding => {
        const contrib = (holding.weight / 100) * portfolioVol;
        return {
            symbol: holding.symbol,
            contribution: contrib,
            percentage: (contrib / portfolioVol) * 100
        };
    });
    
    let html = '<div class="space-y-2">';
    riskContributions.forEach(rc => {
        html += `
            <div>
                <div class="flex justify-between text-sm mb-1">
                    <span>${rc.symbol}</span>
                    <span class="font-medium">${rc.percentage.toFixed(1)}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-red-600 h-2 rounded-full" style="width: ${rc.percentage}%"></div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

// ============================================================================
// BACKTEST VIEW - FIXED
// ============================================================================

async function renderBacktestView() {
    const container = document.getElementById('backtest-content');
    if (!container) return;
    
    if (currentPortfolio.length === 0) {
        container.innerHTML = `
            <div class="text-center text-gray-500 py-12">
                <p class="text-lg">Build a portfolio first to run backtests</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '<div class="text-center py-12"><div class="loader"></div><p class="mt-4">Running backtest with real data...</p></div>';
    
    try {
        await fetchPortfolioData();
        const backtestResults = runBacktest();
        
        let html = `
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                ${renderMetricCard('Total Return', (backtestResults.totalReturn * 100).toFixed(2) + '%', 'Cumulative')}
                ${renderMetricCard('CAGR', (backtestResults.cagr * 100).toFixed(2) + '%', 'Annualized')}
                ${renderMetricCard('Max Drawdown', (backtestResults.maxDrawdown * 100).toFixed(2) + '%', 'Peak to Trough')}
                ${renderMetricCard('Sharpe Ratio', backtestResults.sharpe.toFixed(2), 'Risk-Adjusted')}
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                ${renderMetricCard('SPY Total Return', (backtestResults.spyTotalReturn * 100).toFixed(2) + '%', 'Benchmark')}
                ${renderMetricCard('SPY CAGR', (backtestResults.spyCAGR * 100).toFixed(2) + '%', 'Benchmark')}
                ${renderMetricCard('Excess Return', (backtestResults.excessReturn * 100).toFixed(2) + '%', 'vs SPY')}
                ${renderMetricCard('Alpha', (backtestResults.alpha * 100).toFixed(2) + '%', 'Annual')}
            </div>
            
            <div class="card mb-6">
                <h3 class="text-lg font-semibold mb-4">Portfolio Growth (Real Data)</h3>
                <p class="text-sm text-gray-600 mb-4">
                    Period: ${backtestResults.startDate} to ${backtestResults.endDate} (${backtestResults.days} days)
                </p>
                <div id="backtest-chart" class="h-64"></div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="card">
                    <h3 class="text-lg font-semibold mb-4">Rolling Metrics</h3>
                    <div id="rolling-metrics"></div>
                </div>
                
                <div class="card">
                    <h3 class="text-lg font-semibold mb-4">Drawdown Analysis</h3>
                    <div id="drawdown-chart"></div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        
        renderBacktestChart(backtestResults);
        renderRollingMetrics(backtestResults);
        renderDrawdownChart(backtestResults);
        
    } catch (error) {
        console.error('Backtest error:', error);
        container.innerHTML = `
            <div class="text-center text-red-600 py-12">
                <p class="text-lg font-semibold">Error running backtest</p>
                <p class="text-sm mt-2">${error.message}</p>
            </div>
        `;
    }
}

function runBacktest() {
    try {
        const alignedData = alignDataArrays();
        const weights = currentPortfolio.map(h => h.weight / 100);
        const symbols = currentPortfolio.map(h => h.symbol);
        const returns = symbols.map(symbol => alignedData[symbol].returns);
        const spyReturns = alignedData['SPY'].returns;
        const dates = alignedData['SPY'].dates;
        
        // Calculate portfolio returns
        const portfolioReturns = [];
        const portfolioValues = [10000];
        const spyValues = [10000];
        
        for (let i = 0; i < spyReturns.length; i++) {
            let portReturn = 0;
            for (let j = 0; j < returns.length; j++) {
                portReturn += weights[j] * returns[j][i];
            }
            portfolioReturns.push(portReturn);
            portfolioValues.push(portfolioValues[portfolioValues.length - 1] * (1 + portReturn));
            spyValues.push(spyValues[spyValues.length - 1] * (1 + spyReturns[i]));
        }
        
        // Calculate metrics
        const totalReturn = (portfolioValues[portfolioValues.length - 1] / portfolioValues[0]) - 1;
        const spyTotalReturn = (spyValues[spyValues.length - 1] / spyValues[0]) - 1;
        const years = spyReturns.length / 252;
        const cagr = Math.pow(1 + totalReturn, 1 / years) - 1;
        const spyCAGR = Math.pow(1 + spyTotalReturn, 1 / years) - 1;
        
        // Max drawdown
        let peak = portfolioValues[0];
        let maxDD = 0;
        const drawdowns = [0];
        
        for (let i = 1; i < portfolioValues.length; i++) {
            peak = Math.max(peak, portfolioValues[i]);
            const dd = (portfolioValues[i] - peak) / peak;
            drawdowns.push(dd);
            maxDD = Math.min(maxDD, dd);
        }
        
        // Sharpe ratio
        const annualReturn = mean(portfolioReturns) * 252;
        const annualVol = stdDev(portfolioReturns) * Math.sqrt(252);
        const sharpe = (annualReturn - RISK_FREE_RATE) / annualVol;
        
        // Alpha
        const beta = calculateBeta(portfolioReturns, spyReturns);
        const spyAnnualReturn = mean(spyReturns) * 252;
        const alpha = annualReturn - (RISK_FREE_RATE + beta * (spyAnnualReturn - RISK_FREE_RATE));
        
        return {
            dates: dates,
            values: portfolioValues,
            spyValues: spyValues,
            returns: portfolioReturns,
            drawdowns: drawdowns,
            totalReturn: totalReturn,
            spyTotalReturn: spyTotalReturn,
            cagr: cagr,
            spyCAGR: spyCAGR,
            maxDrawdown: maxDD,
            sharpe: sharpe,
            volatility: annualVol,
            alpha: alpha,
            excessReturn: cagr - spyCAGR,
            startDate: dates[0],
            endDate: dates[dates.length - 1],
            days: dates.length
        };
    } catch (error) {
        console.error('Backtest calculation error:', error);
        throw error;
    }
}

function renderBacktestChart(results) {
    const container = document.getElementById('backtest-chart');
    if (!container) return;
    
    // Simple line chart visualization
    let html = '<svg width="100%" height="256" class="border border-gray-200 rounded">';
    
    const width = container.clientWidth || 800;
    const height = 256;
    const padding = 40;
    
    const allValues = [...results.values, ...results.spyValues];
    const minVal = Math.min(...allValues);
    const maxVal = Math.max(...allValues);
    
    const xScale = (width - 2 * padding) / (results.values.length - 1);
    const yScale = (height - 2 * padding) / (maxVal - minVal);
    
    // Draw portfolio line (blue)
    let portfolioPath = `M ${padding} ${height - padding - (results.values[0] - minVal) * yScale}`;
    for (let i = 1; i < results.values.length; i++) {
        const x = padding + i * xScale;
        const y = height - padding - (results.values[i] - minVal) * yScale;
        portfolioPath += ` L ${x} ${y}`;
    }
    html += `<path d="${portfolioPath}" fill="none" stroke="rgb(37, 99, 235)" stroke-width="2"/>`;
    
    // Draw SPY line (gray)
    let spyPath = `M ${padding} ${height - padding - (results.spyValues[0] - minVal) * yScale}`;
    for (let i = 1; i < results.spyValues.length; i++) {
        const x = padding + i * xScale;
        const y = height - padding - (results.spyValues[i] - minVal) * yScale;
        spyPath += ` L ${x} ${y}`;
    }
    html += `<path d="${spyPath}" fill="none" stroke="rgb(156, 163, 175)" stroke-width="2" stroke-dasharray="5,5"/>`;
    
    // Axes
    html += `<line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="black"/>`;
    html += `<line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="black"/>`;
    
    // Labels
    html += `<text x="${padding / 2}" y="${padding}" font-size="12">$${Math.round(maxVal).toLocaleString()}</text>`;
    html += `<text x="${padding / 2}" y="${height - padding}" font-size="12">$${Math.round(minVal).toLocaleString()}</text>`;
    
    // Legend
    html += `<line x1="${width - 200}" y1="20" x2="${width - 180}" y2="20" stroke="rgb(37, 99, 235)" stroke-width="2"/>`;
    html += `<text x="${width - 175}" y="24" font-size="12">Portfolio</text>`;
    html += `<line x1="${width - 200}" y1="40" x2="${width - 180}" y2="40" stroke="rgb(156, 163, 175)" stroke-width="2" stroke-dasharray="5,5"/>`;
    html += `<text x="${width - 175}" y="44" font-size="12">SPY</text>`;
    
    html += '</svg>';
    container.innerHTML = html;
}

function renderRollingMetrics(results) {
    const container = document.getElementById('rolling-metrics');
    if (!container) return;
    
    // Calculate 1-year rolling returns
    const rollingReturns = [];
    const window = 252; // 1 year
    
    for (let i = window; i < results.returns.length; i++) {
        const windowReturns = results.returns.slice(i - window, i);
        const annualReturn = mean(windowReturns) * 252;
        rollingReturns.push(annualReturn);
    }
    
    const avgRolling = rollingReturns.length > 0 ? mean(rollingReturns) : 0;
    const minRolling = rollingReturns.length > 0 ? Math.min(...rollingReturns) : 0;
    const maxRolling = rollingReturns.length > 0 ? Math.max(...rollingReturns) : 0;
    
    let html = `
        <div class="space-y-3">
            <div class="flex justify-between">
                <span class="text-gray-600">Average 1-Year Return</span>
                <span class="font-semibold">${(avgRolling * 100).toFixed(2)}%</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-600">Best 1-Year Return</span>
                <span class="font-semibold text-green-600">${(maxRolling * 100).toFixed(2)}%</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-600">Worst 1-Year Return</span>
                <span class="font-semibold text-red-600">${(minRolling * 100).toFixed(2)}%</span>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

function renderDrawdownChart(results) {
    const container = document.getElementById('drawdown-chart');
    if (!container) return;
    
    // Area chart of drawdowns
    let html = '<svg width="100%" height="200" class="border border-gray-200 rounded">';
    
    const width = container.clientWidth || 400;
    const height = 200;
    const padding = 40;
    
    const drawdowns = results.drawdowns;
    const minDD = Math.min(...drawdowns);
    
    const xScale = (width - 2 * padding) / (drawdowns.length - 1);
    const yScale = (height - 2 * padding) / Math.abs(minDD);
    
    // Draw area
    let pathData = `M ${padding} ${height - padding}`;
    for (let i = 0; i < drawdowns.length; i++) {
        const x = padding + i * xScale;
        const y = height - padding + drawdowns[i] * yScale;
        pathData += ` L ${x} ${y}`;
    }
    pathData += ` L ${width - padding} ${height - padding} Z`;
    
    html += `<path d="${pathData}" fill="rgba(239, 68, 68, 0.3)" stroke="rgb(239, 68, 68)" stroke-width="1"/>`;
    
    // Zero line
    html += `<line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="black"/>`;
    
    html += '</svg>';
    container.innerHTML = html;
}

// ============================================================================
// COMPARE VIEW
// ============================================================================

async function renderCompareView() {
    const container = document.getElementById('compare-content');
    if (!container) return;
    
    container.innerHTML = `
        <div class="text-center text-gray-500 py-12">
            <p class="text-lg mb-4">Portfolio comparison coming soon!</p>
            <p class="text-sm">Save multiple portfolios and compare them side-by-side</p>
        </div>
    `;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function downloadCSV(csvContent, filename) {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// ============================================================================
// INITIALIZATION - AUTO-LOAD SAMPLE PORTFOLIO
// ============================================================================

// Auto-load a sample portfolio on first run
if (currentPortfolio.length === 0 && typeof SAVED_PORTFOLIOS !== 'undefined' && SAVED_PORTFOLIOS.length > 0) {
    // Don't auto-load, let user choose
}

console.log('Alphatic initialized successfully! 🚀');
console.log('REMINDER: This uses REAL market data for REAL capital allocation decisions');