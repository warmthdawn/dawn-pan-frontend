<template>
  <div class="container">
    <upload-button />
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

    <n-button @click="newFolder">
      <template #icon>
        <n-icon>
          <add-circle24-regular />
        </n-icon>
      </template>
      新建文件夹
    </n-button>
    <n-button>
      <template #icon>
        <n-icon>
          <more-horizontal16-regular />
        </n-icon>
      </template>
    </n-button>

    <RenameModal
      v-model:show="showCreate"
      type="create"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {NButton} from 'naive-ui'
import ToolbarSortDropdown from "../menu/ToolbarSortDropdown.vue";
import ToolbarFilterDropdown from "../menu/ToolbarFilterDropdown.vue";
import {
  AddCircle24Regular,
  Copy20Regular,
  ClipboardPaste20Regular,
  Cut20Regular,
  Share20Regular,
  Delete20Regular,
  Rename20Regular,
  MoreHorizontal16Regular,
} from '@vicons/fluent'
import UploadButton from "../file/UploadButton.vue";
import RenameModal from "../file/RenameModal.vue";

export default defineComponent({
  name: 'ToolBar',
  components: {
    RenameModal,
    UploadButton,
    ToolbarFilterDropdown,
    ToolbarSortDropdown,
    AddCircle24Regular,
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
      showCreate: false,
    }
  },

  methods: {
    newFolder() {
      this.showCreate = true;
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
