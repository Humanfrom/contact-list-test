import {FC, useState, useEffect} from 'react';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { useNavigate } from "react-router-dom";
import { Header, HeaderModule } from '@consta/uikit/Header';
import useToken from "../hooks/useToken";


//контейнерный элемент, который может быть переиспользуем, если мы хотим сделать более одного окна
const Navbar: FC = () => {

  const navigate = useNavigate();
  const { token, setToken } = useToken();

  return (
    <Header
  leftSide={
    <>
      <HeaderModule><Text size="s">Панель навигации</Text></HeaderModule>
    </>
  }
  rightSide={
    <>
      <HeaderModule><Button
          size={"s"}
          onClick={() => navigate('/')}
          label={"На главную"}
      /></HeaderModule>
      <HeaderModule><Button
          size={"s"}
          onClick={() => navigate('/about/')}
          label={"О задаче"}
      /></HeaderModule>
      <HeaderModule>
        { token
          ?
          <Button
              size={"s"}
              onClick={() => {
                setToken({token: null})
                window.location.reload();
              }}
              label={"Выйти"}
          />
          :
          <Button
              size={"s"}
              onClick={() => navigate('/login/')}
              label={"Логин"}
          />
        }
        </HeaderModule>
    </>
  }
/>
  );
}


export default Navbar;
