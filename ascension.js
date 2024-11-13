// Calculation related functions
function getAscensionGain() {
    let gain = Math.floor(gameData.basic.basicPoints / 1e6)
    if (gameData.ascension.tier >= 2) {
        gain = gain * (gameData.ascension.tier / 4 + 1)
    }
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
function checkHighestTier() {
    if (gameData.ascension.tier >= gameData.ascension.bestTier) {
        gameData.ascension.bestTier = gameData.ascension.tier
    }  
}
function getTierBonuses() {
    let ret = "<p class='ascensionText'>Tier 1: Nothing</p><p class='ascensionText'>Tier 2: x10 Clover gain, Clovers multiply Tier Progress gain at a reduced rate (1e6:1)</p>"
    if (gameData.ascension.bestTier >= 2) {
        ret = ret + "<p class='ascensionText'>Tier 3: Rank progress multiplier to clicking affect rank progress multiplier to upgrades at a reduced rate (5000:1)</p>"
    }
    if (gameData.ascension.bestTier >= 3) {
        ret = ret + "<p class='ascensionText'>Tier 4: +25% ascension point gain per tier</p>"
    }
    if (gameData.ascension.bestTier >= 4) {
        ret = ret + "<p class='ascensionText'>Tier 5: +1 boost length per tier starting at 3</p>"
    }
    return ret
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
            cost: 40,
            requirement: true
        },
        1: {
            name: "Better Upgrades",
            description: "x4 rank progress gain from upgrades.",
            cost: 40,
            requirement: true
        }
    },
    2: {
        0: {
            name: "Ascended Basic Points",
            description: "x5 basic point gain.",
            cost: 900,
            requirement: true
        },
        1: {
            name: "Ascended Rank Progress",
            description: "x3 rank progress gain from clicking.",
            cost: 900,
            requirement: true
        },
        2: {
            name: "Ascended Clovers",
            description: "x5 clover gain.",
            cost: 900,
            requirement: true
        }
    },
    3: {
        0: {
            name: "Tier Up",
            description: "x5 Tier Progress on ascension. This is the final upgrade (as of now).",
            cost: 16000,
            requirement: true
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
// Updater functions
function updateTierBonuses() {
    document.getElementById("tierBonuses").innerHTML = getTierBonuses()
    toggleDarkMode()
    toggleDarkMode()
}
