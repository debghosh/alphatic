// =============================================================================
// ALPHATIC EDUCATIONAL EDITION - LEARNING MODULE
// =============================================================================
// Handles all educational portfolio display, teaching, and comparison
// =============================================================================

// Current state
let currentEducationalPortfolio = null;

// =============================================================================
// INITIALIZATION
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
    initializeEducationalView();
});

// =============================================================================
// EDUCATIONAL VIEW - Main Learn Tab
// =============================================================================

function initializeEducationalView() {
    renderEducationalPortfolios();
}

function renderEducationalPortfolios() {
    const container = document.getElementById('educational-portfolios');
    if (!container) return;

    let html = '<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">';

    EDUCATIONAL_PORTFOLIOS.forEach(portfolio => {
        const gradeColor = {
            'A': 'bg-green-100 text-green-800',
            'A-': 'bg-green-100 text-green-800',
            'B+': 'bg-blue-100 text-blue-800',
            'B': 'bg-blue-100 text-blue-800',
            'C': 'bg-yellow-100 text-yellow-800',
            'D': 'bg-red-100 text-red-800',
            'F': 'bg-red-100 text-red-800'
        }[portfolio.grade] || 'bg-gray-100 text-gray-800';

        html += `
            <div class="portfolio-card" onclick="showEducationalPortfolioDetail('${portfolio.id}')">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-1">${portfolio.name}</h3>
                        <p class="text-sm text-gray-600">${portfolio.type}</p>
                    </div>
                    <span class="badge ${gradeColor} text-lg font-bold px-3 py-1">${portfolio.grade}</span>
                </div>
                
                <p class="text-gray-700 mb-4">${portfolio.description}</p>
                
                <div class="space-y-2">
                    <div class="text-sm font-semibold text-gray-700">Holdings:</div>
                    <div class="flex flex-wrap gap-2">
                        ${portfolio.holdings.map(h => `
                            <span class="badge badge-info">${h.symbol} (${h.weight}%)</span>
                        `).join('')}
                    </div>
                </div>
                
                <div class="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                    <span class="text-sm text-gray-600">${portfolio.holdings.length} holdings</span>
                    <button class="btn btn-sm btn-primary" onclick="event.stopPropagation(); loadEducationalPortfolio('${portfolio.id}')">
                        Load Portfolio →
                    </button>
                </div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

// =============================================================================
// EDUCATIONAL PORTFOLIO DETAIL VIEW
// =============================================================================

function showEducationalPortfolioDetail(portfolioId) {
    const portfolio = getEducationalPortfolio(portfolioId);
    if (!portfolio) return;

    currentEducationalPortfolio = portfolio;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'educational-detail-modal';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';

    const gradeColor = {
        'A': 'text-green-600',
        'A-': 'text-green-600',
        'B+': 'text-blue-600',
        'B': 'text-blue-600',
        'C': 'text-yellow-600',
        'D': 'text-red-600',
        'F': 'text-red-600'
    }[portfolio.grade] || 'text-gray-600';

    modal.innerHTML = `
        <div class="modal-content" style="max-width: 1000px; max-height: 85vh; overflow-y: auto;">
            <div class="flex justify-between items-start mb-6 border-b border-gray-200 pb-4">
                <div>
                    <h2 class="text-3xl font-bold text-gray-900 mb-2">${portfolio.name}</h2>
                    <p class="text-lg text-gray-600">${portfolio.type}</p>
                </div>
                <div class="text-right">
                    <div class="text-5xl font-bold ${gradeColor} mb-2">${portfolio.grade}</div>
                    <button onclick="closeEducationalDetail()" class="text-gray-400 hover:text-gray-600 text-3xl leading-none">&times;</button>
                </div>
            </div>

            <div class="mb-6">
                <p class="text-gray-700 text-lg">${portfolio.description}</p>
            </div>

            <!-- Holdings Table -->
            <div class="mb-6">
                <h3 class="text-xl font-bold text-gray-900 mb-3">Portfolio Holdings</h3>
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="text-left p-3 font-semibold">Ticker</th>
                            <th class="text-left p-3 font-semibold">Allocation</th>
                            <th class="text-left p-3 font-semibold">Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${portfolio.holdings.map((h, idx) => `
                            <tr class="${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}">
                                <td class="p-3 font-semibold">${h.symbol}</td>
                                <td class="p-3">${h.weight}%</td>
                                <td class="p-3 text-sm text-gray-600">${getETFCategory(h.symbol)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <!-- Teaching Points -->
            ${renderTeachingPoints(portfolio)}

            <!-- Action Buttons -->
            <div class="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                <button onclick="loadEducationalPortfolio('${portfolio.id}'); closeEducationalDetail();" class="btn btn-primary flex-1">
                    🏗️ Load in Builder
                </button>
                <button onclick="analyzeEducationalPortfolio('${portfolio.id}'); closeEducationalDetail();" class="btn btn-success flex-1">
                    📊 Analyze Portfolio
                </button>
                <button onclick="closeEducationalDetail();" class="btn btn-outline">
                    Close
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function renderTeachingPoints(portfolio) {
    const tp = portfolio.teachingPoints;
    
    let html = '<div class="space-y-6">';

    // Strengths
    html += `
        <div class="teaching-box success">
            <h4 class="font-bold text-green-800 mb-2 flex items-center">
                <span class="text-2xl mr-2">✓</span> Key Strengths
            </h4>
            <ul class="list-disc list-inside space-y-1 text-green-900">
                ${tp.strengths.map(s => `<li>${s}</li>`).join('')}
            </ul>
        </div>
    `;

    // Weaknesses
    html += `
        <div class="teaching-box ${portfolio.grade === 'A' || portfolio.grade === 'A-' ? '' : 'error'}">
            <h4 class="font-bold ${portfolio.grade === 'A' || portfolio.grade === 'A-' ? 'text-blue-800' : 'text-red-800'} mb-2 flex items-center">
                <span class="text-2xl mr-2">⚠</span> Areas for Improvement
            </h4>
            <ul class="list-disc list-inside space-y-1 ${portfolio.grade === 'A' || portfolio.grade === 'A-' ? 'text-blue-900' : 'text-red-900'}">
                ${tp.weaknesses.map(w => `<li>${w}</li>`).join('')}
            </ul>
        </div>
    `;

    // Key Lessons
    if (tp.keyLessons) {
        html += `
            <div class="teaching-box">
                <h4 class="font-bold text-blue-800 mb-2 flex items-center">
                    <span class="text-2xl mr-2">🎓</span> Key Learning Points
                </h4>
                <ul class="list-disc list-inside space-y-1 text-blue-900">
                    ${tp.keyLessons.map(l => `<li>${l}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    html += '</div>';
    return html;
}

function closeEducationalDetail() {
    const modal = document.getElementById('educational-detail-modal');
    if (modal) {
        modal.remove();
    }
}

// =============================================================================
// LOAD EDUCATIONAL PORTFOLIO INTO BUILDER
// =============================================================================

function loadEducationalPortfolio(portfolioId) {
    const portfolio = getEducationalPortfolio(portfolioId);
    if (!portfolio) return;

    // Clear current portfolio
    currentPortfolio = [];

    // Load holdings into current portfolio
    portfolio.holdings.forEach(h => {
        currentPortfolio.push({
            symbol: h.symbol,
            weight: h.weight
        });
    });

    // Switch to builder view and update display
    showView('builder');
    
    // Update portfolio display (call existing Alphatic function)
    if (typeof updatePortfolioDisplay === 'function') {
        updatePortfolioDisplay();
    }

    // Show success message
    showToast(`✓ Loaded: ${portfolio.name}`, 'success');
}

function analyzeEducationalPortfolio(portfolioId) {
    loadEducationalPortfolio(portfolioId);
    
    // Wait a moment for portfolio to load, then switch to analysis view
    setTimeout(() => {
        showView('analysis');
        
        // Trigger analysis if function exists
        if (typeof performAnalysis === 'function') {
            performAnalysis();
        }
    }, 500);
}

// =============================================================================
// IMPORT/EXPORT FUNCTIONALITY
// =============================================================================

function showImportModal() {
    const modal = document.getElementById('import-modal');
    const content = document.getElementById('import-content');

    content.innerHTML = `
        <div class="space-y-4">
            <div>
                <h3 class="font-semibold mb-2">Import from JSON</h3>
                <textarea id="import-json-text" class="w-full border border-gray-300 rounded p-3 font-mono text-sm" rows="10" placeholder="Paste JSON portfolio data here..."></textarea>
                <button onclick="importFromJSON()" class="btn btn-primary mt-2">Import JSON</button>
            </div>

            <div class="border-t border-gray-200 pt-4">
                <h3 class="font-semibold mb-2">Import from CSV</h3>
                <textarea id="import-csv-text" class="w-full border border-gray-300 rounded p-3 font-mono text-sm" rows="10" placeholder="Paste CSV data here...
Symbol,Weight
VTI,60
BND,40"></textarea>
                <button onclick="importFromCSV()" class="btn btn-primary mt-2">Import CSV</button>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

function closeImportModal() {
    document.getElementById('import-modal').style.display = 'none';
}

function importFromJSON() {
    const text = document.getElementById('import-json-text').value;
    const portfolio = importPortfolioFromJSON(text);
    
    if (portfolio) {
        currentPortfolio = portfolio.holdings;
        closeImportModal();
        showView('builder');
        if (typeof updatePortfolioDisplay === 'function') {
            updatePortfolioDisplay();
        }
        showToast('✓ Portfolio imported successfully', 'success');
    } else {
        showToast('✗ Invalid JSON format', 'error');
    }
}

function importFromCSV() {
    const text = document.getElementById('import-csv-text').value;
    const portfolio = importPortfolioFromCSV(text);
    
    if (portfolio) {
        currentPortfolio = portfolio.holdings;
        closeImportModal();
        showView('builder');
        if (typeof updatePortfolioDisplay === 'function') {
            updatePortfolioDisplay();
        }
        showToast('✓ Portfolio imported successfully', 'success');
    } else {
        showToast('✗ Invalid CSV format', 'error');
    }
}

function showExportModal() {
    const modal = document.getElementById('export-modal');
    const content = document.getElementById('export-content');

    if (currentPortfolio.length === 0) {
        content.innerHTML = '<p class="text-gray-600">No portfolio to export. Build a portfolio first.</p>';
        modal.style.display = 'block';
        return;
    }

    const portfolio = {
        name: "My Portfolio",
        holdings: currentPortfolio
    };

    const jsonExport = exportPortfolioToJSON(portfolio);
    const csvExport = exportPortfolioToCSV(portfolio);

    content.innerHTML = `
        <div class="space-y-4">
            <div>
                <h3 class="font-semibold mb-2">Export as JSON</h3>
                <textarea readonly class="w-full border border-gray-300 rounded p-3 font-mono text-sm" rows="10">${jsonExport}</textarea>
                <button onclick="copyToClipboard(this.previousElementSibling.value)" class="btn btn-outline mt-2">
                    📋 Copy to Clipboard
                </button>
            </div>

            <div class="border-t border-gray-200 pt-4">
                <h3 class="font-semibold mb-2">Export as CSV</h3>
                <textarea readonly class="w-full border border-gray-300 rounded p-3 font-mono text-sm" rows="10">${csvExport}</textarea>
                <button onclick="copyToClipboard(this.previousElementSibling.value)" class="btn btn-outline mt-2">
                    📋 Copy to Clipboard
                </button>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

function closeExportModal() {
    document.getElementById('export-modal').style.display = 'none';
}

function showTemplatesModal() {
    const modal = document.getElementById('templates-modal');
    const content = document.getElementById('templates-content');

    let html = '<div class="grid grid-cols-1 gap-4">';

    EDUCATIONAL_PORTFOLIOS.forEach(portfolio => {
        const gradeColor = {
            'A': 'badge-success',
            'A-': 'badge-success',
            'B+': 'badge-info',
            'B': 'badge-info',
            'C': 'badge-warning',
            'D': 'badge-error',
            'F': 'badge-error'
        }[portfolio.grade] || 'badge-info';

        html += `
            <div class="border border-gray-300 rounded p-4 hover:border-blue-500 cursor-pointer" 
                 onclick="loadEducationalPortfolio('${portfolio.id}'); closeTemplatesModal();">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-bold text-gray-900">${portfolio.name}</h3>
                    <span class="badge ${gradeColor}">${portfolio.grade}</span>
                </div>
                <p class="text-sm text-gray-600 mb-2">${portfolio.type}</p>
                <div class="flex flex-wrap gap-1">
                    ${portfolio.holdings.map(h => `
                        <span class="text-xs bg-gray-100 px-2 py-1 rounded">${h.symbol}</span>
                    `).join('')}
                </div>
            </div>
        `;
    });

    html += '</div>';
    content.innerHTML = html;
    modal.style.display = 'block';
}

function closeTemplatesModal() {
    document.getElementById('templates-modal').style.display = 'none';
}

// =============================================================================
// COMPARE TO IDEAL FUNCTIONALITY
// =============================================================================

function compareToIdeal() {
    if (currentPortfolio.length === 0) {
        showToast('⚠ Build a portfolio first', 'warning');
        return;
    }

    const ideal = getEducationalPortfolio('ideal');
    if (!ideal) return;

    showView('compare');
    
    // Build comparison data
    const comparison = {
        yourPortfolio: currentPortfolio,
        idealPortfolio: ideal.holdings
    };

    displayComparison(comparison);
}

function displayComparison(comparison) {
    const content = document.getElementById('compare-content');
    
    // Analyze construction
    const yourAnalysis = analyzePortfolioConstruction(comparison.yourPortfolio);
    const idealAnalysis = analyzePortfolioConstruction(comparison.idealPortfolio);

    let html = `
        <h3 class="text-xl font-bold mb-4">Your Portfolio vs. The Ideal Portfolio</h3>
        
        <div class="grid grid-cols-2 gap-6 mb-6">
            <div class="card">
                <h4 class="font-bold mb-3">Your Portfolio</h4>
                ${renderConstructionAnalysis(yourAnalysis)}
            </div>
            <div class="card">
                <h4 class="font-bold mb-3">The Ideal Portfolio</h4>
                ${renderConstructionAnalysis(idealAnalysis)}
            </div>
        </div>

        <div class="card">
            <h4 class="font-bold mb-3">Recommendations</h4>
            ${generateRecommendations(yourAnalysis, idealAnalysis)}
        </div>
    `;

    content.innerHTML = html;
}

function analyzePortfolioConstruction(holdings) {
    const analysis = {
        core: 0,
        factor: 0,
        defensive: 0,
        international: 0,
        holdings: holdings.length
    };

    holdings.forEach(h => {
        const cat = getETFCategory(h.symbol);
        if (cat.includes('Core') || cat.includes('Market')) {
            analysis.core += h.weight;
        }
        if (cat.includes('Factor')) {
            analysis.factor += h.weight;
        }
        if (cat.includes('Defensive') || cat.includes('Bond')) {
            analysis.defensive += h.weight;
        }
        if (cat.includes('International') || cat.includes('Intl')) {
            analysis.international += h.weight;
        }
    });

    return analysis;
}

function renderConstructionAnalysis(analysis) {
    return `
        <div class="space-y-2 text-sm">
            <div class="flex justify-between">
                <span>Core Holdings:</span>
                <strong>${analysis.core}%</strong>
            </div>
            <div class="flex justify-between">
                <span>Factor Tilts:</span>
                <strong>${analysis.factor}%</strong>
            </div>
            <div class="flex justify-between">
                <span>Defensive Ballast:</span>
                <strong>${analysis.defensive}%</strong>
            </div>
            <div class="flex justify-between">
                <span>International:</span>
                <strong>${analysis.international}%</strong>
            </div>
            <div class="flex justify-between pt-2 border-t">
                <span>Total Holdings:</span>
                <strong>${analysis.holdings}</strong>
            </div>
        </div>
    `;
}

function generateRecommendations(yours, ideal) {
    const recommendations = [];

    if (yours.core < 30) {
        recommendations.push('❌ Increase core holdings to 30-60% (currently ' + yours.core + '%)');
    } else if (yours.core > 60) {
        recommendations.push('⚠ Consider reducing core to allow factor tilts (currently ' + yours.core + '%)');
    } else {
        recommendations.push('✓ Core allocation is appropriate (' + yours.core + '%)');
    }

    if (yours.defensive < 20) {
        recommendations.push('❌ Add defensive ballast - aim for 20-35% (currently ' + yours.defensive + '%)');
    } else if (yours.defensive > 35) {
        recommendations.push('⚠ May be too defensive - consider 20-35% (currently ' + yours.defensive + '%)');
    } else {
        recommendations.push('✓ Defensive allocation is good (' + yours.defensive + '%)');
    }

    if (yours.factor < 15) {
        recommendations.push('💡 Consider adding factor tilts for alpha (currently ' + yours.factor + '%)');
    } else if (yours.factor > 30) {
        recommendations.push('⚠ High factor concentration - ensure diversification (currently ' + yours.factor + '%)');
    } else {
        recommendations.push('✓ Factor allocation is balanced (' + yours.factor + '%)');
    }

    if (yours.international < 20) {
        recommendations.push('💡 Add international exposure to reduce home bias (currently ' + yours.international + '%)');
    } else {
        recommendations.push('✓ Good international diversification (' + yours.international + '%)');
    }

    let html = '<ul class="space-y-2">';
    recommendations.forEach(r => {
        html += `<li class="pl-4">${r}</li>`;
    });
    html += '</ul>';

    return html;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function getETFCategory(symbol) {
    // Try to get from ETF_DATABASE first
    if (typeof ETF_LOOKUP !== 'undefined' && ETF_LOOKUP[symbol]) {
        return ETF_LOOKUP[symbol].factor || 'Unknown';
    }
    
    // Fallback to educational portfolio metadata
    const metadata = {
        'VTI': 'Core',
        'VXUS': 'International',
        'AVUV': 'Factor - Value/Small',
        'AVDV': 'Factor - Intl Value',
        'BND': 'Defensive Ballast',
        'BNDX': 'Defensive Ballast - Intl',
        'QQQ': 'Core - Tech/Growth',
        'VUG': 'Growth',
        'ARKK': 'Aggressive Growth',
        'TIP': 'Defensive Ballast',
        'VNQ': 'Real Estate',
        'GLD': 'Safe Haven',
        'XLF': 'Sector - Financials',
        'XLE': 'Sector - Energy',
        'XLI': 'Sector - Industrials',
        'MTUM': 'Factor - Momentum',
        'QUAL': 'Factor - Quality',
        'USMV': 'Factor - Low Volatility',
        'VYM': 'Dividend',
        'SCHD': 'Dividend',
        'VYMI': 'International Dividend',
        'TLT': 'Defensive Ballast - Long Bonds',
        'IEF': 'Defensive Ballast',
        'DBC': 'Commodities',
        'VWO': 'Emerging Markets',
        'IMOM': 'Factor - Intl Momentum',
        'SIZE': 'Factor - Size'
    };

    return metadata[symbol] || 'Unknown';
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500' :
        type === 'error' ? 'bg-red-500' :
        type === 'warning' ? 'bg-yellow-500' :
        'bg-blue-500'
    } text-white font-semibold`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.transition = 'opacity 0.3s';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('✓ Copied to clipboard', 'success');
    }).catch(() => {
        showToast('✗ Failed to copy', 'error');
    });
}

// =============================================================================
// INITIALIZATION LOG
// =============================================================================

console.log('✓ Alphatic Educational Edition: Learning module loaded');
console.log(`✓ ${EDUCATIONAL_PORTFOLIOS.length} educational portfolios ready`);
console.log('✓ Import/Export functionality enabled');
console.log('✓ Portfolio comparison tools ready');
