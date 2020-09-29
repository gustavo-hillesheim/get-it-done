import Vue from "vue";
import Vuex from "vuex";

import { Task, TaskStatus } from "./../model/task.model";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    taskIdSequence: 0,
    tasks: [],
  },
  mutations: {
    deleteTask(state, { task }: { task: Task }) {
      let taskIndex = state.tasks.indexOf(task);
      state.tasks.splice(taskIndex, 1);
    },
    createTask(state, { status }: { status: TaskStatus }): void {
      const taskId = ++state.taskIdSequence;
      state.tasks.push(
        new Task({
          id: taskId,
          title: "Tarefa " + taskId,
          description: "",
          status,
        })
      );
    },
  },
  actions: {},
  modules: {},
});
