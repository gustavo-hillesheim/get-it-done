<template>
  <div class="task-list">
    <div class="task-list-header">
      <span class="title">{{ title }}</span>
      <span class="new-task" @click="$emit('create')">Criar</span>
    </div>
    <div class="tasks" v-if="hasTasks">
      <TaskCard
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @delete="$emit('delete', task)"
        @update="$emit('update', { task, ...$event })"
      />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

import { Task } from "@/model/task.model";
import TaskCard from "../molecules/TaskCard.vue";

export default Vue.extend({
  name: "task-list",
  components: { TaskCard },
  props: {
    title: {
      type: String,
      required: true,
    },
    tasks: {
      type: Array,
      required: true,
    },
  },
  computed: {
    hasTasks(): boolean {
      return this.tasks.length > 0;
    },
  },
});
</script>
<style scoped>
.task-list {
  display: flex;
  flex-direction: column;
  text-align: start;
  border: 1px solid rgba(188, 188, 188, 0.8);
  border-radius: 5px;
  box-shadow: rgba(188, 188, 188, 0.8) 0px 2px 2px;
  padding: 8px 8px 4px 8px;
  overflow-y: auto;
}

.task-list .tasks {
  margin-top: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.task-list-header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.task-list-header .title {
  font-size: 24px;
  font-weight: bold;
  flex: 1;
}

.task-list-header .new-task {
  font-size: 18px;
}

.task-card {
  margin: 4px 0;
}
</style>
