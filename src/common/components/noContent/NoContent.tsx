import React from 'react';

import Text from '../fields/././text/Text';

interface INoContent {
    message: string;
    visible: boolean;
}

const NoContent = ({ message, visible }: INoContent) => (
  <>
    {visible && <Text>{message}</Text>}
  </>
)

export default NoContent;
