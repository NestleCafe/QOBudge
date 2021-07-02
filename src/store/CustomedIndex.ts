import recordStore from "./recordStore";
import tagStore from "./tagStore";

const store = {
  count: 0,
  addCount(){
    this.count ++;
  },
  ...recordStore,
  ...tagStore,
};

export default store;
