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
        isExpanded,
      }: {
        task: Task;
        title: string;
        description: string;
        status: TaskStatus;
        isExpanded: boolean;
      }
    ): void {
      console.log(arguments);
      const newTask = { ...task };
      if (title) {
        newTask.title = title;
      }
      if (description) {
        newTask.description = description;
      }
      if (typeof status === "number") {
        newTask.status = status;
      }
      if (typeof isExpanded === "boolean") {
        newTask.isExpanded = isExpanded;
      }
      const taskIndex = state.tasks.indexOf(task);
      state.tasks.splice(taskIndex, 1, newTask);
    },
  },
  actions: {},
  modules: {},
  plugins: [vuexPersist.plugin],
});
