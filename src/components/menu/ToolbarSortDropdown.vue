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
import {computed, defineComponent, h, ref, toRefs} from 'vue'
import {
  ArrowSort20Regular,
  ChevronDown16Filled,
  CircleSmall20Filled,
} from '@vicons/fluent'
import {DropdownOption, NButton, NIcon} from 'naive-ui'

export default defineComponent({
  name: "ToolbarFilterDropdown",
  components: {
    ArrowSort20Regular,
    NButton,
    ChevronDown16Filled,
  },
  props: {
    desc: {
      type: Boolean,
      default: false,
    },
    condition: {
      type: String,
      default: 'name',
    },
  },
  emits: ['update:condition', 'update:desc'],
  setup(props, {emit}) {
    const {condition} = toRefs(props)
    const destination = computed(() => props.desc ? 'desc' : 'asc')
    return {
      handleSelect(key: string) {
        if (key === 'asc' || key === 'desc') {
          emit('update:desc', key === 'desc')
        } else {
          emit('update:condition', key)
        }
      },
      renderDropdownIcon(option: DropdownOption) {
        if (option.key === condition.value || option.key === destination.value) {
          return h(NIcon, null, {
            default: () => h(CircleSmall20Filled),
          })
        }
      },
      options: [
        {
          label: '名称',
          key: 'name',
        },
        {
          label: '大小',
          key: 'size',
        },
        {
          label: '类型',
          key: 'type',
        },
        {
          label: '修改日期',
          key: 'modify-time',
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

<style scoped>

</style>
