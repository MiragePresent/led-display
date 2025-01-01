window.onload = function (e) { 
    console.log("Initializing LED display POC...")
    const display = document.getElementById("display")

    const textInput = document.getElementById("displaytext")
    const widthInput = document.getElementById("displaywidth")
    const heightInput = document.getElementById("displayheight")
    const fontSize = document.getElementById("fontsize")
    const bold = document.getElementById("fontbold")

    widthInput.onchange = function (e) {
        reCreateGrid(display, widthInput.value, heightInput.value)
    }
    heightInput.onchange = function (e) {
        reCreateGrid(display, widthInput.value, heightInput.value)
        renderText(textInput.value, fontSize.value)
    }
    textInput.onchange = function (e) {
        renderText(e.target.value, fontSize.value)
        renderText(textInput.value, fontSize.value)
    }
    fontSize.onchange = function (e) {
        if (e.target.value > 9) {
            bold.setAttribute("disabled", "false")
        }
        renderText(textInput.value, fontSize.value)
    }

    createGrid(display, widthInput.value, heightInput.value)
    renderText(textInput.value, fontSize.value)
}

function createGrid(display, width, height) {
    console.log("Creating display: " + width + " x " + height)
    const table = document.createElement("table")
    table.setAttribute("id", "display-table")
    display.appendChild(table)

    for (let y = 0; y < height; y++) {
        let tr = document.createElement("tr")
        tr.setAttribute("id", "row-" + y)
        table.appendChild(tr)

        for (let x = 0; x < width; x++) {
            let td = document.createElement("td")
            td.setAttribute("id", "led-" + x + "-" + y)
            td.setAttribute("class", "led-point off")
            tr.appendChild(td)
        }
    }
}

function reCreateGrid(display, width, height) {
    let table = document.getElementById("display-table")
    
    if (table !== undefined) {
        display.removeChild(table)
    }
    createGrid(display, width, height)
}

function turnOnLed(x,y) {
    const led = document.getElementById(`led-${x}-${y}`)

    if (led === undefined || led === null) {
        console.log(`Warning! Cannot find LED ${x}:${y} (x:y)`)
        return
    }

    led.setAttribute("class", "led-point on")
}

function turnOffLed(x,y) {
    const led = document.getElementById(`led-${x}-${y}`)

    if (led === undefined || led === null) {
        console.log(`Warning! Cannot find LED ${x}:${y} (x:y)`)
        return
    }

    led.setAttribute("class", "led-point off")
}

function renderText(text, fontSize, width, height) {
    fontSize = parseInt(fontSize)
    const abc = {
        "7": {
            "a": [
                [0,0,1,0,0],
                [0,1,0,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,1,1,1,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
            ],
            "b": [
                [1,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,1,1,1,0],
            ],
            "b": [
                [1,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,1,1,1,0],
            ],
            "c": [
                [0,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,1],
                [0,1,1,1,0],
            ],
            "d": [
                [1,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,1,1,1,0],
            ],
            "e": [
                [1,1,1,1],
                [1,0,0,0],
                [1,0,0,0],
                [1,1,1,1],
                [1,0,0,0],
                [1,0,0,0],
                [1,1,1,1],
            ],
            "f": [
                [1,1,1,1],
                [1,0,0,0],
                [1,0,0,0],
                [1,1,1,1],
                [1,0,0,0],
                [1,0,0,0],
                [1,0,0,0],
            ],
            "g": [
                [0,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,1,1],
                [1,0,0,0,1],
                [0,1,1,1,0],
            ],
            "h": [
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,1,1,1,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
            ],
            "j": [
                [0,0,1,1,1],
                [0,0,0,1,0],
                [0,0,0,1,0],
                [0,0,0,1,0],
                [0,0,0,1,0],
                [1,0,0,1,0],
                [0,1,1,0,0],
            ],
            "i": [
                [1,1,1],
                [0,1,0],
                [0,1,0],
                [0,1,0],
                [0,1,0],
                [0,1,0],
                [1,1,1],
            ],
            "k":[
                [1,0,0,0,1],
                [1,0,0,1,0],
                [1,0,1,0,0],
                [1,1,0,0,0],
                [1,0,1,0,0],
                [1,0,0,1,0],
                [1,0,0,0,1],
            ],
            "l": [
                [1,0,0,0],
                [1,0,0,0],
                [1,0,0,0],
                [1,0,0,0],
                [1,0,0,0],
                [1,0,0,0],
                [1,1,1,1],
            ],
            "m": [
                [1,0,0,0,1],
                [1,1,0,1,1],
                [1,1,0,1,1],
                [1,0,1,0,1],
                [1,0,1,0,1],
                [1,0,1,0,1],
                [1,0,0,0,1],
            ],
            "n": [
                [1,0,0,0,1],
                [1,1,0,0,1],
                [1,1,0,0,1],
                [1,0,1,0,1],
                [1,0,0,1,1],
                [1,0,0,1,1],
                [1,0,0,0,1],
            ],
            "o": [
                [0,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [0,1,1,1,0],
            ],
            "p": [
                [1,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,1,1,1,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
            ],
            "q": [
                [0,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,1,0,1],
                [1,0,0,1,1],
                [0,1,1,1,1],
            ],
            "r": [
                [1,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,1,1,1,0],
                [1,0,1,0,0],
                [1,0,0,1,0],
                [1,0,0,0,1],
            ],
            "s": [
                [0,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,0],
                [0,1,1,1,0],
                [0,0,0,0,1],
                [1,0,0,0,1],
                [0,1,1,1,0],
            ],
            "t": [
                [1,1,1,1,1],
                [1,0,1,0,1],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,1,1,1,0],
            ],
            "u": [
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [0,1,1,1,0],
            ],
            "v": [
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [0,1,0,1,0],
                [0,0,1,0,0],
            ],
            "w": [
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,1,0,1],
                [1,0,1,0,1],
                [0,1,0,1,0],
                [0,1,0,1,0],
            ],
            "x": [
                [1,0,0,0,1],
                [1,0,0,0,1],
                [0,1,0,1,0],
                [0,0,1,0,0],
                [0,1,0,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
            ],
            "y": [
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [0,1,0,1,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
            ],
            "z": [
                [1,1,1,1,1],
                [1,0,0,0,1],
                [0,0,0,1,0],
                [0,0,1,0,0],
                [0,1,0,0,0],
                [1,0,0,0,1],
                [1,1,1,1,1],
            ],
            " ": [[0],[0],[0],[0],[0],[0],[0],],
            "space": [[0],[0],[0],[0],[0],[0],[0],],
            "unknown": [
                [1,1,1,1,1],
                [1,0,0,1,1],
                [1,0,0,1,1],
                [1,0,1,0,1],
                [1,1,0,0,1],
                [1,1,0,0,1],
                [1,1,1,1,1],
            ],
        },
        "9": {
            "h": [
                [1,0,0,0,0,1],
                [1,0,0,0,0,1],
                [1,0,0,0,0,1],
                [1,0,0,0,0,1],
                [1,1,1,1,1,1],
                [1,0,0,0,0,1],
                [1,0,0,0,0,1],
                [1,0,0,0,0,1],
                [1,0,0,0,0,1],
            ],
            " ": [[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],],
            "unknown": [
                [1,1,1,1,1,1],
                [1,0,0,0,1,1],
                [1,0,0,1,0,1],
                [1,0,0,1,0,1],
                [1,0,1,1,0,1],
                [1,0,1,0,0,1],
                [1,0,1,0,0,1],
                [1,1,0,0,0,1],
                [1,1,1,1,1,1],
            ]
        }
    }

    if (fontSize < 7) {
        fontSize = 7
    }
    let breaker = 0
    while (abc[fontSize] === undefined && breaker < 100) {
        console.log("Unsupported font size " + fontSize + ". Trying " + (--fontSize))
        breaker++
    }
    if (abc[fontSize] === undefined) {
        fontSize = 7
        console.log("Unsupported font size. Defaulting to 7px")
    }

    // Print line by line
    for (let y = 0; y < fontSize; y++) {
        let x = 0;
        for (let i = 0; i < text.length; i++) {
            let c = text.charAt(i)
            let char = abc[fontSize]["unknown"];
            if (abc[fontSize][c] === undefined) {
                console.log("Unknown character " + c)
            } else {
                char = abc[fontSize][c]
            }

            let charRow = char[y]

            for (let j = 0; j < charRow.length; j++) {
                let ledOn = charRow[j]
                // console.log(`char ${c}, row ${y}, on: ${ledOn}`)
                if (ledOn === 1) {
                    turnOnLed(x,y)
                } else {
                    turnOffLed(x,y)
                }
                x++
            }
            turnOffLed(x,y)
            x++ // space between letters
        }
    }

}
