<template>
  <div class="tree-editor">
    <q-btn
      color="primary"
      icon="add"
      class="tree-editor__add"
      @click="handleAddRoot"
    />

    <div v-for="node in tree" :key="node.id" class="tree-editor__node">
      <TreeNode
        :node="node"
        @add="handleAddNode"
        @edit="handleEditNode"
        @remove="handleConfirmRemoveNode"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { v4 } from "uuid";
import { useQuasar } from "quasar";

import TreeNode from "./node.vue";

import { Tree } from "../../shared/interfaces";

defineOptions({
  name: "TreeEditor",
});

const handleLoadTreeFromLocalStorage = (): Tree[] => {
  const savedTree = localStorage.getItem("tree");

  return savedTree
    ? JSON.parse(savedTree)
    : [
        {
          id: v4(),
          name: "First",
          children: [
            { id: v4(), name: "Child of First", children: [] },
            { id: v4(), name: "Another Child of First", children: [] },
          ],
        },
        { id: v4(), name: "Second", children: [] },
      ];
};

const $q = useQuasar();

const tree = ref<Tree[]>(handleLoadTreeFromLocalStorage());

watch(
  tree,
  (newTree) => {
    localStorage.setItem("tree", JSON.stringify(newTree));
  },
  { deep: true }
);

const handleAddRoot = (): void => {
  tree.value.push({ id: v4(), name: "New Root", children: [] });
};

const handleConfirmRemoveNode = (nodeId: string): void => {
  const node = handleFindNodeById(nodeId, tree.value);

  if (node) {
    $q.dialog({
      title: "Delete?",
      message: node.name,
      ok: {
        label: "DELETE",
        color: "blue",
      },
      cancel: {
        label: "CANCEL",
        color: "green",
      },
      persistent: true,
    })
      .onOk(() => handleRemoveNode(nodeId))
      .onCancel(() => console.log("Cancelled"))
      .onDismiss(() => console.log("Dialog dismissed"));
  }
};

const handleAddNode = (parentId: string): void => {
  const newNode: Tree = {
    id: v4(),
    name: "New element",
    children: [],
  };

  const parentNode = handleFindNodeById(parentId, tree.value);

  if (parentNode) {
    parentNode.children.push(newNode);
  }
};

const handleEditNode = (nodeId: string): void => {
  const node = handleFindNodeById(nodeId, tree.value);

  if (node) {
    $q.dialog({
      title: "Edit Node",
      message: "Name",
      prompt: {
        model: node.name,
        type: "text",
      },
      ok: {
        label: "SAVE",
        color: "blue",
      },
      cancel: {
        label: "CANCEL",
        color: "blue",
      },
      persistent: true,
    })
      .onOk((newName) => {
        node.name = newName;
      })
      .onCancel(() => console.log("Edit cancelled"));
  }
};

const handleRemoveNode = (id: string): void => {
  handleRemoveNodeById(id, tree.value);
};

const handleFindNodeById = (id: string, nodes: Tree[]): Tree | undefined => {
  for (const node of nodes) {
    if (node.id === id) return node;

    const findNode = handleFindNodeById(id, node.children);

    if (findNode) return findNode;
  }

  return undefined;
};

const handleRemoveNodeById = (id: string, nodes: Tree[]): boolean => {
  for (let index = 0; index < nodes.length; index++) {
    if (nodes[index].id === id) {
      nodes.splice(index, 1);

      return true;
    }

    const isDeleted = handleRemoveNodeById(id, nodes[index].children);

    if (isDeleted) return true;
  }

  return false;
};
</script>

<style lang="scss">
.tree-editor {
  padding: 16px;

  &__add {
    position: fixed;
    bottom: 16px;
    left: 16px;
  }

  &__node {
    margin-left: 24px;
  }
}
</style>
