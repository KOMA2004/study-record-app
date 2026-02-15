import React from 'react'
import styled from 'styled-components'

export const TimeInput = (props) => {
  const { placeholder = "", value, onChange } = props;

  return (
    <SInput
      type="number"
      placeholder={placeholder}
      value={value ?? ""}
      onChange={onChange}
      min="0"
    />
  )
}

const SInput = styled.input`
  width: 6ch;
  padding: 8px 16px;
  border: solid #ddd 1px;
  border-radius: 9999px;
  outline: none;
`
