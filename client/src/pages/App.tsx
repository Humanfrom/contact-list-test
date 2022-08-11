import {FC, useState, useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../hooks/redux';


import { Card } from '@consta/uikit/Card';
import { Table } from '@consta/uikit/Table';
import { TableColumn } from '@consta/uikit/Table';
import { Text } from '@consta/uikit/Text';
import { Loader } from '@consta/uikit/Loader';
import { Button } from '@consta/uikit/Button';
import { IconClose } from '@consta/uikit/IconClose';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ModalCreateUser from '../components/ModalCreateUser';
import { fetchItems, deleteItem } from '../store/reducers/ItemsSlice';
import { User } from '../models/InterfaceItem'
import './css/App.css'
import useToken from '../hooks/useToken';

const App: FC = () => {

  const { token } = useToken();
  //хуки
  const {items, isLoading, error} = useAppSelector(state => state.itemsReduser) //данные из стора
  const [isModalOpen, setIsModalOpen] = useState(false) //стейт модального окна
  const dispatch = useAppDispatch() //диспетчер

  //обработчик кнопки удаления
  const deleteRow = (row:User) => {
      dispatch(deleteItem({id: row.id, token: token}))
      fetchItems(token);
  }

  //настройка столбцов
  const columns = [
    {
      title: 'ID',
      accessor: 'id',
      align: 'left',
      width: 200
    },
    {
      title: 'Название',
      accessor: 'name',
      align: 'left',
      width: 500,
      sortable: true,
    },
    {
      title: 'Телефон',
      accessor: 'phone',
      align: 'left',
      width: 200,
      sortable: true,
      renderCell: (row: User) =>
        <div className="phone-row">
            <div>{row.phone}</div>
            <Button
                size={"s"}
                onClick={() => deleteRow(row)}
                label={"Удалить"}
                view="clear"
                iconRight={IconClose}
                onlyIcon
            />
        </div>

    }
  ] as TableColumn<typeof items[number]>[];

  //загружаем товары в список
  useEffect(() => {
      if(!isModalOpen){
          dispatch(fetchItems(token));
      }
  },[isModalOpen])


  return (
    <div
    className='container'
    >
        <Card
            verticalSpace="2xl"
            horizontalSpace="2xl"
            className='card'
        >
            <div className="body-content">

              <Header
                onModalShow={() => setIsModalOpen(true)}
              />

              <Table
                  size="m"
                  borderBetweenColumns
                  borderBetweenRows
                  columns={columns}
                  rows={items}
                  emptyRowsPlaceholder={
                    //проверяем ситуации, когда в таблице могут отсутствовать элементы
                    isLoading ?
                      <Loader/>
                      :
                      error ?
                        <Text>Не удалось загрузить данные (Ошибка: {error})</Text>
                        :
                        !items.length ?
                          <Text>Данные не найдены</Text>
                          : ''
                  }
              />

            </div>

            <Footer
                currentCount={items.length}
            />

        </Card>

        <ModalCreateUser
            visible={isModalOpen}
            setVisible={setIsModalOpen}
            initialState={{ id: '', name: '', phone: ''}}
        />

    </div>
  );
}

export default App;
