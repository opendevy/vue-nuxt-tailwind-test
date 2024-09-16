<script setup lang="ts">
import { useTasksStore } from "@/store/tasks";
import type { ITask } from "@/types/common";
import { Pencil, Trash2 } from "lucide-vue-next";
const store = useTasksStore();
const { removeTask, markAsDone, updateTask } = store;
const tasksList = storeToRefs(store).tasksList;

const handleMarkAsDone = (task: ITask) => {
  markAsDone(task);
};
const isEditModalOpen = ref(false);

const handleUpdateTask = (updatedTask: ITask) => {
  updateTask(updatedTask);
};
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px] md:w-[200px]"> Mark as Done </TableHead>
        <TableHead>Name</TableHead>
        <TableHead class="text-right"> Action </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="task in tasksList">
        <TableCell>
          <Checkbox
            class="w-6 h-6 data-[state=checked]:bg-blue-500 border-gray-300"
            :id="task.title"
            :checked="task.status === 'done'"
            @update:checked="handleMarkAsDone(task)"
          />
        </TableCell>
        <TableCell
          :class="`font-medium ${task.status === 'done' ? 'line-through' : ''}`"
          class="text-lg"
          >{{ task.title }}</TableCell
        >
        <TableCell class="text-right">
          <div class="flex gap-4 justify-end">
            <TaskListEditDialog
              :id="task?.id"
              :title="task?.title"
              :status="task?.status"
              @updateTask="handleUpdateTask"
            />
            <Button @click="removeTask(task)" class="bg-red-400" size="sm">
              <Trash2 class="w-4 h-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
