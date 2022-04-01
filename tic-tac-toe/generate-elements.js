// return generated element
const createElement = (tag, attributes = [], values = [], children = []) => {
  const element = document.createElement(tag);

  // add each attribute
  attributes.forEach((attr, index) => {
    element.setAttribute(attr, values[index]);
  });

  // append each child
  children.forEach((child) => {
    element.appendChild(child);
  });

  return element;
};

// returns an array of generated elements
const createElements = (
  tag,
  amount,
  attributes = [],
  values = [],
  children = []
) =>
  Array.from({ length: amount }, () =>
    createElement(tag, attributes, values, children)
  );
