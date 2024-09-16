export interface ITask {
  id?: string;
  title?: string;
  status?: "todo" | "doing" | "done";
}
