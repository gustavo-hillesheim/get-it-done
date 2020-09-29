<template>
  <div class="task-card">
    <div class="task-card-header">
      <div class="expand-task" @click="toggleExpanded">
        {{ task.isExpanded ? "-" : "+" }}
      </div>
      <div class="task-title">
        <input
          ref="titleInput"
          v-if="isEditing"
          v-model="editingTitle"
          :size="editingTitle.length"
          @keydown.enter="saveTitle"
          @blur="saveTitle"
        />
        <div v-else @click="startEditingTitle">
          {{ task.title }}
        </div>
      </div>
      <div class="delete-task" @click="$emit('delete')">X</div>
    </div>
    <div class="task-card-content" v-if="task.isExpanded">
      <label>Descrição</label>
      <textarea
        class="task-description-editor"
        v-model="editingDescription"
        @blur="saveDescription"
      ></textarea>
      <div class="task-status-changer">
        <div
          class="task-status-todo"
          :class="activeClass('todo')"
          @click="changeStatus('todo')"
        >
          Em espera
        </div>
        <div
          class="task-status-in-progress"
          :class="activeClass('inProgress')"
          @click="changeStatus('inProgress')"
        >
          Em andamento
        </div>
        <div
          class="task-status-done"
          :class="activeClass('done')"
          @click="changeStatus('done')"
        >
          Pronto
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

import { Task, TaskStatus } from "../../model/task.model";

type StatusName = "todo" | "inProgress" | "done";

const statusMap = {
  todo: TaskStatus.TODO,
  inProgress: TaskStatus.IN_PROGRESS,
  done: TaskStatus.DONE,
};

export default Vue.extend({
  name: "task-card",
  props: {
    task: {
      type: Task,
      required: true,
    },
  },
  data: () => ({
    isEditing: false,
    editingTitle: "",
    editingDescription: "",
  }),
  created() {
    this.editingDescription = this.task.description;
  },
  methods: {
    startEditingTitle() {
      this.isEditing = true;
      this.editingTitle = this.task.title;
      this.$nextTick().then(() =>
        (this.$refs.titleInput as HTMLElement).focus()
      );
    },
    saveTitle() {
      this.isEditing = false;
      this.$emit("update", { title: this.editingTitle });
    },
    toggleExpanded() {
      this.$emit("update", { isExpanded: !this.task.isExpanded });
    },
    saveDescription() {
      this.$emit("update", { description: this.editingDescription });
    },
    activeClass(statusName: StatusName): string {
      const status = statusMap[statusName];
      return this.task.status === status ? "active" : null;
    },
    changeStatus(statusName: StatusName): void {
      const status = statusMap[statusName];
      this.$emit("update", { status });
    },
  },
});
</script>
<style scoped>
.task-card {
  border-radius: 5px;
  border: 1px solid rgba(188, 188, 188, 0.8);
  padding: 8px;
  display: flex;
  flex-direction: column;
}

.task-card-header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.task-title {
  flex: 1;
  margin: 0 4px;
}

.task-title * {
  font-size: 16px;
}

.task-title div {
  width: fit-content;
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.task-title input {
  border: none;
  max-width: 200px;
  border-bottom: 1px solid rgb(188, 188, 188);
}
.task-title input:focus {
  outline: none;
  border-bottom: 1px solid rgb(68, 68, 255);
}

.expand-task {
  width: 12px;
  text-align: center;
}

.task-card-content {
  margin-top: 8px;
  border-top: 1px solid rgb(188, 188, 188);
  padding-top: 8px;
}

.task-description-editor {
  padding: 4px;
  margin-top: 4px;
  font-size: 14px;
  min-width: 100%;
  max-width: 100%;
  min-height: 50px;
  max-height: 200px;
}

.task-status-changer {
  margin-top: 4px;
  display: flex;
  flex-direction: row;
  width: 100%;
  font-size: 14px;
  text-align: center;
}

.task-status-changer div {
  padding: 2px 0;
  cursor: pointer;
  border: 1px solid black;
}

.task-status-todo {
  flex: 1;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.task-status-todo:hover {
  background-color: rgba(255, 217, 0, 0.3);
}
.task-status-todo.active {
  background-color: rgb(255, 217, 0);
}

.task-status-in-progress {
  flex: 1;
}
.task-status-in-progress:hover {
  background-color: rgba(0, 220, 255, 0.3);
}
.task-status-in-progress.active {
  background-color: rgb(0, 220, 255);
}

.task-status-done {
  flex: 1;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.task-status-done:hover {
  background-color: rgba(0, 255, 98, 0.3);
}
.task-status-done.active {
  background-color: rgb(0, 255, 98);
}
</style>
