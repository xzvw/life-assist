import classNames from 'classnames'
import styles from './TaskList.module.scss'

import type { Tasks } from '@/modules/task/types'

export type TaskListProps = {
  tasks: Tasks
}

function TaskList({ tasks }: TaskListProps) {
  return (
    <div className={styles.table}>
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

export default TaskList
