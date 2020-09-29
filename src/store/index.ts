import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import { Task, TaskStatus } from "./../model/task.model";

Vue.use(Vuex);

const vuexPersist = new VuexPersistence({
  storage: window.localStorage,
});

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
    updateTask(
      state,
      {
        task,
        title,
        description,
        status,
      }: { task: Task; title: string; description: string; status: TaskStatus }
    ): void {
      if (title) {
        task.title = title;
      }
      if (description) {
        task.description = description;
      }
      if (status) {
        task.status = status;
      }
    },
  },
  actions: {},
  modules: {},
  plugins: [vuexPersist.plugin],
});
