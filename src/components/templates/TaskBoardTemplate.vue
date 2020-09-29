<template>
  <div class="task-board">
    <slot name="todo"></slot>
    <slot name="in-progress"></slot>
    <slot name="done"></slot>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "task-board-template",
});
</script>
<style scoped>
.task-board {
  padding: 4px;
  display: flex;
  flex-direction: row;
  height: 100%;
}
.task-list {
  margin: 4px;
  flex: 1;
  max-width: 350px;
  max-height: 100%;
  height: fit-content;
}
</style>
