window.onload = function (e) { 
    console.log("Initializing LED display POC...")
    const display = document.getElementById("display")

    createGrid(display, 43, 14)
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
            td.setAttribute("id", "cell-" + x + "-" + y)
            td.setAttribute("class", "led-point")
            tr.appendChild(td)
        }
    }
}