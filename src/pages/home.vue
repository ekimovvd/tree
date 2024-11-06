<template>
  <q-page class="row items-center justify-evenly">
    <tree-editor />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";

import TreeEditor from "components/tree/editor.vue";

defineOptions({
  name: "home",
});
</script>
