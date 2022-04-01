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
  createElements("div", 9, ["class"], ["grid-item"]),
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
    }
  });
  return win;
}

// current player
let currentPlayer = "ring";

// add click event listener to each item
gridItems.forEach((item, index) => {
  item.item.addEventListener("click", () => {
    if (!item.filled()) {
      if (currentPlayer === "ring") {
        item.addRing();
        currentPlayer = "cross";
      } else {
        item.addCross();
        currentPlayer = "ring";
      }
    }
    checkWinState(index);
  });
});

// // label for first player selection
// const firstPlayerLabel = createElement("label", "first-player-label");
// firstPlayerLabel.setAttribute("for", "first-player");
// firstPlayerLabel.innerHTML = "Choose the first player:";
// document.body.appendChild(firstPlayerLabel);

// // create first player selection
// const firstPlayerSelection = createElement(
//   "select",
//   ["class", "name"],
//   ["first-player", "first-player"],
//   [],
//   []
// );
// document.body.appendChild(firstPlayerSelection);

// // create playerRing and playerCross option
// const playerRingOption = createElement("option", "player-ring-option");
// const playerCrossOption = createElement("option", "player-cross-option");
// playerRingOption.setAttribute("value", "ring");
// playerCrossOption.setAttribute("value", "cross");
// playerRingOption.innerHTML = "Ring";
// playerCrossOption.innerHTML = "Cross";
// firstPlayerSelection.appendChild(playerRingOption);
// firstPlayerSelection.appendChild(playerCrossOption);

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
};
