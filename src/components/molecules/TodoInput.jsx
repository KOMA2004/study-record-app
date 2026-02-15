import React, { useState } from 'react'
import { ContentInput } from '../atoms/ContentInput'
import { TimeInput } from '../atoms/TimeInput'
import { AddButton } from '../atoms/AddButton'
import styled from 'styled-components'

export const TodoInput = ({ onAdd }) => {
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")

  const handleAdd = async () => {
    if (title.trim() === "" || time === "") return
    await onAdd?.({title: title.trim(), time: time === "" ? null : Number(time) })
    setTitle("")
    setTime("")
  }

  return (
    <SContainer>
      <ContentInput
        placeholder="todoを入力"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <SDiv>
        <TimeInput
          placeholder="時間"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </SDiv>
      <SDiv>
        <AddButton onClick={handleAdd} disabled={title.trim() === "" | time === ""}>
          追加
        </AddButton>
      </SDiv>
    </SContainer>
  )
}

const SDiv = styled.div`
  padding-left: 8px;
`
const SContainer = styled.div`
  display: flex;
  align-items: center;
`
