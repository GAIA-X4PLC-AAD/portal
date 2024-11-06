import {
  checkTransferStatus,
  initiateDataTransfer,
  negotiateContract,
  retrieveAgreement,
  retrieveContractInformation
} from '../../src/services/edcServiceApi';

const get = jest.fn()
const post = jest.fn()
jest.mock('axios', () => ({
  get: (endpoint, config) => get(endpoint, config),
  post: (endpoint, payload, header) => post(endpoint, payload, header),
}))

console.debug = jest.fn()

describe('edcServiceApi', () => {
  it('retrieve contract information - current response', () => {
    get.mockResolvedValueOnce({
      data: {
        '@id': '123456789',
        'edc:assetsSelector': {
          'edc:operandRight': 'HadMap 1'
        }
      }
    })

    expect(retrieveContractInformation(expect.any(Object))).resolves.toEqual({
      contractDefinitionId: '123456789',
      assetNameFull: 'HadMap 1'
    })
  })

  it('retrieve contract information - missing id', () => {
    get.mockResolvedValueOnce({
      data: {
        'edc:assetsSelector': {
          'edc:operandRight': 'HadMap 1'
        }
      }
    })

    expect(retrieveContractInformation(expect.any(Object))).resolves.toEqual({
      contractDefinitionId: null,
      assetNameFull: 'HadMap 1'
    })
  })

  it('retrieve contract information - missing operand right', () => {
    get.mockResolvedValueOnce({
      data: {
        '@id': '123456789',
        'edc:assetsSelector': {}
      }
    })

    expect(retrieveContractInformation(expect.any(Object))).resolves.toEqual({
      contractDefinitionId: '123456789',
      assetNameFull: null
    })
  })

  it('retrieve contract information - missing assetSelector', () => {
    get.mockResolvedValueOnce({
      data: {
        '@id': '123456789',
      }
    })

    expect(retrieveContractInformation(expect.any(Object))).resolves.toEqual({
      contractDefinitionId: '123456789',
      assetNameFull: null
    })
  })

  it('negotiate contract - correct response', () => {
    post.mockResolvedValueOnce({
      data: { '@id': '987654321' }
    })

    expect(negotiateContract(expect.any(Object))).resolves.toEqual({
      contractNegotiationUID: '987654321',
    })
  })

  it('negotiate contract - missing id', () => {
    post.mockResolvedValueOnce({
      data: {}
    })

    expect(negotiateContract(expect.any(Object))).resolves.toEqual({
      contractNegotiationUID: null,
    })
  })

  it('retrieve agreement - correct response', () => {
    get.mockResolvedValueOnce({
      data: {
        'edc:contractAgreementId': '23479-hjk124-h3k1h4-1344114',
        'edc:state': 'FINALIZED'
      }
    })

    expect(retrieveAgreement(expect.any(Object))).resolves.toEqual({
      contractAgreementUID: '23479-hjk124-h3k1h4-1344114',
      state: 'FINALIZED'
    })
  })

  it('retrieve agreement - missing contractAgreementId', () => {
    get.mockResolvedValueOnce({
      data: {
        'edc:state': 'FINALIZED'
      }
    })

    expect(retrieveAgreement(expect.any(Object))).resolves.toEqual({
      contractAgreementUID: null,
      state: 'FINALIZED'
    })
  })

  it('retrieve agreement - missing state', () => {
    get.mockResolvedValueOnce({
      data: {
        'edc:contractAgreementId': '23479-hjk124-h3k1h4-1344114',
      }
    })

    expect(retrieveAgreement(expect.any(Object))).resolves.toEqual({
      contractAgreementUID: '23479-hjk124-h3k1h4-1344114',
      state: null
    })
  })

  it('initiate data transfer - correct response', () => {
    post.mockResolvedValueOnce({
      data: { '@id': '12983791-fda-2342-423423423' }
    })

    expect(initiateDataTransfer(expect.any(Object))).resolves.toEqual({
      transferProcessId: '12983791-fda-2342-423423423',
    })
  })

  it('initiate data transfer - missing id', () => {
    post.mockResolvedValueOnce({
      data: {}
    })

    expect(initiateDataTransfer(expect.any(Object))).resolves.toEqual({
      transferProcessId: null,
    })
  })

  it('check transfer status - correct response', () => {
    get.mockResolvedValueOnce({
      data: { 'edc:state': 'COMPLETED' }
    })

    expect(checkTransferStatus(expect.any(Object))).resolves.toEqual({
      status: 'COMPLETED',
    })
  })

  it('check transfer status - missing state', () => {
    get.mockResolvedValueOnce({
      data: {}
    })

    expect(checkTransferStatus(expect.any(Object))).resolves.toEqual({
      status: null,
    })
  })

});
