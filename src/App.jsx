import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import { TodoInput } from './components/molecules/TodoInput'
import { Todo } from './components/molecules/Todo'

export default function App() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('study-record').select('*')
    if (!error) setRecords(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const addRecord = async ({ title, time }) => {
    const { data, error } = await supabase
      .from('study-record')
      .insert([{ title, time }])
      .select()
      .single()

    if (error) {
      console.error(error)
      alert('追加に失敗しました')
      return
    }

    setRecords((prev) => [data, ...prev])
  }

  const deleteRecord = async (id) => {
    const ok = confirm('削除しますか？')
    if (!ok) return

    const { error } = await supabase.from('study-record').delete().eq('id', id)

    if (error) {
      console.error(error)
      alert('削除に失敗しました')
      return
    }

    setRecords((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <div>
      <h1>Study Records</h1>

      <div>
        <TodoInput onAdd={addRecord} />
        <Todo
          records={records}
          loading={loading}
          onDelete={deleteRecord}
        ></Todo>
      </div>
    </div>
  )
}
