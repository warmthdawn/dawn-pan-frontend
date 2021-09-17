<!--suppress HtmlUnknownAttribute -->
<template>
  <div class="container">
    <n-button>
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
    <n-dropdown
      trigger="click"
      :options="sortOptions"
      :render-icon="renderSortDropdownIcon"
      @select="handleSortSelect"
    >
      <n-button>
        <template #icon>
          <n-icon>
            <arrow-sort20-regular />
          </n-icon>
        </template>
        排序
        <n-icon
          depth="3"
          size="0.8em"
          class="btn-tail-icon"
        >
          <chevron-down16-filled />
        </n-icon>
      </n-button>
    </n-dropdown>
    <n-dropdown
      trigger="click"
      :options="filterOptions"
      @select="handleFilterSelect"
    >
      <n-button>
        <template #icon>
          <n-icon>
            <filter20-regular />
          </n-icon>
        </template>
        筛选
        <n-icon
          depth="3"
          size="0.8em"
          class="btn-tail-icon"
        >
          <chevron-down16-filled />
        </n-icon>
      </n-button>
    </n-dropdown>
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
import {
  ArrowUpload20Regular,
  Copy20Regular,
  ClipboardPaste20Regular,
  Cut20Regular,
  Share20Regular,
  Delete20Regular,
  Rename20Regular,
  ArrowSort20Regular,
  ChevronDown16Filled,
  Filter20Regular,
  MoreHorizontal16Regular,
  CircleSmall20Filled,
} from '@vicons/fluent'
import {h, defineComponent, ref} from 'vue'
import {useMessage, NIcon, DropdownOption} from 'naive-ui'

export default defineComponent({
  name: 'ToolBar',
  components: {
    ArrowUpload20Regular,
    Copy20Regular,
    ClipboardPaste20Regular,
    Cut20Regular,
    Share20Regular,
    Delete20Regular,
    Rename20Regular,
    ArrowSort20Regular,
    ChevronDown16Filled,
    Filter20Regular,
    MoreHorizontal16Regular,
  },

  setup() {
    const message = useMessage()
    const currentSort = ref('name')
    const currentSortDirection = ref('asc')
    return {
      handleFilterSelect(key: string) {
        message.info(key)
      },
      handleSortSelect(key: string) {
        if (key === 'asc' || key === 'desc') {
          currentSortDirection.value = key
        } else {
          currentSort.value = key
        }
      },
      renderSortDropdownIcon(option: DropdownOption) {
        if (option.key === currentSort.value || option.key === currentSortDirection.value) {
          return h(NIcon, null, {
            default: () => h(CircleSmall20Filled),
          })
        }
      },
    }
  },
  data() {
    return {
      filterOptions: [
        {
          label: '名称',
          key: 'name',
        },
      ],
      sortOptions: [
        {
          label: '名称',
          key: 'name',
        },
        {
          label: '大小',
          key: 'size',
        },
        {
          type: 'divider',
          key: 'd1',
        },
        {
          label: '升序',
          key: 'asc',
        },
        {
          label: '降序',
          key: 'desc',
        },

      ],
    }
  },
})
</script>

<style scoped lang="stylus">
.container
  height 100%
  display flex
  flex-direction row
  align-items center
  padding 0 12px

  & > div.n-button-group
  & > button.n-button
    margin 0 8px

.n-divider
  height 24px
  margin 0

.btn-tail-icon
  align-self end
  padding-left 2px
  padding-bottom 1px

</style>
