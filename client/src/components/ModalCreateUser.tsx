import { FC, useState } from 'react';
import { useAppDispatch } from '../hooks/redux';
import { resetState, postItem } from '../store/reducers/ItemsSlice'
//import { User } from './Header'

import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { Modal } from '@consta/uikit/Modal';
import { Button } from '@consta/uikit/Button';
import { User } from '../models/InterfaceItem';

export interface ModalUser {
  visible: boolean,
  setVisible: Function,
  initialState: User,
}

const ModalCreateUser: FC<ModalUser> = ({visible, setVisible, initialState}) => {

  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(initialState);
  const [isValidNumber, setIsValidNumber] = useState<Boolean | null>(null);

  const setFieldHandler = (field: string, value: string) => {
    let newUserValue: User = { ...user } as User;
    newUserValue[field as keyof User] = value;

    setUser(newUserValue);
  }

  const onCreate = () => {
      dispatch(postItem({...user}));
      dispatch(resetState());
      setVisible(false);
  }

  const validPhone = (phone: string) => {
      let re: RegExp = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
      const valid = re.test(phone);
      setIsValidNumber(valid)
      return valid;
  }

  return (
    <Modal
            isOpen={visible}
            hasOverlay
            position="top"
            onClickOutside={() => setVisible(false)}
            onEsc={() => setVisible(false)}
            className="modal-window"
            >
              <Text as="p" size="m" view="primary">Создание нового пользователя</Text>
              <Text
                  as="p"
                  size="s"
                  view="secondary"
                  style={isValidNumber === null ? {} : {color: 'red'}}
              >
                  {isValidNumber === null ? 'Заполните все строки и нажмите "Cоздать"' : isValidNumber ? "" : 'Не верный формат телефона'}
              </Text>

              <div className="create-panel">

                  <TextField
                      onChange={({ value }) => setFieldHandler('name', value as string)}
                      value={user?.name}
                      type="text"
                      placeholder="Имя"
                      size={"s"}
                  />

                  <TextField
                      onChange={({ value }) => setFieldHandler('phone', value as string)}
                      value={user?.phone}
                      type="text"
                      placeholder="Номер"
                      size={"s"}
                  />

                  <Button
                      size={"s"}
                      onClick={() => {
                        if(user?.phone && validPhone(user.phone)){
                            onCreate();
                        }
                      }}
                      label={"Создать"}
                  />

              </div>
          </Modal>
  );
  }


  export default ModalCreateUser;
