// This Interface is termporary, due to how we recieve data at the moment.

// Interfaces and Mappers for Service Offerings
export interface ServiceOfferingInput {
  items: Array<{
    'labels(n)': {
      0: string,
      1: string
    },
    'properties(n)': {
      name: string,
      policy: string,
      uri: string,
      description: string,
      claimsGraphUri: string,
    };
  }>;
}

export interface ServiceOffering {
  label: string,
  name: string,
  policy: string,
  uri: string,
  description: string,
  claimsGraphUri: string,
}

export function mapServiceOfferings(selfDescriptions: ServiceOfferingInput): ServiceOffering[] {
  console.log('From mapper: ', selfDescriptions);
  return selfDescriptions.items.map(({ 'properties(n)': p, 'labels(n)': l }) => ({
    label: l[1],
    name: p.name,
    policy: p.policy,
    uri : p.uri,
    description: p.description,
    claimsGraphUri: p.claimsGraphUri
  }));
}

// Interfaces and Mappers for Resources
export interface ResourceInput {
  items: Array<{
    'labels(n)': {
      0: string,
      1: string
    },
    'properties(n)': {
      name: string,
      description: string,
      uri: string,
      claimsGraphUri: string,
    };
  }>;
}

export interface Resource {
  label: string,
  name: string,
  description: string,
  uri: string,
  claimsGraphUri: string,
}

export function mapResources(selfDescriptions: ResourceInput): Resource[] {
  console.log('From mapper: ', selfDescriptions);
  return selfDescriptions.items.map(({ 'properties(n)': p, 'labels(n)': l }) => ({
    label: l[1],
    name: p.name,
    description: p.description,
    uri : p.uri,
    claimsGraphUri : p.claimsGraphUri
  }));
}

// Interfaces and Mappers for Shapes and Ontologies
export interface Class {
  name: string;
  label: string;
  subClasses: any[];
}

export interface Ontology {
  base: string;
  contributors: string[];
  label: string;
  version: string;
  classes: Class[];
  claimsGraphUri: string;
}

export interface ShapesAndOntologiesInput {
  ontologies: string[];
  shapes: string[];
  vocabularies: string[];
}

export const  mapShapesAndOntologies = (response: ShapesAndOntologiesInput): string[] => {
  return response.ontologies.map((ontology) => ontology);
}

export const mapOntologies = (response: []): Ontology[] => {
  return response.map((item) => {
    return parseOntology(item);
  });
}

// todo needs to adapt to standardised structure of ontologies. This standardised structure is not yet in place
const parseOntology = (data: string): Ontology => {
  const ontologyToReturn: Ontology = {
    base: "",
    contributors: [],
    label: "",
    version: "",
    classes: []
  };

  const baseMatch = data.match(/@base\s+<([^>]+)>/);
  ontologyToReturn.base = baseMatch ? baseMatch[1] : "No base found";

  const contributorsMatch = data.match(/contributor\s+"([^"]+)"(\s*,\s*"([^"]+)")*(\s*;\s*)?/);
  if (contributorsMatch) {
    let contributors = [contributorsMatch[1]];

    const additionalMatches = data.match(/,\s*"([^"]+)"/g);

    if (additionalMatches) {
      additionalMatches.forEach(match => {
        const nameMatch = match.match(/"([^"]+)"/);
        if (nameMatch) {
          contributors.push(nameMatch[1]);
        }
      });
    }
    ontologyToReturn.contributors = contributors
  }

  const labelMatch = data.match(/rdfs:label\s+"([^"]+)"/);
  ontologyToReturn.label = labelMatch ? labelMatch[1] : "No label found";

  const versionMatch = data.match(/owl:versionInfo\s+([\d.]+)/);
  ontologyToReturn.version = versionMatch ? versionMatch[1] : "No version found";

  const classes: Class[] = [];
  const classMatches = data.match(/<([^>]+)>\s+a\s+rdfs:Class\s*;/g);
  if (classMatches) {
    classMatches.forEach(classMatch => {
      const classObj: Class = {
        name: '',
        label: "",
        subClasses: []
      };
      const className = classMatch.match(/<([^>]+)>/)[1];
      classObj.name = className;

      const labelMatch = data.match(new RegExp(`<${className}>\\s+a\\s+rdfs:Class\\s*;\\s+rdfs:label\\s+"([^"]+)"`));
      classObj.label = labelMatch ? labelMatch[1] : "No label found";

      const subClassOfMatches = data.match(new RegExp(`<${className}>\\s+a\\s+rdfs:Class\\s*;[^]+?rdfs:subClassOf\\s+([^;]+)`, 'g'));
      if (subClassOfMatches) {
        classObj.subClasses = subClassOfMatches.map(subClassMatch => subClassMatch.match(/rdfs:subClassOf\s+([^;]+)/)[1]);
      }

      classes.push(classObj);
    });
  }
  ontologyToReturn.classes = classes;

  return ontologyToReturn;
}
