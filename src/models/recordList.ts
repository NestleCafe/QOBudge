const localStorageKeyName = "recordList";
const recordListModel = {
  fetch() {
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]") as RecordItem[];
  },
  save(data: RecordItem[]) {
    return window.localStorage.setItem(
      localStorageKeyName,
      JSON.stringify(data)
    );
  },
  deepClone(data:RecordItem[] | RecordItem) {
    return JSON.parse(JSON.stringify(data));
  },
};

export { recordListModel };

