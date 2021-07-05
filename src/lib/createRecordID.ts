let id:number = parseInt(window.localStorage.getItem('_RecordIdMax') || '0') || 0;

function createRecordID(){
    id ++;
    window.localStorage.setItem('_RecordIdMax', id.toString());
    return id;
}
export default createRecordID;