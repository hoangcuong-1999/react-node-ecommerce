export const filterPrices = [
  {
    text: "$0 - $50",
    min: 0,
    max: 50,
  },
  {
    text: "$50 - $100",
    min: 50,
    max: 100,
  },
  {
    text: "$100 - $150",
    min: 100,
    max: 150,
  },
  {
    text: "$150 - $200",
    min: 150,
    max: 200,
  },
  {
    text: "$200+",
    min: 200,
    max: 1000000,
  },
];

export const filterRatings = [
  {
    point: 5,
  },
  {
    point: 4,
    text: "Up",
  },
  {
    point: 3,
    text: "Up",
  },
  {
    point: 2,
    text: "Up",
  },
  {
    point: 1,
    text: "Up",
  },
];

export const filterByOrder = [
  {
    text: "Price",
    ddOptions: [
      { order: "price", type: "lowest", optionText: "Price: low to high" },
      { order: "price", type: "highest", optionText: "Price: high to low" },
    ],
  },
  {
    text: "View",
    ddOptions: [
      { order: "view", type: "lowest", optionText: "View: low to high" },
      { order: "view", type: "highest", optionText: "View: high to low" },
    ],
  },
  {
    text: "Star",
    ddOptions: [
      { order: "star", type: "lowest", optionText: "Star: low to high" },
      { order: "star", type: "highest", optionText: "Star: high to low" },
    ],
  },
];

export const filterCmtBtn = [
  {
    text: "All",
    index: 0,
  },
  {
    text: "1 star",
    index: 1,
  },
  {
    text: "2 stars",
    index: 2,
  },
  {
    text: "3 stars",
    index: 3,
  },
  {
    text: "4 stars",
    index: 4,
  },
  {
    text: "5 stars",
    index: 5,
  },
];
