import useSWR from 'swr'
import TaskForm from '@/components/task/TaskForm'
import TaskList from '@/components/task/TaskList'

import type { Task, Tasks } from '@/modules/task/types'

function TasksPage() {
  const { data: tasks = [], mutate } = useSWR<Tasks>(
    `api/tasks`,
    (args) => fetch(args).then((response) => response.json())
  )

  const onCreateTask = (task: Omit<Task, 'id'>) => fetch(`api/tasks`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(task)
  })
    .then((response) => response.json() as Promise<Task>)
    .then((task) => mutate([...tasks, task]))

  return (
    <div>
      <TaskForm onCreateTask={onCreateTask} />
      <TaskList tasks={tasks} />
    </div>
  )
}

export default TasksPage
