export interface User {
  id: string;
  name: string;
  phone: string;
};

//интерфейс хранилища
export interface ItemState {
  items: User[];
  isLoading: boolean;
  error: string;
  status: string;
  packageSize: number;
  page: number;
}

export type thunkAPI = {
  getState: Function
}
