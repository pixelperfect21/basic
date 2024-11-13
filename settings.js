var darkMode = 0
function toggleDarkMode() {
    if (darkMode == 0) {
        document.body.style.backgroundColor = 'rgb(0, 0, 0)'
        document.getElementById("darkModeToggle").innerHTML = "Dark Mode: ON"
        let basicText = document.getElementsByClassName('basicText')
        for(i = 0; i < basicText.length; i++) {
            basicText[i].style.color = 'rgb(255, 255, 255)';
        }
        let basicButton = document.getElementsByClassName('basicButton')
        for(i = 0; i < basicButton.length; i++) {
            basicButton[i].style.color = 'rgb(255, 255, 255)';
            basicButton[i].style.borderColor = 'rgb(255, 255, 255)';
            basicButton[i].style.backgroundColor = 'rgb(0, 0, 0)';
        }
        darkMode = 1
        localStorage.setItem("darkMode", darkMode)
    } else {
        document.body.style.backgroundColor = 'rgb(255, 255, 255)'
        document.getElementById("darkModeToggle").innerHTML = "Dark Mode: OFF"
        let basicText = document.getElementsByClassName('basicText')
        for(i = 0; i < basicText.length; i++) {
            basicText[i].style.color = 'rgb(0, 0, 0)';
        }
        let basicButton = document.getElementsByClassName('basicButton')
        for(i = 0; i < basicButton.length; i++) {
            basicButton[i].style.color = 'rgb(0, 0, 0)';
            basicButton[i].style.borderColor = 'rgb(0, 0, 0)';
            basicButton[i].style.backgroundColor = 'rgb(255, 255, 255)';
        }
        darkMode = 0
        localStorage.setItem("darkMode", darkMode)
    }
}
if (localStorage.getItem("darkMode")) {
    darkMode = localStorage.getItem("darkMode")
    toggleDarkMode()
    toggleDarkMode()
}
function importSave() {
    let encodedSave = prompt("Paste save here. Leave blank to cancel.")
    if (encodedSave == null || encodedSave == "") {
        alert("Import cancelled.")
    } else {
        gameData = JSON.parse(atob(encodedSave))
        alert("Save imported.")
    }
}
function exportSave() {
    let text = btoa(JSON.stringify(gameData))
    navigator.clipboard.writeText(text)
    alert("Save exported to clipboard.")
}
function hardReset() {
    if (prompt("Please enter \"Basic BAsic BASic BASIc BASIC\" to confirm you want to reset your save. (Case sensitive)") == "Basic BAsic BASic BASIc BASIC") {
        gameData = {
            lastTick: Date.now(),
            basic: {
                basicPoints: 0,
                rank: 1,
                bestRank: 0,
                rankProgress: 0,
                upg1Level: 0,
                upg2Level: 0,
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
            }
        }
        alert("Your save has been reset.")
        tab("basic")
    }
}