<template>
  <div class="container">
    <n-tree
      v-model:checked-keys="checkedKeys"
      v-model:expanded-keys="expandedKeys"
      block-line
      remote
      virtual-scroll
      class="tree"
      :data="data"
      :on-load="handleLoad"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {NTree} from 'naive-ui'
import {TreeOption} from "naive-ui/lib/tree/src/interface";
function createData () {
  return [
    {
      label: '快速访问',
      key: 'fast',
      isLeaf: false,
    },
    {
      label: '我的网盘',
      key: 'root',
      isLeaf: false,
    },
    {
      label: '我的分享',
      key: 'share',
      isLeaf: false,
    },
    {
      label: '回收站',
      key: 'recycle',
      isLeaf: false,
    },
  ]
}

export default defineComponent({
  name: 'FileTreeView',
  components: {
    NTree,
  },
  setup () {
    const expandedKeysRef = ref([])
    const checkedKeysRef = ref([])
    const dataRef = ref(createData())

    return {
      data: dataRef,
      expandedKeys: expandedKeysRef,
      checkedKeys: checkedKeysRef,
      handleLoad (node: TreeOption) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            node.children = [
              {
                label: '新建文件夹',
                key: Number(node.key) + 10,
                isLeaf: true,
              },
            ]
            resolve(null)
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
