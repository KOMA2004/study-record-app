import React from 'react'
import { DeleteButton } from '../atoms/DeleteButton'

export const Todo = (props) => {
  const { loading, records, onDelete } = props
  return (
    <div>
      {loading ? (
        <p>Loading</p>
      ) : (
        records.map((record) => (
          <p key={record.id}>
            {record.title} / {record.time} / <DeleteButton onClick={() => onDelete(record.id)}>削除</DeleteButton>
          </p>
        ))
      )}
    </div>
  )
}
