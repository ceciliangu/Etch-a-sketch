let art = document.querySelector(".container");
let targetArt = document.querySelector(".target-container");
let x = 12;
let buttonreset = document.querySelector('.reset');
let buttonrainbow = document.querySelector(".rainbow");
let buttonblack = document.querySelector(".black");
let colorSelector = document.querySelector(".colorSelector");
let scoreEl = document.querySelector(".score-display");
let statusEl = document.querySelector(".status");

let challengeBtns = document.querySelectorAll(".challenge-btn");

let isDrawing = false;
let mode = "black";
let currentChallengeIndex = 0;

const challenges = [
    {
        name: "Heart",
        color: "#e63946",
        cells: [
            2, 3, 8, 9,
            13, 14, 15, 16, 19, 20, 21, 22,
            24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
            36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
            48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
            61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
            74, 75, 76, 77, 78, 79, 80, 81,
            87, 88, 89, 90, 91, 92,
            100, 101, 102, 103,
            113, 114
        ]
    },
    {
        name: "Smiley",
        color: "#f4a261",
        cells: [
            4, 5, 6, 7,
            14, 15, 16, 17, 18, 19, 20, 21,
            25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
            37, 38, 40, 41, 42, 43, 45, 46,
            48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
            60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
            73, 74, 81, 82,
            85, 86, 87, 92, 93, 94,
            98, 99, 100, 101, 102, 103, 104, 105,
            112, 113, 114, 115
        ]
    },
    {
        name: "Star",
        color: "#e9c46a",
        cells: [
            5, 6,
            17, 18,
            28, 29, 30, 31,
            36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
            49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
            62, 63, 64, 65, 66, 67, 68, 69,
            75, 76, 77, 78, 79, 80,
            86, 87, 88, 89, 90, 91, 92, 93,
            97, 98, 99, 104, 105, 106,
            109, 110, 117, 118
        ]
    },
    {
        name: "Tree",
        color: "#2a9d8f",
        cells: [
            5, 6,
            16, 17, 18, 19,
            27, 28, 29, 30, 31, 32,
            40, 41, 42, 43,
            51, 52, 53, 54, 55, 56,
            62, 63, 64, 65, 66, 67, 68, 69,
            73, 74, 75, 76, 77, 78, 79, 80, 81, 82,
            88, 89, 90, 91,
            100, 101, 102, 103,
            112, 113, 114, 115
        ]
    },
    {
        name: "House",
        color: "#e76f51",
        cells: [
            5, 6,
            16, 17, 18, 19,
            27, 28, 29, 30, 31, 32,
            38, 39, 40, 41, 42, 43, 44, 45,
            49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
            60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
            73, 74, 77, 78, 81, 82,
            85, 86, 89, 90, 93, 94,
            97, 98, 105, 106,
            109, 110, 111, 112, 113, 114, 115, 116, 117, 118
        ]
    }
];

function makeDiv(size) {
    art.innerHTML = "";
    art.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    for (let i = 0; i < (size ** 2); i++) {
        let grid = document.createElement('div');
        grid.classList.add("grid");

        grid.addEventListener("mouseenter", () => {
            if (isDrawing) paint(grid);
        });

        art.appendChild(grid);
    }
}


function renderTarget(index) {
    targetArt.innerHTML = "";
    targetArt.style.gridTemplateColumns = "repeat(12, 1fr)";
    for (let i = 0; i < 144; i++) {
        let cell = document.createElement("div");
        cell.classList.add("target-grid");
        targetArt.appendChild(cell);
    }

    let target = challenges[index];
    let cells = targetArt.children;
    target.cells.forEach(item => {
        if (cells[item]) {
            cells[item].style.backgroundColor = target.color;
        }
    });

    if (scoreEl) scoreEl.textContent = "";
}


function paint(cell) {
    if (mode === 'rainbow') {
        cell.style.backgroundColor = getRandomColor();
    } else if (mode === 'color' && colorSelector) {
        cell.style.backgroundColor = colorSelector.value;
    } else {
        cell.style.backgroundColor = 'black';
    }
}


art.addEventListener("click", (e) => {
    isDrawing = !isDrawing;
    art.classList.toggle("drawing-active", isDrawing);
    if (isDrawing && e.target.classList.contains("grid")) {
        paint(e.target);
    }
});



function clear() {
    let userInput = prompt('Enter a grid size:', x);
    let size = parseInt(userInput);
    if (!isNaN(size) && size > 0 && size <= 64) {
        x = size;
    }
    intialize(x);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function intialize(size) {
    makeDiv(size);
    renderTarget(currentChallengeIndex);
    isDrawing = false;
    if (statusEl) statusEl.innerHTML = "Drawing: <b style='color:#e63946;'>OFF</b> (Click canvas to start)";
    art.classList.remove("drawing-active");
}

function setActiveColorMode(newMode) {
    mode = newMode;
    if (buttonrainbow) buttonrainbow.classList.toggle("active", mode === 'rainbow');
    if (buttonblack) buttonblack.classList.toggle("active", mode === 'black');
    if (colorSelector) colorSelector.classList.toggle("active", mode === 'color');
}

buttonreset.addEventListener("click", clear);

if (buttonrainbow) {
    buttonrainbow.addEventListener("click", () => {
        setActiveColorMode('rainbow');
    });
}

if (buttonblack) {
    buttonblack.addEventListener("click", () => {
        setActiveColorMode('black');
    });
}

if (colorSelector) {
    colorSelector.addEventListener("change", () => {
        setActiveColorMode('color');
    });
    colorSelector.addEventListener("click", () => {
        setActiveColorMode('color');
    });
}

challengeBtns.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
        challengeBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentChallengeIndex = idx;
        renderTarget(idx);
    });
});

intialize(x);
setActiveColorMode(mode);
