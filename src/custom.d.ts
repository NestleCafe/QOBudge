type RootState = {
  recordList: RecordItem[],
  createRecordError: Error | null,
  tagList: Tag[],
  currentTag?: Tag,
}
type RecordItem = {
    id?: string;
    tags: Tag[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: string;
  };

type Tag = {
  id: string;
  name: string;
};

/* interface Window{
} */
