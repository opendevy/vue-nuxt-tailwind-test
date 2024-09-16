import type { ITask } from "@/types/common";
import { defineStore } from "pinia";

export const useTasksStore = defineStore(
  "tasksStore",
  () => {
    const tasksList = ref<ITask[]>([]);

    function addTask(task: ITask) {
      tasksList.value.push(task);
    }

    function removeTask(task: ITask) {
      const index = tasksList.value.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        tasksList.value.splice(index, 1);
      }
    }

    function markAsDone(task: ITask) {
      const index = tasksList.value.findIndex((t) => t.id === task.id);
      if (index !== -1) {
        tasksList.value[index] = {
          ...tasksList.value[index],
          status: "done",
        };
      }
    }

    function removeDoneTasks() {
      tasksList.value = [...tasksList.value.filter((t) => t.status !== "done")];
    }

    function updateTask(updatedTask: ITask) {
      const index = tasksList.value.findIndex((t) => t.id === updatedTask.id);
      if (index !== -1) {
        tasksList.value[index] = { ...updatedTask }; // Spread to ensure reactivity
      }
    }

    return {
      tasksList,
      addTask,
      updateTask,
      removeTask,
      markAsDone,
      removeDoneTasks,
    };
  },
  {
    persist: true,
  }
);
