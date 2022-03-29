// template class for generating children
class Child {
  constructor(tag, className, children, childrenCounts) {
    this.tag = tag;
    this.className = className;

    // possible children of this child and their counts
    this.children = children; // e.g. [child1, child2, child3]
    this.childrenCounts = childrenCounts; // e.g. [count1, count2, count3]
  }
}

function createElement(tag, className, children = [], counts = []) {
  const element = document.createElement(tag);
  element.className = className;

  // for each child in children, create element based on counts
  children.forEach((child, index) => {
    for (let i = 0; i < counts[index]; i++) {
      childElement = createElement(
        child.tag,
        child.className,
        child.children,
        child.childrenCounts
      );
      element.appendChild(childElement);
    }
  });

  return element;
}
