<template>
  <div class="container">
    <n-tree
      block-line
      remote
      virtual-scroll
      class="tree"
      :data="data"
      :checked-keys="checkedKeys"
      :on-load="handleLoad"
      :expanded-keys="expandedKeys"
      @update:checked-keys="handleCheckedKeysChange"
      @update:expanded-keys="handleExpandedKeysChange"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
function createData () {
  return [
    {
      label: nextLabel(),
      key: 1,
      isLeaf: false,
    },
    {
      label: nextLabel(),
      key: 2,
      isLeaf: false,
    },
  ]
}

function nextLabel (currentLabel) {
  if (!currentLabel) return '道生一'
  if (currentLabel === '道生一') return '一生二'
  if (currentLabel === '一生二') return '二生三'
  if (currentLabel === '二生三') return '三生万物'
  if (currentLabel === '三生万物') return '道生一'
}

function findSiblingsAndIndex (node, nodes) {
  if (!nodes) return [null, null]
  for (let i = 0; i < nodes.length; ++i) {
    const siblingNode = nodes[i]
    if (siblingNode.key === node.key) return [nodes, i]
    const [siblings, index] = findSiblingsAndIndex(node, siblingNode.children)
    if (siblings) return [siblings, index]
  }
  return [null, null]
}

export default defineComponent({
  name: 'FileTreeView',
  setup () {
    const expandedKeysRef = ref([])
    const checkedKeysRef = ref([])
    const dataRef = ref(createData())

    return {
      data: dataRef,
      expandedKeys: expandedKeysRef,
      checkedKeys: checkedKeysRef,
      handleExpandedKeysChange (expandedKeys) {
        expandedKeysRef.value = expandedKeys
      },
      handleCheckedKeysChange (checkedKeys) {
        checkedKeysRef.value = checkedKeys
      },
      handleLoad (node) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            node.children = [
              {
                label: nextLabel(node.label),
                key: node.key + nextLabel(node.label) + '1',
                isLeaf: false,
              },
              {
                label: nextLabel(node.label),
                key: node.key + nextLabel(node.label) + '2',
                isLeaf: false,
              },
              {
                label: nextLabel(node.label),
                key: node.key + nextLabel(node.label) + '3',
                isLeaf: false,
              },
              {
                label: nextLabel(node.label),
                key: node.key + nextLabel(node.label) + '4',
                isLeaf: false,
              },
              {
                label: nextLabel(node.label),
                key: node.key + nextLabel(node.label) + '5',
                isLeaf: false,
              },
            ]
            resolve()
          }, 1000)
        })
      },
    }
  },
})
</script>

<style scoped lang="stylus">
.container
  height 100%
  box-sizing border-box
  padding 24px 0
  padding-left 24px
  .tree
    height 100%
</style>
