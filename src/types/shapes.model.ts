export interface Shape {
    shaclShapeId: string;
    subject: string;
    shortSubject?: string;
    propertyIds?: string[];
    properties: ShapeProperty[];
    targetClasses: string[];
    nodes: string[];
}

export interface ShapeProperty {
    propertyId: string;
    propertyValues: {type: string; value: string;}[];
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
