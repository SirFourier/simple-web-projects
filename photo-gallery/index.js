// randomise images displayed

const path = "images/";
const images = [
  {
    src: "disturbing-water.jpg",
    alt: "water that has been distrubed",
  },
  {
    src: "colorful-umbrella.jpg",
    alt: "a colorful umbrella under a grey sky",
  },
  {
    src: "perfect-blue-buildings.jpg",
    alt: "a tree in front of a blue building with a man walking on sidewalk",
  },
  {
    src: "yellow-italian-car.jpg",
    alt: "front lights of a yellow italian car",
  },
  {
    src: "toe-socks.jpg",
    alt: "colorful toe socks against a red wall",
  },
];

// create container and append to body element
const container = document.createElement("div");
container.className = "container";
document.body.appendChild(container);

// create 3 inner-containers and append to container element
const maxColumns = 3;
for (let i = 0; i < maxColumns; i++) {
  const innerContainer = document.createElement("div");
  innerContainer.className = "inner-container";
  container.appendChild(innerContainer);
}

function shuffle(array) {
  array = array.sort(() => Math.random() - 0.5);
}

// create 5 image elements and append to each inner-container element
innerContainers = [...container.childNodes];
innerContainers.forEach((innerContainer) => {
  shuffle(images);
  images.forEach((image) => {
    const img = document.createElement("img");
    img.setAttribute("src", path + image.src);
    img.setAttribute("alt", image.alt);
    innerContainer.appendChild(img);
  });
});
