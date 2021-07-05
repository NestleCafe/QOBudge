type RootState = {
  recordList: RecordItem[],
  tagList: Tag[],
  currentTag?: Tag,
}
type RecordItem = {
    id: string;
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
/* type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => "success" | "duplicated"; // success表示成功，duplicated表示name重复 联合类型
  save: () => void;
  remove:(id: string) => boolean;
  update: (id: string, name: string) => "success" | "duplicated" | "not found";
};
 */
/* interface Window{
} */
