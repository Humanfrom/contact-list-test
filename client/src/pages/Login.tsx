import { FC, useState } from 'react';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Card } from '@consta/uikit/Card';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { URL } from "../constants"
import axios from 'axios';
import useToken from '../hooks/useToken';
import { useNavigate } from "react-router-dom";

type Login = {
  setIsLogin: Function,
}

const Login: FC<Login> = ({setIsLogin}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { token, setToken } = useToken();

  const checkLoginData = async () => {
      await axios.post(
            `${URL}login`,
            {
              login: login,
              password: password
            },
            {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': token,
                }
        }).then((response) => {
              if (response.status === 200) {
                  setToken({token: response.data});
                  setIsLogin(!!response.data);
                  window.location.reload();
                  navigate('/');
              }
        })
  }

  return (
    <Theme
    preset={presetGpnDefault}
    className='login-container'
    >
        <Card
            verticalSpace="2xl"
            horizontalSpace="2xl"
            className='card'
        >
            <div className="login-panel">

                <Text as="p" size="m" view="primary">Введите логин и пароль</Text>
                <Text as="p" size="s" view="secondary">Логин: "User", пароль: "123"</Text>

                <TextField
                    onChange={({ value }) => setLogin(value ? String(value) : '')}
                    value={login}
                    type="text"
                    placeholder="Логин"
                    size={"s"}
                />

                <TextField
                    onChange={({ value }) => setPassword(value ? String(value) : '')}
                    value={password}
                    type="password"
                    placeholder="Пароль"
                    size={"s"}
                />

                <Button
                    size={"s"}
                    onClick={() => checkLoginData()}
                    label={"Войти"}
                />

            </div>
        </Card>
    </Theme>
  );
}


export default Login;
