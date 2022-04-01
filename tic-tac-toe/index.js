// tic-tac-toe logic

// label for first player selection element
const firstPlayerLabel = createElement(
  "label",
  ["class", "for"],
  ["first-player-label", "first-player"]
);
firstPlayerLabel.innerHTML = "Choose the first player:";

// create ring and cross option
const ringOption = createElement("option", ["value"], ["Ring"]);
const crossOption = createElement("option", ["value"], ["Cross"]);
ringOption.innerHTML = "Ring";
crossOption.innerHTML = "Cross";

// create first player selection
const firstPlayerSelection = createElement(
  "select",
  ["class", "name", "onchange"],
  ["first-player-select", "first-player", "setFirstPlayer()"],
  [ringOption, crossOption]
);

// create container for first player selection
const firstPlayerContainer = createElement(
  "div",
  ["class"],
  ["first-player-container"],
  [firstPlayerLabel, firstPlayerSelection]
);
document.body.appendChild(firstPlayerContainer);

// setup template classes for generating children
// setup rings
const createRing = () => {
  const circle = createElement("div", ["class"], ["circle"]);
  return createElement("div", ["class"], ["ring"], [circle]);
};

// setup crosses
const createCross = () => {
  const firstLine = createElement("div", ["class"], ["first-line"]);
  const secondLine = createElement("div", ["class"], ["second-line"]);
  return createElement("div", ["class"], ["cross"], [firstLine, secondLine]);
};

// create grid container that contains 9 grid items
const gridContainer = createElement(
  "div",
  ["class"],
  ["grid-container"],
  createElements("div", 9, ["class"], ["grid-item"])
);
document.body.appendChild(gridContainer);

// class to contain the state of each grid item
class GridItem {
  constructor(item) {
    this.ring = createRing();
    this.cross = createCross();
    this.item = item;
    this.state = "";
  }

  addRing() {
    this.item.appendChild(this.ring);
    this.state = "o";
  }

  addCross() {
    this.item.appendChild(this.cross);
    this.state = "x";
  }

  filled() {
    return this.item.hasChildNodes();
  }

  clear() {
    while (this.filled()) {
      this.item.removeChild(this.item.firstChild);
    }
  }
}

// grab grid items from grid container and place them in new object
const gridItems = [...gridContainer.childNodes].map(
  (item) => new GridItem(item)
);

// numbers are the index in the grid array
// 0 1 2
// 3 4 5
// 6 7 8
// win states:
const winStates = [
  // horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal
  [0, 4, 8],
  [2, 4, 6],
];

function colourWinning(line) {
  line.forEach((item) => {
    item.item.style.backgroundColor = "greenyellow";
  });
}

function getValueOfSelect() {
  const select = firstPlayerSelection;
  return select.options[select.selectedIndex].value;
}

let gameState = "reset";
let currentPlayer = "Ring";

function setFirstPlayer() {
  const value = getValueOfSelect();
  // only change the current player on reset
  if (gameState === "reset") {
    currentPlayer = value;
  }
}

setFirstPlayer();

function checkWinState(index) {
  // find the lines that need to be checked i.e. find the arrays that contain the index
  statesToCheck = winStates.filter((state) => state.includes(index));

  // use the indexes from each state to check for win condition in the grid
  let win = false;
  statesToCheck.forEach((state) => {
    const itemsToCheck = gridItems.filter((_, index) => state.includes(index));
    if (
      itemsToCheck.reduce((a, b) => {
        return a.state === b.state ? a : NaN;
      })
    ) {
      win = true;
      colourWinning(itemsToCheck);
      gameState = "complete";
    }
  });
  return win;
}

// add click event listener to each item
gridItems.forEach((item, index) => {
  item.item.addEventListener("click", () => {
    if (gameState !== "complete") {
      if (!item.filled()) {
        if (gameState === "reset") {
          gameState = "playing";
        }
        if (currentPlayer === "Ring") {
          item.addRing();
          currentPlayer = "Cross";
        } else {
          item.addCross();
          currentPlayer = "Ring";
        }
      }
      checkWinState(index);
    }
  });
});

// create reset button
const resetButton = createElement("button", ["class"], ["reset"]);
resetButton.innerHTML = "Reset";
document.body.appendChild(resetButton);

// reset logic
resetButton.onclick = () => {
  gridItems.forEach((item) => {
    item.item.style.backgroundColor = "white";
    item.state = "";
    item.clear();
  });
  gameState = "reset";
  setFirstPlayer();
};
