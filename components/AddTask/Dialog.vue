<script setup lang="ts">
    import { useTasksStore } from '@/store/tasks';
    import { toast } from 'vue-sonner'
    const store = useTasksStore(); 
    const {
        addTask,
    } = store;

    const {tasksList} = storeToRefs(store);

    const taskTitle = ref('');
    const isOpen = ref(false);

    const handleAddTask = (e: Event) => {
      e.preventDefault();
      if (taskTitle?.value?.trim()) {
        const id = taskTitle?.value.split(' ').join('-').toLowerCase();
        const ifExist = tasksList.value.find((t) => t.title === taskTitle?.value?.trim());
        if (ifExist) {
          toast.error('Task already exist');
          return;
        }
        addTask({ id, title: taskTitle.value, status: 'todo' });
        taskTitle.value = '';
        isOpen.value = false;
      }
    };
</script>

<template>
  <Dialog 
    v-model:open="isOpen"
  >
    <DialogTrigger>
      <Button class="bg-green-500 px-2 py-1 rounded-md" size="sm">
        Add Task
      </Button>
    </DialogTrigger>
    <DialogContent>
      <form @submit.prevent="handleAddTask">
        <DialogHeader>
          <DialogTitle>Add a New Task</DialogTitle>
          <div class="mt-2">
          <Input
            v-model="taskTitle"  
            placeholder="Enter task name" 
            class="focus:ring-gray-100" 
          />
        </div>
        </DialogHeader>
       
        <DialogFooter>
          <Button type="submit" class="bg-green-500 w-full mt-5">
              Add Task
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>