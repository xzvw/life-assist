import { TaskImportance } from './enums'

export type Tasks = Array<Task>

export type Task = {
  id: string
  title: string
  description: string | null
  deadline: string | null
  importance: TaskImportance
}
