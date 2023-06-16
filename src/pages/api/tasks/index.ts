import { createTask, readTasks } from '@/modules/api/task/utils'

import type { NextApiRequest, NextApiResponse } from 'next'
import type { Task, Tasks } from '@/modules/task/types'

function handler(
  req: NextApiRequest,
  res: NextApiResponse<Tasks | Task>
) {
  if (req.method === 'GET') {
    const tasks = readTasks()
    return res.status(200).json(tasks)
  }

  if (req.method === 'POST') {
    const newTask = createTask(req.body)
    return res.status(200).json(newTask)
  }

  return res.status(400).end()
}

export default handler
