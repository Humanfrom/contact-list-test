import { FC } from 'react';
import { Button } from '@consta/uikit/Button';
import { useNavigate } from "react-router-dom";
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Text } from '@consta/uikit/Text';


const Error: FC = () => {
  const navigate = useNavigate();
  return (
    <Theme
    preset={presetGpnDefault}
    >
      <div className="center-items">
        <Text as="p" size="l" view="primary">Ошибка! Такой страницы не существует!</Text>
        <Button
            size={"s"}
            onClick={() => navigate('/')}
            label={"На главную"}
            view="clear"
        />
      </div>
    </Theme>
  );
}


export default Error;
