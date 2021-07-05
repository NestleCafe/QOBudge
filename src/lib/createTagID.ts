let id:number = parseInt(window.localStorage.getItem('_TagIdMax') || '0') || 0;

function createTagID(){
    id ++;
    window.localStorage.setItem('_TagIdMax', id.toString());
    return id;
}
export default createTagID;