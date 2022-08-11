import { FC } from 'react';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';


type Header = {
  onModalShow: Function,
}
//контейнерный элемент, который может быть переиспользуем, если мы хотим сделать более одного окна
const Header: FC<Header> = ({onModalShow}) => {

  return (
    <div className='header'>

      <Text
          align="left"
          font="primary"
          size="l"
          view="primary"
          weight="bold"
          >
          Тестовая таблица
      </Text>

        <div className="filter-panel">

            <Button
                size={"s"}
                onClick={() => onModalShow()}
                label={"Создать"}
            />

        </div>
    </div>
  );
}


export default Header;
