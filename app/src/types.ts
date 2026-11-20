export interface APIResponse<T> {
  message: string;
  data: T;
  error: string;
  page: number;
  pageSize: number;
  totalCount: number;
  nextCursor: number | null;
}

export type EntityTimestamps = {
  createdAt: string;
  updatedAt: string;
};

export type ComboboxOption = {
  value: string | number;
  label: string;
};

export type Currency = EntityTimestamps & {
  id: number;
  code: string;
  name: string;
  symbol: string;
  active: boolean;
};

export type Category = EntityTimestamps & {
  id: number;
  name: string;
  color: string;
  icon: string;
};
