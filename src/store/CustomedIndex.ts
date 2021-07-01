import { tagListModel } from "@/models/tagListModel";
import { recordListModel } from "@/models/recordListModel";

const store = {
  //record store
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => {
    recordListModel.create(record);
  },

  //tag store
  tagList: tagListModel.fetch(),
  createTag: (name: string) => {
    const message = tagListModel.create(name);
    if (name === "") {
      window.alert("标签名不能为空！");
      return;
    } else if (message === "duplicated") {
      window.alert("标签名重复！");
    } else if (message === "success") {
      window.alert("添加成功");
    }
  },
  removeTag: (id: string) => {
    return tagListModel.remove(id); //remove本身就是返回布尔
  },
  updateTag: (id: string, name: string) => {
    return tagListModel.update(id, name);
  },
  findTag(id: string) {
    return this.tagList.filter((t) => t.id === id)[0]; //filter返回的是数组
  },
};

export default store;
