var gameData = {
    lastTick: Date.now(),
    basic: {
        basicPoints: 0,
        rank: 1,
        bestRank: 0,
        rankProgress: 0,
        upg1Level: 0,
        upg2Level: 0,
        upg3Level: 0,
        currentActivePrimaryBoost: "None",
        currentActiveSecondaryBoost: "None",
        boostDuration: 0,
        clovers: 0,
        cUpg1Level: 0,
        cUpg2Level: 0,
        cUpg3Level: 0
    },
    ascension: {
        ascensionPoints: 0,
        tier: 0,
        bestTier: 0,
        tierProgress: 0,
        ascensionTreeUpgrades: [],
        highestLayer: 0,
        automationToggles: {
            basicAutoclick: 0,
            cloverAutoclick: 0,
            basicAutobuy: 0,
            cloverAutobuy: 0,
            boostAutobuy: 0,
        },
        basicAscenders: 0,
        cloverAscenders: 0,
        rankAscenders: 0,
        tierAscenders: 0,
        ascensionAscenders: 0,
    }
}
var savegame = JSON.parse(localStorage.getItem("basicSave"))
if (savegame !== null) {
    gameData = savegame
} else {
    tab('basic')
}
// Tab related
function tab(tab) {
    document.getElementById("basic").style.display = "none"
    document.getElementById("ascension").style.display = "none"
    document.getElementById("settings").style.display = "none"
    document.getElementById(tab).style.display = "inline-block"
    if (tab == "basic") {
        basicSubtab("basicMain")
    }
    if (tab == "ascension") {
        ascensionSubtab("ascensionReset")
    }
}
function showTabs() {
    if (gameData.basic.rank >= 2) {
        document.getElementById("rankBonusesTab").style.display = "inline-block"
    } else {
        document.getElementById("rankBonusesTab").style.display = "none"
    }
    if (gameData.basic.rank >= 3) {
        document.getElementById("boostTab").style.display = "inline-block"
    } else {
        document.getElementById("boostTab").style.display = "none"
    }
    if (gameData.basic.rank >= 5) {
        document.getElementById("boostIndexTab").style.display = "inline-block"
    } else {
        document.getElementById("boostIndexTab").style.display = "none"
    }
    if (checkSpecialBoost() == "Cloverizer Boost" || gameData.basic.currentActivePrimaryBoost == "Mini Cloverizer Boost" || gameData.basic.currentActiveSecondaryBoost == "Mini Cloverizer Boost") {
        document.getElementById("cloverTab").style.display = "inline-block"
    } else {
        document.getElementById("cloverTab").style.display = "none"
    }
    if (gameData.basic.rank >= 10 || gameData.ascension.tier >= 2) {
        document.getElementById("ascensionTab").style.display = "inline-block"
    } else {
        document.getElementById("ascensionTab").style.display = "none"
    }
    if (gameData.ascension.ascensionTreeUpgrades.includes("1-0") || gameData.ascension.ascensionTreeUpgrades.includes("1-1")) {
        document.getElementById("automationTab").style.display = "inline-block"
    } else {
        document.getElementById("automationTab").style.display = "none"
    }
    if (gameData.ascension.ascensionTreeUpgrades.includes("6-0")) {
        document.getElementById("ascenderTab").style.display = "inline-block"
    } else {
        document.getElementById("ascenderTab").style.display = "none"
    }
}
function basicSubtab(subtab) {
    document.getElementById("basicMain").style.display = "none"
    document.getElementById("rankBonuses").style.display = "none"
    document.getElementById("boosts").style.display = "none"
    document.getElementById("boostIndex").style.display = "none"
    document.getElementById("clovers").style.display = "none"
    document.getElementById(subtab).style.display = "inline-block"
}
function ascensionSubtab(subtab) {
    document.getElementById("ascensionReset").style.display = "none"
    document.getElementById("ascensionTree").style.display = "none"
    document.getElementById("tierBonuses").style.display = "none"
    document.getElementById("automation").style.display = "none"
    document.getElementById("ascenders").style.display = "none"
    document.getElementById(subtab).style.display = "inline-block"
}
// Misc functions
function fixSaveV2() {
    gameData.basic.upg3Level = 0
    gameData.ascension.automationToggles = {
        basicAutoclick: 0,
        cloverAutoclick: 0,
        basicAutobuy: 0,
        cloverAutobuy: 0,
        boostAutobuy: 0,
    }
    gameData.ascension.basicAscenders = 0
    gameData.ascension.cloverAscenders = 0
    gameData.ascension.rankAscenders = 0
    gameData.ascension.tierAscenders = 0
    gameData.ascension.ascensionAscenders = 0
}
function checkOutdatedSave() {
    if (gameData.basic.upg3Level == undefined) {
        fixSaveV2()
    }
}
checkOutdatedSave()
function displayAscTree() {
    let ret = ""
    let layer = 0
    let position = 0
    while (ascensionTree[layer] !== undefined) {
        if (gameData.ascension.highestLayer >= layer || layer == 0) {
            ret = ret + "<p class='ascensionText'>Layer " + (layer + 1) + "</p>"
        }
        while (ascensionTree[layer][position] !== undefined) {
            ret = ret + "<p class='ascensionText'></p>"
            if (gameData.ascension.highestLayer >= layer || layer == 0) {
                if (!gameData.ascension.ascensionTreeUpgrades.includes(layer + "-" + position)) {
                    ret = ret + "<button class='ascensionButton' onclick='buyAscTreeUpg(" + layer + ", " + position + ")'>" + ascensionTree[layer][position].name + ": " + ascensionTree[layer][position].description + " (Cost: " + formatNumber(ascensionTree[layer][position].cost) + ")</button>"
                } else {
                    ret = ret + "<p class='ascensionText'>" + ascensionTree[layer][position].name + ": " + ascensionTree[layer][position].description + " (Upgrade Bought!)</p>"
                }
            } else {
                ret = ret + "<p class='ascensionText'>Layer " + (layer + 1) + " (Buy an upgrade from the previous layer to unlock)</p>"
                return ret
            }
            position++
        }
        position = 0
        layer++
    }
    return ret
}
// Updaters
function updateAscTree() {
    document.getElementById("ascensionTreeDisplay").innerHTML = displayAscTree()
}
updateAscTree()
tab('basic')
function formatNumber(number) {
	let exponent = Math.floor(Math.log10(number))
	let mantissa = number / Math.pow(10, exponent)
	if (exponent < 3) return number.toFixed(1)
	return mantissa.toFixed(2) + "e" + exponent
}
function update() {
    // Basic Tab
    document.getElementById("basicPointsDisplay").innerHTML = formatNumber(gameData.basic.basicPoints) + " basic points (Rank " + gameData.basic.rank + ": " + formatNumber(gameData.basic.rankProgress) + "/" + formatNumber(getRankReq()) + ")"
    document.getElementById("basicPointGain").innerHTML = "+" + formatNumber(getBasicGain()) + " basic points and +" + formatNumber(getRankProgressGain()) + " rank progress"
    document.getElementById("upg1").innerHTML = "Basic Point Upgrade (" + gameData.basic.upg1Level + "): +1 basic point gain per level, +" + formatNumber(getUpg1Cost() * getUpgradeRPMult()) + " bonus rank progress on purchase (Cost: " + formatNumber(getUpg1Cost()) + ")"
    document.getElementById("upg2").innerHTML = "Rank Progress Upgrade (" + gameData.basic.upg2Level + "): +1 rank progress gain from clicking per level, +" + formatNumber(getUpg2Cost() * 2 * getUpgradeRPMult()) + " bonus rank progress on purchase (Cost: " + formatNumber(getUpg2Cost()) + ")"
    document.getElementById("upg3").innerHTML = "Boost Length Upgrade (" + gameData.basic.upg3Level + "): +1 boost length per level, does not give rank progress on purchase (Cost: " + formatNumber(getUpg3Cost()) + ")"
    document.getElementById("primaryBoostDisplay").innerHTML = "Current active primary boost: " + gameData.basic.currentActivePrimaryBoost + " (" + gameData.basic.boostDuration + " clicks left)"
    document.getElementById("secondaryBoostDisplay").innerHTML = "Current active secondary boost: " + gameData.basic.currentActiveSecondaryBoost 
    document.getElementById("specialBoostEffect").innerHTML = "Boost Combo Effect: " + gameData.basic.currentActivePrimaryBoost + " + " + gameData.basic.currentActiveSecondaryBoost + " = " + checkSpecialBoost() + getSpecialBoostDesc()
    document.getElementById("cloverDisplay").innerHTML = formatNumber(gameData.basic.clovers) + " clovers"
    document.getElementById("cloverGain").innerHTML = "+" + formatNumber(getCloverGain()) + " clovers"
    document.getElementById("cUpg1").innerHTML = "Clover Upgrade (" + gameData.basic.cUpg1Level + "): +1 clover gain per level, +" + formatNumber(getCUpg1Cost() * 100 * getUpgradeRPMult()) + " bonus rank progress on purchase (Cost: " + formatNumber(getCUpg1Cost()) + ")"
    document.getElementById("cUpg2").innerHTML = "Clover Basic Point Upgrade (" + gameData.basic.cUpg2Level + "): +100% basic point gain per level, +" + formatNumber(getCUpg2Cost() * 150 * getUpgradeRPMult()) + " bonus rank progress on purchase (Cost: " + formatNumber(getCUpg2Cost()) + ")"
    document.getElementById("cUpg3").innerHTML = "Clover Rank Progress Upgrade (" + gameData.basic.cUpg3Level + "): +100% rank progress gain from clicking per level, +" + formatNumber(getCUpg3Cost() * 200 * getUpgradeRPMult()) + " bonus rank progress on purchase (Cost: " + formatNumber(getCUpg3Cost()) + ")"
    // Boost Tab
    document.getElementById("pointBoostPrimary").innerHTML = "Activate Point Boost for 500 basic points (Multiplies point gain by 3 for " + getBoostLength() + " clicks)"
    document.getElementById("pointBoostSecondary").innerHTML = "Activate Point Boost for 500 basic points (Multiplies point gain by 3 for " + getBoostLength() + " clicks)"
    document.getElementById("luckBoostPrimary").innerHTML = "Activate Luck Boost for 750 basic points (50% chance to multiply point gain by 5 but divides gain by 2 if unlucky for " + getBoostLength() + " clicks)"
    document.getElementById("luckBoostSecondary").innerHTML = "Activate Luck Boost for 750 basic points (50% chance to multiply point gain by 5 but divides gain by 2 if unlucky for " + getBoostLength() + " clicks)"
    document.getElementById("rankBoostPrimary").innerHTML = "Activate Rank Boost for 1e3 basic points (Multiplies rank progress gain by 2 for " + getBoostLength() + " clicks)"
    document.getElementById("rankBoostSecondary").innerHTML = "Activate Rank Boost for 1e3 basic points (Multiplies rank progress gain by 2 for " + getBoostLength() + " clicks)"
    document.getElementById("miniCloverizerPrimary").innerHTML = "Activate Mini Cloverizer Boost for 1e5 basic points (Unlocks clovers but divides clover gain by 2 for " + getBoostLength() + " clicks)"
    document.getElementById("miniCloverizerSecondary").innerHTML = "Activate Mini Cloverizer Boost for 1e5 basic points (Unlocks clovers but divides clover gain by 2 for " + getBoostLength() + " clicks)"
    // Ascension Tab
    document.getElementById("ascensionResetButton").innerHTML = "+" + formatNumber(getAscensionGain()) + " ascension points and +" + formatNumber(getTierProgressGain()) + " tier progress"
    document.getElementById("ascensionDisplay").innerHTML = formatNumber(gameData.ascension.ascensionPoints) + " ascension points (Tier " + gameData.ascension.tier + ": " + formatNumber(gameData.ascension.tierProgress) + "/" + formatNumber(getTierReq()) + ")"
    document.getElementById("tierBonuses").innerHTML = getTierBonuses()
    if (gameData.ascension.automationToggles.basicAutoclick == 1) {
        document.getElementById("basicAutoclickToggle").innerHTML = "Basic Autoclicker: ON"
    } else {
        document.getElementById("basicAutoclickToggle").innerHTML = "Basic Autoclicker: OFF"
    }
    if (gameData.ascension.automationToggles.cloverAutoclick == 1) {
        document.getElementById("cloverAutoclickToggle").innerHTML = "Clover Autoclicker: ON"
    } else {
        document.getElementById("cloverAutoclickToggle").innerHTML = "Clover Autoclicker: OFF"
    }
    if (gameData.ascension.automationToggles.basicAutobuy == 1) {
        document.getElementById("basicAutobuyToggle").innerHTML = "Basic Upgrade Autobuy: ON"
    } else {
        document.getElementById("basicAutobuyToggle").innerHTML = "Basic Upgrade Autobuy: OFF"
    }
    if (gameData.ascension.automationToggles.cloverAutobuy == 1) {
        document.getElementById("cloverAutobuyToggle").innerHTML = "Clover Upgrade Autobuy: ON"
    } else {
        document.getElementById("cloverAutobuyToggle").innerHTML = "Clover Upgrade Autobuy: OFF"
    }
    if (gameData.ascension.automationToggles.boostAutobuy == 1) {
        document.getElementById("boostAutobuyToggle").innerHTML = "Boost Auto-Replenish: ON"
    } else {
        document.getElementById("boostAutobuyToggle").innerHTML = "Boost Auto-Replenish: OFF"
    }
    document.getElementById("ascensionResetButton2").innerHTML = "+" + formatNumber(getAscensionGain()) + " ascension points and +" + formatNumber(getTierProgressGain()) + " tier progress"
    document.getElementById("basicAscender").innerHTML = "Basic Ascender (" + gameData.ascension.basicAscenders + "): x1.25 compounding basic points per level (Cost: " + formatNumber(getBasicAscenderCost()) + ")"
    document.getElementById("cloverAscender").innerHTML = "Clover Ascender (" + gameData.ascension.cloverAscenders + "): x1.25 compounding clovers per level (Cost: " + formatNumber(getCloverAscenderCost()) + ")"
    document.getElementById("rankAscender").innerHTML = "Rank Ascender (" + gameData.ascension.rankAscenders + "): x1.25 compounding rank progress from clicking per level (Cost: " + formatNumber(getRankAscenderCost()) + ")"
    document.getElementById("tierAscender").innerHTML = "Tier Ascender (" + gameData.ascension.tierAscenders + "): x1.15 compounding tier progress on ascension per level (Cost: " + formatNumber(getTierAscenderCost()) + ")"
    document.getElementById("ascensionAscender").innerHTML = "Ascension Ascender (" + gameData.ascension.ascensionAscenders + "): x1.15 compounding ascension points on ascension per level (Cost: " + formatNumber(getAscensionAscenderCost()) + ")"
}
// Loops
var tickLoop = window.setInterval(function() {
    update()
    updateRankBonuses()
    updateTierBonuses()

    checkRankProgress()
    checkSpecialBoost()
    checkTierProgress()
    checkHighestRank()
    checkHighestTier()
    checkOutdatedSave()

    showUpgrades()
    showTabs()
    showBoosts()
    showSpecialBoosts()
    showAutomationToggles()
}, 10)
var genLoop = window.setInterval(function() {
    diff = Date.now() - gameData.lastTick;
    gameData.lastTick = Date.now()
}, 100) 
var saveGameLoop = window.setInterval(function() {
    localStorage.setItem("basicSave", JSON.stringify(gameData))
}, 15000)
var automationLoop = window.setInterval(function() {
    if (gameData.ascension.ascensionTreeUpgrades.includes("1-0") && gameData.ascension.automationToggles.basicAutoclick == 1) {
        gainPoints()
    }
    if (gameData.ascension.ascensionTreeUpgrades.includes("1-1") && gameData.ascension.automationToggles.cloverAutoclick == 1) {
        if (gameData.basic.currentActivePrimaryBoost == "Mini Cloverizer Boost" || gameData.basic.currentActiveSecondaryBoost == "Mini Cloverizer Boost" || checkSpecialBoost() == "Cloverizer Boost") {
            gainClovers()
        }
    }
    if (gameData.ascension.ascensionTreeUpgrades.includes("2-2") && gameData.ascension.automationToggles.basicAutobuy == 1) {
        upg1()
        upg2()
        upg3()
    }
    if (gameData.ascension.ascensionTreeUpgrades.includes("2-3") && gameData.ascension.automationToggles.cloverAutobuy == 1) {
        cUpg1()
        cUpg2()
        cUpg3()
    }
}, 1000)
// Use to speed up early progression, refresh to disable
/* 
var devAutomationLoop = window.setInterval(function() {
    gainPoints()
    gainClovers()
    upg1()
    upg2()
    upg3()
    cUpg1()
    cUpg2()
    cUpg3()
}, 1000)
*/
