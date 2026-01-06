// Goal-Based Portfolio System
// Fixes the critical bug where goals were being ignored

// Define goal-specific portfolio emphasis
const GOAL_PORTFOLIOS = {
    growth: {
        name: "Growth Emphasis",
        description: "Maximize capital appreciation",
        emphasis: {
            // High allocation to growth stocks
            growth_stocks: 0.60,    // VTI, VUG, QQQ
            value_stocks: 0.10,      // VTV, SCHV
            international: 0.15,     // VEA, VWO
            bonds: 0.10,             // BND, AGG
            alternatives: 0.05       // GLD
        },
        etf_preferences: ['VTI', 'VUG', 'QQQ', 'MTUM', 'VEA', 'BND']
    },
    
    income: {
        name: "Income Emphasis",
        description: "Generate reliable dividend/distribution income",
        emphasis: {
            // High allocation to income-producing assets
            covered_call: 0.45,      // JEPI, JEPQ (high yield)
            dividend_growth: 0.25,   // SCHD, VYM
            growth_stocks: 0.15,     // VOO (modest yield + growth)
            bonds: 0.10,             // BND, AGG
            alternatives: 0.05       // GLD
        },
        etf_preferences: ['JEPI', 'JEPQ', 'SCHD', 'VYM', 'VOO', 'BND']
    },
    
    balance: {
        name: "Balance Emphasis",
        description: "Balance growth with capital preservation",
        emphasis: {
            // Balanced between stocks and bonds
            growth_stocks: 0.35,     // VOO, VTI
            value_stocks: 0.15,      // VTV, SCHV
            dividend: 0.10,          // SCHD
            bonds: 0.30,             // BND, AGG, TIP
            alternatives: 0.10       // GLD
        },
        etf_preferences: ['VOO', 'VTV', 'SCHD', 'BND', 'AGG', 'TIP', 'GLD']
    },
    
    preservation: {
        name: "Preservation Emphasis",
        description: "Protect capital and minimize volatility",
        emphasis: {
            // Heavy bonds, defensive stocks
            low_vol_stocks: 0.20,    // USMV, QUAL
            dividend: 0.15,          // SCHD, VYM
            bonds: 0.50,             // BND, AGG, TIP, SHY
            alternatives: 0.15       // GLD, TLT
        },
        etf_preferences: ['USMV', 'QUAL', 'SCHD', 'BND', 'AGG', 'TIP', 'SHY', 'GLD']
    }
};

// Blend portfolios based on multiple goals
function blendGoalPortfolios(lifeStage, riskTolerance, goals) {
    if (!goals || goals.length === 0) {
        console.error('No goals provided for portfolio blending');
        return null;
    }
    
    // Get the base template for the life stage
    const template = LIFE_STAGE_TEMPLATES[lifeStage];
    if (!template) {
        console.error('Invalid life stage:', lifeStage);
        return null;
    }
    
    // Get the base portfolio for risk tolerance
    const basePortfolio = template.portfolios[riskTolerance];
    if (!basePortfolio) {
        console.error('Invalid risk tolerance:', riskTolerance);
        return null;
    }
    
    // If only one goal, adjust the base portfolio for that goal
    if (goals.length === 1) {
        return adjustPortfolioForGoal(basePortfolio, goals[0], template);
    }
    
    // Multiple goals: blend them
    const blendedAllocation = {};
    const goalWeight = 1.0 / goals.length; // Equal weight per goal
    
    for (const goal of goals) {
        const goalPortfolio = adjustPortfolioForGoal(basePortfolio, goal, template);
        
        // Add weighted allocation
        for (const [ticker, pct] of Object.entries(goalPortfolio.allocation)) {
            blendedAllocation[ticker] = (blendedAllocation[ticker] || 0) + (pct * goalWeight);
        }
    }
    
    // Normalize to 100%
    const total = Object.values(blendedAllocation).reduce((sum, val) => sum + val, 0);
    const normalized = {};
    for (const [ticker, pct] of Object.entries(blendedAllocation)) {
        normalized[ticker] = Math.round((pct / total) * 100);
    }
    
    // Final adjustment to ensure exactly 100%
    const finalTotal = Object.values(normalized).reduce((sum, val) => sum + val, 0);
    if (finalTotal !== 100) {
        const diff = 100 - finalTotal;
        const largestTicker = Object.keys(normalized).reduce((a, b) => 
            normalized[a] > normalized[b] ? a : b
        );
        normalized[largestTicker] += diff;
    }
    
    // Create blended portfolio object
    const blendedPortfolio = {
        ...basePortfolio,
        name: `${goals.map(g => capitalize(g)).join(' + ')} Portfolio`,
        description: `Optimized for ${goals.map(g => g).join(', ')} goals`,
        allocation: normalized,
        goals: goals,
        explanation: generateBlendedExplanation(goals, lifeStage, normalized)
    };
    
    return blendedPortfolio;
}

// Adjust portfolio based on specific goal
function adjustPortfolioForGoal(basePortfolio, goal, lifeStage) {
    const goalEmphasis = GOAL_PORTFOLIOS[goal];
    if (!goalEmphasis) {
        return basePortfolio; // Return unchanged if invalid goal
    }
    
    const adjusted = { ...basePortfolio };
    const newAllocation = {};
    
    // Determine life stage category (for age-appropriate adjustments)
    const stage = lifeStage.name.toLowerCase().replace(/\s+/g, '_');
    
    switch (goal) {
        case 'growth':
            // Emphasize growth stocks, reduce bonds
            newAllocation['VTI'] = 40;
            newAllocation['VUG'] = 20;
            newAllocation['QQQ'] = 10;
            newAllocation['VEA'] = 15;
            newAllocation['BND'] = 10;
            newAllocation['GLD'] = 5;
            break;
            
        case 'income':
            // Emphasize JEPI, JEPQ, dividend stocks
            if (stage.includes('retirement') || stage.includes('pre')) {
                // Retirees: Heavy income focus
                newAllocation['JEPI'] = 30;
                newAllocation['JEPQ'] = 20;
                newAllocation['SCHD'] = 20;
                newAllocation['VYM'] = 10;
                newAllocation['BND'] = 15;
                newAllocation['GLD'] = 5;
            } else {
                // Working: More growth with income tilt
                newAllocation['JEPI'] = 20;
                newAllocation['JEPQ'] = 15;
                newAllocation['SCHD'] = 15;
                newAllocation['VOO'] = 20;
                newAllocation['BND'] = 20;
                newAllocation['GLD'] = 10;
            }
            break;
            
        case 'balance':
            // Balanced stocks and bonds
            if (stage.includes('young')) {
                newAllocation['VOO'] = 40;
                newAllocation['VTV'] = 15;
                newAllocation['SCHD'] = 10;
                newAllocation['VEA'] = 10;
                newAllocation['BND'] = 20;
                newAllocation['GLD'] = 5;
            } else {
                newAllocation['VOO'] = 30;
                newAllocation['VTV'] = 15;
                newAllocation['SCHD'] = 10;
                newAllocation['BND'] = 30;
                newAllocation['AGG'] = 10;
                newAllocation['GLD'] = 5;
            }
            break;
            
        case 'preservation':
            // Heavy bonds, defensive stocks
            newAllocation['USMV'] = 15;
            newAllocation['QUAL'] = 10;
            newAllocation['SCHD'] = 10;
            newAllocation['BND'] = 30;
            newAllocation['AGG'] = 15;
            newAllocation['TIP'] = 10;
            newAllocation['GLD'] = 10;
            break;
            
        default:
            return basePortfolio;
    }
    
    adjusted.allocation = newAllocation;
    return adjusted;
}

// Generate explanation for blended portfolio
function generateBlendedExplanation(goals, lifeStage, allocation) {
    const goalDescriptions = {
        growth: "capital appreciation",
        income: "reliable income generation",
        balance: "balanced growth and stability",
        preservation: "capital preservation and downside protection"
    };
    
    const goalList = goals.map(g => goalDescriptions[g] || g).join(' and ');
    
    const stockPct = calculateStockAllocation(allocation);
    const bondPct = 100 - stockPct;
    
    let explanation = `This portfolio is optimized for ${goalList}. `;
    explanation += `With ${stockPct}% stocks and ${bondPct}% bonds, it balances your multiple objectives. `;
    
    // Add goal-specific notes
    if (goals.includes('income')) {
        explanation += `Income-producing assets (JEPI, JEPQ, SCHD) provide reliable cash flow. `;
    }
    if (goals.includes('growth')) {
        explanation += `Growth-oriented holdings (VTI, VUG, QQQ) target capital appreciation. `;
    }
    if (goals.includes('balance')) {
        explanation += `Balanced allocation provides stability without sacrificing returns. `;
    }
    if (goals.includes('preservation')) {
        explanation += `Defensive positioning with bonds and low-volatility stocks protects against downturns. `;
    }
    
    explanation += `This multi-goal approach ensures your portfolio serves all your investment priorities.`;
    
    return explanation;
}

console.log('✓ Goal-based portfolio blending system loaded');
