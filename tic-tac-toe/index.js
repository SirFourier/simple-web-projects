// setup template classes for generating children
// setup rings
const ring = {
  outerCircle: new Child("div", "outer-circle"),
  innerCircle: new Child("div", "inner-circle"),
  create() {
    return createElement(
      "div",
      "ring",
      [this.outerCircle, this.innerCircle],
      [1, 1]
    );
  },
};

// setup crosses
const cross = {
  firstLine: new Child("div", "first-line"),
  secondLine: new Child("div", "second-line"),
  create() {
    return createElement(
      "div",
      "cross",
      [this.firstLine, this.secondLine],
      [1, 1]
    );
  },
};

// setup grid item template
const gridItemTemplate = new Child("div", "grid-item");

// create grid container that contains grid items
const gridContainer = createElement(
  "div",
  "grid-container",
  [gridItemTemplate],
  [9]
);
document.body.appendChild(gridContainer);

// class to contain the state of the grid item
class GridItem {
  constructor(item) {
    this.ring = ring.create();
    this.cross = cross.create();
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

// current player
let currentPlayer = "ring";

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

function checkWinState(items, index) {
  // find the lines that need to be checked i.e. find the arrays that contain the index
  statesToCheck = winStates.filter((state) => state.includes(index));

  // use the indexes from each state to check for win condition in the grid
  let win = false;
  statesToCheck.forEach((state) => {
    if (
      items[state[0]].state === items[state[1]].state &&
      items[state[1]].state === items[state[2]].state
    ) {
      win = true;
    }
  });
  return win;
}

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
    console.log(checkWinState(gridItems, index));
  });
});
