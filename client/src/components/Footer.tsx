import {FC, useState, useEffect} from 'react';
import { Text } from '@consta/uikit/Text';

type TFooter = {
  currentCount: number;
}

//контейнерный элемент, который может быть переиспользуем, если мы хотим сделать более одного окна
const Footer: FC<TFooter> = ({ currentCount }) => {

  const [totalCount, setTotalCount] = useState<number>(currentCount) //количество элементов для загрузки

  //следим за массивом загруженных элементов и обновляем когда загрузилось
  useEffect(() => {
    setTotalCount(currentCount)
  },[currentCount])

  return (
    <div className="footer">

        <Text size="s">Загружено: {`${currentCount} из ${totalCount}`}</Text>

    </div>
  );
}


export default Footer;
