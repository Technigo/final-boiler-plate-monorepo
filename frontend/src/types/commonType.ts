export type ApiRes<T> = {
  results: number;
  status: string;
  data: T;
};
