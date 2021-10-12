<template>
  <div class="wrapper">

    <n-data-table
      v-model:checked-row-keys="checkedRows"
      class="file-table"
      flex-height
      :bordered="false"
      :columns="columns"
      :data="files"
      :row-props="rowProps"
      :row-key="it=>it.key"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent, h, reactive, ref} from "vue";
import {useMessage} from "naive-ui";
import {Folder20Filled} from "@vicons/fluent";
import FileName from "../../components/file/FileName.vue";

interface FileRow {
  type: string,
  name: string,
  size: number,
  key: number,
  modify_time: number,
  file_type: string,
  ext: string,
}

export default defineComponent({
  name: "FileListView",

  data() {
    return {
      sort: {
        key: 'name',
        direction: 'ascend',
      },
      files: [],
      loading: false,
    }
  },
  setup() {
    const message = useMessage()
    const checkedRowsRef: ref<number[]> = ref([])
    return {
      rowProps(row: FileRow) {
        return {
          style: 'cursor: pointer;',
          onClick: (ev) => {
            if (ev.target.className && ev.target.className.includes('n-checkbox-box')) {
              return;
            }
            const index = checkedRowsRef.value.indexOf(row.key)
            if (index >= 0) {
              checkedRowsRef.value.splice(index, 1)
            } else {
              checkedRowsRef.value.push(row.key)

            }
          },
          onDblclick: () => {
            message.info(row.name)
          },
        }
      },
      checkedRows: checkedRowsRef,

      columns: [
        {
          width: '20px',
        },
        {
          type: 'selection',
          options: [
            {
              label: '全选',
              key: 'all',
              onSelect: (pageData) => {
                checkedRowsRef.value = pageData
                  .map((row) => row.key)
              },
            },
            {
              label: '反选',
              key: 'reverse',
              onSelect: (pageData) => {
                checkedRowsRef.value = pageData
                  .map((row) => row.key)
                  .filter(it => !checkedRowsRef.value.includes(it))
              },
            },
            {
              label: '取消选择',
              key: 'none',
              onSelect: () => {
                checkedRowsRef.value = [];
              },
            },
          ],
        },
        {
          title: '名称',
          key: 'name',
          render(row: FileRow) {
            const type = row.type;
            return h(FileName, {
              content: row.name,
            }, {
              default() {
                if (type === 'folder') {
                  return h(Folder20Filled);
                }
              },
            })
          },
        },
        {
          title: '修改日期',
          key: 'modify_time',
          width: '240px',
          sortOrder: 'ascend',
        },
        {
          title: '类型',
          key: 'file_type',
          width: '240px',
        },
        {
          title: '大小',
          key: 'size',
          width: '120px',
          render(row: FileRow): string {
            if (row.type === 'folder') {
              return ''
            }
            if (row.size === null || row.size < 1000) {
              return '<1 KB'
            }
            if (row.size < 1024 * 1024) {
              return `${Math.round(row.size / 1024)} KB`
            }

            if (row.size < 1000 * 1024 * 1024) {
              return `${(row.size / 1024 / 1024).toPrecision(4)} MB`
            }

            if (row.size < 1000 * 1024 * 1024 * 1024) {
              return `${(row.size / 1024 / 1024 / 1024).toPrecision(4)} GB`
            }
            return `${(row.size / 1024 / 1024 / 1024 / 1024).toPrecision(4)} TB`
          },
        }, {
          width: 20,
        },
      ],
    };
  },
  watch: {
    sort(val) {
      this.sortFiles(val, this.files)
    },
  },
  mounted() {
    this.loadData();
  },
  methods: {
    sortFiles(val, data) {
      val = val || {}
      const dir = val.direction !== 'descend' ? 1 : -1;
      if (!data) {
        return
      }
      data.sort((a, b) => {
        if (a.type !== b.type) {
          if (a.type === 'folder')
            return -1000 * dir
          return 1000 * dir
        }
        if (this.sortKey === 'size') {
          return (a.size - b.size) * dir
        }
        if (this.sortKey === 'modify_time') {
          return (a.modify_time - b.modify_time) * dir
        }
        if (this.sortKey === 'file_type') {
          return a.file_type.localeCompare(b.file_type) * dir
        }
        return a.name.localeCompare(b.name) * dir
      });
    },
    async loadData() {
      this.loading = true;
      const data = [{
        name: 'Pictures',
        type: 'folder',
        key: '1',
      },
        {
          name: 'Document',
          type: 'folder',
          key: '2',
        },
        {
          name: 'Music',
          type: 'folder',
          key: '3',
        },
        {
          name: '作业.doc',
          type: 'file',
          key: '4',
          size: 50000,
          file_type: '文本文件',
          modify_time: '2020-11-4',
        },
      ]
      this.sortFiles({}, data);
      this.files = data;
      this.loading = false;
    },
  },
})
</script>

<style scoped lang="stylus">
.wrapper
  height 100%

.file-table
  height 100%

</style>
