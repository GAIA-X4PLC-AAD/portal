export interface Service {
    serviceId: string;
    name: string;
    descriptionShort: string;
    descriptionLong: string;
    imageUrl: string;
    price: string;
    navigationUrl: string;

    provider?: string;
    licenseModel?: string;
    version?: string;
    lastUpdated?: string;
    availability?: string;
    certification?: string[];

    requiredInputs?: string[];
    outputDescription?: string;
    useCases?: string[];
    dataPrivacyNote?: string;
}
