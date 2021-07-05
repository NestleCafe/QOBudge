import deepClone from "@/lib/deepClone";
const localStorageKeyName = "recordList";

const recordStore = {
    recordList: [] as RecordItem[],
    fetchRecords(){
        this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]") as RecordItem[];
        return this.recordList;
    },
    saveRecords(){
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
    },
    createRecord(record: RecordItem){
        const recordDeepClone: RecordItem = deepClone(record);
        recordDeepClone.createdAt = new Date().toISOString();
        this.recordList?.push(recordDeepClone); //可选链
        recordStore.saveRecords();
    },
};
recordStore.fetchRecords();

export default recordStore;
