import { useEffect, useState } from 'react';

import { checkTransferStatus } from '../../../services/edcServiceApi';
import { DataTransferInputProps, TransferProcessInformation, TransferStates } from '../../../types/edc.model';

type TransferStateInput = {
  isLoading: true;
  transferInput: DataTransferInputProps;
  transferProcessInformation: TransferProcessInformation;
} | {
  isLoading: false;
}

/**
 * Retries data transfer status repeatedly in a give interval until transfer state becomes 'COMPLETED'.
 */
export const useTransferState = () => {
  const [input, setInput] = useState<TransferStateInput>({ isLoading: false });
  const [transferState, setTransferState] = useState<TransferStates>();

  useEffect(() => {
    if (input.isLoading) {
      setInput({ ...input, isLoading: false });
      checkTransferStatus(input.transferInput, input.transferProcessInformation)
        .then(transferStateInformation => {
          setTransferState(transferStateInformation.state)
          if (transferStateInformation.state !== 'COMPLETED') {
            restartMonitoring(setInput, input);
          }
        });
    }
  }, [input.isLoading]);

  return {
    transferState,
    startMonitoring: (transferInput: DataTransferInputProps, transferProcessInformation: TransferProcessInformation) => {
      setInput({
        isLoading: true,
        transferInput,
        transferProcessInformation
      })
    }
  }
}

const restartMonitoring = (setInput: (input: TransferStateInput) => void, input: TransferStateInput) => {
  setTimeout(() => {
    setInput({ ...input, isLoading: true } as TransferStateInput)
  }, 3000)
}

