import {ShaclShape} from "../types/shaclShape.model";

export const trimShapes = (shape: string) =>{
  let trimmedShape = '';
  if (shape.includes('#')) {
    trimmedShape = shape.substring(shape.indexOf("#") + 1);
  } else if (shape.includes('/')) {
    // Find the index of the last occurrence of "/"
    const index = shape.lastIndexOf("/");
    // If "/" is found, create a new string starting from the last occurrence of "/"
    trimmedShape = index !== -1 ? shape.substring(index + 1) : shape;
  }
  return trimmedShape;
};

export const getShapeProperties = (shape: ShaclShape) => {
  let propertyList : string[] = [];
  if(shape.properties) {
    shape.properties.forEach((property) => {
      if (property.name && !propertyList.includes(property.name)) {
        propertyList.push(property.name);
      } else if (property.path && !propertyList.includes(property.path)) {
        propertyList.push(property.path);
      }
    });
  }
    return propertyList;
}
