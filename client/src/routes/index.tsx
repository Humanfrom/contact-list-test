import App from '../pages/App'
import About from '../pages/About'


export const privateRoutes = [
  {element: <About/> , route: "/about/"},
  {element: <App/>, route: "/"}
];

export const publicRoutes = [
  {element: <About/> , route: "/about/"}
];
