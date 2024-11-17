// Calculation related functions
function getAscensionGain() {
    let gain = Math.floor(gameData.basic.basicPoints / 1e6)
    if (gameData.ascension.tier >= 4) {
        gain = gain * (gameData.ascension.tier / 4 + 1)
    }
    if (gameData.ascension.tier >= 10) {
        gain = gain * Math.pow(1.05, gameData.ascension.tier - 10)
    }
    if (gameData.ascension.ascensionTreeUpgrades.includes("6-0")) {
        gain = gain * 2
    }
    if (gameData.basic.currentActivePrimaryBoost == "Ascension Boost") {
        gain = gain * 2
    }
    if (gameData.basic.currentActiveSecondaryBoost == "Ascension Boost") {
        gain = gain * 2
    }
    gain = gain * (Math.pow(1.15, gameData.ascension.ascensionAscenders))
    return gain
}
function getTierProgressGain() {
    let gain = gameData.basic.rank
    if (gameData.ascension.ascensionTreeUpgrades.includes("4-0")) {
        gain = gain * 5
    }
    if (gameData.ascension.tier >= 2) {
        gain = gain * (gameData.basic.clovers / 1e6 + 1)
    }
    if (gameData.ascension.tier >= 10) {
        gain = gain * Math.pow(1.1, gameData.ascension.tier - 10)
    }
    if (gameData.basic.currentActivePrimaryBoost == "Ascension Boost") {
        gain = gain * 2
    }
    if (gameData.basic.currentActiveSecondaryBoost == "Ascension Boost") {
        gain = gain * 2
    }
    if (checkSpecialBoost() == "Ranked Up Tier Boost") {
        gain = gain * (gameData.basic.rank / 10 + 1)
    }
    gain = gain * (Math.pow(1.15, gameData.ascension.tierAscenders))
    return gain
}
function getTierReq() {
    let req = 10
    req = req * (1 + 2 * (gameData.ascension.tier - 1)) * Math.pow(3.25, gameData.ascension.tier - 1)
    return req
}
function getBasicAscenderCost() {
    let cost = 1e8
    cost = cost * (1 + 0.5 * gameData.ascension.basicAscenders) * Math.pow(1.3, gameData.ascension.basicAscenders)
    if (gameData.ascension.basicAscenders >= 10) {
        cost = cost * (1 + 0.5 * (Math.pow(gameData.ascension.basicAscenders - 10 + 1, 1.5))) * Math.pow(1.3, Math.pow(gameData.ascension.basicAscenders - 10 + 1, 1.5))
    }
    return cost
}
function getCloverAscenderCost() {
    let cost = 2.5e8
    cost = cost * (1 + 0.5 * gameData.ascension.cloverAscenders) * Math.pow(1.3, gameData.ascension.cloverAscenders)
    if (gameData.ascension.cloverAscenders >= 10) {
        cost = cost * (1 + 0.5 * (Math.pow(gameData.ascension.cloverAscenders - 10 + 1, 1.5))) * Math.pow(1.3, Math.pow(gameData.ascension.cloverAscenders - 10 + 1, 1.5))
    }
    return cost
}
function getRankAscenderCost() {
    let cost = 5e8
    cost = cost * (1 + 0.5 * gameData.ascension.rankAscenders) * Math.pow(1.3, gameData.ascension.rankAscenders)
    if (gameData.ascension.rankAscenders >= 10) {
        cost = cost * (1 + 0.5 * (Math.pow(gameData.ascension.rankAscenders - 10 + 1, 1.5))) * Math.pow(1.3, Math.pow(gameData.ascension.rankAscenders - 10 + 1, 1.5))
    }
    return cost
}
function getTierAscenderCost() {
    let cost = 1e9
    cost = cost * (1 + 0.5 * gameData.ascension.tierAscenders) * Math.pow(1.3, gameData.ascension.tierAscenders)
    if (gameData.ascension.tierAscenders >= 10) {
        cost = cost * (1 + 0.5 * (Math.pow(gameData.ascension.tierAscenders - 10 + 1, 1.5))) * Math.pow(1.3, Math.pow(gameData.ascension.tierAscenders - 10 + 1, 1.5))
    }
    return cost
}
function getAscensionAscenderCost() {
    let cost = 2.5e9
    cost = cost * (1 + 0.5 * gameData.ascension.ascensionAscenders) * Math.pow(1.3, gameData.ascension.ascensionAscenders)
    if (gameData.ascension.ascensionAscenders >= 10) {
        cost = cost * (1 + 0.5 * (Math.pow(gameData.ascension.ascensionAscenders - 10 + 1, 1.5))) * Math.pow(1.3, Math.pow(gameData.ascension.ascensionAscenders - 10 + 1, 1.5))
    }
    return cost
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
        ret = ret + "<p class='ascensionText'>Tier 3: Rank progress multiplier to clicking affects rank progress multiplier to upgrades at a reduced rate (5000:1)</p>"
    }
    if (gameData.ascension.bestTier >= 3) {
        ret = ret + "<p class='ascensionText'>Tier 4: +25% ascension point gain per tier</p>"
    }
    if (gameData.ascension.bestTier >= 4) {
        ret = ret + "<p class='ascensionText'>Tier 5: +2 boost length per tier starting at 3</p>"
    }
    if (gameData.ascension.bestTier >= 5) {
        ret = ret + "<p class='ascensionText'>Tier 10: x1.1 ascension points and tier progress per tier starting at 10</p>"
    }
    if (gameData.ascension.bestTier >= 10) {
        ret = ret + "<p class='ascensionText'>Tier 20: Boosts remain active on ascension, and unlock a new boost</p>"
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
        if (!gameData.ascension.ascensionTreeUpgrades.includes("5-0")) {
            gameData.basic.upg1Level = 0
            gameData.basic.upg2Level = 0
            gameData.basic.upg3Level = 0
        }
        if (!gameData.ascension.ascensionTreeUpgrades.includes("5-2")) {
            gameData.basic.basicPoints = 0
            gameData.basic.rank = 0
            gameData.basic.rankProgress = 0
        }
        if (gameData.ascension.tier < 20) {
            gameData.basic.boostDuration = 0
            gameData.basic.currentActivePrimaryBoost = "None"
            gameData.basic.currentActiveSecondaryBoost = "None"
        }
        updateAscTree()
        let button = document.getElementById("ascensionResetButton")
        let button2 = document.getElementById("ascensionResetButton2")
        button.disabled = true
        button2.disabled = true
        setTimeout(function() {button.disabled = false; button2.disabled = false}, 1000)
    }
}
function toggleBasicAutoclick() {
    if (gameData.ascension.automationToggles.basicAutoclick == 0) {
        gameData.ascension.automationToggles.basicAutoclick = 1
    } else {
        gameData.ascension.automationToggles.basicAutoclick = 0
    }
}
function toggleCloverAutoclick() {
    if (gameData.ascension.automationToggles.cloverAutoclick == 0) {
        gameData.ascension.automationToggles.cloverAutoclick = 1
    } else {
        gameData.ascension.automationToggles.cloverAutoclick = 0
    }
}
function toggleBasicAutobuy() {
    if (gameData.ascension.automationToggles.basicAutobuy == 0) {
        gameData.ascension.automationToggles.basicAutobuy = 1
    } else {
        gameData.ascension.automationToggles.basicAutobuy = 0
    }
}
function toggleCloverAutobuy() {
    if (gameData.ascension.automationToggles.cloverAutobuy == 0) {
        gameData.ascension.automationToggles.cloverAutobuy = 1
    } else {
        gameData.ascension.automationToggles.cloverAutobuy = 0
    }
}
function toggleBoostAutobuy() {
    if (gameData.ascension.automationToggles.boostAutobuy == 0) {
        gameData.ascension.automationToggles.boostAutobuy = 1
    } else {
        gameData.ascension.automationToggles.boostAutobuy = 0
    }
}
function basicAscender() {
    if (gameData.ascension.ascensionPoints >= getBasicAscenderCost()) {
        gameData.ascension.ascensionPoints -= getBasicAscenderCost()
        gameData.ascension.basicAscenders++
    }
}
function cloverAscender() {
    if (gameData.ascension.ascensionPoints >= getCloverAscenderCost()) {
        gameData.ascension.ascensionPoints -= getCloverAscenderCost()
        gameData.ascension.cloverAscenders++
    }
}
function rankAscender() {
    if (gameData.ascension.ascensionPoints >= getRankAscenderCost()) {
        gameData.ascension.ascensionPoints -= getRankAscenderCost()
        gameData.ascension.rankAscenders++
    }
}
function tierAscender() {
    if (gameData.ascension.ascensionPoints >= getTierAscenderCost()) {
        gameData.ascension.ascensionPoints -= getTierAscenderCost()
        gameData.ascension.tierAscenders++
    }
}
function ascensionAscender() {
    if (gameData.ascension.ascensionPoints >= getAscensionAscenderCost()) {
        gameData.ascension.ascensionPoints -= getAscensionAscenderCost()
        gameData.ascension.ascensionAscenders++
    }
}
// Unlock related functions
function showAutomationToggles() {
    if (gameData.ascension.ascensionTreeUpgrades.includes("1-0")) {
        document.getElementById("basicAutoclickToggle").style.display = "inline-block"
    } else {
        document.getElementById("basicAutoclickToggle").style.display = "none"
    }
    if (gameData.ascension.ascensionTreeUpgrades.includes("1-1")) {
        document.getElementById("cloverAutoclickToggle").style.display = "inline-block"
    } else {
        document.getElementById("cloverAutoclickToggle").style.display = "none"
    }
    if (gameData.ascension.ascensionTreeUpgrades.includes("2-2")) {
        document.getElementById("basicAutobuyToggle").style.display = "inline-block"
    } else {
        document.getElementById("basicAutobuyToggle").style.display = "none"
    }
    if (gameData.ascension.ascensionTreeUpgrades.includes("2-3")) {
        document.getElementById("cloverAutobuyToggle").style.display = "inline-block"
    } else {
        document.getElementById("cloverAutobuyToggle").style.display = "none"
    }
    if (gameData.ascension.ascensionTreeUpgrades.includes("5-1")) {
        document.getElementById("boostAutobuyToggle").style.display = "inline-block"
    } else {
        document.getElementById("boostAutobuyToggle").style.display = "none"
    }
}
// Upgrade tree array
var ascensionTree = {
    0: {
        0: {
            name: "Welcome to Ascension",
            description: "x2 Rank Progress gain from clicking and upgrades.",
            cost: 1,
        },
    },
    1: {
        0: {
            name: "Basic Autoclick",
            description: "Gain basic points and rank progress every second (This will still reduce boost timer). Unlock the Automation tab where you can toggle automation features.",
            cost: 5,
        },
        1: {
            name: "Clover Autoclick",
            description: "Gain clovers every second as long as a Cloverizer or Mini Cloverizer is active. Unlock the Automation tab if not unlocked already.",
            cost: 5,
        }
    },
    2: {
        0: {
            name: "Longer Boosts",
            description: "Boosts are 8 clicks longer.",
            cost: 40,
        },
        1: {
            name: "Better Upgrades",
            description: "x4 rank progress gain from upgrades.",
            cost: 40,
        },
        2: {
            name: "Auto Basic",
            description: "Autobuy basic upgrades.",
            cost: 40,
        },
        3: {
            name: "Auto Clover",
            description: "Autobuy clover upgrades.",
            cost: 40,
        },
    },
    3: {
        0: {
            name: "Ascended Basic Points",
            description: "x5 basic point gain.",
            cost: 900,
        },
        1: {
            name: "Ascended Rank Progress",
            description: "x3 rank progress gain from clicking.",
            cost: 900,
        },
        2: {
            name: "Ascended Clovers",
            description: "x5 clover gain.",
            cost: 900,
        },
    },
    4: {
        0: {
            name: "Tier Up",
            description: "x5 Tier Progress on ascension.",
            cost: 16000,
        },
    },
    5: {
        0: {
            name: "Ascended Upgrades",
            description: "Keep Basic Upgrades on Ascension.",
            cost: 250000,
        },
        1: {
            name: "Auto Boost",
            description: "Immediately replenish boosts after deactivation.",
            cost: 250000,
        },
        2: {
            name: "Ascended Currencies",
            description: "Keep Basic Points, Rank, and Rank Progress on Ascension.",
            cost: 250000,
        },
    },
    6: {
        0: {
            name: "Ascend Further",
            description: "x2 Ascension points on ascension. Unlock Ascenders.",
            cost: 3.6e8,
        },
    },
    7: {
        0: {
            name: "The Shard Temple",
            description: "Unlock the Shard Temple. (Final upgrade as of now, currently does nothing.)",
            cost: 1e12,
        },
    }
}
// Upgrade tree related functions
function buyAscTreeUpg(layer, position) {
    if (gameData.ascension.ascensionPoints >= ascensionTree[layer][position].cost) {
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
}
updateAscTree()