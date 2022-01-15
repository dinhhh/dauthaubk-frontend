
export const generateColor = () => {
  
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
  
    return `#${randomColor}`;
};

export const genListRandomColor = ( n ) => {
  if (n <= 0) {
    throw new Error("Invalid parameter for generate random list")
  }
  
  var array = [];
  
  for (var i = 0; i < n; i++ ) {
    array.push(generateColor());
  }

  return array;
}
