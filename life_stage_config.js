// Life-Stage Portfolio Templates and Configuration
// This file defines portfolio recommendations for different life stages

const LIFE_STAGE_TEMPLATES = {
    young_accumulator: {
        name: "Young Accumulator",
        subtitle: "Building Wealth for the Future",
        description: "You have time to weather market volatility and benefit from long-term growth. Focus on aggressive accumulation.",
        age_range: [25, 40],
        years_to_retirement_min: 20,
        icon: "🚀",
        
        philosophy: "Time is your greatest asset. With 20+ years until retirement, you can afford to take on volatility in exchange for higher growth potential. Market crashes are temporary setbacks that become buying opportunities over decades.",
        
        key_principles: [
            "Maximize stock allocation (90-100%)",
            "Embrace volatility - it becomes growth over time",
            "Focus on growth and momentum factors",
            "Keep minimal bonds (0-10%) for stability",
            "Rebalance annually to maintain discipline"
        ],
        
        common_mistakes: [
            "Being too conservative and missing growth",
            "Panic selling during market crashes",
            "Over-diversifying into too many funds",
            "Chasing hot stocks instead of broad ETFs"
        ],
        
        portfolios: {
            aggressive: {
                name: "Aggressive Growth",
                description: "Maximum growth potential for investors with high risk tolerance",
                allocation: {
                    'VTI': 60,   // Total US Market
                    'VUG': 20,   // US Large Growth
                    'VWO': 10,   // Emerging Markets
                    'AVUV': 5,   // US Small Value
                    'MTUM': 5    // Momentum
                },
                expected_cagr: 9.5,
                expected_volatility: 18.0,
                max_drawdown: -52,
                sharpe_ratio: 0.65,
                rebalance_frequency: "Annually",
                explanation: "This portfolio maximizes growth through broad US exposure (80%) with tactical tilts to emerging markets and small-cap value. Expect significant volatility but strong long-term returns."
            },
            moderate: {
                name: "Growth with Cushion",
                description: "Strong growth with a small bond cushion for stability",
                allocation: {
                    'VTI': 60,   // Total US Market
                    'VEA': 15,   // Developed International
                    'VWO': 10,   // Emerging Markets
                    'BND': 10,   // Total Bond
                    'VUG': 5     // US Large Growth
                },
                expected_cagr: 8.5,
                expected_volatility: 15.0,
                max_drawdown: -45,
                sharpe_ratio: 0.70,
                rebalance_frequency: "Annually",
                explanation: "Balanced growth portfolio with 90% stocks and 10% bonds. The small bond allocation provides slight cushion during crashes while maintaining strong growth potential."
            },
            conservative: {
                name: "Balanced Builder",
                description: "For young investors who prefer less volatility",
                allocation: {
                    'VOO': 50,   // S&P 500
                    'VEA': 15,   // Developed International
                    'BND': 20,   // Total Bond
                    'VTV': 10,   // US Large Value
                    'SCHD': 5    // Dividend Growth
                },
                expected_cagr: 7.5,
                expected_volatility: 12.0,
                max_drawdown: -38,
                sharpe_ratio: 0.75,
                rebalance_frequency: "Semi-annually",
                explanation: "More conservative approach with 75% stocks, 25% bonds. Suitable for young investors with lower risk tolerance or shorter actual time horizon."
            }
        }
    },
    
    peak_earner: {
        name: "Peak Earner",
        subtitle: "Balancing Growth and Protection",
        description: "You're in your highest earning years. Continue growing wealth while starting to think about preservation.",
        age_range: [40, 55],
        years_to_retirement_min: 10,
        icon: "📈",
        
        philosophy: "You have 10-25 years until retirement - enough time to recover from crashes, but you also need to protect the wealth you've built. Balance is key: continue aggressive growth while adding stability.",
        
        key_principles: [
            "Maintain 70-85% stock allocation",
            "Add meaningful bond allocation (20-30%)",
            "Focus on quality and dividend growth",
            "Consider tax efficiency (high bracket)",
            "Rebalance semi-annually"
        ],
        
        common_mistakes: [
            "Getting too conservative too early",
            "Market timing after seeing one crash",
            "Neglecting international diversification",
            "Forgetting about tax optimization"
        ],
        
        portfolios: {
            aggressive: {
                name: "Growth with Protection",
                description: "Continued growth focus with meaningful bond cushion",
                allocation: {
                    'VOO': 40,   // S&P 500
                    'VUG': 15,   // US Large Growth
                    'VEA': 15,   // Developed International
                    'BND': 20,   // Total Bond
                    'SCHD': 10   // Dividend Growth
                },
                expected_cagr: 8.0,
                expected_volatility: 14.0,
                max_drawdown: -40,
                sharpe_ratio: 0.75,
                rebalance_frequency: "Semi-annually",
                explanation: "80% stocks with quality tilt, 20% bonds. Maintains strong growth while starting to build downside protection."
            },
            moderate: {
                name: "Balanced Growth",
                description: "Equal emphasis on growth and stability",
                allocation: {
                    'VOO': 35,   // S&P 500
                    'VTV': 15,   // US Large Value
                    'VEA': 10,   // Developed International
                    'SCHD': 10,  // Dividend Growth
                    'BND': 20,   // Total Bond
                    'AGG': 10    // Aggregate Bond
                },
                expected_cagr: 7.0,
                expected_volatility: 12.0,
                max_drawdown: -35,
                sharpe_ratio: 0.80,
                rebalance_frequency: "Semi-annually",
                explanation: "70% stocks, 30% bonds. This is the classic 'balanced' allocation suitable for most investors at this life stage."
            },
            conservative: {
                name: "Stability First",
                description: "For those prioritizing capital preservation",
                allocation: {
                    'VOO': 30,   // S&P 500
                    'SCHD': 15,  // Dividend Growth
                    'VEA': 10,   // Developed International
                    'BND': 25,   // Total Bond
                    'AGG': 15,   // Aggregate Bond
                    'TIP': 5     // TIPS
                },
                expected_cagr: 6.0,
                expected_volatility: 10.0,
                max_drawdown: -28,
                sharpe_ratio: 0.85,
                rebalance_frequency: "Quarterly",
                explanation: "55% stocks, 45% bonds. More conservative for those with lower risk tolerance or planning early retirement."
            }
        }
    },
    
    pre_retirement: {
        name: "Pre-Retirement",
        subtitle: "Protecting What You've Built",
        description: "You're in the danger zone. Protect against sequence-of-returns risk while maintaining some growth.",
        age_range: [55, 65],
        years_to_retirement_max: 10,
        icon: "🛡️",
        
        philosophy: "The 5-10 years before retirement are critical. A market crash now could force you to delay retirement by years. Shift focus from growth to preservation while maintaining enough stocks to combat inflation.",
        
        key_principles: [
            "Reduce stock allocation to 50-65%",
            "Increase bond allocation to 35-50%",
            "Focus on quality and low volatility",
            "Minimize sequence-of-returns risk",
            "Rebalance quarterly for tighter control"
        ],
        
        common_mistakes: [
            "Staying too aggressive too long",
            "Panic selling after a crash (locking in losses)",
            "Forgetting about inflation protection",
            "Ignoring required minimum distributions (RMDs)"
        ],
        
        portfolios: {
            aggressive: {
                name: "Conservative Growth",
                description: "Maintaining growth while reducing volatility",
                allocation: {
                    'VOO': 30,   // S&P 500
                    'SCHD': 15,  // Dividend Growth
                    'USMV': 10,  // Minimum Volatility
                    'VEA': 5,    // Developed International
                    'BND': 25,   // Total Bond
                    'TIP': 10,   // TIPS
                    'GLD': 5     // Gold
                },
                expected_cagr: 6.5,
                expected_volatility: 11.0,
                max_drawdown: -30,
                sharpe_ratio: 0.85,
                rebalance_frequency: "Quarterly",
                explanation: "60% stocks (with quality/low-vol tilt), 35% bonds, 5% gold. Reduces crash severity while maintaining inflation protection."
            },
            moderate: {
                name: "Capital Preservation",
                description: "Balanced protection with modest growth",
                allocation: {
                    'VOO': 25,   // S&P 500
                    'SCHD': 15,  // Dividend Growth
                    'USMV': 10,  // Minimum Volatility
                    'BND': 30,   // Total Bond
                    'TIP': 15,   // TIPS
                    'GLD': 5     // Gold
                },
                expected_cagr: 5.5,
                expected_volatility: 9.0,
                max_drawdown: -25,
                sharpe_ratio: 0.90,
                rebalance_frequency: "Quarterly",
                explanation: "50% stocks, 45% bonds, 5% gold. The standard pre-retirement allocation with emphasis on stability."
            },
            conservative: {
                name: "Maximum Protection",
                description: "Minimize volatility before retirement",
                allocation: {
                    'VOO': 20,   // S&P 500
                    'SCHD': 15,  // Dividend Growth
                    'BND': 35,   // Total Bond
                    'TIP': 20,   // TIPS
                    'SHY': 5,    // Short-term Treasury
                    'GLD': 5     // Gold
                },
                expected_cagr: 4.5,
                expected_volatility: 7.5,
                max_drawdown: -20,
                sharpe_ratio: 0.95,
                rebalance_frequency: "Quarterly",
                explanation: "35% stocks, 60% bonds, 5% gold. Very conservative for those prioritizing capital preservation above all."
            }
        }
    },
    
    in_retirement: {
        name: "In Retirement",
        subtitle: "Sustainable Income for Life",
        description: "You're living off your portfolio. Focus on reliable income, capital preservation, and inflation protection.",
        age_range: [65, 100],
        is_retired: true,
        icon: "🌴",
        
        philosophy: "Your portfolio must generate income for potentially 30+ years. Balance the need for current income with protection against inflation. The goal is longevity - making your money last as long as you do.",
        
        key_principles: [
            "Target 30-40% stock allocation",
            "Focus on dividend-paying ETFs",
            "Keep 50-60% in bonds for stability",
            "Maintain 3.5-4% sustainable withdrawal rate",
            "Protect against inflation with TIPS and stocks"
        ],
        
        common_mistakes: [
            "Withdrawing too much (>4% annually)",
            "Going 100% bonds (inflation risk)",
            "Panic selling during temporary crashes",
            "Not adjusting spending in down years"
        ],
        
        portfolios: {
            aggressive: {
                name: "Active Retirement",
                description: "For retirees with higher risk tolerance or larger portfolios",
                allocation: {
                    'VYM': 20,   // High Dividend Yield
                    'SCHD': 15,  // Dividend Growth
                    'USMV': 5,   // Minimum Volatility
                    'BND': 30,   // Total Bond
                    'TIP': 20,   // TIPS
                    'SHY': 5,    // Short-term Treasury
                    'GLD': 5     // Gold
                },
                expected_cagr: 5.5,
                expected_volatility: 9.0,
                max_drawdown: -22,
                sharpe_ratio: 0.90,
                current_yield: 3.8,
                rebalance_frequency: "Quarterly",
                explanation: "40% stocks (dividend-focused), 55% bonds, 5% gold. Provides ~3.8% current income with inflation protection."
            },
            moderate: {
                name: "Sustainable Income",
                description: "Standard retirement allocation for reliable income",
                allocation: {
                    'VYM': 15,   // High Dividend Yield
                    'SCHD': 15,  // Dividend Growth
                    'BND': 35,   // Total Bond
                    'TIP': 20,   // TIPS
                    'SHY': 10,   // Short-term Treasury
                    'GLD': 5     // Gold
                },
                expected_cagr: 4.5,
                expected_volatility: 7.5,
                max_drawdown: -18,
                sharpe_ratio: 0.95,
                current_yield: 4.0,
                rebalance_frequency: "Quarterly",
                explanation: "30% stocks, 65% bonds, 5% gold. Generates ~4% income with strong stability. Classic retirement portfolio."
            },
            conservative: {
                name: "Maximum Stability",
                description: "For those prioritizing safety over growth",
                allocation: {
                    'VYM': 10,   // High Dividend Yield
                    'SCHD': 10,  // Dividend Growth
                    'BND': 40,   // Total Bond
                    'TIP': 25,   // TIPS
                    'SHY': 10,   // Short-term Treasury
                    'GLD': 5     // Gold
                },
                expected_cagr: 3.8,
                expected_volatility: 6.0,
                max_drawdown: -15,
                sharpe_ratio: 1.00,
                current_yield: 4.2,
                rebalance_frequency: "As needed for income",
                explanation: "20% stocks, 75% bonds, 5% gold. Very stable with ~4.2% income. Minimal volatility but lower inflation protection."
            }
        }
    }
};

// Helper function to classify user into life stage
function classifyLifeStage(userProfile) {
    const { age, yearsToRetirement, isRetired } = userProfile;
    
    // In retirement
    if (isRetired || age >= 65) {
        return 'in_retirement';
    }
    
    // Pre-retirement
    if ((age >= 55 && age < 65) || (yearsToRetirement <= 10)) {
        return 'pre_retirement';
    }
    
    // Peak earner
    if (age >= 40 && age < 55 && yearsToRetirement > 10) {
        return 'peak_earner';
    }
    
    // Young accumulator
    if (age < 40 || yearsToRetirement >= 20) {
        return 'young_accumulator';
    }
    
    // Default to peak earner if unclear
    return 'peak_earner';
}

// Helper function to recommend portfolio based on risk tolerance
function recommendPortfolio(lifeStage, riskTolerance) {
    const template = LIFE_STAGE_TEMPLATES[lifeStage];
    
    if (!template) return null;
    
    // Map risk tolerance to portfolio type
    const portfolioType = riskTolerance === 'conservative' ? 'conservative' :
                         riskTolerance === 'aggressive' ? 'aggressive' : 'moderate';
    
    return {
        lifeStage: template,
        portfolio: template.portfolios[portfolioType],
        portfolioType: portfolioType
    };
}
