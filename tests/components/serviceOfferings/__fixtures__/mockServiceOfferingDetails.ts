import {ServiceOfferingDetails} from '../../../../src/types/serviceOfferings.model';

export const mockServiceOfferingDetails: ServiceOfferingDetails = {
    name: "TT Data Processing Service",
    description: "Service which allows on demand data processing",
    requiredFilesList: [
        {
            description: "A road network following the ASAM OpenDRIVE v1.8.0 standard as a .xodr file",
            specification: "https://www.asam.net/standards/detail/opendrive/"
        }, {
            description: "A scenario following the ASAM OpenSCENARIO version 2.0.0 standard as a .osc file",
            specification: "https://www.asam.net/standards/detail/openscenario/v200/"
        }
    ],
    resultingFileDescription: "The ground-truth data of the executed simulation following the ASAM OSI v3.7.0 standard as a .osi file",
    resultingFileSpecification: "https://www.asam.net/standards/detail/osi/",
    contractId: "Y29udHJhY3QtZGVmaW5pdGlvbg==:c2VydmljZUFzc2V0:OWY2NzBlYTctNDdkNy00NmFhLWI1ZGYtYjdiMGNkZTA0NTJl",
    recordingTime: "2024-08-19T18:05:00",
    serviceAccessPointHost: "tt-ddm259.tracetronic.local/protocol",
    serviceAccessPointName: "EDC Access point",
    serviceAccessPointOpenAPI: "https://app.swaggerhub.com/apis/eclipse-edc-bot/management-api/0.6.4",
    serviceAccessPointProtocol: "https",
    serviceAccessPointPort: "19194",
    hostedOnLocation: "DE",
    hostedOnDescription: "TT Server",
    hostedOnName: "A TT Server where ecu.test runs on",
    providedBy: "Not specified",
    claimsGraphUri: ["https://www.gaia-x4plcaad.info/tt/claims/software-resource/a5905650-9b83-4363-96f1-7d3ead3ee533"],
    suitableDataOfferings: []
}