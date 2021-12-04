export const sumArray = (array) =>
  Array.isArray(array) && array.length > 0 ? array.reduce((a, b) => a + b) : 0;

export const transpose = (array) =>
  array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
