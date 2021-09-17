<template>
  <div class="container">
    <n-button type="primary">
      上传
      <template #icon>
        <n-icon>
          <arrow-upload20-regular />
        </n-icon>
      </template>
    </n-button>
    <n-divider vertical />
    <n-button-group>
      <n-button>
        <template #icon>
          <n-icon>
            <cut20-regular />
          </n-icon>
        </template>
      </n-button>
      <n-button>
        <template #icon>
          <n-icon>
            <copy20-regular />
          </n-icon>
        </template>
      </n-button>
      <n-button>
        <template #icon>
          <n-icon>
            <clipboard-paste20-regular />
          </n-icon>
        </template>
      </n-button>
    </n-button-group>
    <n-button-group>
      <n-button>
        <template #icon>
          <n-icon>
            <rename20-regular />
          </n-icon>
        </template>
      </n-button>
      <n-button>
        <template #icon>
          <n-icon>
            <share20-regular />
          </n-icon>
        </template>
      </n-button>
      <n-button>
        <template #icon>
          <n-icon>
            <delete20-regular />
          </n-icon>
        </template>
      </n-button>
    </n-button-group>
    <n-divider vertical />
    <toolbar-sort-dropdown
      v-model:condition="sortCondition"
      v-model:desc="isDesc"
    />
    <toolbar-filter-dropdown
      v-model:filter="filter"
      :possible-extensions="possibleExtensions"
    />
    <n-divider vertical />

    <n-button>
      <template #icon>
        <n-icon>
          <more-horizontal16-regular />
        </n-icon>
      </template>
    </n-button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {NButton} from 'naive-ui'
import ToolbarSortDropdown from "../menu/ToolbarSortDropdown.vue";
import ToolbarFilterDropdown from "../menu/ToolbarFilterDropdown.vue";
import {
  ArrowUpload20Regular,
  Copy20Regular,
  ClipboardPaste20Regular,
  Cut20Regular,
  Share20Regular,
  Delete20Regular,
  Rename20Regular,
  MoreHorizontal16Regular,
} from '@vicons/fluent'

export default defineComponent({
  name: 'ToolBar',
  components: {
    ToolbarFilterDropdown,
    ToolbarSortDropdown,
    ArrowUpload20Regular,
    Copy20Regular,
    ClipboardPaste20Regular,
    Cut20Regular,
    Share20Regular,
    Delete20Regular,
    Rename20Regular,
    MoreHorizontal16Regular,
    NButton,
  },

  data() {
    return {
      sortCondition: 'name',
      isDesc: false,
      filter: '',
      possibleExtensions: ['txt', 'jpg', 'exe'],
    }
  },
})
</script>

<style scoped lang="stylus">
.container
  height 100%
  display flex
  align-items center
  padding 0 12px

  & > :deep(div.n-button-group)
  & > :deep(button.n-button)
    margin 0 8px

  & > .n-divider
    height 24px
    margin 0

.btn-tail-icon
  align-self end
  padding-left 2px
  padding-bottom 1px

</style>
