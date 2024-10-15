import { Participant } from '../../../../../src/types/participants.model';

export const mockParticipants = [
  {
    legalName: 'msg systems AG',
    claimsGraphUri: [
      'did:web:participant.gxfs.gx4fm.org',
      'https://participant.gxfs.gx4fm.org/.well-known/serviceOffering111.json'
    ],
    gaiaxTermsAndConditions: null,
    uri: 'https://participant.gxfs.gx4fm.org/.well-known/legalParticipant.json',
    labels: [
      'Resource',
      'LegalParticipant'
    ]
  },
  {
    legalName: 'tracetronic GmbH',
    claimsGraphUri: [
      'https://www.gaia-x4plcaad.info/tt/claims/service-offering/e83a5a09-5f70-41f2-ad1d-8772a6bd73c1',
      'https://www.gaia-x4plcaad.info/tt/claims/service-access-point/e83a5a09-5f70-41f2-ad1d-8772a6bd73c1',
      'did:web:participant.gxfs.gx4fm.org:tracetronic'
    ],
    gaiaxTermsAndConditions: '70c1d713215f95191a11d38fe2341faed27d19e083917bc8732ca4fea4976700',
    uri: 'https://participant.gxfs.gx4fm.org/tracetronic/legalParticipant.json',
    labels: [
      'Resource',
      'LegalParticipant'
    ]
  },
  {
    legalName: 'msg systems ag',
    claimsGraphUri: [
      'https://www.gaia-x4plcaad.info/claims/service-offering/01386693-158d-4e38-bdc1-9b39a0a47651',
      'https://www.gaia-x4plcaad.info/claims/service-access-point/fe9f0d7f-3a80-48ef-9630-a7c9c3c1e78f',
      'https://www.gaia-x4plcaad.info/claims/physical-resource/01a9590e-e872-470f-b400-aaa513499114',
      'https://www.gaia-x4plcaad.info/claims/virtual-resource/2581d57a-834d-4171-895b-e05802060e11',
      'https://www.gaia-x4plcaad.info/claims/virtual-resource/fe9f0d7f-3a80-48ef-9630-a7c9c3c1e78f',
      'https://www.gaia-x4plcaad.info/claims/service-offering/1081c710-ae91-4f77-b0be-ee0552eb6cb6',
      'https://www.gaia-x4plcaad.info/claims/service-offering/8048359d-1347-4a85-8e36-15388e0fddda',
      'https://www.gaia-x4plcaad.info/claims/virtual-resource/0a3cff98-ddd8-4ecb-9c2d-e135f58d9116',
      'https://www.gaia-x4plcaad.info/claims/service-offering/01a9590e-e872-470f-b400-aaa513499114',
      'https://www.gaia-x4plcaad.info/claims/data-resource/01386693-158d-4e38-bdc1-9b39a0a47651',
      'https://www.gaia-x4plcaad.info/claims/service-offering/25929d5f-a577-475c-aab8-aa05c65e8d1c',
      'https://www.gaia-x4plcaad.info/claims/service-access-point/8048359d-1347-4a85-8e36-15388e0fddda',
      'https://www.gaia-x4plcaad.info/claims/service-offering/57232ba1-7310-4f79-b64c-6793b378d76a',
      'https://www.gaia-x4plcaad.info/claims/service-offering/fe9f0d7f-3a80-48ef-9630-a7c9c3c1e78f',
      'did:web:registry.gaia-x.eu:EnvironmentModel:6w462bGIheP4YgwebemsXr3yjIqvhi90EDIi',
      'https://www.gaia-x4plcaad.info/claims/data-resource/1081c710-ae91-4f77-b0be-ee0552eb6cb6',
      'https://www.gaia-x4plcaad.info/claims/service-offering/e4391425-2a8b-4b2f-84d1-ce470b73e93e',
      'https://www.gaia-x4plcaad.info/claims/service-offering/2581d57a-834d-4171-895b-e05802060e11',
      'https://www.gaia-x4plcaad.info/claims/service-offering/99f007ea-2406-4d74-adb1-1ca2f81c0c85',
      'https://www.gaia-x4plcaad.info/claims/service-offering/0a3cff98-ddd8-4ecb-9c2d-e135f58d9116',
      'https://www.gaia-x4plcaad.info/claims/virtual-resource/99f007ea-2406-4d74-adb1-1ca2f81c0c85',
      'https://www.gaia-x4plcaad.info/claims/physical-resource/57232ba1-7310-4f79-b64c-6793b378d76a',
      'did:web:participant.gxfs.gx4fm.org:msg-systems-ag',
      'https://www.gaia-x4plcaad.info/claims/data-resource/fe9f0d7f-3a80-48ef-9630-a7c9c3c1e78f',
      'https://www.gaia-x4plcaad.info/claims/physical-resource/fe9f0d7f-3a80-48ef-9630-a7c9c3c1e78f'
    ],
    gaiaxTermsAndConditions: '70c1d713215f95191a11d38fe2341faed27d19e083917bc8732ca4fea4976700',
    uri: 'https://participant.gxfs.gx4fm.org/msg-systems-ag/legalParticipant.json',
    labels: [
      'Resource',
      'LegalParticipant'
    ]
  },
  {
    legalName: 'BMW AG',
    claimsGraphUri: [
      'did:web:participant.gxfs.gx4fm.org:bmw'
    ],
    gaiaxTermsAndConditions: '70c1d713215f95191a11d38fe2341faed27d19e083917bc8732ca4fea4976700',
    uri: 'https://participant.gxfs.gx4fm.org/bmw/legalParticipant.json',
    labels: [
      'Resource',
      'LegalParticipant'
    ]
  },
  {
    legalName: 'Infineon Technologies AG',
    claimsGraphUri: [
      'did:web:participant.gxfs.gx4fm.org:infineon',
      'https://www.gaia-x4plcaad.info/claims/data-resource/vaq3cf88jbdw3jvkx5b5bam79w',
      'https://www.gaia-x4plcaad.info/claims/data-resource/9xdycmdjk0mn2xvnyppcpbmheg',
      'https://www.gaia-x4plcaad.info/claims/data-resource/tmnsq0vqf3bhfazhnfsqkw1500',
      'https://www.gaia-x4plcaad.info/claims/data-resource/v4yets95swpktxrrg9903frpq8',
      'https://www.gaia-x4plcaad.info/claims/data-resource/pz6c0ax8p24fctf3tqv2t4mc18',
      'https://www.gaia-x4plcaad.info/claims/data-resource/49pf5eck4f81711ks3q0fhx8qr',
      'https://www.gaia-x4plcaad.info/claims/data-resource/gecr91kybca576gq8qrn1eynkc',
      'https://www.gaia-x4plcaad.info/claims/data-resource/fhwaxp4wjw3xpncjne1k58zvpr'
    ],
    gaiaxTermsAndConditions: '70c1d713215f95191a11d38fe2341faed27d19e083917bc8732ca4fea4976700',
    uri: 'https://participant.gxfs.gx4fm.org/infineon/legalParticipant.json',
    labels: [
      'Resource',
      'LegalParticipant'
    ]
  }
] as Participant[];
