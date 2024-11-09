// Calculation related functions
function getAscensionGain() {
    let gain = Math.floor(gameData.basic.basicPoints / 1e6)
    return gain
}
function getTierProgressGain() {
    let gain = gameData.basic.rank
    if (gameData.ascension.ascensionTreeUpgrades.includes("3-0")) {
        gain = gain * 5
    }
    if (gameData.ascension.tier >= 2) {
        gain = gain * (gameData.basic.clovers / 1e6 + 1)
    }
    return gain
}
function getTierReq() {
    let req = 10
    req = req * (1 + 2 * (gameData.ascension.tier - 1)) * Math.pow(3.25, gameData.ascension.tier - 1)
    return req
}
// Checking related functions
function checkTierProgress() {
    if (gameData.ascension.tierProgress >= getTierReq()) {
        gameData.ascension.tierProgress -= getTierReq()
        gameData.ascension.tier++
    }
}
// Clickable related functions 
function ascensionReset() {
    if (gameData.basic.basicPoints >= 1e6 && gameData.basic.rank >= 10) {
        // Earn currencies
        gameData.ascension.ascensionPoints += getAscensionGain()
        gameData.ascension.tierProgress += getTierProgressGain()
        // Reset content
        gameData.basic.basicPoints = 0
        gameData.basic.upg1Level = 0
        gameData.basic.upg2Level = 0
        gameData.basic.rank = 0
        gameData.basic.rankProgress = 0
        gameData.basic.boostDuration = 0
        gameData.basic.currentActivePrimaryBoost = "None"
        gameData.basic.currentActiveSecondaryBoost = "None"
        updateAscTree()
    }
}
// Upgrade tree array
var ascensionTree = {
    0: {
        0: {
            name: "Welcome to Ascension",
            description: "x2 Rank Progress gain from clicking and upgrades.",
            cost: 1,
            requirement: true
        }
    },
    1: {
        0: {
            name: "Longer Boosts",
            description: "Boosts are 4 clicks longer.",
            cost: 4,
            requirement: true
        },
        1: {
            name: "Better Upgrades",
            description: "x4 rank progress gain from upgrades.",
            cost: 4,
            requirement: true
        }
    },
    2: {
        0: {
            name: "Ascended Basic Points",
            description: "x5 basic point gain.",
            cost: 9,
            requirement: true
        },
        1: {
            name: "Ascended Rank Progress",
            description: "x3 rank progress gain from clicking.",
            cost: 9,
            requirement: true
        },
        2: {
            name: "Ascended Clovers",
            description: "x5 clover gain.",
            cost: 9,
            requirement: true
        }
    },
    3: {
        0: {
            name: "Tier Up",
            description: "x5 Tier Progress gain. Requires \"Ascended Rank Progress\".",
            cost: 16,
            requirement: gameData.ascension.ascensionTreeUpgrades.includes("2-1")
        }
    }
}
// Upgrade tree related functions
function buyAscTreeUpg(layer, position) {
    if (gameData.ascension.ascensionPoints >= ascensionTree[layer][position].cost && ascensionTree[layer][position].requirement) {
        gameData.ascension.ascensionPoints -= ascensionTree[layer][position].cost
        gameData.ascension.ascensionTreeUpgrades.push(layer + "-" + position)
        if (layer + 1 > gameData.ascension.highestLayer) {
            gameData.ascension.highestLayer = layer + 1
        }
        updateAscTree()
    }
}