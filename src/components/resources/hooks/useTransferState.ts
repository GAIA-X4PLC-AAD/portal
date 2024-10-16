import { useEffect, useState } from 'react';
import { checkTransferStatus } from 'services/edcServiceApi';

import { DataTransferInputProps, TransferProcessInformation, TransferStates } from '../../../types/edc.model';

type TransferStateInput = {
  counter: number;
  isVisible: true;
  transferInput: DataTransferInputProps;
  transferProcessInformation: TransferProcessInformation;
} | {
  counter: number;
  isVisible: false
}

/**
 * Retries data transfer status repeatedly in a give interval until transfer state becomes 'COMPLETED'.
 */
export const useTransferState = () => {
  const [state, setState] = useState<TransferStateInput>({
    counter: 0,
    isVisible: false,
  });
  const [transferState, setTransferState] = useState<TransferStates>();

  useEffect(() => {
    if (state.isVisible && state.counter) {
      checkTransferStatus(state.transferInput, state.transferProcessInformation)
        .then(transferStateInformation => {
          setTransferState(transferStateInformation.state)

          if (transferStateInformation.state !== 'COMPLETED') {
            rescheduleTransferStatusCheck(setState, state);
          }
        })
    }
  }, [state.isVisible, state.counter]);

  return {
    isVisible: state.isVisible,
    transferState,
    startMonitoring: (transferInput: DataTransferInputProps, transferProcessInformation: TransferProcessInformation) => {
      setState({
        counter: 6,
        isVisible: true,
        transferInput,
        transferProcessInformation
      })
    }
  }
}

const rescheduleTransferStatusCheck = (setInput: (input: TransferStateInput) => void, input: TransferStateInput) => {
  setTimeout(() => {
    if (input.counter) {
      setInput({ ...input, counter: input.counter - 1 } as TransferStateInput)
    }
  }, 10000) // launch after 10 seconds
}

