<template>
  <div class="tree-node">
    <q-card class="tree-node__card">
      <q-card-section>
        {{ node.name }}
      </q-card-section>

      <q-card-actions align="center">
        <q-btn icon="edit" color="green" @click="handleEdit" />

        <q-btn icon="delete" color="red" @click="handleRemove" />

        <q-btn icon="add" color="blue" @click="handleAdd" />
      </q-card-actions>
    </q-card>

    <div
      v-if="node.children && node.children.length"
      class="tree-node__children"
    >
      <tree-node
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        @add="$emit('add', $event)"
        @edit="$emit('edit', $event)"
        @remove="$emit('remove', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, PropType } from "vue";

import { Tree } from "../../shared/interfaces";

defineOptions({
  name: "TreeNode",
});

const props = defineProps({
  node: {
    type: Object as PropType<Tree>,
    required: true,
  },
});

const emit = defineEmits(["add", "edit", "remove"]);

const handleAdd = (): void => {
  emit("add", props.node.id);
};

const handleEdit = (): void => {
  emit("edit", props.node.id);
};

const handleRemove = (): void => {
  emit("remove", props.node.id);
};
</script>

<style lang="scss">
.tree-node {
  position: relative;
  margin-top: 8px;

  .tree-node__card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  .tree-node__children {
    margin-left: 24px;
    margin-top: 8px;
    border-left: 2px solid #e0e0e0;
    padding-left: 16px;
  }
}
</style>
