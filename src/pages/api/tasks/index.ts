import { loadTasks } from '@/modules/api/task/utils'

import type { NextApiRequest, NextApiResponse } from 'next'
import type { Tasks } from '@/modules/task/types'

function handler(
  req: NextApiRequest,
  res: NextApiResponse<Tasks>
) {
  const tasks = loadTasks()
  res.status(200).json(tasks)
}

export default handler
