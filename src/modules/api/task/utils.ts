import fs from 'fs'
import { v4 as uuidV4 } from 'uuid'

import type { Task, Tasks } from '@/modules/task/types'

const filepath = 'src/data/tasks.json'

export function readTasks(): Tasks {
  const data = fs.readFileSync(filepath)
  const object = JSON.parse(data.toString())

  return object
}

export function createTask(task: Omit<Task, 'id'>) {
  const tasks = readTasks()
  const newTask: Task = {
    id: uuidV4(),
    ...task,
  }
  fs.writeFileSync(filepath, JSON.stringify([...tasks, newTask]))

  return newTask
}
