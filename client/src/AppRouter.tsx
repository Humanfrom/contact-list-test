import { FC, useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes'
import useToken from './hooks/useToken';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

import Error from './pages/Error'
import Login from './pages/Login'
import Navbar from './components/Navbar'

const AppRouter: FC = () => {
  const { token } = useToken();
  const [isLogin, setIsLogin] = useState(!!token);

  return (
    <BrowserRouter>
        <Theme
        preset={presetGpnDefault}
        >
            <Navbar/>
            <Routes>
                { isLogin
                  ?
                  privateRoutes.map(
                    (item, index) => <Route element={item.element} path={item.route} key={index}/>
                  )
                  :
                  publicRoutes.map(
                    (item, index) => <Route element={item.element} path={item.route} key={index}/>
                  )
                }
                <Route element={<Login setIsLogin={setIsLogin}/>} path='/' key={2021}/>
                <Route element={<Login setIsLogin={setIsLogin}/>} path='/login/' key={2021}/>
                <Route element={<Error/>} path='*' key={2022}/>
            </Routes>

        </Theme>
    </BrowserRouter>
  );
}


export default AppRouter;
