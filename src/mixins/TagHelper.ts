import Vue from 'vue'
import Component from 'vue-class-component'

// You can declare mixins as the same style as components.
@Component
export class TagHelper extends Vue {
  createTag(){
    const tagName = window.prompt("请输入新标签名");
    if (!tagName) {
      return window.alert("标签名不能为空！");
    }
    this.$store.commit('createTag', tagName)
    if(this.$store.state.createRecordError === null){
      window.alert('添加成功！')
    }
  }
}
