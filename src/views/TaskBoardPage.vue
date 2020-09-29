<template>
  <TaskBoardTemplate>
    <template #todo>
      <TaskList
        title="Em espera"
        :tasks="todoTasks"
        @create="createTask('todo')"
        @delete="deleteTask($event)"
        @update="updateTask($event)"
      />
    </template>
    <template #in-progress>
      <TaskList
        title="Em andamento"
        :tasks="inProgressTasks"
        @create="createTask('inProgress')"
        @delete="deleteTask($event)"
        @update="updateTask($event)"
      />
    </template>
    <template #done>
      <TaskList
        title="Pronto"
        :tasks="doneTasks"
        @create="createTask('done')"
        @delete="deleteTask($event)"
        @update="updateTask($event)"
      />
    </template>
  </TaskBoardTemplate>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapState } from "vuex";

import TaskBoardTemplate from "../components/templates/TaskBoardTemplate.vue";
import TaskList from "../components/organisms/TaskList.vue";
import { Task, TaskStatus } from "@/model/task.model";

export default Vue.extend({
  name: "task-board-page",
  components: { TaskBoardTemplate, TaskList },
  computed: {
    ...mapState(["tasks"]),
    todoTasks(): Task[] {
      return this.filterTasks(TaskStatus.TODO);
    },
    inProgressTasks(): Task[] {
      return this.filterTasks(TaskStatus.IN_PROGRESS);
    },
    doneTasks(): Task[] {
      return this.filterTasks(TaskStatus.DONE);
    },
  },
  methods: {
    deleteTask(task: Task) {
      this.$store.commit("deleteTask", { task });
    },
    createTask(statusName: "todo" | "inProgress" | "done") {
      const statusMap = {
        todo: TaskStatus.TODO,
        inProgress: TaskStatus.IN_PROGRESS,
        done: TaskStatus.DONE,
      };
      const status = statusMap[statusName];
      this.$store.commit("createTask", { status });
    },
    filterTasks(status: TaskStatus): Task[] {
      return this.tasks.filter((task: Task) => task.status === status);
    },
    updateTask(parameters: {
      task: Task;
      title: string;
      description: string;
      status: TaskStatus;
    }): void {
      console.log(parameters);
      this.$store.commit("updateTask", parameters);
    },
  },
});
</script>
<style scoped>
.task-board {
  flex: 1;
}
</style>
