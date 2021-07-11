import Vue from 'vue'
import Vuex from 'vuex'
import deepClone from "@/lib/deepClone";
import createTagID from "@/lib/createTagID";
import router from '@/router';
import createRecordID from "@/lib/createRecordID"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
    createRecordError: null,
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
      recordDeepClone.id = createRecordID().toString();
      recordDeepClone.createdAt =  recordDeepClone.createdAt || new Date().toISOString();
      state.recordList.push(recordDeepClone); 
      store.commit('saveRecords')
    },


    //tag
    setCurrentTag(state, id:string){
      state.currentTag = state.tagList.filter(tag => tag.id === id)[0]; //filter返回的是数组
    },
    fetchTags(state){
      state.tagList = JSON.parse(window.localStorage.getItem("tagList") || "[]");
      if ( !state.tagList || state.tagList.length === 0){
        store.commit('createTag', '衣');
        store.commit('createTag', '食');
        store.commit('createTag', '住');
        store.commit('createTag', '行');
      }
    },
    createTag(state, name: string){
      state.createRecordError = null;
      const names = state.tagList.map(item => item.name);
      if (name === "") {
        window.alert("标签名不能为空！");
        state.createRecordError = new Error('Tag name can not be empty')
        return;
      } else if(names.indexOf(name) >= 0) {
        window.alert("标签名重复！");
        state.createRecordError = new Error('Tag name duplicated');
        return;
      }
      const id = createTagID().toString();
      state.tagList.push({ id, name });
      store.commit('saveTags')

    },
    updateTag(state, payload: {id: string, name: string}) {
      const {id, name} = payload; //又见析构语法

      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复！');
          state.createRecordError = new Error('Tag name duplicated');
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