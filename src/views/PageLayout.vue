<template>
  <div class="page-layout">
    <router-view />
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "page-layout",
});
</script>
<style scoped>
.page-layout {
  height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
}
</style>
