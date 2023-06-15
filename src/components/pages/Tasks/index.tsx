import useSWR from 'swr'
import styles from './Tasks.module.scss'

import type { Tasks } from '@/modules/task/types'
import classNames from 'classnames'

function TasksPage() {
  const { data: tasks } = useSWR<Tasks>(
    `api/tasks`,
    (args) => fetch(args).then((response) => response.json())
  )

  if (!tasks) {
    return null
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.row}>
          <div className={classNames(styles.column, styles.titleColumn)}>
            Title
          </div>
          <div className={classNames(styles.column, styles.descriptionColumn)}>
            Description
          </div>
          <div className={classNames(styles.column, styles.deadlineColumn)}>
            Deadline
          </div>
          <div className={classNames(styles.column, styles.importanceColumn)}>
            Importance
          </div>
          <div className={classNames(styles.column, styles.actionsColumn)}>
            Actions
          </div>
        </div>
      </div>

      <div className={styles.body}>
        {tasks.map(({ id, title, description, deadline, importance }) => (
          <div
            key={id}
            className={styles.row}
          >
            <div className={classNames(styles.column, styles.titleColumn)}>
              {title}
            </div>
            <div className={classNames(styles.column, styles.descriptionColumn)}>
              {description}
            </div>
            <div className={classNames(styles.column, styles.deadlineColumn)}>
              {deadline}
            </div>
            <div className={classNames(styles.column, styles.importanceColumn)}>
              {importance}
            </div>
            <div className={classNames(styles.column, styles.actionsColumn)}>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TasksPage
