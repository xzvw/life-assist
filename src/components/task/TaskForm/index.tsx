import classNames from 'classnames'
import { useCallback, useState } from 'react'
import { TaskImportance } from '@/modules/task/enums'
import styles from './TaskForm.module.scss'

import type { ChangeEventHandler, FormEventHandler } from 'react'
import type { Task } from '@/modules/task/types'

type Field<T = string> = {
  value: T
  hasError: boolean
}

export type TaskFormProps = {
  onCreateTask: (task: Omit<Task, 'id'>) => Promise<any>
}

function TaskForm({ onCreateTask }: TaskFormProps) {
  const [title, setTitle] = useState<Field>({ value: '', hasError: false })
  const [description, setDescription] = useState<Field>({ value: '', hasError: false })
  const [deadline, setDeadline] = useState<Field>({ value: '', hasError: false })
  const [importance, setImportance] = useState<Field<TaskImportance>>({ value: TaskImportance.low, hasError: false })

  const onTitleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => setTitle((prev) => ({ ...prev, value, hasError: false })),
    []
  )

  const onDescriptionChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => setDescription((prev) => ({ ...prev, value, hasError: false })),
    []
  )

  const onDeadlineChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => setDeadline((prev) => ({ ...prev, value, hasError: false })),
    []
  )

  const onImportanceChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    ({ target: { value } }) => setImportance((prev) => ({
      ...prev,
      value: value as TaskImportance,
      hasError: false,
    })),
    []
  )

  const clearInputs = useCallback(() => {
    setTitle((prev) => ({ value: '', hasError: false }))
    setDescription((prev) => ({ value: '', hasError: false }))
    setDeadline((prev) => ({ value: '', hasError: false }))
    setImportance((prev) => ({ value: TaskImportance.low, hasError: false }))
  }, [])

  const handleSubmit = useCallback<FormEventHandler>((event) => {
    event.preventDefault()

    let hasError = false

    if (!title.value) {
      hasError = true
      setTitle((prev) => ({ ...prev, hasError: true }))
    }

    if (!importance.value) {
      hasError = true
      setImportance((prev) => ({ ...prev, hasError: true }))
    }

    if (!hasError) {
      const task: Omit<Task, 'id'> = {
        title: title.value,
        description: description.value || null,
        deadline: deadline.value || null,
        importance: importance.value,
      }

      onCreateTask(task).then(() => {
        clearInputs()
      })
    }
  }, [clearInputs, deadline, description, importance, onCreateTask, title])

  return (
    <form onSubmit={handleSubmit}>
      <div className={classNames(
        styles.field,
        title.hasError && styles.hasError
      )}>
        {'Title: '}
        <input
          value={title.value}
          onChange={onTitleChange}
        />
      </div>
      <div className={classNames(
        styles.field,
        description.hasError && styles.hasError
      )}>
        {'Description: '}
        <input
          value={description.value}
          onChange={onDescriptionChange}
        />
      </div>
      <div className={classNames(
        styles.field,
        deadline.hasError && styles.hasError
      )}>
        {'Deadline: '}
        <input
          type="datetime-local"
          value={deadline.value}
          onChange={onDeadlineChange}
        />
      </div>
      <div className={classNames(
        styles.field,
        importance.hasError && styles.hasError
      )}>
        {'Importance: '}
        <select
          value={importance.value}
          onChange={onImportanceChange}
        >
          <option>{TaskImportance.low}</option>
          <option>{TaskImportance.medium}</option>
          <option>{TaskImportance.high}</option>
        </select>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default TaskForm
