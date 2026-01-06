// Life-Stage Portfolios Feature
// Personalized portfolio recommendations based on investor profile

// User profile storage
let userProfile = null;

// Initialize life-stage feature
function initLifeStageFeature() {
    // Load saved profile if exists
    loadUserProfile();
    
    // Check if we should show onboarding
    if (!userProfile) {
        console.log('No user profile found - ready to show questionnaire');
    }
}

// Save user profile to localStorage
function saveUserProfile(profile) {
    userProfile = profile;
    localStorage.setItem('alphatic_user_profile', JSON.stringify(profile));
    console.log('User profile saved:', profile);
}

// Load user profile from localStorage
function loadUserProfile() {
    const saved = localStorage.getItem('alphatic_user_profile');
    if (saved) {
        try {
            userProfile = JSON.parse(saved);
            console.log('User profile loaded:', userProfile);
        } catch (e) {
            console.error('Error loading user profile:', e);
            userProfile = null;
        }
    }
}

// Show life-stage questionnaire
function showLifeStageQuestionnaire() {
    const container = document.getElementById('life-stage-content');
    
    const html = `
        <div class="max-w-3xl mx-auto">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold text-gray-900 mb-3">
                    👤 Find Your Personalized Portfolio
                </h2>
                <p class="text-lg text-gray-600">
                    Answer 4 quick questions to get a portfolio recommendation tailored to your life stage and goals.
                </p>
            </div>
            
            <div class="bg-white rounded-lg shadow-lg p-8">
                <form id="life-stage-form" onsubmit="handleLifeStageSubmit(event)">
                    <!-- Question 1: Age -->
                    <div class="mb-8">
                        <label class="block text-sm font-semibold text-gray-700 mb-3">
                            1. What is your age?
                        </label>
                        <input 
                            type="number" 
                            id="user-age" 
                            name="age" 
                            min="18" 
                            max="100" 
                            required
                            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                            placeholder="e.g., 42"
                        />
                        <p class="mt-2 text-sm text-gray-500">Your current age in years</p>
                    </div>
                    
                    <!-- Question 2: Retirement Status/Years -->
                    <div class="mb-8">
                        <label class="block text-sm font-semibold text-gray-700 mb-3">
                            2. Are you currently retired?
                        </label>
                        <div class="space-y-3">
                            <label class="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition">
                                <input 
                                    type="radio" 
                                    name="retirement-status" 
                                    value="no" 
                                    required
                                    onchange="toggleRetirementYears(false)"
                                    class="mr-3 h-5 w-5"
                                />
                                <span class="text-base">No, I'm still working</span>
                            </label>
                            <label class="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition">
                                <input 
                                    type="radio" 
                                    name="retirement-status" 
                                    value="yes"
                                    onchange="toggleRetirementYears(true)"
                                    class="mr-3 h-5 w-5"
                                />
                                <span class="text-base">Yes, I'm retired</span>
                            </label>
                        </div>
                        
                        <div id="years-to-retirement-container" class="mt-4" style="display: none;">
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Years until retirement:
                            </label>
                            <input 
                                type="number" 
                                id="years-to-retirement" 
                                name="yearsToRetirement" 
                                min="1" 
                                max="50"
                                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                                placeholder="e.g., 15"
                            />
                        </div>
                    </div>
                    
                    <!-- Question 3: Risk Tolerance -->
                    <div class="mb-8">
                        <label class="block text-sm font-semibold text-gray-700 mb-3">
                            3. How would you describe your risk tolerance?
                        </label>
                        <div class="space-y-3">
                            <label class="flex items-start p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition">
                                <input 
                                    type="radio" 
                                    name="risk-tolerance" 
                                    value="conservative" 
                                    required
                                    class="mr-3 h-5 w-5 mt-0.5"
                                />
                                <div class="flex-1">
                                    <span class="text-base font-medium">Conservative</span>
                                    <p class="text-sm text-gray-600 mt-1">I prefer stability over high returns. Market drops make me very uncomfortable.</p>
                                </div>
                            </label>
                            <label class="flex items-start p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition">
                                <input 
                                    type="radio" 
                                    name="risk-tolerance" 
                                    value="moderate"
                                    class="mr-3 h-5 w-5 mt-0.5"
                                />
                                <div class="flex-1">
                                    <span class="text-base font-medium">Moderate</span>
                                    <p class="text-sm text-gray-600 mt-1">I can handle some volatility for better returns. Short-term drops are okay if long-term outlook is good.</p>
                                </div>
                            </label>
                            <label class="flex items-start p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition">
                                <input 
                                    type="radio" 
                                    name="risk-tolerance" 
                                    value="aggressive"
                                    class="mr-3 h-5 w-5 mt-0.5"
                                />
                                <div class="flex-1">
                                    <span class="text-base font-medium">Aggressive</span>
                                    <p class="text-sm text-gray-600 mt-1">I want maximum growth and can handle significant volatility. I won't panic during crashes.</p>
                                </div>
                            </label>
                        </div>
                    </div>
                    
                    <!-- Question 4: Primary Goals (Multiple Selection) -->
                    <div class="mb-8">
                        <label class="block text-sm font-semibold text-gray-700 mb-3">
                            4. What are your investment goals? (Select all that apply)
                        </label>
                        <p class="text-sm text-gray-600 mb-3">💡 Most investors have multiple goals. Select your top priorities.</p>
                        <div class="space-y-3">
                            <label class="flex items-start p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                                <input 
                                    type="checkbox" 
                                    name="goals" 
                                    value="growth"
                                    class="mr-3 h-5 w-5 mt-0.5 rounded"
                                />
                                <div class="flex-1">
                                    <span class="text-base font-medium">Growth</span>
                                    <p class="text-sm text-gray-600 mt-1">Maximize long-term wealth accumulation</p>
                                </div>
                            </label>
                            <label class="flex items-start p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                                <input 
                                    type="checkbox" 
                                    name="goals" 
                                    value="balance"
                                    class="mr-3 h-5 w-5 mt-0.5 rounded"
                                />
                                <div class="flex-1">
                                    <span class="text-base font-medium">Balance</span>
                                    <p class="text-sm text-gray-600 mt-1">Balance growth with capital preservation</p>
                                </div>
                            </label>
                            <label class="flex items-start p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                                <input 
                                    type="checkbox" 
                                    name="goals" 
                                    value="income"
                                    class="mr-3 h-5 w-5 mt-0.5 rounded"
                                />
                                <div class="flex-1">
                                    <span class="text-base font-medium">Income</span>
                                    <p class="text-sm text-gray-600 mt-1">Generate reliable dividend income</p>
                                </div>
                            </label>
                            <label class="flex items-start p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50 transition has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                                <input 
                                    type="checkbox" 
                                    name="goals" 
                                    value="preservation"
                                    class="mr-3 h-5 w-5 mt-0.5 rounded"
                                />
                                <div class="flex-1">
                                    <span class="text-base font-medium">Preservation</span>
                                    <p class="text-sm text-gray-600 mt-1">Protect capital and minimize losses</p>
                                </div>
                            </label>
                        </div>
                        <p class="mt-2 text-xs text-gray-500">
                            <strong>Tip:</strong> "Growth + Income" or "Balance + Preservation" are common combinations
                        </p>
                    </div>
                    
                    <!-- Submit Button -->
                    <div class="mt-8">
                        <button 
                            type="submit"
                            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition shadow-lg"
                        >
                            Get My Personalized Portfolio →
                        </button>
                    </div>
                </form>
            </div>
            
            <!-- Info Box -->
            <div class="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <span class="text-2xl">ℹ️</span>
                    </div>
                    <div class="ml-3">
                        <p class="text-sm text-blue-700">
                            <strong>Privacy Note:</strong> Your information is stored only on your device and is never sent to any server.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// Toggle years to retirement field
function toggleRetirementYears(isRetired) {
    const container = document.getElementById('years-to-retirement-container');
    const input = document.getElementById('years-to-retirement');
    
    if (isRetired) {
        container.style.display = 'none';
        input.removeAttribute('required');
        input.value = '0';
        // Also disable to prevent validation
        input.disabled = true;
    } else {
        container.style.display = 'block';
        input.setAttribute('required', 'required');
        input.disabled = false;
    }
}

// Handle questionnaire form submission
function handleLifeStageSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    // Collect all selected goals
    const selectedGoals = [];
    for (const [key, value] of formData.entries()) {
        if (key === 'goals') {
            selectedGoals.push(value);
        }
    }
    
    // Validate at least one goal is selected
    if (selectedGoals.length === 0) {
        alert('Please select at least one investment goal');
        return;
    }
    
    const profile = {
        age: parseInt(formData.get('age')),
        isRetired: formData.get('retirement-status') === 'yes',
        yearsToRetirement: formData.get('retirement-status') === 'yes' ? 0 : parseInt(formData.get('yearsToRetirement') || 0),
        riskTolerance: formData.get('risk-tolerance'),
        goals: selectedGoals,  // Now an array
        primaryGoal: selectedGoals[0], // Use first selected as primary for backward compatibility
        createdAt: new Date().toISOString()
    };
    
    // Save profile
    saveUserProfile(profile);
    
    // Show recommendation
    showLifeStageRecommendation();
}

// Show life-stage recommendation
function showLifeStageRecommendation() {
    if (!userProfile) {
        showLifeStageQuestionnaire();
        return;
    }
    
    // Classify life stage
    const lifeStageKey = classifyLifeStage(userProfile);
    const lifeStage = LIFE_STAGE_TEMPLATES[lifeStageKey];
    
    if (!lifeStage) {
        console.error('Could not find life stage template:', lifeStageKey);
        return;
    }
    
    // Use goal-based blending if goals are present
    let portfolio;
    if (userProfile.goals && userProfile.goals.length > 0 && typeof blendGoalPortfolios === 'function') {
        console.log('Using goal-based portfolio blending for goals:', userProfile.goals);
        portfolio = blendGoalPortfolios(lifeStageKey, userProfile.riskTolerance, userProfile.goals);
    } else {
        // Fallback to old system if goals not available
        console.log('Using traditional risk-based portfolio');
        const recommendation = recommendPortfolio(lifeStageKey, userProfile.riskTolerance);
        portfolio = recommendation.portfolio;
    }
    
    if (!portfolio) {
        console.error('Could not generate portfolio recommendation');
        return;
    }
    
    const portfolioType = userProfile.riskTolerance;
    
    const container = document.getElementById('life-stage-content');
    
    // Calculate portfolio metrics
    const totalAllocation = Object.values(portfolio.allocation).reduce((sum, val) => sum + val, 0);
    const stockAllocation = calculateStockAllocation(portfolio.allocation);
    const bondAllocation = 100 - stockAllocation;
    
    html = `
        <div class="max-w-6xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-8">
                <div class="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                    <span class="text-4xl">${lifeStage.icon}</span>
                </div>
                <h2 class="text-3xl font-bold text-gray-900 mb-2">
                    Your Recommended Portfolio
                </h2>
                <p class="text-lg text-gray-600">
                    Based on your profile: ${lifeStage.name} • ${capitalize(portfolioType)} Risk
                </p>
                ${userProfile.goals && userProfile.goals.length > 0 ? `
                    <div class="mt-2 flex items-center justify-center gap-2">
                        <span class="text-sm text-gray-500">Goals:</span>
                        ${userProfile.goals.map(goal => `
                            <span class="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                ${capitalize(goal)}
                            </span>
                        `).join('')}
                    </div>
                ` : ''}
                <button 
                    onclick="showLifeStageQuestionnaire()"
                    class="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                    ← Update Your Profile
                </button>
            </div>
            
            <!-- Main Recommendation Card -->
            <div class="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-2xl p-8 text-white mb-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Left: Portfolio Name & Description -->
                    <div>
                        <h3 class="text-2xl font-bold mb-3">${portfolio.name}</h3>
                        <p class="text-blue-100 mb-6">${portfolio.description}</p>
                        
                        <div class="space-y-3">
                            <div class="flex items-center justify-between bg-white bg-opacity-20 rounded-lg p-3">
                                <span class="font-medium">Expected Return</span>
                                <span class="text-xl font-bold">${portfolio.expected_cagr.toFixed(1)}% / year</span>
                            </div>
                            <div class="flex items-center justify-between bg-white bg-opacity-20 rounded-lg p-3">
                                <span class="font-medium">Volatility</span>
                                <span class="text-xl font-bold">${portfolio.expected_volatility.toFixed(1)}%</span>
                            </div>
                            <div class="flex items-center justify-between bg-white bg-opacity-20 rounded-lg p-3">
                                <span class="font-medium">Worst Expected Year</span>
                                <span class="text-xl font-bold">${portfolio.max_drawdown}%</span>
                            </div>
                            ${portfolio.current_yield ? `
                            <div class="flex items-center justify-between bg-white bg-opacity-20 rounded-lg p-3">
                                <span class="font-medium">Current Yield</span>
                                <span class="text-xl font-bold">${portfolio.current_yield.toFixed(1)}%</span>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <!-- Right: Asset Allocation Chart -->
                    <div>
                        <h4 class="text-lg font-semibold mb-4">Asset Allocation</h4>
                        
                        <!-- Stocks/Bonds Breakdown -->
                        <div class="mb-4">
                            <div class="flex justify-between text-sm mb-2">
                                <span>Stocks: ${stockAllocation}%</span>
                                <span>Bonds: ${bondAllocation}%</span>
                            </div>
                            <div class="h-8 bg-white bg-opacity-20 rounded-lg overflow-hidden flex">
                                <div class="bg-green-400" style="width: ${stockAllocation}%"></div>
                                <div class="bg-blue-300" style="width: ${bondAllocation}%"></div>
                            </div>
                        </div>
                        
                        <!-- Individual Holdings -->
                        <div class="space-y-2">
                            ${Object.entries(portfolio.allocation).map(([ticker, pct]) => {
                                const etf = ETF_LOOKUP[ticker] || {};
                                return `
                                    <div class="flex items-center justify-between bg-white bg-opacity-20 rounded-lg p-2">
                                        <div class="flex-1">
                                            <span class="font-semibold">${ticker}</span>
                                            <span class="text-sm text-blue-100 ml-2">${etf.name || ''}</span>
                                        </div>
                                        <span class="font-bold text-lg">${pct}%</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
                
                <!-- Load Portfolio Button -->
                <div class="mt-8 flex gap-4">
                    <button 
                        onclick="loadLifeStagePortfolio()"
                        class="flex-1 bg-white text-blue-700 font-bold py-4 px-6 rounded-lg text-lg hover:bg-blue-50 transition shadow-lg"
                    >
                        📊 Load This Portfolio
                    </button>
                    <button 
                        onclick="backtestLifeStagePortfolio()"
                        class="flex-1 bg-blue-800 text-white font-bold py-4 px-6 rounded-lg text-lg hover:bg-blue-900 transition"
                    >
                        📈 View Detailed Backtest
                    </button>
                </div>
            </div>
            
            <!-- Why This Portfolio Section -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div class="bg-white rounded-lg shadow p-6">
                    <h4 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <span class="text-2xl mr-2">💡</span>
                        Why This Allocation?
                    </h4>
                    <p class="text-gray-700 mb-4">${portfolio.explanation}</p>
                    <div class="text-sm text-gray-600">
                        <strong>Rebalance:</strong> ${portfolio.rebalance_frequency}
                    </div>
                </div>
                
                <div class="bg-white rounded-lg shadow p-6">
                    <h4 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                        <span class="text-2xl mr-2">🎯</span>
                        Your Life Stage: ${lifeStage.name}
                    </h4>
                    <p class="text-gray-700 mb-4">${lifeStage.philosophy}</p>
                </div>
            </div>
            
            <!-- Key Principles -->
            <div class="bg-white rounded-lg shadow p-6 mb-8">
                <h4 class="text-lg font-bold text-gray-900 mb-4">✅ Key Principles for Your Stage</h4>
                <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    ${lifeStage.key_principles.map(principle => `
                        <li class="flex items-start">
                            <span class="text-green-600 mr-2 text-xl">✓</span>
                            <span class="text-gray-700">${principle}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <!-- Common Mistakes to Avoid -->
            <div class="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-8">
                <h4 class="text-lg font-bold text-red-900 mb-4 flex items-center">
                    <span class="text-2xl mr-2">⚠️</span>
                    Common Mistakes to Avoid
                </h4>
                <ul class="space-y-2">
                    ${lifeStage.common_mistakes.map(mistake => `
                        <li class="flex items-start text-red-800">
                            <span class="mr-2">•</span>
                            <span>${mistake}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <!-- Other Risk Variants -->
            <div class="bg-gray-50 rounded-lg p-6">
                <h4 class="text-lg font-bold text-gray-900 mb-4">Other Options for ${lifeStage.name}</h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    ${Object.entries(lifeStage.portfolios).map(([type, port]) => `
                        <button 
                            onclick="changeRiskTolerance('${type}')"
                            class="text-left p-4 border-2 ${type === portfolioType ? 'border-blue-600 bg-blue-50' : 'border-gray-300 bg-white'} rounded-lg hover:border-blue-400 transition"
                        >
                            <div class="font-bold text-gray-900 mb-1">${port.name}</div>
                            <div class="text-sm text-gray-600 mb-2">${port.description}</div>
                            <div class="text-xs text-gray-500">
                                Expected: ${port.expected_cagr.toFixed(1)}% / year
                            </div>
                            ${type === portfolioType ? '<div class="mt-2 text-xs text-blue-600 font-semibold">✓ Currently Selected</div>' : ''}
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// Helper: Calculate stock allocation percentage
function calculateStockAllocation(allocation) {
    const stockETFs = ['SPY', 'VOO', 'VTI', 'QQQ', 'VUG', 'VTV', 'VB', 'IWM', 'VEA', 'VWO', 'AVUV', 'AVDV', 
                       'IJR', 'IVE', 'IVW', 'IWF', 'MTUM', 'QUAL', 'USMV', 'SIZE', 'SCHD', 'VYM', 'VYMI', 
                       'HDV', 'VXUS', 'VEU', 'VGK', 'IEMG', 'EEM', 'VGT', 'XLK', 'XLF', 'XLE', 'XLV', 
                       'XLI', 'VNQ', 'SCHG', 'SCHV', 'IMOM'];
    
    let stockPct = 0;
    for (const [ticker, pct] of Object.entries(allocation)) {
        if (stockETFs.includes(ticker)) {
            stockPct += pct;
        }
    }
    return Math.round(stockPct);
}

// Helper: Capitalize first letter
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Load life-stage portfolio into main portfolio
function loadLifeStagePortfolio() {
    if (!userProfile) return;
    
    const lifeStageKey = classifyLifeStage(userProfile);
    const recommendation = recommendPortfolio(lifeStageKey, userProfile.riskTolerance);
    
    if (!recommendation) return;
    
    const { portfolio } = recommendation;
    
    // Convert allocation to portfolio format
    const portfolioData = {
        name: portfolio.name,
        allocation: portfolio.allocation,
        createdFrom: 'life-stage-recommendation',
        createdAt: new Date().toISOString()
    };
    
    // Load into current portfolio
    currentPortfolio = portfolioData;
    localStorage.setItem('alphatic_current_portfolio', JSON.stringify(portfolioData));
    
    // Update UI
    renderETFSelector();
    
    // Show success message
    alert(`✅ Portfolio "${portfolio.name}" loaded successfully!\n\nGo to the Portfolio Cockpit or Analytics Studio to view detailed analysis.`);
    
    // Switch to Portfolio Cockpit
    showView('cockpit');
}

// Backtest life-stage portfolio
function backtestLifeStagePortfolio() {
    if (!userProfile) return;
    
    const lifeStageKey = classifyLifeStage(userProfile);
    const recommendation = recommendPortfolio(lifeStageKey, userProfile.riskTolerance);
    
    if (!recommendation) return;
    
    const { portfolio } = recommendation;
    
    // Load portfolio first
    loadLifeStagePortfolio();
    
    // Then switch to backtest view
    setTimeout(() => {
        showView('backtest');
        runBacktest();
    }, 500);
}

// Change risk tolerance and update recommendation
function changeRiskTolerance(newRiskTolerance) {
    if (!userProfile) return;
    
    userProfile.riskTolerance = newRiskTolerance;
    saveUserProfile(userProfile);
    showLifeStageRecommendation();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initLifeStageFeature();
});

console.log('Life-Stage Portfolios feature loaded! 🎯');