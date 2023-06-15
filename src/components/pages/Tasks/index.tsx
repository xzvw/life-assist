import useSWR from 'swr'
import styles from './Tasks.module.scss'

import type { Tasks } from '@/modules/task/types'

function TasksPage() {
  const { data } = useSWR<Tasks>(
    `api/tasks`,
    (args) => fetch(args).then((response) => response.json())
  )

  return (
    <div>
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}

export default TasksPage
