import fs from 'fs'

import type { Tasks } from '@/modules/task/types'

export function loadTasks(): Tasks {
  const data = fs.readFileSync('src/data/tasks.json')
  const object = JSON.parse(data.toString())

  return object
}
