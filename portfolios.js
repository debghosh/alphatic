// =============================================================================
// ALPHATIC EDUCATIONAL EDITION - PORTFOLIO LIBRARY
// =============================================================================
// Contains 10 educational portfolios + saved user portfolios
// Each portfolio teaches specific concepts about construction and risk
// =============================================================================

// =============================================================================
// EDUCATIONAL PORTFOLIOS - Learn by Example
// =============================================================================

const EDUCATIONAL_PORTFOLIOS = [
    {
        id: "ideal",
        name: "The Ideal Portfolio",
        type: "📚 Best Practice Example",
        description: "Well-balanced portfolio demonstrating optimal construction principles",
        holdings: [
            { symbol: "VTI", weight: 35 },
            { symbol: "VXUS", weight: 20 },
            { symbol: "AVUV", weight: 10 },
            { symbol: "AVDV", weight: 10 },
            { symbol: "BND", weight: 20 },
            { symbol: "BNDX", weight: 5 }
        ],
        teachingPoints: {
            strengths: [
                "Proper core-satellite structure with 55% in broad market exposure",
                "Factor tilts (20%) provide alpha without excessive concentration",
                "Defensive ballast (25%) manages volatility while preserving growth",
                "International diversification (35%) reduces country-specific risk",
                "Low correlation between components enhances diversification"
            ],
            weaknesses: [
                "Could increase factor allocation slightly for more alpha potential",
                "International bonds add complexity with currency risk"
            ],
            keyLessons: [
                "Core holdings (VTI, VXUS) provide foundation - 30-60% typical",
                "Factor tilts (AVUV, AVDV) seek alpha through value + small cap premiums",
                "Defensive ballast (BND, BNDX) crucial for managing drawdowns",
                "Diversification across asset classes and geographies reduces risk"
            ]
        },
        grade: "A"
    },
    
    {
        id: "growthHeavy",
        name: "Growth-Heavy Portfolio",
        type: "⚠️ Common Mistake - Concentration Risk",
        description: "Over-concentrated in growth stocks, lacking diversification and defense",
        holdings: [
            { symbol: "QQQ", weight: 50 },
            { symbol: "VUG", weight: 25 },
            { symbol: "ARKK", weight: 15 },
            { symbol: "VTI", weight: 10 }
        ],
        teachingPoints: {
            strengths: [
                "High return potential in bull markets",
                "Concentrated exposure to innovation and technology trends",
                "Strong momentum factor loading"
            ],
            weaknesses: [
                "CRITICAL: No defensive ballast - portfolio will suffer in downturns",
                "Massive overlap between QQQ, VUG, ARKK (same stocks repeated)",
                "Extremely high volatility (25%+) vs S&P 500 (~15%)",
                "No international diversification creates home country bias",
                "Poor risk-adjusted returns despite high returns",
                "Catastrophic drawdown potential (-50%+)",
                "High beta (1.3+) amplifies market moves in both directions"
            ],
            keyLessons: [
                "Concentration risk: 90% in overlapping growth creates huge vulnerability",
                "Missing defensive ballast means you'll panic sell at the bottom",
                "High returns don't justify extreme risk - Sharpe ratio will be poor",
                "2020-2022 taught us: growth can drop 75% (see ARKK)"
            ]
        },
        grade: "D"
    },
    
    {
        id: "defensive",
        name: "Ultra-Defensive Portfolio",
        type: "⚠️ Common Mistake - Too Conservative",
        description: "Minimal equity exposure, sacrificing growth for safety",
        holdings: [
            { symbol: "BND", weight: 50 },
            { symbol: "TIP", weight: 20 },
            { symbol: "VNQ", weight: 15 },
            { symbol: "VTI", weight: 10 },
            { symbol: "GLD", weight: 5 }
        ],
        teachingPoints: {
            strengths: [
                "Very low volatility provides peace of mind",
                "Minimal drawdowns protect capital in crises",
                "Inflation protection through TIPS and real assets",
                "Low correlation to equity markets"
            ],
            weaknesses: [
                "Expected returns barely beat inflation (4-5% vs 2-3%)",
                "Negative alpha - significantly underperforms market",
                "70% in bonds/defensive kills growth potential",
                "Only 10% equity allocation is far too conservative for most",
                "Won't achieve long-term wealth building goals",
                "Opportunity cost in bull markets is enormous",
                "Poor risk-adjusted returns despite low risk"
            ],
            keyLessons: [
                "Being too safe is risky for long-term goals",
                "Need adequate equity exposure for real wealth building",
                "Typical allocation: 20-35% bonds, not 70%",
                "Bonds protect downside but sacrifice upside"
            ]
        },
        grade: "C"
    },
    
    {
        id: "sectorConcentrated",
        name: "Sector-Concentrated Portfolio",
        type: "⚠️ Common Mistake - Lack of Diversification",
        description: "Heavy concentration in specific sectors without broad market exposure",
        holdings: [
            { symbol: "XLF", weight: 30 },
            { symbol: "XLE", weight: 25 },
            { symbol: "XLI", weight: 20 },
            { symbol: "VNQ", weight: 15 },
            { symbol: "BND", weight: 10 }
        ],
        teachingPoints: {
            strengths: [
                "Focused bets on specific economic sectors",
                "Can outperform if sectors are in favor",
                "Some defensive allocation (10%)"
            ],
            weaknesses: [
                "CRITICAL: Missing core broad market exposure entirely",
                "No international diversification",
                "Sector bets create unnecessary concentration risk",
                "All sectors are cyclical - massive correlation in downturns",
                "Financials, Energy, Industrials all crushed together in 2008",
                "Poor risk-adjusted returns (Sharpe < 0.4)",
                "Negative alpha shows sector picking isn't adding value",
                "90% equity with no growth/quality/momentum factors",
                "Insufficient defensive ballast (only 10%)"
            ],
            keyLessons: [
                "Sector concentration ≠ diversification",
                "Need broad market core before sector bets",
                "Cyclical sectors move together in crises",
                "Better to use factor tilts than sector bets"
            ]
        },
        grade: "D"
    },
    
    {
        id: "factorLoaded",
        name: "Factor-Loaded Portfolio",
        type: "🎯 Advanced Strategy - High Conviction",
        description: "Heavy factor tilts seeking alpha through value, momentum, and quality",
        holdings: [
            { symbol: "VTI", weight: 20 },
            { symbol: "AVUV", weight: 20 },
            { symbol: "AVDV", weight: 15 },
            { symbol: "MTUM", weight: 15 },
            { symbol: "QUAL", weight: 15 },
            { symbol: "BND", weight: 15 }
        ],
        teachingPoints: {
            strengths: [
                "Strong factor diversification across value, momentum, quality",
                "High alpha potential (2-3%) from factor premiums",
                "Maintains core position (20%) for stability",
                "International factor exposure reduces home bias",
                "65% factor loading is bold but calculated",
                "Good expected returns with managed volatility"
            ],
            weaknesses: [
                "Factor tilts can underperform for 5-10 years (value did 2017-2020)",
                "Higher tracking error vs benchmark",
                "Requires conviction and discipline through drawdowns",
                "Only 15% defensive ballast may not be enough",
                "Complex portfolio requires monitoring and rebalancing"
            ],
            keyLessons: [
                "Factor investing requires patience and discipline",
                "Diversify across multiple factors (not just value)",
                "Maintain adequate core exposure (20-30%)",
                "Factor premiums are real but require long time horizons"
            ]
        },
        grade: "B+"
    },
    
    {
        id: "dividendFocused",
        name: "Dividend Income Portfolio",
        type: "💰 Income Strategy - Yield Focus",
        description: "Targets dividend income, may sacrifice growth and tax efficiency",
        holdings: [
            { symbol: "VYM", weight: 30 },
            { symbol: "SCHD", weight: 25 },
            { symbol: "VYMI", weight: 15 },
            { symbol: "VNQ", weight: 15 },
            { symbol: "BND", weight: 15 }
        ],
        teachingPoints: {
            strengths: [
                "Strong current income generation (3-4% yield)",
                "Quality dividend payers tend to be stable companies",
                "Some inflation protection through dividend growth",
                "Moderate volatility from mature companies"
            ],
            weaknesses: [
                "Tax inefficiency in taxable accounts (qualified dividends taxed)",
                "May underperform in growth-driven bull markets",
                "Value/dividend tilt can lag for extended periods",
                "Missing momentum and pure growth factors",
                "REITs create additional tax complexity",
                "Lower total return potential than growth portfolios"
            ],
            keyLessons: [
                "Dividend investing is a form of value tilt",
                "Great for retirees needing income",
                "Tax-inefficient in taxable accounts",
                "Consider total return, not just yield"
            ]
        },
        grade: "B"
    },
    
    {
        id: "allWeather",
        name: "All-Weather Portfolio",
        type: "🌤️ Risk Parity Strategy",
        description: "Balanced risk across asset classes, inspired by Ray Dalio",
        holdings: [
            { symbol: "VTI", weight: 30 },
            { symbol: "TLT", weight: 40 },
            { symbol: "IEF", weight: 15 },
            { symbol: "GLD", weight: 7.5 },
            { symbol: "DBC", weight: 7.5 }
        ],
        teachingPoints: {
            strengths: [
                "Balanced risk across uncorrelated asset classes",
                "Strong performance in various economic regimes",
                "Low correlation between portfolio components",
                "Inflation protection through commodities and gold",
                "Smoother returns than 100% equity"
            ],
            weaknesses: [
                "Heavy bond allocation (55%) limits growth in bull markets",
                "Commodities (DBC) can be very volatile and mean-reverting",
                "Complex rebalancing required",
                "Lower expected returns than equity-heavy portfolios",
                "Underperformed simple 60/40 in 2010-2020 period"
            ],
            keyLessons: [
                "Risk parity balances risk contribution, not dollar amounts",
                "Works best with leverage (not shown here)",
                "Suitable for those prioritizing stability over growth",
                "Not ideal for long-term accumulators"
            ]
        },
        grade: "B"
    },
    
    {
        id: "momentumTactical",
        name: "Momentum/Tactical Portfolio",
        type: "📈 Tactical Strategy - Trend Following",
        description: "Emphasizes momentum and tactical rotation strategies",
        holdings: [
            { symbol: "MTUM", weight: 35 },
            { symbol: "IMOM", weight: 20 },
            { symbol: "VTI", weight: 20 },
            { symbol: "USMV", weight: 15 },
            { symbol: "BND", weight: 10 }
        ],
        teachingPoints: {
            strengths: [
                "Momentum factor has strong historical performance",
                "International momentum adds diversification",
                "Min vol (USMV) provides some downside protection",
                "Can outperform significantly in trending markets",
                "55% momentum loading is bold tactical bet"
            ],
            weaknesses: [
                "Momentum can reverse sharply during regime changes",
                "Higher turnover than buy-and-hold strategies",
                "Underperforms in choppy/range-bound markets",
                "Only 10% defensive may be insufficient for risk control",
                "Requires active monitoring and rebalancing",
                "Did poorly in 2020-2021 when value reversed"
            ],
            keyLessons: [
                "Momentum works but timing is difficult",
                "Need adequate defensive ballast for momentum strategies",
                "Diversify momentum across US and international",
                "Pair with minimum volatility for balance"
            ]
        },
        grade: "B"
    },
    
    {
        id: "internationalHeavy",
        name: "Global Diversified Portfolio",
        type: "🌍 International Focus",
        description: "Heavy international allocation for global diversification",
        holdings: [
            { symbol: "VTI", weight: 25 },
            { symbol: "VXUS", weight: 35 },
            { symbol: "VWO", weight: 15 },
            { symbol: "AVDV", weight: 10 },
            { symbol: "BND", weight: 15 }
        ],
        teachingPoints: {
            strengths: [
                "60% international reduces US home bias",
                "Emerging markets provide high growth potential",
                "International value factor exposure (AVDV)",
                "Diversification across different economic cycles",
                "Better aligned with global market cap weights"
            ],
            weaknesses: [
                "Underperformed US-heavy portfolios 2010-2020",
                "Currency risk from international exposure",
                "Emerging markets (VWO) very volatile",
                "International value struggled during US tech dominance",
                "Higher expense ratios on international funds",
                "Some investors psychologically struggle with US underweight"
            ],
            keyLessons: [
                "US outperformance isn't guaranteed forever",
                "International diversification valuable long-term",
                "Accept periods of underperformance for lower risk",
                "25-40% international is reasonable range"
            ]
        },
        grade: "B+"
    },
    
    {
        id: "equalWeightFactor",
        name: "Equal-Weight Multi-Factor Portfolio",
        type: "🎯 Diversified Factor Strategy",
        description: "Spreads factor bets equally across value, momentum, quality, size, low-vol",
        holdings: [
            { symbol: "VTI", weight: 20 },
            { symbol: "AVUV", weight: 12 },
            { symbol: "MTUM", weight: 12 },
            { symbol: "QUAL", weight: 12 },
            { symbol: "USMV", weight: 12 },
            { symbol: "SIZE", weight: 12 },
            { symbol: "BND", weight: 20 }
        ],
        teachingPoints: {
            strengths: [
                "True factor diversification - not betting on one factor",
                "Academic support for all five factors",
                "Low correlation between factors smooths returns",
                "60% factor loading provides strong alpha potential",
                "Balanced exposure to defensive and aggressive factors",
                "Maintains adequate core (20%) and defensive (20%)"
            ],
            weaknesses: [
                "Complex portfolio with 7 holdings requires discipline",
                "Factors can all underperform simultaneously (rare but possible)",
                "Higher expense ratios than simple index approach",
                "Requires regular rebalancing to maintain factor exposures",
                "May underperform in pure growth bull markets",
                "Tracking error vs S&P 500 can be significant"
            ],
            keyLessons: [
                "Factor diversification more robust than single-factor bets",
                "Equal weighting prevents overconcentration",
                "Long-term approach required - factors cycle in/out of favor",
                "This is advanced portfolio construction for sophisticated investors"
            ]
        },
        grade: "A-"
    }
];

// =============================================================================
// USER SAVED PORTFOLIOS
// =============================================================================

let SAVED_PORTFOLIOS = [
    {
        name: "Sample: 60/40 Classic",
        timestamp: "2024-12-01T00:00:00.000Z",
        holdings: [
            { symbol: "VOO", weight: 60 },
            { symbol: "BND", weight: 40 }
        ]
    }
];

// =============================================================================
// PORTFOLIO UTILITY FUNCTIONS
// =============================================================================

function getEducationalPortfolio(id) {
    return EDUCATIONAL_PORTFOLIOS.find(p => p.id === id);
}

function getAllEducationalPortfolios() {
    return EDUCATIONAL_PORTFOLIOS;
}

function saveUserPortfolio(name, holdings) {
    const portfolio = {
        name: name,
        timestamp: new Date().toISOString(),
        holdings: holdings
    };
    SAVED_PORTFOLIOS.push(portfolio);
    localStorage.setItem('saved_portfolios', JSON.stringify(SAVED_PORTFOLIOS));
    return portfolio;
}

function loadSavedPortfolios() {
    const saved = localStorage.getItem('saved_portfolios');
    if (saved) {
        try {
            SAVED_PORTFOLIOS = JSON.parse(saved);
        } catch (e) {
            console.error('Error loading saved portfolios:', e);
        }
    }
    return SAVED_PORTFOLIOS;
}

function deleteUserPortfolio(name) {
    SAVED_PORTFOLIOS = SAVED_PORTFOLIOS.filter(p => p.name !== name);
    localStorage.setItem('saved_portfolios', JSON.stringify(SAVED_PORTFOLIOS));
}

function exportPortfolioToJSON(portfolio) {
    return JSON.stringify(portfolio, null, 2);
}

function importPortfolioFromJSON(jsonString) {
    try {
        const portfolio = JSON.parse(jsonString);
        if (!portfolio.name || !portfolio.holdings || !Array.isArray(portfolio.holdings)) {
            throw new Error('Invalid portfolio format');
        }
        return portfolio;
    } catch (e) {
        console.error('Error importing portfolio:', e);
        return null;
    }
}

function exportPortfolioToCSV(portfolio) {
    let csv = "Symbol,Weight\n";
    portfolio.holdings.forEach(h => {
        csv += `${h.symbol},${h.weight}\n`;
    });
    return csv;
}

function importPortfolioFromCSV(csvString) {
    try {
        const lines = csvString.trim().split('\n');
        const holdings = [];
        
        // Skip header if present
        const startIndex = lines[0].toLowerCase().includes('symbol') ? 1 : 0;
        
        for (let i = startIndex; i < lines.length; i++) {
            const [symbol, weight] = lines[i].split(',').map(s => s.trim());
            if (symbol && weight) {
                holdings.push({
                    symbol: symbol.toUpperCase(),
                    weight: parseFloat(weight)
                });
            }
        }
        
        if (holdings.length === 0) {
            throw new Error('No valid holdings found');
        }
        
        return {
            name: "Imported Portfolio",
            holdings: holdings
        };
    } catch (e) {
        console.error('Error importing CSV:', e);
        return null;
    }
}

// Initialize
loadSavedPortfolios();

console.log('✓ Alphatic Educational Edition: Portfolio library loaded');
console.log(`✓ ${EDUCATIONAL_PORTFOLIOS.length} educational portfolios available`);
console.log(`✓ ${SAVED_PORTFOLIOS.length} saved user portfolios`);
