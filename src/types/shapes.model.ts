export interface Shape {
    shaclShapeId: string;
    subject: string;
    shortSubject?: string;
    propertyIds?: string[];
    properties: ShapeProperty[];
    targetClasses: string[];
}

export interface ShapeProperty {
    propertyId: string;
    values: {predicate: string; object: string;}[];
}

export interface ShapeProperties {
    path?: string;
    name?: string;
    description?: string;
    message?: string;
    minCount?: number;
    maxCount?: number;
    datatype?: string;
}

export interface shaclShape {
    shaclShapeId: string;
    shapes: Shape[];
}
