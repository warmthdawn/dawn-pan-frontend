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
      <tool-bar/>
    </n-layout-header>
    <n-layout position="absolute">
      <n-layout-header class="address-bar">地址/搜索</n-layout-header>
      <n-layout has-sider position="absolute">
        <n-layout-sider
          bordered
          :native-scrollbar="false"
          collapse-mode="transform"
          :collapsed-width="0"
          :show-collapsed-content="false"
          show-trigger="bar"
        >列表
        </n-layout-sider>
        <n-layout-content
          content-style="padding: 24px"
          :native-scrollbar="false"
        >
          <router-view/>
        </n-layout-content>
      </n-layout>
      <n-layout-footer>
        底部状态栏
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script lang="ts">
import ToolBar from '../components/ToolBar.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FileLayout',
  components: { ToolBar },
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
