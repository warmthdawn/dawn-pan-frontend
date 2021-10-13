<template>
  <div class="container">
    <n-tree
      v-model:expanded-keys="expandedKeys"
      block-line
      remote
      virtual-scroll
      class="tree"
      @update:selected-keys="handleSelect"
      :selected-keys="selectedKeys"
      :data="data"
      :on-load="handleLoad"
    />
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watch} from "vue";
import {FileTreeItem, getDirectoryRoot, getSubDirectories} from '../../api/file'
import {NTree} from 'naive-ui'
import {TreeOption} from "naive-ui/lib/tree/src/interface";
import {useStore} from "vuex";

async function createData() {
  return await getDirectoryRoot();
}

export default defineComponent({
  name: 'FileTreeView',
  components: {
    NTree,
  },
  setup() {
    const expandedKeysRef = ref([])
    const dataRef = ref([] as Array<FileTreeItem>)
    createData().then(it => {
      dataRef.value = it;
    })

    const store = useStore();
    const selectedRef = computed(() => {
      return [store.state.currentDirectory];
    })

    return {
      data: dataRef,
      expandedKeys: expandedKeysRef,
      selectedKeys: selectedRef,
      async handleLoad(node: TreeOption) {
        const subDir = await getSubDirectories(node.key as (string | number));
        node.children = subDir.map(it => {
          return {
            label: it.label,
            key: it.key,
            isLeaf: it.isLeaf,
          }
        })
      },

      handleSelect(keys: Array<number>) {
        if (keys.length > 0) {
          store.commit("changeDirectory", keys[0])
        }
      },


    }
  },

  mounted() {
    this.$store.watch(state => state.updateIndex, (newVal) => {
      this.data.forEach(it => it.children = []);
    });
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
