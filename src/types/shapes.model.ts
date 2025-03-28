/* test coverage not required */
export interface Shape {
    shaclShapeId: string;
    shaclShapeName: string;
    properties: ShapeProperty[];
    targetClasses: string[];
    nodes: string[];
}

export interface ShapeProperty {
    propertyId: string;
    propertyValues: PropertyValue[];
}

export interface PropertyValue {
    type: string;
    value: string;
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

export interface ShapePropertyForFilter {
    path: string;
    name: string;
    type: string;
    resourceType: string;
}
