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

// create grid container
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
  }

  addRing() {
    this.item.appendChild(this.ring);
  }

  addCross() {
    this.item.appendChild(this.cross);
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

function checkWinState() {
    gridItems
}

gridItems.forEach((item) => {
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
  });
});
