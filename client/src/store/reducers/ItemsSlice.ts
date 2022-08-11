import {ItemState, thunkAPI, User} from '../../models/InterfaceItem';
import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit'
import { URL } from "../../constants"
import axios from 'axios';

//начальное состояние
const initialState: ItemState = {
  items: [],
  isLoading: false,
  error: '',
  status: 'idle',
  packageSize: 20,
  page: 1
}

//функция для загрузки элементов
export const fetchItems = createAsyncThunk('items/fetchItems', async ( _ , { getState }: thunkAPI) => {
      const state: ItemState = getState().itemsReduser;

      const response = await axios.get(
        `${URL}table`,
        {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            params: {
                page: state.page,
                packageSize: state.packageSize,
        }
    });

    return response.data;
})

//функция для отправки элемента
export const postItem = createAsyncThunk('items/postItem', async ( item: object , { getState }: thunkAPI) => {
      const state = getState().itemsReduser;

      const response = await axios.post(
        `${URL}row`,
        { ...item },
        {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            params: {
                page: state.page,
                packageSize: state.packageSize,
        }
    });

    return response.data;
})

//функция для удаления элемента
export const deleteItem = createAsyncThunk('items/deleteItem', async ( id: string , { getState }: thunkAPI) => {

      const response = await axios.delete(
        `${URL}row/${id}`,
        {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            params: {
                id: id
        }
    });

    return response.data;
})

//основной слайс
export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    //очищаем список элементов
    resetState(state) {
            return initialState;
        },
    //устанавливаем флаг загрузки
    getItemsList(state) {
        state.isLoading = true;
      },
    //получили данные, дописываем их в конец списка элементов
    getItemsListSuccess(state, action: PayloadAction<User[]>) {
        state.isLoading = false;
        state.error = '';
        state.items.push(...action.payload);
      },
    //получили данные по поиску, перезаполняем список элементов
    getSearchedItemsListSuccess(state: ItemState, action: PayloadAction<User[]>) {
          state.isLoading = false;
          state.error = '';
          state.items = action.payload;
        },
    //записываем исключение
    getItemsListError(state, action: PayloadAction<string>) {
        state.isLoading = false;
        state.error = action.payload;
      }
  },
  extraReducers(builder) {
        builder
          .addCase(fetchItems.pending, (state) => {
              state.status = 'loading';
          })
          .addCase(fetchItems.fulfilled, (state, action) => {
              state.status = 'succeeded';
              state.items = action.payload;
          })
          .addCase(fetchItems.rejected, (state, action) => {
              state.status = 'failed';
              state.error = String(action.error.message);
          })
          .addCase(postItem.pending, (state) => {
              state.status = 'loading';
          })
          .addCase(postItem.fulfilled, (state, action) => {
              state.status = 'succeeded';
              state.items.push(action.payload);
          })
          .addCase(postItem.rejected, (state, action) => {
              state.status = 'failed';
              state.error = String(action.error.message);
          })
          .addCase(deleteItem.pending, (state) => {
              state.status = 'loading';
          })
          .addCase(deleteItem.fulfilled, (state: ItemState, action) => {
              state.status = 'succeeded';
              state.items = state.items.filter((item) => item.id !== action.payload.id);
          })
          .addCase(deleteItem.rejected, (state, action) => {
              state.status = 'failed';
              state.error = String(action.error.message);
          })
        }
})

export const {
    resetState,
} = itemsSlice.actions;

export default itemsSlice.reducer
