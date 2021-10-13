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
import {defineComponent, h, reactive, Ref, ref} from "vue";
import {useMessage} from "naive-ui";
import {Folder20Filled} from "@vicons/fluent";
import FileName from "../../components/file/FileName.vue";
import {RowData} from "naive-ui/lib/data-table/src/interface";
import {DateTime} from "luxon";
import {listDirectory} from "../../api/file";
import {useStore} from "vuex";
import {State} from "@vue/runtime-core";


interface FileRow {
  type: 'folder' | 'file',
  name: string,
  key: string,
}

interface FileRowFile extends FileRow {
  type: 'file',
  size: number,
  modify_time: DateTime,
  file_type: string,
  ext: string,
}

interface FileRowDirectory extends FileRow {
  type: 'folder',
}


export default defineComponent({
  name: "FileListView",
  setup() {
    const message = useMessage()
    const store = useStore();
    const checkedRowsRef: Ref<string[]> = ref([])
    return {
      rowProps(row: FileRow) {
        return {
          style: 'cursor: pointer;',
          onClick: (ev: any) => {
            if (ev.target && ev.target.className && ev.target.className.includes('n-checkbox-box')) {
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
            if (row.type === "folder") {
              const key = parseInt(row.key.substr(1));
              store.commit("changeDirectory", key)
            }
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
              onSelect: (pageData: RowData) => {
                checkedRowsRef.value = pageData
                  .map((row: FileRow) => row.key)
              },
            },
            {
              label: '反选',
              key: 'reverse',
              onSelect: (pageData: RowData) => {
                checkedRowsRef.value = pageData
                  .map((row: FileRow) => row.key)
                  .filter((it: string) => !checkedRowsRef.value.includes(it))
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
            const file = row as FileRowFile;
            if (!file.size || file.size < 1000) {
              return '<1 KB'
            }
            if (file.size < 1024 * 1024) {
              return `${Math.round(file.size / 1024)} KB`
            }

            if (file.size < 1000 * 1024 * 1024) {
              return `${(file.size / 1024 / 1024).toPrecision(4)} MB`
            }

            if (file.size < 1000 * 1024 * 1024 * 1024) {
              return `${(file.size / 1024 / 1024 / 1024).toPrecision(4)} GB`
            }
            return `${(file.size / 1024 / 1024 / 1024 / 1024).toPrecision(4)} TB`
          },
        }, {
          width: 20,
        },
      ],
    };
  },

  data() {
    return {
      sort: {
        key: 'name',
        direction: 'ascend',
      },
      files: [] as Array<FileRow>,
      loading: false,
    }
  },
  watch: {
    sort(val) {
      this.sortFiles(val, this.files)
    },
  },
  mounted() {
    this.loadData();

    this.$store.watch(state => state.currentDirectory, (newVal) => {
      this.loadData(newVal >= 0 ? newVal : undefined);
    });
    this.$store.watch(state => state.updateIndex, (newVal) => {
      this.loadData(this.$store.state.currentDirectory >= 0 ? newVal : undefined);
    });
  },
  methods: {
    sortFiles(val: { key?: string, direction?: 'ascend' | 'descend' }, data: Array<FileRow>) {
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
        if (a.type !== 'folder') {
          if (val.key === 'size') {
            return ((a as FileRowFile).size - (b as FileRowFile).size) * dir
          }
          if (val.key === 'modify_time') {

            return ((a as FileRowFile).modify_time.toMillis() - (b as FileRowFile).modify_time.toMillis()) * dir
          }
          if (val.key === 'file_type') {
            return (a as FileRowFile).file_type.localeCompare((b as FileRowFile).file_type) * dir
          }
        }
        return a.name.localeCompare(b.name) * dir
      });
    },
    async loadData(directory?: number) {
      this.loading = true;
      const data = await listDirectory(directory) as Array<FileRow>;
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
