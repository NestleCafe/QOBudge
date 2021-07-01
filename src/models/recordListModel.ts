import deepClone from "@/lib/deepClone";

const localStorageKeyName = "recordList";
const recordListModel = {
  data: [] as RecordItem[],
  create(record: RecordItem){
    const recordDeepClone: RecordItem = deepClone(record);
    recordDeepClone.createdAt = new Date();
    this.data.push(recordDeepClone);
    this.save();
  },
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]") as RecordItem[];
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
  deepClone(data: RecordItem[] | RecordItem) {
    return JSON.parse(JSON.stringify(data));
  },
};

export { recordListModel };
