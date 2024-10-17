import { fireEvent, render } from '@testing-library/react';

import '@testing-library/jest-dom';
import React from 'react';

import GaiaXButton from '../../../../src/common/components/buttons/GaiaXButton';
import Text from '../../../../src/common/components/fields/Text/Text';

describe('GaiaXButton', () => {
  it('render the label and children', () => {
    const labelText = 'Gaia X Label';
    const childComponentText = 'Child component'

    const { getByText } = render(
      <GaiaXButton label={labelText}>
        <Text>{childComponentText}</Text>
      </GaiaXButton>
    )

    const label = getByText(labelText)
    expect(label).toBeInTheDocument

    const childComponent = getByText(childComponentText)
    expect(childComponent).toBeInTheDocument
  })

  it('calls the handleOnClick if it is clicked', () => {
    const labelText = 'Gaia X Label';
    const handleClick = jest.fn();

    const { getByText } = render(
      <GaiaXButton label={labelText} handleOnClick={() => handleClick()}/>
    )

    const button = getByText(labelText)
    expect(button).toBeInTheDocument

    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call the handleOnClick if it is disabled and clicked', () => {
    const labelText = 'Gaia X Label';
    const handleClick = jest.fn();

    const { getByText } = render(
      <GaiaXButton label={labelText} handleOnClick={() => handleClick()} disabled={true}/>
    )

    const button = getByText(labelText)
    expect(button).toBeInTheDocument

    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(0)
  })

  it('test setting type', () => {
    const { getByText } = render(
      <>
        <GaiaXButton label="regular"/>
        <GaiaXButton label="submit" type="submit"/>
      </>
    )

    const regularButton = getByText('regular')
    expect(regularButton).not.toHaveAttribute('type', 'submit')

    const submitButton = getByText('submit')
    expect(submitButton).toHaveAttribute('type', 'submit')
  })
})
