export interface IReqList {
  page_size?: number;
  page_index: number;
  query?: Record<string, unknown>;
}
