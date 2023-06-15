import { TaskImportance } from './enums'

export type Tasks = Array<Task>

type Task = {
  id: string
  title: string
  description?: string
  deadline: Date | null
  importance: TaskImportance
}
