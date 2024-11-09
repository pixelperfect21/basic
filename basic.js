// Calculation related functions
function getBasicGain() {
    let gain = 1 
    gain += gameData.basic.upg1Level
    if (gameData.basic.rank >= 2) {
        gain = gain * 2
    }
    if (gameData.basic.rank >= 3) {
        gain = gain * (1 + 0.5 * gameData.basic.rank)
    }
    if (gameData.basic.currentActivePrimaryBoost == "Point Boost") {
        gain = gain * 3
    }
    if (gameData.basic.currentActiveSecondaryBoost == "Point Boost") {
        gain = gain * 3
    }
    if (gameData.basic.currentActivePrimaryBoost == "Luck Boost (Lucky!)") {
        gain = gain * 5
    }
    if (gameData.basic.currentActiveSecondaryBoost == "Luck Boost (Lucky!)") {
        gain = gain * 5
    }
    if (gameData.basic.currentActivePrimaryBoost == "Luck Boost (Unlucky...)") {
        gain = gain * 0.5
    }
    if (gameData.basic.currentActiveSecondaryBoost == "Luck Boost (Unlucky...)") {
        gain = gain * 0.5
    }
    if (checkSpecialBoost() == "Mega Point Boost") {
        gain = gain * 4
    }
    if (checkSpecialBoost() == "Duality Boost") {
        gain = gain * 3
    }
    if (checkSpecialBoost() == "Cloverizer Boost") {
        gain = gain * 0
    }
    if (gameData.basic.rank >= 7) {
        gain = gain * Math.pow(1.1, gameData.basic.rank - 5)
    }
    if (gameData.ascension.ascensionTreeUpgrades.includes("2-0")) {
        gain = gain * 5
    }
    gain = gain * (gameData.basic.cUpg2Level + 1)
    return gain
}
function getRankProgressGain() {
    let gain = 1
    gain += gameData.basic.upg2Level
    if (gameData.basic.rank >= 4) {
        gain = gain * (1 + 0.5 * gameData.basic.rank)
    }
    if (gameData.basic.currentActivePrimaryBoost == "Rank Boost") {
        gain = gain * 2
    }
    if (gameData.basic.currentActiveSecondaryBoost == "Rank Boost") {
        gain = gain * 2
    }
    if (checkSpecialBoost() == "Lucky Rank Boost") {
        gain = gain * 5
    }
    if (checkSpecialBoost() == "Cloverizer Boost") {
        gain = gain * 0
    }
    if (gameData.basic.rank >= 7) {
        gain = gain * Math.pow(1.1, gameData.basic.rank - 5)
    }
    if (checkSpecialBoost() == "Rank Cloverizer Boost") {
        gain = gain * (gameData.basic.clovers / 20 + 1)
    }
    if (gameData.basic.rank >= 8) {
        gain = gain * (getBasicGain() / 50 + 1)
    }
    gain = gain * (gameData.basic.cUpg3Level + 1)
    if (gameData.ascension.ascensionTreeUpgrades.includes("0-0")) {
        gain = gain * 2
    }
    if (gameData.ascension.ascensionTreeUpgrades.includes("2-1")) {
        gain = gain * 3
    }
    return gain
}
function getCloverGain() {
    let gain = 1
    if (gameData.basic.currentActivePrimaryBoost == "Mini Cloverizer Boost") {
        gain = gain * 0.5
    }
    if (gameData.basic.currentActiveSecondaryBoost == "Mini Cloverizer Boost") {
        gain = gain * 0.5
    }
    if (gameData.basic.rank >= 7) {
        gain = gain * Math.pow(1.1, gameData.basic.rank - 5)
    }
    if (checkSpecialBoost() == "Cloverizer+ Boost") {
        gain = gain * (getBasicGain() / 1000 + 1)
    }
    if (checkSpecialBoost() == "Mega Cloverizer Boost") {
        gain = gain * 10
    }
    gain = gain * (gameData.basic.cUpg1Level + 1)
    if (gameData.ascension.ascensionTreeUpgrades.includes("2-2")) {
        gain = gain * 5
    }
    if (gameData.ascension.tier >= 2) {
        gain = gain * 10
    }
    return gain
}
function getUpg1Cost() {
    let cost = 10
    cost = cost * (1 + 0.2 * gameData.basic.upg1Level) * Math.pow(1.15, gameData.basic.upg1Level)
    return cost
}
function getUpg2Cost() {
    let cost = 25
    cost = cost * (1 + 0.3 * gameData.basic.upg2Level) * Math.pow(1.25, gameData.basic.upg2Level)
    return cost
}
function getRankReq() {
    let req = 100
    req = req * (1 + gameData.basic.rank - 1) * Math.pow(5, gameData.basic.rank - 1)
    return req
}
function getCUpg1Cost() {
    let cost = 10
    cost = cost * (1 + 0.2 * gameData.basic.cUpg1Level) * Math.pow(1.2, gameData.basic.cUpg1Level)
    return cost
}
function getCUpg2Cost() {
    let cost = 25
    cost = cost * (1 + 0.3 * gameData.basic.cUpg2Level) * Math.pow(1.25, gameData.basic.cUpg2Level)
    return cost
}
function getCUpg3Cost() {
    let cost = 50
    cost = cost * (1 + 0.4 * gameData.basic.cUpg3Level) * Math.pow(1.3, gameData.basic.cUpg3Level)
    return cost
}
function getBoostLength() {
    let length = 3
    if (gameData.ascension.ascensionTreeUpgrades.includes("1-1")) {
        length = length + 4
    }
    return length
}
function getUpgradeRPMult() {
    let mult = 1
    if (gameData.ascension.ascensionTreeUpgrades.includes("0-0")) {
        mult = mult * 2
    }
    if (gameData.ascension.ascensionTreeUpgrades.includes("1-0")) {
        mult = mult * 4
    }
    if (gameData.ascension.tier >= 3) {
        mult = mult * (getRankProgressGain()/100 + 1)
    }
    return mult
}
// Checking related functions
function checkRankProgress() {
    if (gameData.basic.rankProgress >= getRankReq()) {
        gameData.basic.rankProgress -= getRankReq()
        gameData.basic.rank++
    }  
}
function checkSpecialBoost() {
    if (gameData.basic.currentActivePrimaryBoost == "Point Boost" && gameData.basic.currentActiveSecondaryBoost == "Point Boost") {
        return "Mega Point Boost"
    }
    if (gameData.basic.currentActivePrimaryBoost == "Point Boost" && gameData.basic.currentActiveSecondaryBoost == "Rank Boost") {
        return "Duality Boost"
    }
    if (gameData.basic.currentActivePrimaryBoost == "Rank Boost" && gameData.basic.currentActiveSecondaryBoost == "Point Boost") {
        return "Duality Boost"
    }
    if (gameData.basic.currentActivePrimaryBoost == "Luck Boost (Lucky!)" && gameData.basic.currentActiveSecondaryBoost == "Rank Boost") {
        return "Lucky Rank Boost"
    }
    if (gameData.basic.currentActivePrimaryBoost == "Rank Boost" && gameData.basic.currentActiveSecondaryBoost == "Luck Boost (Lucky!)") {
        return "Lucky Rank Boost"
    }
    if (gameData.basic.currentActivePrimaryBoost == "Luck Boost (Unlucky...)" && gameData.basic.currentActiveSecondaryBoost == "Luck Boost (Lucky!)") {
        return "Cloverizer Boost"
    }
    if (gameData.basic.currentActivePrimaryBoost == "Luck Boost (Lucky!)" && gameData.basic.currentActiveSecondaryBoost == "Luck Boost (Unlucky...)") {
        return "Cloverizer Boost"
    }
    if (gameData.basic.currentActivePrimaryBoost == "Mini Cloverizer Boost" && gameData.basic.currentActiveSecondaryBoost == "Point Boost") {
        return "Cloverizer+ Boost"
    }
    if (gameData.basic.currentActivePrimaryBoost == "Point Boost" && gameData.basic.currentActiveSecondaryBoost == "Mini Cloverizer Boost") {
        return "Cloverizer+ Boost"
    }
    if (gameData.basic.currentActivePrimaryBoost == "Luck Boost (Lucky!)" && gameData.basic.currentActiveSecondaryBoost == "Mini Cloverizer Boost") {
        return "Mega Cloverizer Boost"
    }
    if (gameData.basic.currentActivePrimaryBoost == "Mini Cloverizer Boost" && gameData.basic.currentActiveSecondaryBoost == "Luck Boost (Lucky!)") {
        return "Mega Cloverizer Boost"
    }
    if (gameData.basic.currentActivePrimaryBoost == "Mini Cloverizer Boost" && gameData.basic.currentActiveSecondaryBoost == "Rank Boost") {
        return "Rank Cloverizer Boost"
    }
    if (gameData.basic.currentActivePrimaryBoost == "Rank Boost" && gameData.basic.currentActiveSecondaryBoost == "Mini Cloverizer Boost") {
        return "Rank Cloverizer Boost"
    }
    return "None"
    // Use as template
    /* if (gameData.basic.currentActivePrimaryBoost == "" && gameData.basic.currentActiveSecondaryBoost == "") {
        return ""
    } */
}
function getSpecialBoostDesc() {
    if (checkSpecialBoost() == "Mega Point Boost") {
        return " (x4 bonus basic point gain)"
    }
    if (checkSpecialBoost() == "Duality Boost") {
        return " (x3 bonus basic point gain and rank progress gain from clicking)"
    }
    if (checkSpecialBoost() == "Lucky Rank Boost") {
        return " (x5 bonus rank progress gain from clicking)"
    }
    if (checkSpecialBoost() == "Cloverizer Boost") {
        return " (x0 basic point gain and rank progress gain from clicking. Unlock Clovers and clover upgrades.)"
    }
    if (checkSpecialBoost() == "Cloverizer+ Boost") {
        return " (Basic point gain affects clovers at a reduced rate (1e3:1))"
    }
    if (checkSpecialBoost() == "Mega Cloverizer Boost") {
        return " (x10 bonus clover gain)"
    }
    if (checkSpecialBoost() == "Rank Cloverizer Boost") {
        return " (Clovers affect rank progress gain from clicking at a reduced rate (20:1))"
    }
    return ""
}
// Unlock related functions
function showUpgrades() {
    if (gameData.basic.rank >= 2) {
        document.getElementById("upg2").style.display = "inline-block"
    } else {
        document.getElementById("upg2").style.display = "none"
    }
}
function showRankBonuses() {
    if (gameData.basic.rank >= 1) {
        document.getElementById("rank1").style.display = "inline-block"
    } else {
        document.getElementById("rank1").style.display = "none"
    }
    if (gameData.basic.rank >= 2) {
        document.getElementById("rank2").style.display = "inline-block"
    } else {
        document.getElementById("rank2").style.display = "none"
    }
    if (gameData.basic.rank >= 3) {
        document.getElementById("rank3").style.display = "inline-block"
    } else {
        document.getElementById("rank3").style.display = "none"
    }
    if (gameData.basic.rank >= 4) {
        document.getElementById("rank4").style.display = "inline-block"
    } else {
        document.getElementById("rank4").style.display = "none"
    }
}
function showBoosts() {
    if (gameData.basic.rank >= 5) {
        document.getElementById("secondaryBoostDisplay").style.display = "inline-block"
        document.getElementById("pointBoostSecondary").style.display = "inline-block"
        document.getElementById("luckBoostSecondary").style.display = "inline-block"
        document.getElementById("rankBoostSecondary").style.display = "inline-block"
    } else {
        document.getElementById("secondaryBoostDisplay").style.display = "none"
        document.getElementById("pointBoostSecondary").style.display = "none"
        document.getElementById("luckBoostSecondary").style.display = "none"
        document.getElementById("rankBoostSecondary").style.display = "none"
    }
    if (gameData.basic.rank >= 7) {
        document.getElementById("miniCloverizerPrimary").style.display = "inline-block"
        document.getElementById("miniCloverizerSecondary").style.display = "inline-block"
    } else {
        document.getElementById("miniCloverizerPrimary").style.display = "none"
        document.getElementById("miniCloverizerSecondary").style.display = "none"
    }
}
function showSpecialBoosts() {
    if (gameData.basic.rank >= 7) {
        document.getElementById("postRank7Boosts").style.display = "inline-block"
    } else {
        document.getElementById("postRank7Boosts").style.display = "none"
    }
}
// Clickable related functions
function gainPoints() {
    updateAscTree()
    gameData.basic.basicPoints += getBasicGain()
    gameData.basic.rankProgress += getRankProgressGain()
    if (gameData.basic.boostDuration > 0) {
        gameData.basic.boostDuration--
    }
    if (gameData.basic.boostDuration == 0) {
        gameData.basic.currentActivePrimaryBoost = "None"
        gameData.basic.currentActiveSecondaryBoost = "None"
    }
}
function gainClovers() {
    gameData.basic.clovers += getCloverGain()
}
function upg1() {
    if (gameData.basic.basicPoints >= getUpg1Cost()) {
        gameData.basic.basicPoints -= getUpg1Cost()
        gameData.basic.rankProgress += getUpg1Cost() * getUpgradeRPMult()
        gameData.basic.upg1Level++
    }
}
function upg2() {
    if (gameData.basic.basicPoints >= getUpg2Cost()) {
        gameData.basic.basicPoints -= getUpg2Cost()
        gameData.basic.rankProgress += getUpg2Cost() * 2 * getUpgradeRPMult()
        gameData.basic.upg2Level++
    }
}
function pointBoostPrimary() {
    if (gameData.basic.basicPoints >= 500) {
        gameData.basic.basicPoints -= 500
        gameData.basic.currentActivePrimaryBoost = "Point Boost"
        gameData.basic.boostDuration = getBoostLength()
    }
}
function luckBoostPrimary() {
    if (gameData.basic.basicPoints >= 750) {
        gameData.basic.basicPoints -= 750
        if (Math.floor(Math.random() * 2) > 0) {
            gameData.basic.currentActivePrimaryBoost = "Luck Boost (Lucky!)"
        } else {
            gameData.basic.currentActivePrimaryBoost = "Luck Boost (Unlucky...)"
        }
        gameData.basic.boostDuration = getBoostLength()
    }
}
function rankBoostPrimary() {
    if (gameData.basic.basicPoints >= 1000) {
        gameData.basic.basicPoints -= 1000
        gameData.basic.currentActivePrimaryBoost = "Rank Boost"
        gameData.basic.boostDuration = getBoostLength()
    }
}
function pointBoostSecondary() {
    if (gameData.basic.basicPoints >= 500) {
        gameData.basic.basicPoints -= 500
        gameData.basic.currentActiveSecondaryBoost = "Point Boost"
        gameData.basic.boostDuration = getBoostLength()
    }
}
function luckBoostSecondary() {
    if (gameData.basic.basicPoints >= 750) {
        gameData.basic.basicPoints -= 750
        if (Math.floor(Math.random() * 2) > 0) {
            gameData.basic.currentActiveSecondaryBoost = "Luck Boost (Lucky!)"
        } else {
            gameData.basic.currentActiveSecondaryBoost = "Luck Boost (Unlucky...)"
        }
        gameData.basic.boostDuration = getBoostLength()
    }
}
function rankBoostSecondary() {
    if (gameData.basic.basicPoints >= 1000) {
        gameData.basic.basicPoints -= 1000
        gameData.basic.currentActiveSecondaryBoost = "Rank Boost"
        gameData.basic.boostDuration = getBoostLength()
    }
}
function cUpg1() {
    if (gameData.basic.clovers >= getCUpg1Cost()) {
        gameData.basic.clovers -= getCUpg1Cost()
        gameData.basic.rankProgress += getCUpg1Cost() * 100 * getUpgradeRPMult()
        gameData.basic.cUpg1Level++
    }
}
function cUpg2() {
    if (gameData.basic.clovers >= getCUpg2Cost()) {
        gameData.basic.clovers -= getCUpg2Cost()
        gameData.basic.rankProgress += getCUpg2Cost() * 150 * getUpgradeRPMult()
        gameData.basic.cUpg2Level++
    }
}
function cUpg3() {
    if (gameData.basic.clovers >= getCUpg3Cost()) {
        gameData.basic.clovers -= getCUpg3Cost()
        gameData.basic.rankProgress += getCUpg3Cost() * 200 * getUpgradeRPMult()
        gameData.basic.cUpg3Level++
    }
}
function cloverBoostPrimary() {
    if (gameData.basic.basicPoints >= 100000) {
        gameData.basic.basicPoints -= 100000
        gameData.basic.currentActivePrimaryBoost = "Mini Cloverizer Boost"
        gameData.basic.boostDuration = getBoostLength()
    }
}
function cloverBoostSecondary() {
    if (gameData.basic.basicPoints >= 100000) {
        gameData.basic.basicPoints -= 100000
        gameData.basic.currentActiveSecondaryBoost = "Mini Cloverizer Boost"
        gameData.basic.boostDuration = getBoostLength()
    }
}