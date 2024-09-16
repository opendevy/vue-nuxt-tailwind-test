<script setup lang="ts">
const { id, title, status } = defineProps<ITask>();

import { useTasksStore } from "@/store/tasks";
import type { ITask } from "@/types/common";
import { Pencil } from "lucide-vue-next";
import { toast } from 'vue-sonner'
const emit = defineEmits(["updateTask"]);

const store = useTasksStore(); 
const {tasksList} = storeToRefs(store);

const taskTitle = ref(title);
const isOpen = ref(false);

const handleUpdateTask = (e: Event) => {
  e.preventDefault();
  if (taskTitle.value?.trim()) {
    const ifExist = tasksList.value.find((t) => t.title === taskTitle?.value?.trim());
    if (ifExist) {
      toast.error("Task already exist");
      return;
    }
    if (taskTitle?.value?.trim()) {
      emit("updateTask", { id, title: taskTitle.value.trim(), status });
      isOpen.value = false;
    }
  }
};
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger>
      <Button class="bg-blue-500" size="sm">
        <Pencil class="w-4 h-4 text-white" />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <form @submit.prevent="handleUpdateTask">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
          <div class="mt-2">
            <Input
              v-model="taskTitle"
              placeholder="Enter task name"
              class="focus:ring-gray-100"
            />
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            class="bg-green-500 w-full mt-5"
          >
            Update Task
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
