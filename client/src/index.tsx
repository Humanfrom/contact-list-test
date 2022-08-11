import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux'

import AppRouter from './AppRouter';
import {setupStore} from './store/store'

const store = setupStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
      <AppRouter />
    </Provider>
);
