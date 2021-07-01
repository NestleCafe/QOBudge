import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Nav from "@/components/Nav.vue";
import Layout from "@/components/Layout.vue";
import Icon from "@/components/icon.vue"
import { tagListModel } from "./models/tagListModel";
import { recordListModel } from "./models/recordListModel";

Vue.config.productionTip = false;

Vue.component('Layout', Layout)
Vue.component('Nav', Nav);
Vue.component('Icon', Icon);


//record store
window.recordList = recordListModel.fetch();
window.createRecord = (record: RecordItem) =>{
  recordListModel.create(record)
}

//tag store
window.tagList = tagListModel.fetch();
window.createTag = (name: string) =>{
  const message = tagListModel.create(name);
  if (name === "") {
    window.alert("标签名不能为空！");
    return;
  } else if (message === "duplicated") {
    window.alert("标签名重复！");
  } else if (message === "success") {
    window.alert("添加成功");
  }
}
window.removeTag = (id: string)=>{
  return tagListModel.remove(id) //remove本身就是返回布尔
}
window.updateTag = (id: string, name: string) =>{
  return tagListModel.update(id, name);
}
window.findTag = (id: string) =>{
  return window.tagList.filter((t) => t.id === id)[0]; //filter返回的是数组
}
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
