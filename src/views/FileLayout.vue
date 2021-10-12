<template>
  <n-layout
    embedded
    class="layout-wrapper"
    position="absolute"
  >
    <n-layout-header
      class="toolbar"
      bordered
    >
      <tool-bar />
    </n-layout-header>
    <n-layout position="absolute">
      <n-layout-header
        class="address-bar"
        bordered
      >
        <path-bar />
      </n-layout-header>
      <n-layout
        has-sider
        position="absolute"
      >
        <n-layout-sider
          bordered
          collapse-mode="transform"
          :collapsed-width="0"
          :show-collapsed-content="false"
          show-trigger="bar"
        >
          <file-tree-view />
        </n-layout-sider>
        <n-layout-content>
          <file-list-view />
        </n-layout-content>
      </n-layout>
      <n-layout-footer>
        底部状态栏
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script lang="ts">
import ToolBar from '../components/layout/ToolBar.vue'
import {defineComponent} from 'vue'
import PathBar from "../components/layout/PathBar.vue";
import FileTreeView from "./file/FileTreeView.vue";
import FileListView from "./file/FileListView.vue";

export default defineComponent({
  name: 'FileLayout',
  components: {FileListView, FileTreeView, PathBar, ToolBar},

})
</script>

<style scoped lang="stylus">
header()
  height arguments
  & + div
    top arguments

toolbar-height = 60px
address-bar-height = 40px

.layout-wrapper
  height: 100%

.toolbar
  header toolbar-height

.address-bar
  header address-bar-height


</style>
