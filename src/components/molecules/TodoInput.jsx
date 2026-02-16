import React, { useState } from 'react'
import { ContentInput } from '../atoms/ContentInput'
import { TimeInput } from '../atoms/TimeInput'
import { AddButton } from '../atoms/AddButton'
import styled from 'styled-components'

export const TodoInput = ({ onAdd }) => {
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [error, setError] = useState("")

  const handleAdd = async () => {
    const t = title.trim()
    if (t === "" || time === "") {
      setError("学習内容と時間を入力してください")
      return
    }
    setError("")
    await onAdd?.({ title: t, time: Number(time) })
    setTitle("")
    setTime("")
  }

  return (
    <div>
      {error && <p role="alert">{error}</p>}

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
          {/* 課題④があるので「押せる」ままにする */}
          <AddButton onClick={handleAdd}>
            追加
          </AddButton>

          {/* もし「未入力は押せない」仕様に戻したいなら↓（ただし課題④と矛盾しやすい）
          <AddButton onClick={handleAdd} disabled={title.trim() === "" || time === ""}>
            追加
          </AddButton>
          */}
        </SDiv>
      </SContainer>
    </div>
  )
}

const SDiv = styled.div`
  padding-left: 8px;
`
const SContainer = styled.div`
  display: flex;
  align-items: center;
`
