<template>
  <n-dropdown
    trigger="click"
    :options="options"
    :render-icon="renderDropdownIcon"
    @select="handleSelect"
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
</template>

<script lang="ts">
import {computed, defineComponent, h, toRefs} from 'vue'
import {
  ArrowSort20Regular,
  ChevronDown16Filled,
  CircleSmall20Filled,
} from '@vicons/fluent'
import {DropdownOption, NButton, NIcon} from 'naive-ui'

export default defineComponent({
  name: "ToolbarSortDropdown",
  components: {
    ArrowSort20Regular,
    NButton,
    ChevronDown16Filled,
  },
  props: {
    filter: {
      type: String,
      default: '',
    },
    possibleExtensions: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:filter'],
  setup(props, {emit}) {
    const {filter, possibleExtensions} = toRefs(props)
    const moreChildren = computed(() => {
      return possibleExtensions.value.map(it => {
        return {
          label: `${it} 文件`,
          key: `ext_${it}`,
        }
      })
    })
    return {
      handleSelect(key: string) {
        if (key === filter.value) {
          emit('update:filter', '')
        } else {
          emit('update:filter', key)
        }
      },
      renderDropdownIcon(option: DropdownOption) {
        if (option.key === 'more') {
          if (filter.value.startsWith('ext_')) {
            return h(NIcon, null, {
              default: () => h(CircleSmall20Filled),
            })
          } else {
            return h(NIcon)
          }
        } else if (option.key === filter.value) {
          return h(NIcon, null, {
            default: () => h(CircleSmall20Filled),
          })
        }
      },

      options: [
        {
          label: '文件夹',
          key: 'folder',
        },
        {
          label: '图片',
          key: 'image',
        },
        {
          label: '视频',
          key: 'video',
        },
        {
          label: '文档',
          key: 'document',
        },
        {
          label: '音乐',
          key: 'music',
        },
        {
          label: '压缩包',
          key: 'compressed',
        },
        {
          label: '更多',
          key: 'more',
          children: moreChildren.value,
        },

      ],
    }
  },
})
</script>

<style scoped>

</style>
