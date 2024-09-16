<template>
    <div class="m-3">
        <div class="container p-4 mx-auto max-w-4xl shadow-lg rounded-md mt-4 mt-12 bg-white">
            <div class="flex flex-col md:flex-row p-2 mx-auto justify-between ">
                <p class="text-xl font-bold">All items</p>
                <div class="flex gap-4 mt-3 md:mt-0">
                    <Button class="bg-red-400" @click="removeDoneTasks" size="sm">
                        Clear Done Tasks
                    </Button>
                    <AddTaskDialog />
                </div>
            </div>
            <div>
                <TaskList />
            </div>
        </div>
    </div>
</template>

<script setup>
    import {useTasksStore} from '@/store/tasks';
    const { removeDoneTasks } = useTasksStore();
</script>

<style scoped>

</style>