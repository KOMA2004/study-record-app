import React from 'react'
import styled from "styled-components"
import { BaseButton } from './BaseButton';

export const AddButton = (props) => {
  const { children, onClick, disabled, type = "button" } = props;

  return (
    <SButton type={type} onClick={onClick} disabled={disabled}>
      {children}
    </SButton>
  )
}

const SButton  = styled(BaseButton)`
  background-color: #40514e;
`
