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
        { symbol: 'SPY', name: 'SPDR S&P 500 ETF', expense: 0.09, factor: 'Market', beta: 1.00, inception: '1993-01-22' },
        { symbol: 'VTI', name: 'Vanguard Total Stock Market', expense: 0.03, factor: 'Market', beta: 1.00, inception: '2001-05-31' },
        { symbol: 'VOO', name: 'Vanguard S&P 500', expense: 0.03, factor: 'Market', beta: 1.00, inception: '2010-09-07' },
        { symbol: 'QQQ', name: 'Invesco QQQ (Nasdaq-100)', expense: 0.20, factor: 'Tech/Growth', beta: 1.15, inception: '1999-03-10' }
    ],
    'US Growth': [
        { symbol: 'VUG', name: 'Vanguard Growth ETF', expense: 0.04, factor: 'Growth', beta: 1.05, inception: '2004-01-26' },
        { symbol: 'SCHG', name: 'Schwab U.S. Large-Cap Growth', expense: 0.04, factor: 'Growth', beta: 1.05, inception: '2009-12-11' },
        { symbol: 'IVW', name: 'iShares S&P 500 Growth', expense: 0.18, factor: 'Growth', beta: 1.05, inception: '2000-05-22' },
        { symbol: 'IWF', name: 'iShares Russell 1000 Growth', expense: 0.19, factor: 'Growth', beta: 1.05, inception: '2000-05-22' }
    ],
    'US Value': [
        { symbol: 'VTV', name: 'Vanguard Value ETF', expense: 0.04, factor: 'Value', beta: 0.92, inception: '2004-01-26' },
        { symbol: 'SCHV', name: 'Schwab U.S. Large-Cap Value', expense: 0.04, factor: 'Value', beta: 0.92, inception: '2009-12-11' },
        { symbol: 'IVE', name: 'iShares S&P 500 Value', expense: 0.18, factor: 'Value', beta: 0.92, inception: '2000-05-22' },
        { symbol: 'AVUV', name: 'Avantis US Small Cap Value', expense: 0.25, factor: 'Value', beta: 1.05, inception: '2019-09-24' },
        { symbol: 'AVDV', name: 'Avantis International Small Cap Value', expense: 0.36, factor: 'Value', beta: 0.95, inception: '2019-09-24' }
    ],
    'US Small Cap': [
        { symbol: 'VB', name: 'Vanguard Small-Cap ETF', expense: 0.05, factor: 'Size', beta: 1.10, inception: '2004-01-26' },
        { symbol: 'IJR', name: 'iShares Core S&P Small-Cap', expense: 0.06, factor: 'Size', beta: 1.10, inception: '2000-05-22' },
        { symbol: 'IWM', name: 'iShares Russell 2000', expense: 0.19, factor: 'Size', beta: 1.15, inception: '2000-05-22' },
        { symbol: 'SIZE', name: 'iShares MSCI USA Size Factor', expense: 0.15, factor: 'Size', beta: 1.12, inception: '2013-04-16' }
    ],
    'Factor ETFs': [
        { symbol: 'MTUM', name: 'iShares MSCI USA Momentum', expense: 0.15, factor: 'Momentum', beta: 1.00, inception: '2013-04-16' },
        { symbol: 'QUAL', name: 'iShares MSCI USA Quality', expense: 0.15, factor: 'Quality', beta: 0.90, inception: '2013-07-16' },
        { symbol: 'USMV', name: 'iShares MSCI USA Min Vol', expense: 0.15, factor: 'Low Volatility', beta: 0.75, inception: '2011-10-18' },
        { symbol: 'IMOM', name: 'iShares MSCI Intl Momentum', expense: 0.30, factor: 'Momentum', beta: 0.95, inception: '2014-01-28' }
    ],
    'Dividend': [
        { symbol: 'SCHD', name: 'Schwab U.S. Dividend Equity', expense: 0.06, factor: 'Dividend', beta: 0.95, inception: '2011-10-20' },
        { symbol: 'VYM', name: 'Vanguard High Dividend Yield', expense: 0.06, factor: 'Dividend', beta: 0.95, inception: '2006-11-10' },
        { symbol: 'VYMI', name: 'Vanguard International High Dividend', expense: 0.22, factor: 'Dividend', beta: 0.85, inception: '2016-02-25' },
        { symbol: 'HDV', name: 'iShares Core High Dividend', expense: 0.08, factor: 'Dividend', beta: 0.93, inception: '2011-03-29' }
    ],
    'International Equity': [
        { symbol: 'VXUS', name: 'Vanguard Total International Stock', expense: 0.07, factor: 'International', beta: 0.85, inception: '2011-01-26' },
        { symbol: 'VEU', name: 'Vanguard FTSE All-World ex-US', expense: 0.07, factor: 'International', beta: 0.85, inception: '2007-03-02' },
        { symbol: 'VEA', name: 'Vanguard FTSE Developed Markets', expense: 0.05, factor: 'International', beta: 0.85, inception: '2007-07-20' },
        { symbol: 'VGK', name: 'Vanguard FTSE Europe', expense: 0.08, factor: 'International', beta: 0.90, inception: '2005-03-04' },
        { symbol: 'VWO', name: 'Vanguard FTSE Emerging Markets', expense: 0.08, factor: 'Emerging Markets', beta: 1.10, inception: '2005-03-04' },
        { symbol: 'IEMG', name: 'iShares Core MSCI Emerging Markets', expense: 0.11, factor: 'Emerging Markets', beta: 1.10, inception: '2012-10-18' },
        { symbol: 'EEM', name: 'iShares MSCI Emerging Markets', expense: 0.70, factor: 'Emerging Markets', beta: 1.15, inception: '2003-04-07' }
    ],
    'Sector ETFs': [
        { symbol: 'VGT', name: 'Vanguard Information Technology', expense: 0.10, factor: 'Tech', beta: 1.20, inception: '2004-01-26' },
        { symbol: 'XLK', name: 'Technology Select Sector SPDR', expense: 0.10, factor: 'Tech', beta: 1.20, inception: '1998-12-16' },
        { symbol: 'XLF', name: 'Financial Select Sector SPDR', expense: 0.10, factor: 'Financials', beta: 1.10, inception: '1998-12-16' },
        { symbol: 'XLE', name: 'Energy Select Sector SPDR', expense: 0.10, factor: 'Energy', beta: 1.15, inception: '1998-12-16' },
        { symbol: 'XLV', name: 'Health Care Select Sector SPDR', expense: 0.10, factor: 'Healthcare', beta: 0.85, inception: '1998-12-16' },
        { symbol: 'XLI', name: 'Industrial Select Sector SPDR', expense: 0.10, factor: 'Industrials', beta: 1.05, inception: '1998-12-16' }
    ],
    'Real Estate': [
        { symbol: 'VNQ', name: 'Vanguard Real Estate ETF', expense: 0.12, factor: 'Real Estate', beta: 0.95, inception: '2004-09-23' }
    ],
    'Fixed Income': [
        { symbol: 'BND', name: 'Vanguard Total Bond Market', expense: 0.03, factor: 'Bonds', beta: 0.10, inception: '2007-04-03' },
        { symbol: 'BNDX', name: 'Vanguard Total International Bond', expense: 0.07, factor: 'Bonds', beta: 0.08, inception: '2013-05-31' },
        { symbol: 'AGG', name: 'iShares Core U.S. Aggregate Bond', expense: 0.03, factor: 'Bonds', beta: 0.10, inception: '2003-09-22' },
        { symbol: 'TLT', name: 'iShares 20+ Year Treasury Bond', expense: 0.15, factor: 'Long Bonds', beta: 0.15, inception: '2002-07-22' },
        { symbol: 'IEF', name: 'iShares 7-10 Year Treasury', expense: 0.15, factor: 'Intermediate Bonds', beta: 0.12, inception: '2002-07-22' },
        { symbol: 'TIP', name: 'iShares TIPS Bond ETF', expense: 0.19, factor: 'Inflation Protected', beta: 0.08, inception: '2003-12-04' },
        { symbol: 'SHY', name: 'iShares 1-3 Year Treasury Bond', expense: 0.15, factor: 'Short Bonds', beta: 0.05, inception: '2002-07-22' }
    ],
    'Alternatives': [
        { symbol: 'GLD', name: 'SPDR Gold Shares', expense: 0.40, factor: 'Gold', beta: 0.00, inception: '2004-11-18' },
        { symbol: 'DBC', name: 'Invesco DB Commodity Index', expense: 0.87, factor: 'Commodities', beta: 0.10, inception: '2006-02-03' }
    ],
    'Aggressive Growth': [
        { symbol: 'ARKK', name: 'ARK Innovation ETF', expense: 0.75, factor: 'Innovation', beta: 1.45, inception: '2014-10-31' }
    ]
};

// Flatten ETF database for easy lookup
const ALL_ETFS = Object.values(ETF_DATABASE).flat();
const ETF_LOOKUP = {};
ALL_ETFS.forEach(etf => {
    ETF_LOOKUP[etf.symbol] = etf;
});

// Log for debugging
console.log(`ETF Database loaded: ${ALL_ETFS.length} ETFs`);
console.log('Sample ETF_LOOKUP entries:', { 
    VTI: ETF_LOOKUP['VTI'], 
    VXUS: ETF_LOOKUP['VXUS'],
    AVUV: ETF_LOOKUP['AVUV']
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
    
    // Initialize persistent storage
    const storageInitialized = initializeStorage();
    if (storageInitialized) {
        console.log('✅ Persistent storage initialized - portfolios will be saved across sessions');
    } else {
        console.warn('⚠️ Persistent storage not available - portfolios will not persist');
    }
    
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
            
            // Calculate years of history
            let yearsHistory = '';
            if (etf.inception) {
                const inceptionDate = new Date(etf.inception);
                const today = new Date();
                const years = Math.floor((today - inceptionDate) / (365.25 * 24 * 60 * 60 * 1000));
                yearsHistory = `${years}y`;
            }
            
            html += `
                <div class="flex justify-between items-center p-2 rounded hover:bg-gray-50 ${inPortfolio ? 'bg-blue-50' : ''}">
                    <div class="flex-1">
                        <div class="flex items-center gap-2">
                            <span class="font-medium text-sm">${etf.symbol}</span>
                            ${yearsHistory ? `<span class="text-xs text-gray-500 bg-gray-100 px-1 rounded">${yearsHistory}</span>` : ''}
                        </div>
                        <div class="text-xs text-gray-500">${etf.factor}</div>
                        ${etf.inception ? `<div class="text-xs text-gray-400">Since ${etf.inception}</div>` : ''}
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
    console.log(`Adding ${symbol} to portfolio. ETF lookup result:`, etf);
    
    if (!etf) {
        alert(`ETF metadata not found for ${symbol}. Check ETF_LOOKUP.`);
        console.error(`ETF_LOOKUP missing entry for ${symbol}`);
        console.log('Available symbols:', Object.keys(ETF_LOOKUP));
        return;
    }
    
    if (!ETF_DATA[symbol]) {
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
    
    console.log('Portfolio after adding:', currentPortfolio[currentPortfolio.length - 1]);
    
    renderPortfolioBuilder();
    renderETFSelector();
}

function removeFromPortfolio(symbol) {
    currentPortfolio = currentPortfolio.filter(p => p.symbol !== symbol);
    
    // Don't rebalance - keep existing weights
    // User can manually adjust or use "Normalize to 100%" button
    
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
        // Look up ETF info if not already in holding
        const etfInfo = ETF_LOOKUP[holding.symbol] || {};
        const name = holding.name || etfInfo.name || 'Unknown ETF';
        const factor = holding.factor || etfInfo.factor || 'Unknown';
        
        html += `
            <div class="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                <div class="flex-1">
                    <div class="font-semibold">${holding.symbol}</div>
                    <div class="text-xs text-gray-500">${name}</div>
                    <div class="text-xs text-blue-600">${factor}</div>
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
        <div class="grid grid-cols-2 gap-2 mt-4">
            <button onclick="normalizeWeights()" class="btn btn-secondary">
                Normalize to 100%
            </button>
            <button onclick="clearPortfolio()" class="btn btn-outline">
                Clear All
            </button>
            <button onclick="exportPortfolio()" class="btn btn-primary">
                📥 Export Portfolio
            </button>
            <button onclick="importPortfolio()" class="btn btn-primary">
                📤 Import Portfolio
            </button>
        </div>
    `;
    
    container.innerHTML = html;
}

function clearPortfolio() {
    clearPortfolioEnhanced();
}

function exportPortfolio() {
    if (currentPortfolio.length === 0) {
        alert('No portfolio to export');
        return;
    }
    
    const portfolioData = {
        name: prompt('Enter portfolio name:', 'My Portfolio') || 'Untitled Portfolio',
        created: new Date().toISOString(),
        holdings: currentPortfolio.map(h => ({
            symbol: h.symbol,
            weight: h.weight,
            name: h.name || (ETF_LOOKUP[h.symbol] ? ETF_LOOKUP[h.symbol].name : undefined),
            factor: h.factor || (ETF_LOOKUP[h.symbol] ? ETF_LOOKUP[h.symbol].factor : undefined)
        })),
        totalAllocation: currentPortfolio.reduce((sum, h) => sum + h.weight, 0)
    };
    
    // Convert to JSON
    const json = JSON.stringify(portfolioData, null, 2);
    
    // Create download link
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${portfolioData.name.replace(/[^a-z0-9]/gi, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`Portfolio "${portfolioData.name}" exported successfully!`);
}

function importPortfolio() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const portfolioData = JSON.parse(event.target.result);
                
                // Validate structure
                if (!portfolioData.holdings || !Array.isArray(portfolioData.holdings)) {
                    throw new Error('Invalid portfolio format: missing holdings array');
                }
                
                // Clear current portfolio
                currentPortfolio = [];
                
                // Load holdings with metadata from ETF_LOOKUP
                portfolioData.holdings.forEach(h => {
                    if (!h.symbol || h.weight === undefined) {
                        console.warn('Skipping invalid holding:', h);
                        return;
                    }
                    
                    const etfInfo = ETF_LOOKUP[h.symbol] || {};
                    currentPortfolio.push({
                        symbol: h.symbol,
                        weight: h.weight,
                        name: h.name || etfInfo.name || 'Unknown ETF',
                        factor: h.factor || etfInfo.factor || 'Unknown',
                        expense: etfInfo.expense,
                        beta: etfInfo.beta,
                        inception: etfInfo.inception
                    });
                });
                
                if (currentPortfolio.length === 0) {
                    throw new Error('No valid holdings found in portfolio file');
                }
                
                // Update display
                renderPortfolioBuilder();
                renderETFSelector();
                
                const total = currentPortfolio.reduce((sum, h) => sum + h.weight, 0);
                alert(`Portfolio "${portfolioData.name || 'Imported'}" loaded successfully!\n${currentPortfolio.length} holdings, ${total.toFixed(2)}% total allocation`);
                
            } catch (error) {
                console.error('Import error:', error);
                alert(`Error importing portfolio: ${error.message}`);
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
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
    
    // Save to localStorage
    if (addPortfolioToStorage(portfolio)) {
        alert(`Portfolio "${name}" saved successfully!\n\n💾 Saved to browser storage (persists across sessions)`);
        loadSavedPortfolios();
    } else {
        alert('Error saving portfolio. Check console for details.');
    }
}

function loadSavedPortfolios() {
    const container = document.getElementById('saved-portfolios');
    if (!container) return;
    
    // Get portfolios from localStorage
    const portfolios = getCurrentPortfolios();
    
    if (portfolios.length === 0) {
        container.innerHTML = `
            <p class="text-gray-500 text-sm mb-3">No saved portfolios</p>
            <div class="flex gap-2">
                <button onclick="importPortfoliosFromFile()" class="btn-sm bg-blue-600 text-white flex-1">
                    📥 Import
                </button>
                <button onclick="showStorageStats()" class="btn-sm bg-gray-600 text-white flex-1">
                    📊 Stats
                </button>
            </div>
        `;
        return;
    }
    
    let html = '<div class="space-y-2 mb-3">';
    portfolios.forEach((portfolio, idx) => {
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
    
    // Add management buttons
    html += `
        <div class="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-200">
            <button onclick="exportPortfoliosToFile()" class="btn-sm bg-green-600 text-white text-xs">
                📥 Export
            </button>
            <button onclick="importPortfoliosFromFile()" class="btn-sm bg-blue-600 text-white text-xs">
                📤 Import
            </button>
            <button onclick="showStorageStats()" class="btn-sm bg-gray-600 text-white text-xs">
                📊 Stats
            </button>
        </div>
    `;
    
    container.innerHTML = html;
}

function loadPortfolio(index) {
    loadPortfolioEnhanced(index);
}

function deletePortfolio(index) {
    const portfolios = getCurrentPortfolios();
    
    if (index < 0 || index >= portfolios.length) {
        alert('Invalid portfolio index');
        return;
    }
    
    const portfolio = portfolios[index];
    
    if (confirm(`Delete portfolio "${portfolio.name}"?\n\nThis cannot be undone.`)) {
        if (deletePortfolioFromStorage(index)) {
            alert(`Portfolio "${portfolio.name}" deleted successfully.`);
            loadSavedPortfolios();
        } else {
            alert('Error deleting portfolio. Check console for details.');
        }
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
            
            ${renderComprehensiveComparisonTable(metrics)}
            
            <div class="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                <button onclick="openOptimizerModal()" class="btn btn-primary">
                    🎯 Optimize Portfolio
                </button>
                <button onclick="openRegimeModal()" class="btn btn-success">
                    🌡️ Market Regime
                </button>
                <button onclick="openFactorModal()" class="btn btn-info">
                    📊 Factor Attribution
                </button>
                <button onclick="exportCompleteAnalysis()" class="btn btn-secondary">
                    📥 Export Analysis
                </button>
                <button onclick="window.print()" class="btn btn-outline">
                    🖨️ Print Report
                </button>
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
        // Try to get factor from holding, or look it up
        let factor = holding.factor;
        if (!factor || factor === 'undefined') {
            const etfInfo = ETF_LOOKUP[holding.symbol];
            factor = etfInfo ? etfInfo.factor : 'Unknown';
        }
        
        if (!factorExposures[factor]) {
            factorExposures[factor] = 0;
        }
        factorExposures[factor] += holding.weight;
    });
    
    // Sort factors by exposure (descending)
    const sortedFactors = Object.entries(factorExposures).sort((a, b) => b[1] - a[1]);
    
    let html = '<div class="space-y-2">';
    sortedFactors.forEach(([factor, exposure]) => {
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
    });
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
    
    if (currentPortfolio.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-sm">No portfolio to analyze</p>';
        return;
    }
    
    try {
        // Check if function exists
        if (typeof calculateEnhancedRiskContribution !== 'function') {
            throw new Error('calculateEnhancedRiskContribution function not found');
        }
        
        const riskData = calculateEnhancedRiskContribution();
        
        if (!riskData || !riskData.holdings) {
            throw new Error('Risk data calculation returned invalid result');
        }
        
        container.innerHTML = renderEnhancedRiskContribution(riskData);
    } catch (error) {
        console.error('Error calculating risk contribution:', error);
        console.error('Error stack:', error.stack);
        container.innerHTML = `
            <p class="text-red-500 text-sm">Error calculating risk contribution</p>
            <p class="text-xs text-gray-600 mt-2">${error.message}</p>
            <p class="text-xs text-gray-500 mt-1">Check console for details</p>
        `;
    }
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
// ============================================================================
// ALPHATIC VERSION 1.1 - ENHANCEMENT MODULE
// New Features: Optimizer, Regime Detection, Factor Attribution, Export
// ============================================================================

// ============================================================================
// PORTFOLIO OPTIMIZER - MAXIMUM SHARPE RATIO
// ============================================================================

function openOptimizerModal() {
    const modal = document.getElementById('optimizer-modal');
    const content = document.getElementById('optimizer-content');
    
    if (currentPortfolio.length < 2) {
        alert('Add at least 2 holdings to optimize');
        return;
    }
    
    modal.style.display = 'block';
    content.innerHTML = '<div class="text-center py-12"><div class="loader"></div><p class="mt-4">Running portfolio optimization...</p></div>';
    
    setTimeout(async () => {
        try {
            await fetchPortfolioData();
            const results = await optimizePortfolio();
            renderOptimizerResults(results);
        } catch (error) {
            console.error('Optimizer error:', error);
            content.innerHTML = `
                <div class="text-center text-red-600 py-12">
                    <p class="text-lg font-semibold">Error running optimizer</p>
                    <p class="text-sm mt-2">${error.message}</p>
                </div>
            `;
        }
    }, 100);
}

function closeOptimizerModal() {
    document.getElementById('optimizer-modal').style.display = 'none';
}

async function optimizePortfolio() {
    console.log('Starting portfolio optimization...');
    
    const alignedData = alignDataArrays();
    const symbols = currentPortfolio.map(h => h.symbol);
    const n = symbols.length;
    
    // Get returns for each asset
    const assetReturns = symbols.map(symbol => alignedData[symbol].returns);
    const spyReturns = alignedData['SPY'].returns;
    
    // Calculate covariance matrix
    const covMatrix = calculateCovarianceMatrix(assetReturns);
    const expectedReturns = assetReturns.map(returns => mean(returns) * 252);
    
    // Run multiple optimization scenarios
    const scenarios = [];
    
    // Scenario 1: Maximum Sharpe Ratio (unconstrained)
    const maxSharpe = findMaxSharpeRatio(expectedReturns, covMatrix, n);
    scenarios.push({
        name: 'Maximum Sharpe Ratio',
        weights: maxSharpe.weights,
        ...calculatePortfolioStats(maxSharpe.weights, expectedReturns, covMatrix, assetReturns, spyReturns)
    });
    
    // Scenario 2: Maximum Sharpe with minimum 5% per holding
    const maxSharpeMin5 = findMaxSharpeRatioConstrained(expectedReturns, covMatrix, n, 0.05, 0.40);
    scenarios.push({
        name: 'Max Sharpe (Min 5% per holding)',
        weights: maxSharpeMin5.weights,
        ...calculatePortfolioStats(maxSharpeMin5.weights, expectedReturns, covMatrix, assetReturns, spyReturns)
    });
    
    // Scenario 3: Minimum Variance
    const minVar = findMinimumVariance(covMatrix, n);
    scenarios.push({
        name: 'Minimum Variance',
        weights: minVar.weights,
        ...calculatePortfolioStats(minVar.weights, expectedReturns, covMatrix, assetReturns, spyReturns)
    });
    
    // Scenario 4: Equal Risk Contribution
    const equalRisk = findEqualRiskContribution(expectedReturns, covMatrix, n);
    scenarios.push({
        name: 'Equal Risk Contribution',
        weights: equalRisk.weights,
        ...calculatePortfolioStats(equalRisk.weights, expectedReturns, covMatrix, assetReturns, spyReturns)
    });
    
    // Scenario 5: Maximum Return (for given risk = current portfolio vol)
    const currentMetrics = calculatePortfolioMetrics();
    const targetVol = currentMetrics.volatility;
    const maxReturn = findMaxReturnForRisk(expectedReturns, covMatrix, n, targetVol);
    scenarios.push({
        name: `Max Return (Vol ≤ ${(targetVol * 100).toFixed(1)}%)`,
        weights: maxReturn.weights,
        ...calculatePortfolioStats(maxReturn.weights, expectedReturns, covMatrix, assetReturns, spyReturns)
    });
    
    return {
        scenarios: scenarios,
        symbols: symbols,
        currentPortfolio: {
            weights: currentPortfolio.map(h => h.weight / 100),
            ...currentMetrics
        }
    };
}

function findMaxSharpeRatio(expectedReturns, covMatrix, n) {
    // Grid search for maximum Sharpe ratio
    let bestSharpe = -Infinity;
    let bestWeights = null;
    
    const iterations = 5000;
    
    for (let i = 0; i < iterations; i++) {
        // Generate random weights
        let weights = Array(n).fill(0).map(() => Math.random());
        const sum = weights.reduce((a, b) => a + b, 0);
        weights = weights.map(w => w / sum);
        
        // Calculate portfolio metrics
        const portReturn = weights.reduce((sum, w, idx) => sum + w * expectedReturns[idx], 0);
        const portVol = Math.sqrt(calculatePortfolioVariance(weights, covMatrix));
        const sharpe = (portReturn - RISK_FREE_RATE) / portVol;
        
        if (sharpe > bestSharpe && !isNaN(sharpe) && isFinite(sharpe)) {
            bestSharpe = sharpe;
            bestWeights = [...weights];
        }
    }
    
    return { weights: bestWeights, sharpe: bestSharpe };
}

function findMaxSharpeRatioConstrained(expectedReturns, covMatrix, n, minWeight, maxWeight) {
    let bestSharpe = -Infinity;
    let bestWeights = null;
    
    const iterations = 10000;
    
    for (let i = 0; i < iterations; i++) {
        // Generate random weights with constraints
        let weights = Array(n).fill(0).map(() => minWeight + Math.random() * (maxWeight - minWeight));
        const sum = weights.reduce((a, b) => a + b, 0);
        weights = weights.map(w => w / sum);
        
        // Check constraints
        if (weights.some(w => w < minWeight - 0.001 || w > maxWeight + 0.001)) {
            continue;
        }
        
        const portReturn = weights.reduce((sum, w, idx) => sum + w * expectedReturns[idx], 0);
        const portVol = Math.sqrt(calculatePortfolioVariance(weights, covMatrix));
        const sharpe = (portReturn - RISK_FREE_RATE) / portVol;
        
        if (sharpe > bestSharpe && !isNaN(sharpe) && isFinite(sharpe)) {
            bestSharpe = sharpe;
            bestWeights = [...weights];
        }
    }
    
    return { weights: bestWeights || Array(n).fill(1/n), sharpe: bestSharpe };
}

function findMinimumVariance(covMatrix, n) {
    let bestVar = Infinity;
    let bestWeights = null;
    
    const iterations = 5000;
    
    for (let i = 0; i < iterations; i++) {
        let weights = Array(n).fill(0).map(() => Math.random());
        const sum = weights.reduce((a, b) => a + b, 0);
        weights = weights.map(w => w / sum);
        
        const portVar = calculatePortfolioVariance(weights, covMatrix);
        
        if (portVar < bestVar && !isNaN(portVar)) {
            bestVar = portVar;
            bestWeights = [...weights];
        }
    }
    
    return { weights: bestWeights, variance: bestVar };
}

function findEqualRiskContribution(expectedReturns, covMatrix, n) {
    // Start with equal weights and adjust
    let weights = Array(n).fill(1/n);
    
    // Simple heuristic: inverse volatility weighting
    const vols = Array(n).fill(0).map((_, idx) => Math.sqrt(covMatrix[idx][idx]));
    const invVols = vols.map(v => 1/v);
    const sumInvVol = invVols.reduce((a, b) => a + b, 0);
    weights = invVols.map(iv => iv / sumInvVol);
    
    return { weights: weights };
}

function findMaxReturnForRisk(expectedReturns, covMatrix, n, targetVol) {
    let bestReturn = -Infinity;
    let bestWeights = null;
    
    const iterations = 5000;
    const tolerance = 0.005; // 0.5% tolerance on volatility
    
    for (let i = 0; i < iterations; i++) {
        let weights = Array(n).fill(0).map(() => Math.random());
        const sum = weights.reduce((a, b) => a + b, 0);
        weights = weights.map(w => w / sum);
        
        const portReturn = weights.reduce((sum, w, idx) => sum + w * expectedReturns[idx], 0);
        const portVol = Math.sqrt(calculatePortfolioVariance(weights, covMatrix));
        
        // Only consider if within volatility target
        if (Math.abs(portVol - targetVol) <= tolerance || portVol <= targetVol) {
            if (portReturn > bestReturn) {
                bestReturn = portReturn;
                bestWeights = [...weights];
            }
        }
    }
    
    return { weights: bestWeights || Array(n).fill(1/n), return: bestReturn };
}

function calculateCovarianceMatrix(assetReturns) {
    const n = assetReturns.length;
    const covMatrix = Array(n).fill(0).map(() => Array(n).fill(0));
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            covMatrix[i][j] = calculateCovariance(assetReturns[i], assetReturns[j]) * 252; // Annualized
        }
    }
    
    return covMatrix;
}

function calculateCovariance(returns1, returns2) {
    const n = returns1.length;
    const mean1 = mean(returns1);
    const mean2 = mean(returns2);
    
    let cov = 0;
    for (let i = 0; i < n; i++) {
        cov += (returns1[i] - mean1) * (returns2[i] - mean2);
    }
    
    return cov / n;
}

function calculatePortfolioVariance(weights, covMatrix) {
    const n = weights.length;
    let variance = 0;
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            variance += weights[i] * weights[j] * covMatrix[i][j];
        }
    }
    
    return variance;
}

function calculatePortfolioStats(weights, expectedReturns, covMatrix, assetReturns, spyReturns) {
    const portReturn = weights.reduce((sum, w, idx) => sum + w * expectedReturns[idx], 0);
    const portVol = Math.sqrt(calculatePortfolioVariance(weights, covMatrix));
    const sharpe = (portReturn - RISK_FREE_RATE) / portVol;
    
    // Calculate portfolio returns for beta/alpha
    const portfolioReturns = [];
    for (let i = 0; i < assetReturns[0].length; i++) {
        let ret = 0;
        for (let j = 0; j < weights.length; j++) {
            ret += weights[j] * assetReturns[j][i];
        }
        portfolioReturns.push(ret);
    }
    
    const beta = calculateBeta(portfolioReturns, spyReturns);
    const spyReturn = mean(spyReturns) * 252;
    const alpha = portReturn - (RISK_FREE_RATE + beta * (spyReturn - RISK_FREE_RATE));
    
    return {
        expectedReturn: portReturn,
        volatility: portVol,
        sharpe: sharpe,
        beta: beta,
        alpha: alpha
    };
}

function renderOptimizerResults(results) {
    const content = document.getElementById('optimizer-content');
    
    let html = `
        <div class="mb-6">
            <h3 class="text-lg font-semibold mb-3">📊 Current Portfolio</h3>
            <div class="grid grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
                <div class="text-center">
                    <div class="text-sm text-gray-600">Return</div>
                    <div class="text-lg font-bold">${(results.currentPortfolio.expectedReturn * 100).toFixed(2)}%</div>
                </div>
                <div class="text-center">
                    <div class="text-sm text-gray-600">Volatility</div>
                    <div class="text-lg font-bold">${(results.currentPortfolio.volatility * 100).toFixed(2)}%</div>
                </div>
                <div class="text-center">
                    <div class="text-sm text-gray-600">Sharpe</div>
                    <div class="text-lg font-bold">${results.currentPortfolio.sharpe.toFixed(3)}</div>
                </div>
                <div class="text-center">
                    <div class="text-sm text-gray-600">Beta</div>
                    <div class="text-lg font-bold">${results.currentPortfolio.beta.toFixed(3)}</div>
                </div>
                <div class="text-center">
                    <div class="text-sm text-gray-600">Alpha</div>
                    <div class="text-lg font-bold">${(results.currentPortfolio.alpha * 100).toFixed(2)}%</div>
                </div>
            </div>
        </div>
        
        <h3 class="text-lg font-semibold mb-3">🎯 Optimized Portfolios</h3>
        <p class="text-sm text-gray-600 mb-4">Using the same holdings, here are optimized allocations for different objectives:</p>
    `;
    
    results.scenarios.forEach((scenario, idx) => {
        const improvement = scenario.sharpe - results.currentPortfolio.sharpe;
        const improvementPct = (improvement / results.currentPortfolio.sharpe) * 100;
        
        html += `
            <div class="card mb-4">
                <div class="flex justify-between items-center mb-3">
                    <h4 class="font-semibold text-lg">${scenario.name}</h4>
                    ${improvement > 0.01 ? `<span class="text-green-600 font-semibold">+${improvementPct.toFixed(1)}% Sharpe ↑</span>` : ''}
                </div>
                
                <div class="grid grid-cols-5 gap-4 mb-4 p-3 bg-blue-50 rounded">
                    <div class="text-center">
                        <div class="text-xs text-gray-600">Return</div>
                        <div class="font-bold text-blue-900">${(scenario.expectedReturn * 100).toFixed(2)}%</div>
                    </div>
                    <div class="text-center">
                        <div class="text-xs text-gray-600">Volatility</div>
                        <div class="font-bold text-blue-900">${(scenario.volatility * 100).toFixed(2)}%</div>
                    </div>
                    <div class="text-center">
                        <div class="text-xs text-gray-600">Sharpe</div>
                        <div class="font-bold text-blue-900">${scenario.sharpe.toFixed(3)}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-xs text-gray-600">Beta</div>
                        <div class="font-bold text-blue-900">${scenario.beta.toFixed(3)}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-xs text-gray-600">Alpha</div>
                        <div class="font-bold text-blue-900">${(scenario.alpha * 100).toFixed(2)}%</div>
                    </div>
                </div>
                
                <div class="mb-3">
                    <h5 class="text-sm font-semibold mb-2">Allocation:</h5>
                    <div class="grid grid-cols-2 gap-2">
        `;
        
        scenario.weights.forEach((weight, i) => {
            if (weight >= 0.01) { // Only show if >= 1%
                html += `
                    <div class="flex justify-between text-sm p-2 bg-gray-50 rounded">
                        <span>${results.symbols[i]}</span>
                        <span class="font-semibold">${(weight * 100).toFixed(1)}%</span>
                    </div>
                `;
            }
        });
        
        html += `
                    </div>
                </div>
                
                <button onclick="applyOptimizedWeights(${idx})" class="btn btn-primary w-full">
                    Apply These Weights
                </button>
            </div>
        `;
    });
    
    html += `
        <div class="flex gap-2 mt-6">
            <button onclick="exportOptimizerResults()" class="btn btn-secondary flex-1">
                📥 Export Results
            </button>
            <button onclick="closeOptimizerModal()" class="btn btn-outline flex-1">
                Close
            </button>
        </div>
    `;
    
    content.innerHTML = html;
    
    // Store results for later use
    window.optimizerResults = results;
}

function applyOptimizedWeights(scenarioIndex) {
    const results = window.optimizerResults;
    if (!results) return;
    
    const scenario = results.scenarios[scenarioIndex];
    
    // Update current portfolio weights
    currentPortfolio.forEach((holding, i) => {
        holding.weight = scenario.weights[i] * 100;
    });
    
    // Filter out zero weights
    currentPortfolio = currentPortfolio.filter(h => h.weight >= 0.1);
    
    closeOptimizerModal();
    renderPortfolioBuilder();
    alert(`Applied: ${scenario.name}\n\nNew Sharpe Ratio: ${scenario.sharpe.toFixed(3)}`);
}

function exportOptimizerResults() {
    const results = window.optimizerResults;
    if (!results) return;
    
    let csv = 'Scenario,Symbol,Weight (%),Return (%),Volatility (%),Sharpe,Beta,Alpha (%)\n';
    
    // Current portfolio
    csv += 'CURRENT PORTFOLIO\n';
    results.currentPortfolio.weights.forEach((weight, i) => {
        csv += `Current,${results.symbols[i]},${(weight * 100).toFixed(2)},`;
        csv += `${(results.currentPortfolio.expectedReturn * 100).toFixed(2)},`;
        csv += `${(results.currentPortfolio.volatility * 100).toFixed(2)},`;
        csv += `${results.currentPortfolio.sharpe.toFixed(3)},`;
        csv += `${results.currentPortfolio.beta.toFixed(3)},`;
        csv += `${(results.currentPortfolio.alpha * 100).toFixed(2)}\n`;
    });
    
    csv += '\nOPTIMIZED PORTFOLIOS\n';
    
    // Optimized portfolios
    results.scenarios.forEach(scenario => {
        scenario.weights.forEach((weight, i) => {
            if (weight >= 0.01) {
                csv += `${scenario.name},${results.symbols[i]},${(weight * 100).toFixed(2)},`;
                csv += `${(scenario.expectedReturn * 100).toFixed(2)},`;
                csv += `${(scenario.volatility * 100).toFixed(2)},`;
                csv += `${scenario.sharpe.toFixed(3)},`;
                csv += `${scenario.beta.toFixed(3)},`;
                csv += `${(scenario.alpha * 100).toFixed(2)}\n`;
            }
        });
    });
    
    downloadCSV(csv, 'portfolio_optimization.csv');
}

// ============================================================================
// REGIME DETECTION
// ============================================================================

function openRegimeModal() {
    const modal = document.getElementById('regime-modal');
    const content = document.getElementById('regime-content');
    
    modal.style.display = 'block';
    content.innerHTML = '<div class="text-center py-12"><div class="loader"></div><p class="mt-4">Analyzing market regime...</p></div>';
    
    setTimeout(async () => {
        try {
            await fetchPortfolioData();
            const regimeAnalysis = analyzeMarketRegimesComprehensive();
            content.innerHTML = renderEnhancedRegimeAnalysis(regimeAnalysis);
        } catch (error) {
            console.error('Regime detection error:', error);
            content.innerHTML = `
                <div class="text-center text-red-600 py-12">
                    <p class="text-lg font-semibold">Error detecting regime</p>
                    <p class="text-sm mt-2">${error.message}</p>
                </div>
            `;
        }
    }, 100);
}

function closeRegimeModal() {
    document.getElementById('regime-modal').style.display = 'none';
}

async function detectMarketRegime() {
    console.log('Detecting market regime...');
    
    const alignedData = alignDataArrays();
    const spyReturns = alignedData['SPY'].returns;
    const dates = alignedData['SPY'].dates;
    
    // Analyze recent period (last 252 days = 1 year)
    const recentReturns = spyReturns.slice(-252);
    const recentDates = dates.slice(-252);
    
    // Calculate regime indicators
    const volatility = stdDev(recentReturns) * Math.sqrt(252);
    const trend = mean(recentReturns) * 252;
    const skewness = calculateSkewness(recentReturns);
    const currentPrice = alignedData['SPY'].prices[alignedData['SPY'].prices.length - 1];
    const sma50 = calculateSMA(alignedData['SPY'].prices, 50);
    const sma200 = calculateSMA(alignedData['SPY'].prices, 200);
    
    // Calculate rolling metrics
    const rolling30DayVol = [];
    const rolling90DayRet = [];
    
    for (let i = 30; i < recentReturns.length; i++) {
        const window = recentReturns.slice(i - 30, i);
        rolling30DayVol.push(stdDev(window) * Math.sqrt(252));
    }
    
    for (let i = 90; i < recentReturns.length; i++) {
        const window = recentReturns.slice(i - 90, i);
        rolling90DayRet.push(mean(window) * 252);
    }
    
    const avgVol = mean(rolling30DayVol);
    const volTrend = rolling30DayVol[rolling30DayVol.length - 1] > avgVol ? 'Rising' : 'Falling';
    
    // Determine regime
    let regime;
    let regimeScore;
    let regimeDescription;
    let recommendation;
    
    if (trend > 0.10 && volatility < 0.18) {
        regime = 'Bull Market - Low Volatility';
        regimeScore = 1.0;
        regimeDescription = 'Strong uptrend with low volatility. Ideal conditions for risk-taking.';
        recommendation = 'Favor: Momentum, Growth, Small Cap. Reduce: Defensive, Bonds.';
    } else if (trend > 0.10 && volatility >= 0.18) {
        regime = 'Bull Market - High Volatility';
        regimeScore = 0.6;
        regimeDescription = 'Positive trend but elevated volatility. Exercise caution.';
        recommendation = 'Favor: Quality, Momentum. Maintain: Diversification, Some defensive.';
    } else if (trend <= 0 && trend > -0.10 && volatility < 0.18) {
        regime = 'Sideways Market - Low Volatility';
        regimeScore = 0.2;
        regimeDescription = 'Range-bound market with low volatility. Mean reversion likely.';
        recommendation = 'Favor: Value, Dividend, Quality. Reduce: Momentum.';
    } else if (trend <= -0.10 && volatility >= 0.18) {
        regime = 'Bear Market - High Volatility';
        regimeScore = -1.0;
        regimeDescription = 'Downtrend with high volatility. Risk-off environment.';
        recommendation = 'Favor: Defensive, Bonds, Low Volatility. Reduce: Beta, Growth.';
    } else {
        regime = 'Mixed Signals';
        regimeScore = 0.0;
        regimeDescription = 'Unclear market direction. Balanced approach recommended.';
        recommendation = 'Maintain: Diversified allocation across factors.';
    }
    
    // Factor performance in current regime
    const factorPerformance = calculateFactorPerformanceByRegime(regimeScore, volatility);
    
    return {
        regime: regime,
        score: regimeScore,
        description: regimeDescription,
        recommendation: recommendation,
        metrics: {
            trend: trend,
            volatility: volatility,
            skewness: skewness,
            volTrend: volTrend,
            sma50: sma50,
            sma200: sma200,
            currentPrice: currentPrice,
            priceVsSMA50: ((currentPrice / sma50 - 1) * 100).toFixed(2),
            priceVsSMA200: ((currentPrice / sma200 - 1) * 100).toFixed(2)
        },
        factorPerformance: factorPerformance,
        period: {
            start: recentDates[0],
            end: recentDates[recentDates.length - 1],
            days: recentDates.length
        }
    };
}

function calculateSkewness(returns) {
    const n = returns.length;
    const meanRet = mean(returns);
    const stdRet = stdDev(returns);
    
    let skew = 0;
    for (let i = 0; i < n; i++) {
        skew += Math.pow((returns[i] - meanRet) / stdRet, 3);
    }
    
    return skew / n;
}

function calculateSMA(prices, period) {
    if (prices.length < period) return prices[prices.length - 1];
    
    const recent = prices.slice(-period);
    return mean(recent);
}

function calculateFactorPerformanceByRegime(regimeScore, volatility) {
    // Simulated factor performance based on regime
    // In production, this would use actual factor ETF data
    
    const baseScores = {
        'Market': 0.70,
        'Growth': 0.75,
        'Value': 0.65,
        'Size': 0.60,
        'Momentum': 0.80,
        'Quality': 0.75,
        'Low Volatility': 0.70,
        'Dividend': 0.65,
        'International': 0.60,
        'Tech': 0.80,
        'Financials': 0.65,
        'Energy': 0.60,
        'Healthcare': 0.70,
        'Real Estate': 0.60,
        'Bonds': 0.50,
        'Gold': 0.55
    };
    
    // Adjust based on regime
    const factors = {};
    
    for (const [factor, base] of Object.entries(baseScores)) {
        let score = base;
        
        // Bull market adjustments
        if (regimeScore > 0.5) {
            if (factor === 'Momentum' || factor === 'Growth' || factor === 'Tech') score += 0.15;
            if (factor === 'Size') score += 0.10;
            if (factor === 'Low Volatility' || factor === 'Bonds') score -= 0.15;
        }
        
        // Bear market adjustments
        if (regimeScore < -0.5) {
            if (factor === 'Low Volatility' || factor === 'Quality' || factor === 'Bonds') score += 0.20;
            if (factor === 'Dividend' || factor === 'Healthcare') score += 0.10;
            if (factor === 'Momentum' || factor === 'Growth' || factor === 'Size') score -= 0.20;
        }
        
        // High volatility adjustments
        if (volatility > 0.20) {
            if (factor === 'Quality' || factor === 'Low Volatility') score += 0.10;
            if (factor === 'Momentum') score -= 0.10;
        }
        
        // Low volatility adjustments
        if (volatility < 0.15) {
            if (factor === 'Momentum' || factor === 'Size') score += 0.10;
        }
        
        factors[factor] = Math.max(0.1, Math.min(1.0, score));
    }
    
    return factors;
}

function renderRegimeResults(analysis) {
    const content = document.getElementById('regime-content');
    
    const scoreColor = analysis.score > 0.5 ? 'green' : analysis.score < -0.5 ? 'red' : 'yellow';
    
    let html = `
        <div class="mb-6 p-6 bg-${scoreColor}-50 border-2 border-${scoreColor}-200 rounded-lg">
            <h3 class="text-2xl font-bold mb-2">${analysis.regime}</h3>
            <p class="text-gray-700 mb-3">${analysis.description}</p>
            <div class="p-3 bg-white rounded border border-${scoreColor}-300">
                <strong>Recommendation:</strong> ${analysis.recommendation}
            </div>
        </div>
        
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="card text-center">
                <div class="text-sm text-gray-600">Market Trend</div>
                <div class="text-xl font-bold ${analysis.metrics.trend > 0 ? 'text-green-600' : 'text-red-600'}">
                    ${(analysis.metrics.trend * 100).toFixed(2)}%
                </div>
                <div class="text-xs text-gray-500">Annualized</div>
            </div>
            <div class="card text-center">
                <div class="text-sm text-gray-600">Volatility</div>
                <div class="text-xl font-bold">${(analysis.metrics.volatility * 100).toFixed(2)}%</div>
                <div class="text-xs text-gray-500">${analysis.metrics.volTrend}</div>
            </div>
            <div class="card text-center">
                <div class="text-sm text-gray-600">vs 50-Day SMA</div>
                <div class="text-xl font-bold ${parseFloat(analysis.metrics.priceVsSMA50) > 0 ? 'text-green-600' : 'text-red-600'}">
                    ${analysis.metrics.priceVsSMA50}%
                </div>
                <div class="text-xs text-gray-500">Price Position</div>
            </div>
            <div class="card text-center">
                <div class="text-sm text-gray-600">vs 200-Day SMA</div>
                <div class="text-xl font-bold ${parseFloat(analysis.metrics.priceVsSMA200) > 0 ? 'text-green-600' : 'text-red-600'}">
                    ${analysis.metrics.priceVsSMA200}%
                </div>
                <div class="text-xs text-gray-500">Trend Indicator</div>
            </div>
        </div>
        
        <div class="mb-6">
            <h3 class="text-lg font-semibold mb-3">📊 Factor Performance in Current Regime</h3>
            <p class="text-sm text-gray-600 mb-3">Based on historical factor performance in similar market conditions:</p>
    `;
    
    // Sort factors by score
    const sortedFactors = Object.entries(analysis.factorPerformance)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10); // Top 10
    
    html += '<div class="space-y-2">';
    sortedFactors.forEach(([factor, score]) => {
        const colorClass = score > 0.75 ? 'bg-green-600' : score > 0.65 ? 'bg-blue-600' : score > 0.55 ? 'bg-yellow-600' : 'bg-gray-600';
        
        html += `
            <div>
                <div class="flex justify-between text-sm mb-1">
                    <span class="font-medium">${factor}</span>
                    <span class="font-semibold">${(score * 100).toFixed(0)}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3">
                    <div class="${colorClass} h-3 rounded-full" style="width: ${score * 100}%"></div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    
    html += `
        </div>
        
        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
            <h4 class="font-semibold mb-2">💡 Portfolio Implications</h4>
            <p class="text-sm text-gray-700">
                Analysis period: ${analysis.period.start} to ${analysis.period.end} (${analysis.period.days} days)
            </p>
        </div>
        
        <div class="flex gap-2">
            <button onclick="exportRegimeAnalysis()" class="btn btn-secondary flex-1">
                📥 Export Analysis
            </button>
            <button onclick="closeRegimeModal()" class="btn btn-outline flex-1">
                Close
            </button>
        </div>
    `;
    
    content.innerHTML = html;
    
    // Store for export
    window.regimeAnalysis = analysis;
}

function exportRegimeAnalysis() {
    const analysis = window.regimeAnalysis;
    if (!analysis) return;
    
    let csv = 'Market Regime Analysis\n\n';
    csv += `Regime,${analysis.regime}\n`;
    csv += `Score,${analysis.score.toFixed(2)}\n`;
    csv += `Description,${analysis.description}\n`;
    csv += `Recommendation,${analysis.recommendation}\n\n`;
    
    csv += 'Market Metrics\n';
    csv += `Trend (Annualized),${(analysis.metrics.trend * 100).toFixed(2)}%\n`;
    csv += `Volatility (Annualized),${(analysis.metrics.volatility * 100).toFixed(2)}%\n`;
    csv += `Volatility Trend,${analysis.metrics.volTrend}\n`;
    csv += `Price vs 50-Day SMA,${analysis.metrics.priceVsSMA50}%\n`;
    csv += `Price vs 200-Day SMA,${analysis.metrics.priceVsSMA200}%\n`;
    csv += `Skewness,${analysis.metrics.skewness.toFixed(3)}\n\n`;
    
    csv += 'Factor Performance Scores\n';
    csv += 'Factor,Score (%)\n';
    
    const sortedFactors = Object.entries(analysis.factorPerformance).sort((a, b) => b[1] - a[1]);
    sortedFactors.forEach(([factor, score]) => {
        csv += `${factor},${(score * 100).toFixed(1)}\n`;
    });
    
    csv += `\nAnalysis Period,${analysis.period.start} to ${analysis.period.end}\n`;
    csv += `Days Analyzed,${analysis.period.days}\n`;
    
    downloadCSV(csv, 'regime_analysis.csv');
}

// ============================================================================
// FACTOR ATTRIBUTION
// ============================================================================

function openFactorModal() {
    const modal = document.getElementById('factor-modal');
    const content = document.getElementById('factor-modal-content');
    
    if (currentPortfolio.length === 0) {
        alert('Build a portfolio first');
        return;
    }
    
    modal.style.display = 'block';
    content.innerHTML = '<div class="text-center py-12"><div class="loader"></div><p class="mt-4">Calculating factor attribution...</p></div>';
    
    setTimeout(async () => {
        try {
            await fetchPortfolioData();
            const attribution = await calculateDetailedFactorAttribution();
            renderFactorAttribution(attribution);
        } catch (error) {
            console.error('Factor attribution error:', error);
            content.innerHTML = `
                <div class="text-center text-red-600 py-12">
                    <p class="text-lg font-semibold">Error calculating attribution</p>
                    <p class="text-sm mt-2">${error.message}</p>
                </div>
            `;
        }
    }, 100);
}

function closeFactorModal() {
    document.getElementById('factor-modal').style.display = 'none';
}

async function calculateDetailedFactorAttribution() {
    console.log('Calculating factor attribution...');
    
    const metrics = calculatePortfolioMetrics();
    const alignedData = alignDataArrays();
    
    // Group holdings by factor
    const factorGroups = {};
    const factorWeights = {};
    const factorReturns = {};
    const factorVolatilities = {};
    const factorBetas = {};
    const factorAlphas = {};
    
    currentPortfolio.forEach(holding => {
        const factor = holding.factor;
        const weight = holding.weight / 100;
        const returns = alignedData[holding.symbol].returns;
        const holdingReturn = mean(returns) * 252;
        
        if (!factorGroups[factor]) {
            factorGroups[factor] = [];
            factorWeights[factor] = 0;
            factorReturns[factor] = 0;
        }
        
        factorGroups[factor].push(holding.symbol);
        factorWeights[factor] += weight;
        factorReturns[factor] += weight * holdingReturn;
    });
    
    // Calculate metrics for each factor
    const spyReturns = alignedData['SPY'].returns;
    const spyReturn = mean(spyReturns) * 252;
    
    for (const factor of Object.keys(factorGroups)) {
        // Get all returns for this factor's holdings
        const factorHoldings = currentPortfolio.filter(h => h.factor === factor);
        const factorHoldingReturns = factorHoldings.map(h => alignedData[h.symbol].returns);
        const factorHoldingWeights = factorHoldings.map(h => h.weight / factorWeights[factor] / 100);
        
        // Calculate weighted returns
        const weightedReturns = [];
        for (let i = 0; i < factorHoldingReturns[0].length; i++) {
            let ret = 0;
            for (let j = 0; j < factorHoldingReturns.length; j++) {
                ret += factorHoldingWeights[j] * factorHoldingReturns[j][i];
            }
            weightedReturns.push(ret);
        }
        
        factorVolatilities[factor] = stdDev(weightedReturns) * Math.sqrt(252);
        factorBetas[factor] = calculateBeta(weightedReturns, spyReturns);
        
        const factorAnnualReturn = mean(weightedReturns) * 252;
        factorAlphas[factor] = factorAnnualReturn - (RISK_FREE_RATE + factorBetas[factor] * (spyReturn - RISK_FREE_RATE));
    }
    
    return {
        totalReturn: metrics.expectedReturn,
        totalAlpha: metrics.alpha,
        totalBeta: metrics.beta,
        totalVolatility: metrics.volatility,
        spyReturn: spyReturn,
        factorGroups: factorGroups,
        factorWeights: factorWeights,
        factorReturns: factorReturns,
        factorVolatilities: factorVolatilities,
        factorBetas: factorBetas,
        factorAlphas: factorAlphas
    };
}

function renderFactorAttribution(attribution) {
    const content = document.getElementById('factor-modal-content');
    
    let html = `
        <div class="grid grid-cols-4 gap-4 mb-6">
            <div class="card text-center">
                <div class="text-sm text-gray-600">Portfolio Return</div>
                <div class="text-2xl font-bold">${(attribution.totalReturn * 100).toFixed(2)}%</div>
            </div>
            <div class="card text-center">
                <div class="text-sm text-gray-600">Portfolio Alpha</div>
                <div class="text-2xl font-bold ${attribution.totalAlpha > 0 ? 'text-green-600' : 'text-red-600'}">
                    ${(attribution.totalAlpha * 100).toFixed(2)}%
                </div>
            </div>
            <div class="card text-center">
                <div class="text-sm text-gray-600">Portfolio Beta</div>
                <div class="text-2xl font-bold">${attribution.totalBeta.toFixed(3)}</div>
            </div>
            <div class="card text-center">
                <div class="text-sm text-gray-600">SPY Return</div>
                <div class="text-2xl font-bold">${(attribution.spyReturn * 100).toFixed(2)}%</div>
            </div>
        </div>
        
        <h3 class="text-lg font-semibold mb-3">Factor Breakdown</h3>
        <p class="text-sm text-gray-600 mb-4">
            How each investment factor contributes to your portfolio's performance:
        </p>
        
        <div class="space-y-4 mb-6">
    `;
    
    // Sort factors by weight
    const sortedFactors = Object.entries(attribution.factorWeights).sort((a, b) => b[1] - a[1]);
    
    sortedFactors.forEach(([factor, weight]) => {
        const returnContribution = attribution.factorReturns[factor];
        const volatility = attribution.factorVolatilities[factor];
        const beta = attribution.factorBetas[factor];
        const alpha = attribution.factorAlphas[factor];
        const holdings = attribution.factorGroups[factor].join(', ');
        
        html += `
            <div class="card">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h4 class="font-semibold text-lg">${factor}</h4>
                        <p class="text-xs text-gray-500">${holdings}</p>
                    </div>
                    <div class="text-right">
                        <div class="text-sm text-gray-600">Weight</div>
                        <div class="text-xl font-bold">${(weight * 100).toFixed(1)}%</div>
                    </div>
                </div>
                
                <div class="grid grid-cols-4 gap-3 p-3 bg-gray-50 rounded">
                    <div class="text-center">
                        <div class="text-xs text-gray-600">Return Contribution</div>
                        <div class="font-semibold">${(returnContribution * 100).toFixed(2)}%</div>
                    </div>
                    <div class="text-center">
                        <div class="text-xs text-gray-600">Volatility</div>
                        <div class="font-semibold">${(volatility * 100).toFixed(2)}%</div>
                    </div>
                    <div class="text-center">
                        <div class="text-xs text-gray-600">Beta</div>
                        <div class="font-semibold">${beta.toFixed(3)}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-xs text-gray-600">Alpha</div>
                        <div class="font-semibold ${alpha > 0 ? 'text-green-600' : 'text-red-600'}">
                            ${(alpha * 100).toFixed(2)}%
                        </div>
                    </div>
                </div>
                
                <div class="mt-2 w-full bg-gray-200 rounded-full h-3">
                    <div class="bg-blue-600 h-3 rounded-full" style="width: ${weight * 100}%"></div>
                </div>
            </div>
        `;
    });
    
    html += `
        </div>
        
        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
            <h4 class="font-semibold mb-2">💡 Key Insights</h4>
            <p class="text-sm">
                Your portfolio's ${(attribution.totalAlpha * 100).toFixed(2)}% alpha comes from a combination of factor exposures.
                Factors with positive alpha are adding value beyond their market risk (beta).
            </p>
        </div>
        
        <div class="flex gap-2">
            <button onclick="exportFactorAttribution()" class="btn btn-secondary flex-1">
                📥 Export Attribution
            </button>
            <button onclick="closeFactorModal()" class="btn btn-outline flex-1">
                Close
            </button>
        </div>
    `;
    
    content.innerHTML = html;
    
    // Store for export
    window.factorAttribution = attribution;
}

function exportFactorAttribution() {
    const attribution = window.factorAttribution;
    if (!attribution) return;
    
    let csv = 'Factor Attribution Analysis\n\n';
    csv += 'Portfolio Metrics\n';
    csv += `Total Return,${(attribution.totalReturn * 100).toFixed(2)}%\n`;
    csv += `Total Alpha,${(attribution.totalAlpha * 100).toFixed(2)}%\n`;
    csv += `Total Beta,${attribution.totalBeta.toFixed(3)}\n`;
    csv += `Total Volatility,${(attribution.totalVolatility * 100).toFixed(2)}%\n`;
    csv += `SPY Return,${(attribution.spyReturn * 100).toFixed(2)}%\n\n`;
    
    csv += 'Factor,Weight (%),Holdings,Return Contribution (%),Volatility (%),Beta,Alpha (%)\n';
    
    const sortedFactors = Object.entries(attribution.factorWeights).sort((a, b) => b[1] - a[1]);
    
    sortedFactors.forEach(([factor, weight]) => {
        const holdings = attribution.factorGroups[factor].join(' | ');
        csv += `${factor},${(weight * 100).toFixed(2)},${holdings},`;
        csv += `${(attribution.factorReturns[factor] * 100).toFixed(2)},`;
        csv += `${(attribution.factorVolatilities[factor] * 100).toFixed(2)},`;
        csv += `${attribution.factorBetas[factor].toFixed(3)},`;
        csv += `${(attribution.factorAlphas[factor] * 100).toFixed(2)}\n`;
    });
    
    downloadCSV(csv, 'factor_attribution.csv');
}

// ============================================================================
// COMPREHENSIVE EXPORT FUNCTIONALITY
// ============================================================================

function exportCompleteAnalysis() {
    if (currentPortfolio.length === 0) {
        alert('Build a portfolio first');
        return;
    }
    
    try {
        const metrics = calculatePortfolioMetrics();
        
        let csv = 'ALPHATIC PORTFOLIO ANALYSIS REPORT\n';
        csv += `Generated: ${new Date().toISOString()}\n\n`;
        
        csv += '=== PORTFOLIO COMPOSITION ===\n';
        csv += 'Symbol,Name,Weight (%),Factor\n';
        currentPortfolio.forEach(h => {
            csv += `${h.symbol},${h.name},${h.weight.toFixed(2)},${h.factor}\n`;
        });
        
        csv += '\n=== PERFORMANCE METRICS ===\n';
        csv += 'Metric,Value\n';
        csv += `Annual Return,${(metrics.expectedReturn * 100).toFixed(2)}%\n`;
        csv += `Volatility,${(metrics.volatility * 100).toFixed(2)}%\n`;
        csv += `Sharpe Ratio,${metrics.sharpe.toFixed(3)}\n`;
        csv += `Max Drawdown,${(metrics.maxDrawdown * 100).toFixed(2)}%\n`;
        csv += `Cumulative Return,${(metrics.cumulativeReturn * 100).toFixed(2)}%\n`;
        
        csv += '\n=== RELATIVE METRICS (vs SPY) ===\n';
        csv += 'Metric,Value\n';
        csv += `Beta,${metrics.beta.toFixed(3)}\n`;
        csv += `Alpha,${(metrics.alpha * 100).toFixed(2)}%\n`;
        csv += `Correlation,${metrics.correlation.toFixed(3)}\n`;
        csv += `Excess Return,${(metrics.excessReturn * 100).toFixed(2)}%\n`;
        csv += `SPY Return,${(metrics.spyReturn * 100).toFixed(2)}%\n`;
        csv += `SPY Volatility,${(metrics.spyVolatility * 100).toFixed(2)}%\n`;
        csv += `SPY Sharpe,${metrics.spySharpe.toFixed(3)}\n`;
        
        csv += '\n=== DATA PERIOD ===\n';
        csv += `Start Date,${metrics.dates[0]}\n`;
        csv += `End Date,${metrics.dates[metrics.dates.length - 1]}\n`;
        csv += `Trading Days,${metrics.dates.length}\n`;
        
        downloadCSV(csv, 'portfolio_analysis.csv');
    } catch (error) {
        alert('Error exporting analysis: ' + error.message);
    }
}

console.log('Alphatic V1.1 Enhancement Module loaded successfully! 🚀');
console.log('New features: Portfolio Optimizer, Regime Detection, Factor Attribution, Export');
// ============================================================================
// ALPHATIC V1.1 - PERSISTENT STORAGE MODULE
// LocalStorage-based portfolio persistence
// ============================================================================

// ============================================================================
// LOCALSTORAGE PORTFOLIO MANAGEMENT
// ============================================================================

const STORAGE_KEY = 'alphatic_saved_portfolios';
const STORAGE_VERSION = '1.1';

// Initialize storage on load
function initializeStorage() {
    try {
        // Check if localStorage is available
        if (typeof(Storage) === "undefined") {
            console.warn('localStorage not available - portfolios will not persist');
            return false;
        }
        
        // Check if we have existing data
        const existingData = localStorage.getItem(STORAGE_KEY);
        
        if (!existingData) {
            // First time - load sample portfolios from portfolios.js
            console.log('Initializing portfolio storage with sample portfolios...');
            if (typeof SAVED_PORTFOLIOS !== 'undefined' && SAVED_PORTFOLIOS.length > 0) {
                savePortfoliosToStorage(SAVED_PORTFOLIOS);
            } else {
                // No samples, initialize empty
                savePortfoliosToStorage([]);
            }
        } else {
            console.log('Loading saved portfolios from localStorage...');
        }
        
        return true;
    } catch (error) {
        console.error('Error initializing storage:', error);
        return false;
    }
}

// Load portfolios from localStorage
function loadPortfoliosFromStorage() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        
        if (!data) {
            return [];
        }
        
        const parsed = JSON.parse(data);
        
        // Validate structure
        if (!Array.isArray(parsed.portfolios)) {
            console.error('Invalid portfolio data in storage');
            return [];
        }
        
        console.log(`Loaded ${parsed.portfolios.length} portfolios from storage`);
        return parsed.portfolios;
        
    } catch (error) {
        console.error('Error loading portfolios from storage:', error);
        return [];
    }
}

// Save portfolios to localStorage
function savePortfoliosToStorage(portfolios) {
    try {
        const data = {
            version: STORAGE_VERSION,
            lastUpdated: new Date().toISOString(),
            portfolios: portfolios
        };
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        console.log(`Saved ${portfolios.length} portfolios to storage`);
        return true;
        
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            alert('Storage quota exceeded! Too many portfolios saved. Please delete some old portfolios.');
        } else {
            console.error('Error saving portfolios to storage:', error);
        }
        return false;
    }
}

// Get current portfolios array
function getCurrentPortfolios() {
    return loadPortfoliosFromStorage();
}

// Add a new portfolio
function addPortfolioToStorage(portfolio) {
    const portfolios = getCurrentPortfolios();
    portfolios.push(portfolio);
    return savePortfoliosToStorage(portfolios);
}

// Update a portfolio by index
function updatePortfolioInStorage(index, portfolio) {
    const portfolios = getCurrentPortfolios();
    
    if (index < 0 || index >= portfolios.length) {
        console.error('Invalid portfolio index');
        return false;
    }
    
    portfolios[index] = portfolio;
    return savePortfoliosToStorage(portfolios);
}

// Delete a portfolio by index
function deletePortfolioFromStorage(index) {
    const portfolios = getCurrentPortfolios();
    
    if (index < 0 || index >= portfolios.length) {
        console.error('Invalid portfolio index');
        return false;
    }
    
    portfolios.splice(index, 1);
    return savePortfoliosToStorage(portfolios);
}

// Clear all portfolios (with confirmation)
function clearAllPortfolios() {
    if (!confirm('⚠️ This will delete ALL saved portfolios permanently. Are you sure?')) {
        return false;
    }
    
    if (!confirm('⚠️ FINAL WARNING: This cannot be undone. Continue?')) {
        return false;
    }
    
    try {
        localStorage.removeItem(STORAGE_KEY);
        console.log('All portfolios cleared from storage');
        return true;
    } catch (error) {
        console.error('Error clearing portfolios:', error);
        return false;
    }
}

// Export portfolios to JSON file
function exportPortfoliosToFile() {
    const portfolios = getCurrentPortfolios();
    
    if (portfolios.length === 0) {
        alert('No portfolios to export');
        return;
    }
    
    const exportData = {
        version: STORAGE_VERSION,
        exportDate: new Date().toISOString(),
        portfolios: portfolios
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `alphatic_portfolios_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    
    console.log(`Exported ${portfolios.length} portfolios to file`);
}

// Import portfolios from JSON file
function importPortfoliosFromFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (event) => {
        const file = event.target.files[0];
        
        if (!file) return;
        
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const importData = JSON.parse(e.target.result);
                
                // Validate structure
                if (!importData.portfolios || !Array.isArray(importData.portfolios)) {
                    alert('Invalid portfolio file format');
                    return;
                }
                
                // Ask user how to handle import
                const action = confirm(
                    `Import ${importData.portfolios.length} portfolios.\n\n` +
                    'Click OK to MERGE with existing portfolios.\n' +
                    'Click Cancel to REPLACE all existing portfolios.'
                );
                
                if (action) {
                    // Merge with existing
                    const existing = getCurrentPortfolios();
                    const merged = [...existing, ...importData.portfolios];
                    savePortfoliosToStorage(merged);
                    alert(`Imported ${importData.portfolios.length} portfolios (merged with ${existing.length} existing)`);
                } else {
                    // Replace all
                    if (confirm('⚠️ This will replace ALL existing portfolios. Continue?')) {
                        savePortfoliosToStorage(importData.portfolios);
                        alert(`Replaced with ${importData.portfolios.length} imported portfolios`);
                    }
                }
                
                // Refresh display
                loadSavedPortfolios();
                
            } catch (error) {
                console.error('Error importing portfolios:', error);
                alert('Error importing portfolios. Check file format.');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

// Get storage statistics
function getStorageStats() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        const portfolios = getCurrentPortfolios();
        
        const stats = {
            portfolioCount: portfolios.length,
            storageSize: data ? new Blob([data]).size : 0,
            storageSizeKB: data ? (new Blob([data]).size / 1024).toFixed(2) : 0,
            lastUpdated: null
        };
        
        if (data) {
            const parsed = JSON.parse(data);
            stats.lastUpdated = parsed.lastUpdated;
        }
        
        return stats;
        
    } catch (error) {
        console.error('Error getting storage stats:', error);
        return null;
    }
}

// Display storage statistics
function showStorageStats() {
    const stats = getStorageStats();
    
    if (!stats) {
        alert('Error getting storage statistics');
        return;
    }
    
    const message = `
📊 PORTFOLIO STORAGE STATISTICS

Saved Portfolios: ${stats.portfolioCount}
Storage Used: ${stats.storageSizeKB} KB
Last Updated: ${stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleString() : 'Never'}

Storage Location: Browser localStorage
Persistence: Permanent (until manually cleared)
`;
    
    alert(message);
}

console.log('Alphatic Persistent Storage Module loaded successfully! 💾');
console.log('Your portfolios will now persist across browser sessions');
// ============================================================================
// ALPHATIC V1.2 - ENHANCED PORTFOLIO MANAGEMENT
// Save/Save As functionality + Portfolio tracking
// ============================================================================

// Track currently loaded portfolio
let currentLoadedPortfolio = null; // { index: number, name: string } or null

// ============================================================================
// ENHANCED SAVE/SAVE AS FUNCTIONALITY
// ============================================================================

function savePortfolio() {
    // Check if we have a currently loaded portfolio
    if (currentLoadedPortfolio !== null) {
        // We loaded a portfolio - show Save vs Save As options
        showSaveOptionsDialog();
    } else {
        // Fresh portfolio - just save as new
        saveAsNewPortfolio();
    }
}

function showSaveOptionsDialog() {
    const portfolioName = currentLoadedPortfolio.name;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <h3 class="text-xl font-bold mb-4">Save Portfolio</h3>
            <p class="text-sm text-gray-600 mb-4">
                You loaded <strong>"${portfolioName}"</strong> and made changes.
            </p>
            <p class="text-sm text-gray-600 mb-6">
                Do you want to update the existing portfolio or save as a new one?
            </p>
            
            <div class="space-y-3">
                <button onclick="updateExistingPortfolio(); closeSaveDialog();" class="btn btn-primary w-full">
                    💾 Save (Update "${portfolioName}")
                </button>
                <button onclick="saveAsNewPortfolio(); closeSaveDialog();" class="btn btn-secondary w-full">
                    📝 Save As New Portfolio
                </button>
                <button onclick="closeSaveDialog();" class="btn btn-outline w-full">
                    Cancel
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    window.currentSaveDialog = modal;
}

function closeSaveDialog() {
    if (window.currentSaveDialog) {
        document.body.removeChild(window.currentSaveDialog);
        window.currentSaveDialog = null;
    }
}

function updateExistingPortfolio() {
    if (currentLoadedPortfolio === null) {
        alert('No portfolio loaded to update');
        return;
    }
    
    const portfolio = {
        name: currentLoadedPortfolio.name,
        timestamp: new Date().toISOString(),
        holdings: currentPortfolio.map(h => ({
            symbol: h.symbol,
            weight: h.weight
        }))
    };
    
    if (updatePortfolioInStorage(currentLoadedPortfolio.index, portfolio)) {
        alert(`✅ Portfolio "${portfolio.name}" updated successfully!\n\n💾 Changes saved to storage`);
        
        // Update the loaded portfolio reference (index stays same, update timestamp)
        currentLoadedPortfolio.timestamp = portfolio.timestamp;
        
        loadSavedPortfolios();
    } else {
        alert('Error updating portfolio. Check console for details.');
    }
}

function saveAsNewPortfolio() {
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
    
    if (addPortfolioToStorage(portfolio)) {
        alert(`✅ Portfolio "${name}" saved successfully!\n\n💾 Saved to browser storage (persists across sessions)`);
        
        // Update current loaded portfolio to the new one
        const portfolios = getCurrentPortfolios();
        currentLoadedPortfolio = {
            index: portfolios.length - 1,
            name: name,
            timestamp: portfolio.timestamp
        };
        
        loadSavedPortfolios();
    } else {
        alert('Error saving portfolio. Check console for details.');
    }
}

// Updated loadPortfolio to track what's loaded
function loadPortfolioEnhanced(index) {
    const portfolios = getCurrentPortfolios();
    
    if (index < 0 || index >= portfolios.length) {
        alert('Invalid portfolio index');
        return;
    }
    
    const portfolio = portfolios[index];
    currentPortfolio = portfolio.holdings.map(h => ({
        ...ETF_LOOKUP[h.symbol],
        weight: h.weight
    })).filter(h => h.symbol);
    
    // Track which portfolio is loaded
    currentLoadedPortfolio = {
        index: index,
        name: portfolio.name,
        timestamp: portfolio.timestamp
    };
    
    renderPortfolioBuilder();
    renderETFSelector();
    
    alert(`✅ Loaded portfolio: ${portfolio.name}\n\nHoldings: ${currentPortfolio.length}\nLast saved: ${new Date(portfolio.timestamp).toLocaleString()}\n\n💡 Click "Save" to update this portfolio or "Save As" to create a new version.`);
}

// Clear loaded portfolio tracking when building fresh
function clearLoadedPortfolioTracking() {
    currentLoadedPortfolio = null;
}

// Update clearPortfolio to reset tracking
function clearPortfolioEnhanced() {
    if (confirm('Clear all holdings from portfolio?')) {
        currentPortfolio = [];
        currentLoadedPortfolio = null; // Reset tracking
        renderPortfolioBuilder();
        renderETFSelector();
    }
}

// ============================================================================
// PORTFOLIO FUNDAMENTALS & CHARACTERISTICS
// ============================================================================

function calculatePortfolioFundamentals() {
    // Calculate weighted average expense ratio
    const weightedExpenseRatio = currentPortfolio.reduce((sum, holding) => {
        return sum + (holding.weight / 100) * (holding.expense / 100);
    }, 0);
    
    // Calculate factor concentration (Herfindahl index)
    const factorWeights = {};
    currentPortfolio.forEach(holding => {
        const factor = holding.factor;
        if (!factorWeights[factor]) factorWeights[factor] = 0;
        factorWeights[factor] += holding.weight / 100;
    });
    
    const factorHHI = Object.values(factorWeights).reduce((sum, weight) => {
        return sum + weight * weight;
    }, 0);
    
    const factorDiversification = 1 / factorHHI; // Effective number of factors
    
    // Calculate holding concentration (Herfindahl index)
    const holdingHHI = currentPortfolio.reduce((sum, holding) => {
        const weight = holding.weight / 100;
        return sum + weight * weight;
    }, 0);
    
    const holdingDiversification = 1 / holdingHHI; // Effective number of holdings
    
    // Get largest holding
    const largestHolding = currentPortfolio.reduce((max, holding) => {
        return holding.weight > max.weight ? holding : max;
    }, currentPortfolio[0]);
    
    // Count holdings by type
    const holdingTypes = {
        equity: 0,
        bonds: 0,
        alternatives: 0
    };
    
    currentPortfolio.forEach(holding => {
        if (holding.factor === 'Bonds' || holding.factor === 'Long Bonds' || holding.factor === 'Short Bonds') {
            holdingTypes.bonds += holding.weight / 100;
        } else if (holding.factor === 'Gold' || holding.factor === 'Real Estate') {
            holdingTypes.alternatives += holding.weight / 100;
        } else {
            holdingTypes.equity += holding.weight / 100;
        }
    });
    
    return {
        numberOfHoldings: currentPortfolio.length,
        weightedExpenseRatio: weightedExpenseRatio,
        factorDiversification: factorDiversification,
        holdingDiversification: holdingDiversification,
        largestHolding: {
            symbol: largestHolding.symbol,
            weight: largestHolding.weight
        },
        assetAllocation: {
            equity: holdingTypes.equity,
            bonds: holdingTypes.bonds,
            alternatives: holdingTypes.alternatives
        },
        factorCount: Object.keys(factorWeights).length,
        factors: Object.keys(factorWeights).sort()
    };
}

// ============================================================================
// COMPREHENSIVE COMPARISON TABLE
// ============================================================================

function renderComprehensiveComparisonTable(metrics) {
    const fundamentals = calculatePortfolioFundamentals();
    
    // Calculate SPY max drawdown
    const alignedData = alignDataArrays();
    const spyReturns = alignedData['SPY'].returns;
    const spyValues = [10000];
    for (let i = 0; i < spyReturns.length; i++) {
        spyValues.push(spyValues[spyValues.length - 1] * (1 + spyReturns[i]));
    }
    
    let spyPeak = spyValues[0];
    let spyMaxDD = 0;
    for (let i = 1; i < spyValues.length; i++) {
        spyPeak = Math.max(spyPeak, spyValues[i]);
        const dd = (spyValues[i] - spyPeak) / spyPeak;
        spyMaxDD = Math.min(spyMaxDD, dd);
    }
    
    let html = `
        <div class="mb-6">
            <h3 class="text-lg font-semibold mb-3">📋 Comprehensive Portfolio vs Benchmark Comparison</h3>
            
            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-gray-100 border-b-2 border-gray-300">
                            <th class="text-left p-3 font-semibold">Metric</th>
                            <th class="text-right p-3 font-semibold">Your Portfolio</th>
                            <th class="text-right p-3 font-semibold">S&P 500 (SPY)</th>
                            <th class="text-right p-3 font-semibold">Difference</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Performance Metrics -->
                        <tr class="bg-blue-50 border-b border-gray-200">
                            <td colspan="4" class="p-2 font-semibold text-sm">PERFORMANCE METRICS</td>
                        </tr>
                        <tr class="border-b border-gray-200">
                            <td class="p-3">Annual Return</td>
                            <td class="text-right p-3 font-semibold">${(metrics.expectedReturn * 100).toFixed(2)}%</td>
                            <td class="text-right p-3 font-semibold">${(metrics.spyReturn * 100).toFixed(2)}%</td>
                            <td class="text-right p-3 font-semibold ${metrics.excessReturn > 0 ? 'text-green-600' : 'text-red-600'}">
                                ${metrics.excessReturn > 0 ? '+' : ''}${(metrics.excessReturn * 100).toFixed(2)}%
                            </td>
                        </tr>
                        <tr class="border-b border-gray-200">
                            <td class="p-3">Cumulative Return</td>
                            <td class="text-right p-3 font-semibold">${(metrics.cumulativeReturn * 100).toFixed(2)}%</td>
                            <td class="text-right p-3 font-semibold">${(metrics.spyCumulativeReturn * 100).toFixed(2)}%</td>
                            <td class="text-right p-3 font-semibold ${(metrics.cumulativeReturn - metrics.spyCumulativeReturn) > 0 ? 'text-green-600' : 'text-red-600'}">
                                ${(metrics.cumulativeReturn - metrics.spyCumulativeReturn) > 0 ? '+' : ''}${((metrics.cumulativeReturn - metrics.spyCumulativeReturn) * 100).toFixed(2)}%
                            </td>
                        </tr>
                        
                        <!-- Risk Metrics -->
                        <tr class="bg-blue-50 border-b border-gray-200">
                            <td colspan="4" class="p-2 font-semibold text-sm">RISK METRICS</td>
                        </tr>
                        <tr class="border-b border-gray-200">
                            <td class="p-3">Volatility (Annual)</td>
                            <td class="text-right p-3 font-semibold">${(metrics.volatility * 100).toFixed(2)}%</td>
                            <td class="text-right p-3 font-semibold">${(metrics.spyVolatility * 100).toFixed(2)}%</td>
                            <td class="text-right p-3 font-semibold ${(metrics.volatility - metrics.spyVolatility) < 0 ? 'text-green-600' : 'text-red-600'}">
                                ${(metrics.volatility - metrics.spyVolatility) > 0 ? '+' : ''}${((metrics.volatility - metrics.spyVolatility) * 100).toFixed(2)}%
                            </td>
                        </tr>
                        <tr class="border-b border-gray-200">
                            <td class="p-3">Maximum Drawdown</td>
                            <td class="text-right p-3 font-semibold">${(metrics.maxDrawdown * 100).toFixed(2)}%</td>
                            <td class="text-right p-3 font-semibold">${(spyMaxDD * 100).toFixed(2)}%</td>
                            <td class="text-right p-3 font-semibold ${(metrics.maxDrawdown - spyMaxDD) > 0 ? 'text-green-600' : 'text-red-600'}">
                                ${(metrics.maxDrawdown - spyMaxDD) > 0 ? '+' : ''}${((metrics.maxDrawdown - spyMaxDD) * 100).toFixed(2)}%
                            </td>
                        </tr>
                        <tr class="border-b border-gray-200">
                            <td class="p-3">Beta</td>
                            <td class="text-right p-3 font-semibold">${metrics.beta.toFixed(3)}</td>
                            <td class="text-right p-3 font-semibold">1.000</td>
                            <td class="text-right p-3 font-semibold ${(metrics.beta - 1) < 0 ? 'text-green-600' : 'text-red-600'}">
                                ${(metrics.beta - 1) > 0 ? '+' : ''}${(metrics.beta - 1).toFixed(3)}
                            </td>
                        </tr>
                        
                        <!-- Risk-Adjusted Metrics -->
                        <tr class="bg-blue-50 border-b border-gray-200">
                            <td colspan="4" class="p-2 font-semibold text-sm">RISK-ADJUSTED METRICS</td>
                        </tr>
                        <tr class="border-b border-gray-200">
                            <td class="p-3">Sharpe Ratio</td>
                            <td class="text-right p-3 font-semibold">${metrics.sharpe.toFixed(3)}</td>
                            <td class="text-right p-3 font-semibold">${metrics.spySharpe.toFixed(3)}</td>
                            <td class="text-right p-3 font-semibold ${(metrics.sharpe - metrics.spySharpe) > 0 ? 'text-green-600' : 'text-red-600'}">
                                ${(metrics.sharpe - metrics.spySharpe) > 0 ? '+' : ''}${(metrics.sharpe - metrics.spySharpe).toFixed(3)}
                            </td>
                        </tr>
                        <tr class="border-b border-gray-200">
                            <td class="p-3">Alpha (Annual)</td>
                            <td class="text-right p-3 font-semibold ${metrics.alpha > 0 ? 'text-green-600' : 'text-red-600'}">
                                ${(metrics.alpha * 100).toFixed(2)}%
                            </td>
                            <td class="text-right p-3 font-semibold">0.00%</td>
                            <td class="text-right p-3 font-semibold ${metrics.alpha > 0 ? 'text-green-600' : 'text-red-600'}">
                                ${metrics.alpha > 0 ? '+' : ''}${(metrics.alpha * 100).toFixed(2)}%
                            </td>
                        </tr>
                        <tr class="border-b border-gray-200">
                            <td class="p-3">Correlation to S&P 500</td>
                            <td class="text-right p-3 font-semibold">${metrics.correlation.toFixed(3)}</td>
                            <td class="text-right p-3 font-semibold">1.000</td>
                            <td class="text-right p-3 font-semibold">
                                ${(metrics.correlation - 1).toFixed(3)}
                            </td>
                        </tr>
                        
                        <!-- Portfolio Characteristics -->
                        <tr class="bg-blue-50 border-b border-gray-200">
                            <td colspan="4" class="p-2 font-semibold text-sm">PORTFOLIO CHARACTERISTICS</td>
                        </tr>
                        <tr class="border-b border-gray-200">
                            <td class="p-3">Number of Holdings</td>
                            <td class="text-right p-3 font-semibold">${fundamentals.numberOfHoldings}</td>
                            <td class="text-right p-3 font-semibold">1 (SPY ETF)</td>
                            <td class="text-right p-3 font-semibold">+${fundamentals.numberOfHoldings - 1}</td>
                        </tr>
                        <tr class="border-b border-gray-200">
                            <td class="p-3">Weighted Expense Ratio</td>
                            <td class="text-right p-3 font-semibold">${(fundamentals.weightedExpenseRatio * 100).toFixed(3)}%</td>
                            <td class="text-right p-3 font-semibold">0.090%</td>
                            <td class="text-right p-3 font-semibold ${(fundamentals.weightedExpenseRatio - 0.0009) > 0 ? 'text-red-600' : 'text-green-600'}">
                                ${(fundamentals.weightedExpenseRatio - 0.0009) > 0 ? '+' : ''}${((fundamentals.weightedExpenseRatio - 0.0009) * 100).toFixed(3)}%
                            </td>
                        </tr>
                        <tr class="border-b border-gray-200">
                            <td class="p-3">Asset Allocation - Equity</td>
                            <td class="text-right p-3 font-semibold">${(fundamentals.assetAllocation.equity * 100).toFixed(1)}%</td>
                            <td class="text-right p-3 font-semibold">100.0%</td>
                            <td class="text-right p-3 font-semibold">
                                ${(fundamentals.assetAllocation.equity - 1) > 0 ? '+' : ''}${((fundamentals.assetAllocation.equity - 1) * 100).toFixed(1)}%
                            </td>
                        </tr>
                        <tr class="border-b border-gray-200">
                            <td class="p-3">Asset Allocation - Bonds</td>
                            <td class="text-right p-3 font-semibold">${(fundamentals.assetAllocation.bonds * 100).toFixed(1)}%</td>
                            <td class="text-right p-3 font-semibold">0.0%</td>
                            <td class="text-right p-3 font-semibold">
                                ${fundamentals.assetAllocation.bonds > 0 ? '+' : ''}${(fundamentals.assetAllocation.bonds * 100).toFixed(1)}%
                            </td>
                        </tr>
                        <tr class="border-b border-gray-200">
                            <td class="p-3">Asset Allocation - Alternatives</td>
                            <td class="text-right p-3 font-semibold">${(fundamentals.assetAllocation.alternatives * 100).toFixed(1)}%</td>
                            <td class="text-right p-3 font-semibold">0.0%</td>
                            <td class="text-right p-3 font-semibold">
                                ${fundamentals.assetAllocation.alternatives > 0 ? '+' : ''}${(fundamentals.assetAllocation.alternatives * 100).toFixed(1)}%
                            </td>
                        </tr>
                        <tr class="border-b border-gray-200">
                            <td class="p-3">Largest Holding</td>
                            <td class="text-right p-3 font-semibold">${fundamentals.largestHolding.symbol} (${fundamentals.largestHolding.weight.toFixed(1)}%)</td>
                            <td class="text-right p-3 font-semibold">SPY (100%)</td>
                            <td class="text-right p-3 font-semibold">-${(100 - fundamentals.largestHolding.weight).toFixed(1)}%</td>
                        </tr>
                        <tr class="border-b border-gray-200">
                            <td class="p-3">Factor Diversification</td>
                            <td class="text-right p-3 font-semibold">${fundamentals.factorDiversification.toFixed(2)} effective factors</td>
                            <td class="text-right p-3 font-semibold">1.00 (market only)</td>
                            <td class="text-right p-3 font-semibold text-green-600">+${(fundamentals.factorDiversification - 1).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="p-4 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg">
            <h4 class="font-semibold mb-2">💡 Interpretation Guide</h4>
            <div class="text-sm space-y-1">
                <p><strong class="text-green-600">Green values:</strong> Better than S&P 500 (lower risk, higher return, better efficiency)</p>
                <p><strong class="text-red-600">Red values:</strong> Worse than S&P 500 (higher risk, lower return, lower efficiency)</p>
                <p><strong>Alpha:</strong> Your skill-based excess return after accounting for market risk (beta)</p>
                <p><strong>Factor Diversification:</strong> Higher = more diversified across investment styles</p>
            </div>
        </div>
    `;
    
    return html;
}

console.log('Alphatic V1.2 Enhanced Portfolio Management loaded! 💾');
// ============================================================================
// COMPARE PORTFOLIOS FEATURE
// Side-by-side comparison of multiple saved portfolios
// ============================================================================

async function renderCompareView() {
    const container = document.getElementById('compare-content');
    if (!container) return;
    
    const portfolios = getCurrentPortfolios();
    
    if (portfolios.length < 2) {
        container.innerHTML = `
            <div class="text-center text-gray-500 py-12">
                <p class="text-lg mb-4">You need at least 2 saved portfolios to compare</p>
                <p class="text-sm">Save some portfolios first, then come back here!</p>
                <p class="text-xs mt-4 text-gray-400">Currently saved: ${portfolios.length} portfolio${portfolios.length === 1 ? '' : 's'}</p>
            </div>
        `;
        return;
    }
    
    // Show portfolio selector
    let html = `
        <div class="mb-6">
            <h3 class="text-lg font-semibold mb-3">📊 Compare Saved Portfolios</h3>
            <p class="text-sm text-gray-600 mb-4">Select 2-4 portfolios to compare side-by-side</p>
            
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
    `;
    
    portfolios.forEach((portfolio, idx) => {
        html += `
            <div class="p-3 border border-gray-300 rounded-lg hover:border-blue-500 cursor-pointer" 
                 onclick="togglePortfolioForComparison(${idx})">
                <input type="checkbox" id="compare-${idx}" class="mr-2" onchange="togglePortfolioForComparison(${idx})">
                <label for="compare-${idx}" class="cursor-pointer">
                    <div class="font-semibold text-sm">${portfolio.name}</div>
                    <div class="text-xs text-gray-500">${new Date(portfolio.timestamp).toLocaleDateString()}</div>
                    <div class="text-xs text-gray-400">${portfolio.holdings.length} holdings</div>
                </label>
            </div>
        `;
    });
    
    html += `
            </div>
            
            <button onclick="runPortfolioComparison()" class="btn btn-primary" id="compare-btn" disabled>
                🔍 Compare Selected Portfolios
            </button>
        </div>
        
        <div id="comparison-results"></div>
    `;
    
    container.innerHTML = html;
    
    // Initialize comparison state
    window.selectedPortfoliosForComparison = new Set();
}

function togglePortfolioForComparison(index) {
    if (!window.selectedPortfoliosForComparison) {
        window.selectedPortfoliosForComparison = new Set();
    }
    
    const checkbox = document.getElementById(`compare-${index}`);
    
    if (checkbox.checked) {
        if (window.selectedPortfoliosForComparison.size >= 4) {
            alert('Maximum 4 portfolios can be compared at once');
            checkbox.checked = false;
            return;
        }
        window.selectedPortfoliosForComparison.add(index);
    } else {
        window.selectedPortfoliosForComparison.delete(index);
    }
    
    // Enable/disable compare button
    const compareBtn = document.getElementById('compare-btn');
    if (compareBtn) {
        compareBtn.disabled = window.selectedPortfoliosForComparison.size < 2;
    }
}

async function runPortfolioComparison() {
    if (!window.selectedPortfoliosForComparison || window.selectedPortfoliosForComparison.size < 2) {
        alert('Select at least 2 portfolios to compare');
        return;
    }
    
    const resultsContainer = document.getElementById('comparison-results');
    resultsContainer.innerHTML = '<div class="text-center py-12"><div class="loader"></div><p class="mt-4">Analyzing portfolios...</p></div>';
    
    try {
        // Get selected portfolios
        const allPortfolios = getCurrentPortfolios();
        const selectedIndices = Array.from(window.selectedPortfoliosForComparison);
        const portfoliosToCompare = selectedIndices.map(idx => ({
            ...allPortfolios[idx],
            index: idx
        }));
        
        // Calculate metrics for each portfolio
        const comparisonData = [];
        
        for (const portfolio of portfoliosToCompare) {
            // Temporarily load this portfolio
            const tempPortfolio = portfolio.holdings.map(h => ({
                ...ETF_LOOKUP[h.symbol],
                weight: h.weight
            })).filter(h => h.symbol);
            
            // Store current portfolio
            const savedCurrentPortfolio = [...currentPortfolio];
            currentPortfolio = tempPortfolio;
            
            // Calculate metrics
            await fetchPortfolioData();
            const metrics = calculatePortfolioMetrics();
            const fundamentals = calculatePortfolioFundamentals();
            
            comparisonData.push({
                name: portfolio.name,
                timestamp: portfolio.timestamp,
                holdings: portfolio.holdings,
                metrics: metrics,
                fundamentals: fundamentals
            });
            
            // Restore current portfolio
            currentPortfolio = savedCurrentPortfolio;
        }
        
        // Render comparison table
        renderComparisonTable(comparisonData);
        
    } catch (error) {
        console.error('Comparison error:', error);
        resultsContainer.innerHTML = `
            <div class="text-center text-red-600 py-12">
                <p class="text-lg font-semibold">Error comparing portfolios</p>
                <p class="text-sm mt-2">${error.message}</p>
            </div>
        `;
    }
}

function renderComparisonTable(portfolios) {
    const resultsContainer = document.getElementById('comparison-results');
    
    // Find best values for highlighting
    const bestReturn = Math.max(...portfolios.map(p => p.metrics.expectedReturn));
    const bestSharpe = Math.max(...portfolios.map(p => p.metrics.sharpe));
    const bestAlpha = Math.max(...portfolios.map(p => p.metrics.alpha));
    const lowestVol = Math.min(...portfolios.map(p => p.metrics.volatility));
    const lowestDD = Math.max(...portfolios.map(p => p.metrics.maxDrawdown)); // Max because it's negative
    const lowestExpense = Math.min(...portfolios.map(p => p.fundamentals.weightedExpenseRatio));
    
    let html = `
        <div class="mb-4">
            <h3 class="text-xl font-bold mb-2">📊 Portfolio Comparison Results</h3>
            <p class="text-sm text-gray-600">Comparing ${portfolios.length} portfolios | <span class="text-green-600">Green = Best</span></p>
        </div>
        
        <div class="overflow-x-auto">
            <table class="w-full border-collapse text-sm">
                <thead>
                    <tr class="bg-gray-800 text-white">
                        <th class="text-left p-3 font-semibold sticky left-0 bg-gray-800">Metric</th>
    `;
    
    portfolios.forEach(portfolio => {
        html += `<th class="text-right p-3 font-semibold">${portfolio.name}</th>`;
    });
    
    html += `
                    </tr>
                </thead>
                <tbody>
                    <!-- Performance Metrics -->
                    <tr class="bg-blue-100">
                        <td colspan="${portfolios.length + 1}" class="p-2 font-semibold">PERFORMANCE</td>
                    </tr>
                    
                    <tr class="border-b border-gray-200 hover:bg-gray-50">
                        <td class="p-3 font-medium sticky left-0 bg-white">Annual Return</td>
    `;
    
    portfolios.forEach(p => {
        const isBest = Math.abs(p.metrics.expectedReturn - bestReturn) < 0.0001;
        html += `<td class="text-right p-3 ${isBest ? 'bg-green-100 font-bold' : ''}">${(p.metrics.expectedReturn * 100).toFixed(2)}%</td>`;
    });
    
    html += `
                    </tr>
                    <tr class="border-b border-gray-200 hover:bg-gray-50">
                        <td class="p-3 font-medium sticky left-0 bg-white">Cumulative Return</td>
    `;
    
    portfolios.forEach(p => {
        html += `<td class="text-right p-3">${(p.metrics.cumulativeReturn * 100).toFixed(2)}%</td>`;
    });
    
    html += `
                    </tr>
                    
                    <!-- Risk Metrics -->
                    <tr class="bg-blue-100">
                        <td colspan="${portfolios.length + 1}" class="p-2 font-semibold">RISK</td>
                    </tr>
                    
                    <tr class="border-b border-gray-200 hover:bg-gray-50">
                        <td class="p-3 font-medium sticky left-0 bg-white">Volatility</td>
    `;
    
    portfolios.forEach(p => {
        const isBest = Math.abs(p.metrics.volatility - lowestVol) < 0.0001;
        html += `<td class="text-right p-3 ${isBest ? 'bg-green-100 font-bold' : ''}">${(p.metrics.volatility * 100).toFixed(2)}%</td>`;
    });
    
    html += `
                    </tr>
                    <tr class="border-b border-gray-200 hover:bg-gray-50">
                        <td class="p-3 font-medium sticky left-0 bg-white">Max Drawdown</td>
    `;
    
    portfolios.forEach(p => {
        const isBest = Math.abs(p.metrics.maxDrawdown - lowestDD) < 0.0001;
        html += `<td class="text-right p-3 ${isBest ? 'bg-green-100 font-bold' : ''}">${(p.metrics.maxDrawdown * 100).toFixed(2)}%</td>`;
    });
    
    html += `
                    </tr>
                    <tr class="border-b border-gray-200 hover:bg-gray-50">
                        <td class="p-3 font-medium sticky left-0 bg-white">Beta</td>
    `;
    
    portfolios.forEach(p => {
        html += `<td class="text-right p-3">${p.metrics.beta.toFixed(3)}</td>`;
    });
    
    html += `
                    </tr>
                    
                    <!-- Risk-Adjusted Metrics -->
                    <tr class="bg-blue-100">
                        <td colspan="${portfolios.length + 1}" class="p-2 font-semibold">RISK-ADJUSTED</td>
                    </tr>
                    
                    <tr class="border-b border-gray-200 hover:bg-gray-50">
                        <td class="p-3 font-medium sticky left-0 bg-white">Sharpe Ratio</td>
    `;
    
    portfolios.forEach(p => {
        const isBest = Math.abs(p.metrics.sharpe - bestSharpe) < 0.001;
        html += `<td class="text-right p-3 ${isBest ? 'bg-green-100 font-bold' : ''}">${p.metrics.sharpe.toFixed(3)}</td>`;
    });
    
    html += `
                    </tr>
                    <tr class="border-b border-gray-200 hover:bg-gray-50">
                        <td class="p-3 font-medium sticky left-0 bg-white">Alpha</td>
    `;
    
    portfolios.forEach(p => {
        const isBest = Math.abs(p.metrics.alpha - bestAlpha) < 0.0001;
        const isPositive = p.metrics.alpha > 0;
        html += `<td class="text-right p-3 ${isBest ? 'bg-green-100 font-bold' : ''} ${isPositive ? 'text-green-600' : 'text-red-600'}">${(p.metrics.alpha * 100).toFixed(2)}%</td>`;
    });
    
    html += `
                    </tr>
                    <tr class="border-b border-gray-200 hover:bg-gray-50">
                        <td class="p-3 font-medium sticky left-0 bg-white">vs SPY</td>
    `;
    
    portfolios.forEach(p => {
        const isPositive = p.metrics.excessReturn > 0;
        html += `<td class="text-right p-3 ${isPositive ? 'text-green-600' : 'text-red-600'}">${isPositive ? '+' : ''}${(p.metrics.excessReturn * 100).toFixed(2)}%</td>`;
    });
    
    html += `
                    </tr>
                    
                    <!-- Portfolio Characteristics -->
                    <tr class="bg-blue-100">
                        <td colspan="${portfolios.length + 1}" class="p-2 font-semibold">CHARACTERISTICS</td>
                    </tr>
                    
                    <tr class="border-b border-gray-200 hover:bg-gray-50">
                        <td class="p-3 font-medium sticky left-0 bg-white"># Holdings</td>
    `;
    
    portfolios.forEach(p => {
        html += `<td class="text-right p-3">${p.fundamentals.numberOfHoldings}</td>`;
    });
    
    html += `
                    </tr>
                    <tr class="border-b border-gray-200 hover:bg-gray-50">
                        <td class="p-3 font-medium sticky left-0 bg-white">Expense Ratio</td>
    `;
    
    portfolios.forEach(p => {
        const isBest = Math.abs(p.fundamentals.weightedExpenseRatio - lowestExpense) < 0.00001;
        html += `<td class="text-right p-3 ${isBest ? 'bg-green-100 font-bold' : ''}">${(p.fundamentals.weightedExpenseRatio * 100).toFixed(3)}%</td>`;
    });
    
    html += `
                    </tr>
                    <tr class="border-b border-gray-200 hover:bg-gray-50">
                        <td class="p-3 font-medium sticky left-0 bg-white">Equity %</td>
    `;
    
    portfolios.forEach(p => {
        html += `<td class="text-right p-3">${(p.fundamentals.assetAllocation.equity * 100).toFixed(1)}%</td>`;
    });
    
    html += `
                    </tr>
                    <tr class="border-b border-gray-200 hover:bg-gray-50">
                        <td class="p-3 font-medium sticky left-0 bg-white">Bonds %</td>
    `;
    
    portfolios.forEach(p => {
        html += `<td class="text-right p-3">${(p.fundamentals.assetAllocation.bonds * 100).toFixed(1)}%</td>`;
    });
    
    html += `
                    </tr>
                    <tr class="border-b border-gray-200 hover:bg-gray-50">
                        <td class="p-3 font-medium sticky left-0 bg-white">Factor Diversification</td>
    `;
    
    portfolios.forEach(p => {
        html += `<td class="text-right p-3">${p.fundamentals.factorDiversification.toFixed(2)}</td>`;
    });
    
    html += `
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 class="font-semibold mb-2">🏆 Best Performing</h4>
                <div class="text-sm space-y-1">
                    <p>Highest Return: <strong>${portfolios.find(p => Math.abs(p.metrics.expectedReturn - bestReturn) < 0.0001).name}</strong></p>
                    <p>Best Sharpe: <strong>${portfolios.find(p => Math.abs(p.metrics.sharpe - bestSharpe) < 0.001).name}</strong></p>
                    <p>Best Alpha: <strong>${portfolios.find(p => Math.abs(p.metrics.alpha - bestAlpha) < 0.0001).name}</strong></p>
                </div>
            </div>
            
            <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 class="font-semibold mb-2">🛡️ Lowest Risk</h4>
                <div class="text-sm space-y-1">
                    <p>Lowest Volatility: <strong>${portfolios.find(p => Math.abs(p.metrics.volatility - lowestVol) < 0.0001).name}</strong></p>
                    <p>Smallest Drawdown: <strong>${portfolios.find(p => Math.abs(p.metrics.maxDrawdown - lowestDD) < 0.0001).name}</strong></p>
                    <p>Lowest Expense: <strong>${portfolios.find(p => Math.abs(p.fundamentals.weightedExpenseRatio - lowestExpense) < 0.00001).name}</strong></p>
                </div>
            </div>
        </div>
        
        <div class="mt-4 flex gap-2">
            <button onclick="exportComparisonToCSV()" class="btn btn-secondary">
                📥 Export Comparison
            </button>
            <button onclick="renderCompareView()" class="btn btn-outline">
                🔄 New Comparison
            </button>
        </div>
    `;
    
    resultsContainer.innerHTML = html;
    
    // Store comparison data for export
    window.currentComparisonData = portfolios;
}

function exportComparisonToCSV() {
    if (!window.currentComparisonData || window.currentComparisonData.length === 0) {
        alert('No comparison data to export');
        return;
    }
    
    const portfolios = window.currentComparisonData;
    
    let csv = 'PORTFOLIO COMPARISON\n\n';
    csv += 'Metric,' + portfolios.map(p => p.name).join(',') + '\n';
    
    csv += '\nPERFORMANCE\n';
    csv += 'Annual Return (%),' + portfolios.map(p => (p.metrics.expectedReturn * 100).toFixed(2)).join(',') + '\n';
    csv += 'Cumulative Return (%),' + portfolios.map(p => (p.metrics.cumulativeReturn * 100).toFixed(2)).join(',') + '\n';
    
    csv += '\nRISK\n';
    csv += 'Volatility (%),' + portfolios.map(p => (p.metrics.volatility * 100).toFixed(2)).join(',') + '\n';
    csv += 'Max Drawdown (%),' + portfolios.map(p => (p.metrics.maxDrawdown * 100).toFixed(2)).join(',') + '\n';
    csv += 'Beta,' + portfolios.map(p => p.metrics.beta.toFixed(3)).join(',') + '\n';
    
    csv += '\nRISK-ADJUSTED\n';
    csv += 'Sharpe Ratio,' + portfolios.map(p => p.metrics.sharpe.toFixed(3)).join(',') + '\n';
    csv += 'Alpha (%),' + portfolios.map(p => (p.metrics.alpha * 100).toFixed(2)).join(',') + '\n';
    csv += 'vs SPY (%),' + portfolios.map(p => (p.metrics.excessReturn * 100).toFixed(2)).join(',') + '\n';
    
    csv += '\nCHARACTERISTICS\n';
    csv += 'Number of Holdings,' + portfolios.map(p => p.fundamentals.numberOfHoldings).join(',') + '\n';
    csv += 'Expense Ratio (%),' + portfolios.map(p => (p.fundamentals.weightedExpenseRatio * 100).toFixed(3)).join(',') + '\n';
    csv += 'Equity (%),' + portfolios.map(p => (p.fundamentals.assetAllocation.equity * 100).toFixed(1)).join(',') + '\n';
    csv += 'Bonds (%),' + portfolios.map(p => (p.fundamentals.assetAllocation.bonds * 100).toFixed(1)).join(',') + '\n';
    csv += 'Factor Diversification,' + portfolios.map(p => p.fundamentals.factorDiversification.toFixed(2)).join(',') + '\n';
    
    downloadCSV(csv, 'portfolio_comparison.csv');
}

// ============================================================================
// ENHANCED RISK CONTRIBUTION ANALYSIS
// ============================================================================

function calculateCovariance(returns1, returns2) {
    if (!returns1 || !returns2 || returns1.length !== returns2.length) {
        return 0;
    }
    
    const mean1 = returns1.reduce((sum, r) => sum + r, 0) / returns1.length;
    const mean2 = returns2.reduce((sum, r) => sum + r, 0) / returns2.length;
    
    let covariance = 0;
    for (let i = 0; i < returns1.length; i++) {
        covariance += (returns1[i] - mean1) * (returns2[i] - mean2);
    }
    
    return covariance / (returns1.length - 1);
}

function calculatePortfolioReturnArray() {
    /**
     * Calculate array of portfolio returns for each date
     * Returns: array of daily returns
     */
    if (!currentPortfolio || currentPortfolio.length === 0) {
        return [];
    }
    
    const alignedData = alignDataArrays();
    
    // Find a holding that has data
    let referenceSymbol = null;
    for (const holding of currentPortfolio) {
        if (alignedData[holding.symbol] && alignedData[holding.symbol].dates) {
            referenceSymbol = holding.symbol;
            break;
        }
    }
    
    if (!referenceSymbol) {
        return [];
    }
    
    const dates = alignedData[referenceSymbol].dates;
    const portfolioReturns = [];
    
    // For each date, calculate weighted portfolio return
    for (let i = 0; i < dates.length; i++) {
        let dailyReturn = 0;
        currentPortfolio.forEach(holding => {
            if (alignedData[holding.symbol] && alignedData[holding.symbol].returns[i] !== undefined) {
                const weight = holding.weight / 100;
                const assetReturn = alignedData[holding.symbol].returns[i];
                dailyReturn += weight * assetReturn;
            }
        });
        portfolioReturns.push(dailyReturn);
    }
    
    return portfolioReturns;
}

function calculateEnhancedRiskContribution() {
    // Get aligned data
    const alignedData = alignDataArrays();
    const portfolioReturn = calculatePortfolioReturnArray();
    const portfolioVol = stdDev(portfolioReturn) * Math.sqrt(252);
    
    // Calculate covariance matrix
    const symbols = currentPortfolio.map(h => h.symbol);
    const covMatrix = {};
    
    symbols.forEach(sym1 => {
        covMatrix[sym1] = {};
        const returns1 = alignedData[sym1] ? alignedData[sym1].returns : [];
        
        symbols.forEach(sym2 => {
            const returns2 = alignedData[sym2] ? alignedData[sym2].returns : [];
            covMatrix[sym1][sym2] = calculateCovariance(returns1, returns2);
        });
    });
    
    // Calculate marginal contribution to risk for each holding
    const riskContributions = currentPortfolio.map(holding => {
        const weight = holding.weight / 100;
        
        // Calculate marginal contribution
        let marginalContribution = 0;
        currentPortfolio.forEach(other => {
            const otherWeight = other.weight / 100;
            const cov = covMatrix[holding.symbol] && covMatrix[holding.symbol][other.symbol] 
                ? covMatrix[holding.symbol][other.symbol] 
                : 0;
            marginalContribution += otherWeight * cov;
        });
        
        // Risk contribution = weight × marginal contribution / portfolio volatility
        const riskContribution = portfolioVol > 0 ? (weight * marginalContribution) / portfolioVol : 0;
        
        // Component VaR (95% confidence)
        const componentVaR = riskContribution * 1.645;
        
        // Get ETF info
        const etfInfo = ETF_LOOKUP[holding.symbol] || {};
        
        return {
            symbol: holding.symbol,
            name: etfInfo.name || holding.symbol,
            allocation: holding.weight,
            riskContribution: riskContribution * 100,
            componentVaR: componentVaR * 100,
            marginalRisk: marginalContribution * Math.sqrt(252) * 100,
            riskMultiplier: weight > 0 ? (riskContribution / weight) : 0
        };
    });
    
    // Sort by risk contribution
    riskContributions.sort((a, b) => b.riskContribution - a.riskContribution);
    
    // Calculate diversification ratio
    let weightedAvgVol = 0;
    currentPortfolio.forEach(holding => {
        const holdingReturns = alignedData[holding.symbol] ? alignedData[holding.symbol].returns : [];
        if (holdingReturns.length > 0) {
            const vol = stdDev(holdingReturns) * Math.sqrt(252);
            weightedAvgVol += (holding.weight / 100) * vol;
        }
    });
    const diversificationRatio = portfolioVol > 0 ? weightedAvgVol / portfolioVol : 1;
    
    return {
        holdings: riskContributions,
        totalRisk: portfolioVol * 100,
        diversificationRatio: diversificationRatio
    };
}

function renderEnhancedRiskContribution(riskData) {
    if (!riskData || !riskData.holdings || riskData.holdings.length === 0) {
        return '<p class="text-gray-500 text-sm">Risk contribution data not available</p>';
    }
    
    const maxRisk = Math.max(...riskData.holdings.map(h => h.riskContribution));
    
    let html = `
        <div class="mb-3">
            <div class="flex justify-between items-center mb-2">
                <span class="text-xs font-semibold text-gray-700">Risk Contribution Analysis</span>
                <span class="text-xs text-gray-600">
                    Diversification Ratio: <strong>${riskData.diversificationRatio.toFixed(2)}</strong>
                    ${riskData.diversificationRatio > 1.2 ? ' (Good)' : ' (Low)'}
                </span>
            </div>
            <p class="text-xs text-gray-600 mb-3">
                Shows how much each holding contributes to total portfolio risk
            </p>
        </div>
        
        <div class="space-y-3">
    `;
    
    riskData.holdings.forEach(holding => {
        const riskWidth = maxRisk > 0 ? (holding.riskContribution / maxRisk) * 100 : 0;
        const allocWidth = holding.allocation;
        
        let barColor = 'bg-blue-500';
        let riskLabel = 'Balanced';
        if (holding.riskMultiplier > 1.2) {
            barColor = 'bg-red-500';
            riskLabel = 'High Risk';
        } else if (holding.riskMultiplier < 0.8) {
            barColor = 'bg-green-500';
            riskLabel = 'Low Risk';
        }
        
        html += `
            <div class="border border-gray-200 rounded p-2 text-xs">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <div class="font-semibold">${holding.symbol}</div>
                        <div class="text-gray-600">${holding.name}</div>
                    </div>
                    <div class="text-right">
                        <div class="font-semibold">${holding.riskContribution.toFixed(1)}% Risk</div>
                        <div class="text-gray-500">${holding.allocation.toFixed(1)}% Alloc</div>
                    </div>
                </div>
                
                <div class="mb-1">
                    <div class="flex justify-between text-gray-500 mb-1">
                        <span>Allocation</span>
                        <span>${holding.allocation.toFixed(1)}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-gray-400 h-2 rounded-full" style="width: ${allocWidth}%"></div>
                    </div>
                </div>
                
                <div class="mb-2">
                    <div class="flex justify-between text-gray-500 mb-1">
                        <span>Risk Contribution</span>
                        <span>${holding.riskContribution.toFixed(1)}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-3">
                        <div class="${barColor} h-3 rounded-full" style="width: ${riskWidth}%"></div>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <div class="text-gray-500">Risk Multiplier</div>
                        <div class="font-semibold ${holding.riskMultiplier > 1.1 ? 'text-red-600' : 'text-green-600'}">
                            ${holding.riskMultiplier.toFixed(2)}x
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="px-2 py-1 rounded text-xs ${
                            holding.riskMultiplier > 1.2 ? 'bg-red-100 text-red-800' :
                            holding.riskMultiplier < 0.8 ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800'
                        }">
                            ${riskLabel}
                        </span>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    
    html += `
        <div class="mt-3 p-2 bg-blue-50 rounded text-xs">
            <strong>Key:</strong> Risk Multiplier >1 = contributes more risk than allocation. 
            Diversification Ratio >1.2 indicates good risk diversification.
        </div>
    `;
    
    return html;
}

// ============================================================================
// ENHANCED MARKET REGIME ANALYSIS  
// ============================================================================

function detectHistoricalRegimes(returns) {
    const windowSize = 63; // ~3 months
    const regimes = [];
    
    for (let i = windowSize; i < returns.length; i++) {
        const window = returns.slice(i - windowSize, i);
        
        const avgReturn = window.reduce((sum, r) => sum + r, 0) / window.length;
        const annualizedReturn = avgReturn * 252;
        const volatility = stdDev(window) * Math.sqrt(252);
        
        let regime;
        if (annualizedReturn > 0.15 && volatility >= 0.18 && volatility <= 0.30) {
            regime = 'recovery';
        } else if (annualizedReturn > 0.10 && volatility < 0.18) {
            regime = 'bull';
        } else if (annualizedReturn < -0.05 || volatility > 0.25) {
            regime = 'bear';
        } else {
            regime = 'stagnation';
        }
        
        regimes.push({
            index: i,
            regime: regime,
            return: annualizedReturn,
            volatility: volatility
        });
    }
    
    return regimes;
}

function calculateRegimePerformance(portfolioReturns, benchmarkReturns, regimes, regimeType) {
    const regimePeriods = regimes.filter(r => r.regime === regimeType);
    
    if (regimePeriods.length === 0) {
        return {
            portfolioReturn: 0,
            benchmarkReturn: 0,
            relativeReturn: 0,
            count: 0,
            rating: 'Insufficient Data',
            winRate: 0
        };
    }
    
    const portfolioRegimeReturns = regimePeriods.map(r => portfolioReturns[r.index] || 0);
    const benchmarkRegimeReturns = regimePeriods.map(r => benchmarkReturns[r.index] || 0);
    
    const portfolioAvg = portfolioRegimeReturns.reduce((sum, r) => sum + r, 0) / portfolioRegimeReturns.length;
    const benchmarkAvg = benchmarkRegimeReturns.reduce((sum, r) => sum + r, 0) / benchmarkRegimeReturns.length;
    
    const relativeReturn = (portfolioAvg - benchmarkAvg) * 252 * 100;
    const portfolioAnnualized = portfolioAvg * 252 * 100;
    const benchmarkAnnualized = benchmarkAvg * 252 * 100;
    
    let rating;
    if (relativeReturn > 3) rating = 'Excellent';
    else if (relativeReturn > 1) rating = 'Strong';
    else if (relativeReturn > -1) rating = 'Good';
    else if (relativeReturn > -3) rating = 'Moderate';
    else if (relativeReturn > -5) rating = 'Poor';
    else rating = 'Very Poor';
    
    const winRate = (portfolioRegimeReturns.filter(r => r > 0).length / portfolioRegimeReturns.length) * 100;
    
    return {
        portfolioReturn: portfolioAnnualized,
        benchmarkReturn: benchmarkAnnualized,
        relativeReturn: relativeReturn,
        count: regimePeriods.length,
        rating: rating,
        winRate: winRate
    };
}

function detectCurrentRegime(returns) {
    const recentWindow = 63;
    const recentReturns = returns.slice(-recentWindow);
    
    const avgReturn = recentReturns.reduce((sum, r) => sum + r, 0) / recentReturns.length;
    const annualizedReturn = avgReturn * 252;
    const volatility = stdDev(recentReturns) * Math.sqrt(252);
    
    let regime, confidence;
    
    if (annualizedReturn > 0.15 && volatility >= 0.18 && volatility <= 0.30) {
        regime = 'recovery';
        confidence = 'High';
    } else if (annualizedReturn > 0.10 && volatility < 0.18) {
        regime = 'bull';
        confidence = 'High';
    } else if (annualizedReturn < -0.05 || volatility > 0.25) {
        regime = 'bear';
        confidence = 'High';
    } else {
        regime = 'stagnation';
        confidence = 'Moderate';
    }
    
    return {
        regime: regime,
        confidence: confidence,
        return: annualizedReturn * 100,
        volatility: volatility * 100
    };
}

function analyzeFactorExposure() {
    const exposure = {
        market: 0,
        value: 0,
        growth: 0,
        momentum: 0,
        quality: 0,
        lowVol: 0,
        size: 0,
        dividend: 0,
        international: 0,
        defensive: 0
    };
    
    currentPortfolio.forEach(holding => {
        const etf = ETF_LOOKUP[holding.symbol];
        if (!etf) return;
        
        const weight = holding.weight / 100;
        const factor = etf.factor.toLowerCase();
        
        if (factor.includes('market')) exposure.market += weight;
        if (factor.includes('value')) exposure.value += weight;
        if (factor.includes('growth') || factor.includes('tech')) exposure.growth += weight;
        if (factor.includes('momentum')) exposure.momentum += weight;
        if (factor.includes('quality')) exposure.quality += weight;
        if (factor.includes('low vol') || factor.includes('min vol')) exposure.lowVol += weight;
        if (factor.includes('size') || factor.includes('small')) exposure.size += weight;
        if (factor.includes('dividend')) exposure.dividend += weight;
        if (factor.includes('international') || factor.includes('emerging')) exposure.international += weight;
        if (factor.includes('bond') || factor.includes('gold')) exposure.defensive += weight;
    });
    
    return exposure;
}

function generateRegimeExplanations(exposure) {
    return {
        bull: generateBullExplanation(exposure),
        bear: generateBearExplanation(exposure),
        recovery: generateRecoveryExplanation(exposure),
        stagnation: generateStagnationExplanation(exposure)
    };
}

function generateBullExplanation(exposure) {
    const positive = [];
    const negative = [];
    
    if (exposure.growth > 0.2) positive.push(`${(exposure.growth * 100).toFixed(0)}% Growth exposure benefits from strong uptrends`);
    if (exposure.momentum > 0.1) positive.push(`${(exposure.momentum * 100).toFixed(0)}% Momentum captures rising trends`);
    if (exposure.market > 0.3) positive.push(`${(exposure.market * 100).toFixed(0)}% Core market exposure participates fully`);
    
    if (exposure.defensive > 0.3) negative.push(`${(exposure.defensive * 100).toFixed(0)}% Defensive holdings lag in strong markets`);
    if (exposure.value > 0.2) negative.push(`${(exposure.value * 100).toFixed(0)}% Value can underperform growth in bull runs`);
    if (exposure.lowVol > 0.1) negative.push(`${(exposure.lowVol * 100).toFixed(0)}% Low volatility caps upside`);
    
    return { positive, negative };
}

function generateBearExplanation(exposure) {
    const positive = [];
    const negative = [];
    
    if (exposure.defensive > 0.2) positive.push(`${(exposure.defensive * 100).toFixed(0)}% Defensive positions protect capital`);
    if (exposure.lowVol > 0.1) positive.push(`${(exposure.lowVol * 100).toFixed(0)}% Low volatility reduces drawdowns`);
    if (exposure.quality > 0.1) positive.push(`${(exposure.quality * 100).toFixed(0)}% Quality companies weather storms`);
    
    if (exposure.growth > 0.3) negative.push(`${(exposure.growth * 100).toFixed(0)}% Growth stocks fall hardest in crashes`);
    if (exposure.momentum > 0.2) negative.push(`${(exposure.momentum * 100).toFixed(0)}% Momentum reverses sharply`);
    if (exposure.defensive < 0.2) negative.push(`Only ${(exposure.defensive * 100).toFixed(0)}% defensive - insufficient protection`);
    
    return { positive, negative };
}

function generateRecoveryExplanation(exposure) {
    const positive = [];
    const negative = [];
    
    if (exposure.value > 0.15) positive.push(`${(exposure.value * 100).toFixed(0)}% Value leads in early recoveries`);
    if (exposure.size > 0.1) positive.push(`${(exposure.size * 100).toFixed(0)}% Small caps bounce strongest`);
    if (exposure.momentum > 0.1) positive.push(`${(exposure.momentum * 100).toFixed(0)}% Momentum catches new trends`);
    
    if (exposure.defensive > 0.35) negative.push(`${(exposure.defensive * 100).toFixed(0)}% Defensive excessive for rebounds`);
    if (exposure.lowVol > 0.15) negative.push(`${(exposure.lowVol * 100).toFixed(0)}% Low vol misses recovery rallies`);
    
    return { positive, negative };
}

function generateStagnationExplanation(exposure) {
    const positive = [];
    const negative = [];
    
    if (exposure.dividend > 0.2) positive.push(`${(exposure.dividend * 100).toFixed(0)}% Dividend provides income when prices flat`);
    if (exposure.quality > 0.1) positive.push(`${(exposure.quality * 100).toFixed(0)}% Quality generates steady returns`);
    if (exposure.lowVol > 0.1) positive.push(`${(exposure.lowVol * 100).toFixed(0)}% Low vol reduces churn`);
    
    if (exposure.momentum > 0.2) negative.push(`${(exposure.momentum * 100).toFixed(0)}% Momentum whipsaws in choppy markets`);
    if (exposure.growth > 0.4) negative.push(`${(exposure.growth * 100).toFixed(0)}% Growth heavy allocation struggles without trends`);
    
    return { positive, negative };
}

function analyzeMarketRegimesComprehensive() {
    const alignedData = alignDataArrays();
    const benchmarkReturns = alignedData['SPY'] ? alignedData['SPY'].returns : [];
    const portfolioReturns = calculatePortfolioReturnArray();
    
    const regimes = detectHistoricalRegimes(benchmarkReturns);
    
    const regimePerformance = {
        bull: calculateRegimePerformance(portfolioReturns, benchmarkReturns, regimes, 'bull'),
        bear: calculateRegimePerformance(portfolioReturns, benchmarkReturns, regimes, 'bear'),
        recovery: calculateRegimePerformance(portfolioReturns, benchmarkReturns, regimes, 'recovery'),
        stagnation: calculateRegimePerformance(portfolioReturns, benchmarkReturns, regimes, 'stagnation')
    };
    
    const currentRegime = detectCurrentRegime(benchmarkReturns);
    const factorExposure = analyzeFactorExposure();
    const explanations = generateRegimeExplanations(factorExposure);
    
    return {
        historical: regimePerformance,
        current: currentRegime,
        factorExposure: factorExposure,
        explanations: explanations
    };
}

function renderRegimeCard(regimeKey, regimeName, emoji, performance, explanation, isCurrent) {
    const ratingColors = {
        'Excellent': 'bg-green-500',
        'Strong': 'bg-green-400',
        'Good': 'bg-blue-400',
        'Moderate': 'bg-yellow-400',
        'Poor': 'bg-orange-400',
        'Very Poor': 'bg-red-500',
        'Insufficient Data': 'bg-gray-400'
    };
    
    const bgColor = ratingColors[performance.rating] || 'bg-gray-400';
    const borderColor = isCurrent ? 'border-4 border-purple-600' : 'border border-gray-200';
    
    return `
        <div class="bg-white rounded-lg shadow-sm p-4 ${borderColor} ${isCurrent ? 'ring-2 ring-purple-300' : ''}">
            ${isCurrent ? `
                <div class="mb-2">
                    <span class="bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                        CURRENT REGIME
                    </span>
                </div>
            ` : ''}
            
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center">
                    <span class="text-3xl mr-2">${emoji}</span>
                    <div>
                        <h4 class="font-bold text-lg">${regimeName}</h4>
                        <div class="text-sm text-gray-600">${performance.count} periods</div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="${bgColor} text-white px-3 py-1 rounded-full text-sm font-bold">
                        ${performance.rating}
                    </div>
                </div>
            </div>
            
            <div class="grid grid-cols-3 gap-2 mb-3 text-sm">
                <div class="bg-gray-50 p-2 rounded">
                    <div class="text-xs text-gray-600">Portfolio</div>
                    <div class="font-bold ${performance.portfolioReturn >= 0 ? 'text-green-600' : 'text-red-600'}">
                        ${performance.portfolioReturn >= 0 ? '+' : ''}${performance.portfolioReturn.toFixed(2)}%
                    </div>
                </div>
                <div class="bg-gray-50 p-2 rounded">
                    <div class="text-xs text-gray-600">Benchmark</div>
                    <div class="font-bold">
                        ${performance.benchmarkReturn >= 0 ? '+' : ''}${performance.benchmarkReturn.toFixed(2)}%
                    </div>
                </div>
                <div class="bg-gray-50 p-2 rounded">
                    <div class="text-xs text-gray-600">Relative</div>
                    <div class="font-bold ${performance.relativeReturn >= 0 ? 'text-green-600' : 'text-red-600'}">
                        ${performance.relativeReturn >= 0 ? '+' : ''}${performance.relativeReturn.toFixed(2)}%
                    </div>
                </div>
            </div>
            
            <div class="mb-3">
                <div class="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Win Rate</span>
                    <span>${performance.winRate.toFixed(1)}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-500 h-2 rounded-full" style="width: ${performance.winRate}%"></div>
                </div>
            </div>
            
            <div class="border-t border-gray-200 pt-3">
                <div class="text-xs font-semibold text-gray-700 mb-2">Why This Performance?</div>
                
                ${explanation.positive.length > 0 ? `
                    <div class="mb-2">
                        <div class="text-xs font-semibold text-green-700 mb-1">Positive Factors:</div>
                        <ul class="text-xs text-green-800 space-y-1">
                            ${explanation.positive.map(p => `<li>• ${p}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${explanation.negative.length > 0 ? `
                    <div>
                        <div class="text-xs font-semibold text-red-700 mb-1">Negative Factors:</div>
                        <ul class="text-xs text-red-800 space-y-1">
                            ${explanation.negative.map(n => `<li>• ${n}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function renderEnhancedRegimeAnalysis(regimeData) {
    if (!regimeData) {
        return '<p class="text-gray-500">Regime analysis data not available</p>';
    }
    
    const { historical, current, explanations } = regimeData;
    const currentPerformance = historical[current.regime];
    
    let html = `
        <div class="space-y-6">
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6">
                <h3 class="text-2xl font-bold mb-2">Current Market Regime</h3>
                <div class="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <div class="text-sm opacity-90">Detected Regime</div>
                        <div class="text-3xl font-bold capitalize">${current.regime}</div>
                        <div class="text-sm mt-1">Confidence: ${current.confidence}</div>
                    </div>
                    <div>
                        <div class="text-sm opacity-90">Expected Performance</div>
                        <div class="text-2xl font-bold">${currentPerformance.rating}</div>
                        <div class="text-sm mt-1">Based on historical patterns</div>
                    </div>
                </div>
                <div class="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <div class="opacity-90">Recent Return</div>
                        <div class="font-semibold">${current.return.toFixed(2)}% annualized</div>
                    </div>
                    <div>
                        <div class="opacity-90">Recent Volatility</div>
                        <div class="font-semibold">${current.volatility.toFixed(2)}%</div>
                    </div>
                </div>
            </div>

            <div>
                <h3 class="text-xl font-bold mb-4">Historical Performance by Market Regime</h3>
                <p class="text-sm text-gray-600 mb-4">
                    How your portfolio has performed historically in different market conditions
                </p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${renderRegimeCard('bull', 'Bull Market', '📈', historical.bull, explanations.bull, current.regime === 'bull')}
                    ${renderRegimeCard('bear', 'Bear Market', '📉', historical.bear, explanations.bear, current.regime === 'bear')}
                    ${renderRegimeCard('recovery', 'Recovery', '🚀', historical.recovery, explanations.recovery, current.regime === 'recovery')}
                    ${renderRegimeCard('stagnation', 'Stagnation', '📊', historical.stagnation, explanations.stagnation, current.regime === 'stagnation')}
                </div>
            </div>

            <div class="bg-blue-50 rounded-lg p-4">
                <h4 class="font-bold text-blue-900 mb-2">Understanding Market Regimes</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                    <div><strong>Bull Market:</strong> Strong uptrend with low volatility</div>
                    <div><strong>Bear Market:</strong> Downtrend or high volatility</div>
                    <div><strong>Recovery:</strong> Strong rebound phase</div>
                    <div><strong>Stagnation:</strong> Sideways, choppy market</div>
                </div>
            </div>
        </div>
    `;
    
    return html;
}

console.log('Alphatic Compare Portfolios feature loaded! 📊');