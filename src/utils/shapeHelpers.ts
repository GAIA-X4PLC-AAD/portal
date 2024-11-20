export const trimShapes = (shape: string) =>{
  let trimmedShape = '';
  if (shape.includes('#')) {
    trimmedShape = shape.substring(shape.indexOf('#') + 1);
  } else if (shape.includes('/')) {
    // Find the index of the last occurrence of "/"
    const index = shape.lastIndexOf('/');
    // If "/" is found, create a new string starting from the last occurrence of "/"
    trimmedShape = index !== -1 ? shape.substring(index + 1) : shape;
  }
  return trimmedShape;
};
