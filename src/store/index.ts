import Vue from 'vue'
import Vuex from 'vuex'
import deepClone from "@/lib/deepClone";
import createID from "@/lib/createID";
import router from '@/router';

Vue.use(Vuex)
type RootState = {
  recordList: RecordItem[],
  tagList: Tag[],
  currentTag?: Tag,
}
const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
    currentTag: undefined,
  } as RootState,

  mutations: {
    //recordList
    fetchRecords(state){
      state.recordList = JSON.parse(window.localStorage.getItem("recordList") || "[]") as RecordItem[];
    },
    saveRecords(state){
        window.localStorage.setItem("recordList", JSON.stringify(state.recordList));
    },
    createRecord(state, record: RecordItem){
        const recordDeepClone: RecordItem = deepClone(record);
        recordDeepClone.createdAt = new Date();
        state.recordList.push(recordDeepClone); //可选链
        store.commit('saveRecords')
    },


    //tag
    setCurrentTag(state, id:string){
      state.currentTag = state.tagList.filter(tag => tag.id === id)[0]; //filter返回的是数组
    },
    fetchTags(state){
      state.tagList = JSON.parse(
        window.localStorage.getItem("tagList") || "[]"
      );
    },
    createTag(state, name: string){
      const names = state.tagList.map(item => item.name);
      if (name === "") {
        window.alert("标签名不能为空！");
        return;
      } else if(names.indexOf(name) >= 0) {
        window.alert("标签名重复！");
        return;
      }
      const id = createID().toString();
      state.tagList.push({ id, name: name });
      store.commit('saveTags')
      window.alert("添加成功");

    },
    updateTag(state, payload: {id: string, name: string}) {
      const {id, name} = payload; //又见析构语法

      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复！')
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
        }
      }
    },
    removeTag(state, id: string){
      let index = -1;
      for(let i = 0; i<state.tagList.length; i++){
        if(state.tagList[i].id === id){
          index = i;
          break;
        } 
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        window.alert('删除成功');
        router.push('/labels')
      } else {
        window.alert('删除失败');
      }
    },
    saveTags(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
  
  },
})

export default store;