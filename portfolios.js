// Saved portfolios
// This file stores pre-configured portfolios that users have saved

let SAVED_PORTFOLIOS = [
    {
        name: "Sample: 60/40 Classic",
        timestamp: "2024-12-01T00:00:00.000Z",
        holdings: [
            { symbol: "VOO", weight: 60 },
            { symbol: "BND", weight: 40 }
        ]
    },
    {
        name: "Sample: Tech Growth",
        timestamp: "2024-12-01T00:00:00.000Z",
        holdings: [
            { symbol: "QQQ", weight: 40 },
            { symbol: "VGT", weight: 30 },
            { symbol: "VUG", weight: 20 },
            { symbol: "BND", weight: 10 }
        ]
    },
    {
        name: "Sample: Balanced Factor",
        timestamp: "2024-12-01T00:00:00.000Z",
        holdings: [
            { symbol: "VOO", weight: 20 },
            { symbol: "VEU", weight: 15 },
            { symbol: "SCHD", weight: 15 },
            { symbol: "QUAL", weight: 10 },
            { symbol: "VTV", weight: 10 },
            { symbol: "MTUM", weight: 10 },
            { symbol: "VGT", weight: 5 },
            { symbol: "VB", weight: 5 },
            { symbol: "BND", weight: 5 },
            { symbol: "GLD", weight: 3 },
            { symbol: "VNQ", weight: 2 }
        ]
    },
    {
        name: "Sample: International Diversified",
        timestamp: "2024-12-01T00:00:00.000Z",
        holdings: [
            { symbol: "VOO", weight: 30 },
            { symbol: "VEU", weight: 25 },
            { symbol: "VEA", weight: 20 },
            { symbol: "VWO", weight: 15 },
            { symbol: "BND", weight: 10 }
        ]
    }
];

console.log('Portfolio data loaded successfully!');