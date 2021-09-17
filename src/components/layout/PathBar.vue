<template>
  <div class="container">
    <div class="btn-group">
      <n-button text>
        <n-icon size="1.3em">
          <arrow-up20-regular />
        </n-icon>
      </n-button>
      <n-button text>
        <n-icon size="1.3em">
          <arrow-clockwise20-regular />
        </n-icon>
      </n-button>
    </div>
    <n-breadcrumb>
      <n-breadcrumb-item>
        我的网盘
      </n-breadcrumb-item>
      <n-breadcrumb-item>
        所有文件
      </n-breadcrumb-item>
      <n-breadcrumb-item>
        新建文件夹
      </n-breadcrumb-item>
    </n-breadcrumb>
    <div class="empty" />
    <n-input-group class="search-bar">
      <n-input
        v-model:value="searchInput"
        placeholder="搜索"
        clearable
      >
        <template #prefix>
          <n-icon>
            <search20-regular />
          </n-icon>
        </template>
      </n-input>
      <n-button
        v-if="isSearching"
        type="primary"
      >
        搜索
      </n-button>
    </n-input-group>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {NButton, NInput} from 'naive-ui'
import {
  ArrowUp20Regular,
  ArrowClockwise20Regular,
  Search20Regular,
} from '@vicons/fluent'

export default defineComponent({
  name: "PathBar",
  components: {
    NButton, NInput,
    ArrowUp20Regular,
    ArrowClockwise20Regular,
    Search20Regular,
  },
  data() {
    return {
      searchInput: '',
    }
  },
  computed: {
    isSearching(): boolean {
      return this.searchInput !== ''
    },
  },
})
</script>

<style scoped lang="stylus">
.container
  height 100%
  display flex
  align-items center
  padding 0 12px

  & > div
    margin 0 8px

.btn-group
  display flex
  align-items center
  justify-content space-between
  width 48px
  flex 0 0 auto
.empty
  flex auto
.search-bar
  max-width 40%
  flex 0 1 auto
</style>
