
// setup template classes for generating children
// setup rings
const outerCircle = new Child("div", "outer-circle");
const innerCircle = new Child("div", "inner-circle");
const ring = new Child("div", "ring", [outerCircle, innerCircle], [1, 1]);

// setup crosses
const firstLine = new Child("div", "first-line");
const secondLine = new Child("div", "second-line");
const cross = new Child("div", "cross", [firstLine, secondLine], [1, 1]);

// setup grid
const gridItem = new Child("div", "grid-item", [ring, cross], [1, 1]);
const gridContainer = createElement("div", "grid-container", [gridItem], [9]);

// append to body
document.body.appendChild(gridContainer);
