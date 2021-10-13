import {DateTime} from "luxon";
import axios from "axios";

export async function getDirectoryRoot(): Promise<Array<FileTreeItem>> {
  const response = await axios.get("file/directoryRoot");
  const data = response.data as Array<any>
  return data.map(it => {
    return {
      label: it.name,
      key: it.id,
      isLeaf: it.isLeafDirectiory,
    }
  });
  // return new Promise(resolve => {
  //   setTimeout(()=>{
  //     resolve([
  //       {
  //         label: '快速访问',
  //         key: 'fast',
  //         isLeaf: false,
  //       },
  //       {
  //         label: '我的网盘',
  //         key: 'root',
  //         isLeaf: false,
  //       },
  //       {
  //         label: '我的分享',
  //         key: 'share',
  //         isLeaf: false,
  //       },
  //       {
  //         label: '回收站',
  //         key: 'recycle',
  //         isLeaf: false,
  //       },
  //     ])
  //   }, 2000)
  // })
}

export async function getSubDirectories(key: string | number): Promise<Array<FileTreeItem>> {
  // return new Promise(resolve => {
  //   setTimeout(()=>{
  //     resolve([
  //       {
  //         label: '新建文件夹',
  //         key: 1,
  //         isLeaf: false,
  //       },
  //       {
  //         label: '新建文件夹（2）',
  //         key: 2,
  //         isLeaf: true,
  //       },
  //     ])
  //   }, 2000)
  // })
  const response = await axios.get(`file/subDirectories/${key}`);
  const data = response.data as Array<any>
  return data.map(it => {
    return {
      label: it.name,
      key: it.id,
      isLeaf: it.isLeafDirectiory,
    }
  });
}

export async function listDirectory(key?: number): Promise<Array<any>> {

  const result: any[] = [];
  if (typeof key === "undefined") {
    const dirs = (await axios.get("file/directoryRoot")).data as Array<any>;
    dirs.forEach(it => {
      result.push({
        name: it.name,
        type: 'folder',
        key: `d${it.id}`,
      })
    })
  } else {
    const dirs = (await axios.get(`file/subDirectories/${key}`)).data as Array<any>;
    const files = (await axios.get(`file/files/${key}`)).data as Array<any>;

    dirs.forEach(it => {
      result.push({
        name: it.name,
        type: 'folder',
        key: `d${it.id}`,
      })
    })
    files.forEach(it => {
      const fileName = it.fileName ?? ''
      result.push({
        name: it.fileName,
        type: 'file',
        key: `f${it.id}`,
        size: it.size,
        file_type: it.fileType,
        modify_time: DateTime.fromISO(it.modifyTime),
        ext: fileName.substr(fileName.lastIndexOf('.')),
      })
    })
  }


  return result;
  // return [
  //   {
  //     name: 'Pictures',
  //     type: 'folder',
  //     key: 1,
  //   },
  //   {
  //     name: 'Document',
  //     type: 'folder',
  //     key: 2,
  //   },
  //   {
  //     name: 'Music',
  //     type: 'folder',
  //     key: 3,
  //   },
  //   {
  //     name: '作业.doc',
  //     type: 'file',
  //     key: 4,
  //     size: 50000,
  //     file_type: '文本文件',
  //     modify_time: DateTime.now(),
  //     ext: 'txt',
  //   },
  // ]

}

export async function newDirectory(key: number, name: string): Promise<any> {
  await axios.post(`file/createDirectory`, {
    id: key,
    name,
  })
}


export interface FileTreeItem {
  label: string,
  key: string | number,
  isLeaf: boolean,
}


