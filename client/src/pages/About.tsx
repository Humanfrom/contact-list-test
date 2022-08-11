import { FC } from 'react';
import { Button } from '@consta/uikit/Button';
import { useNavigate } from "react-router-dom";
import { Text } from '@consta/uikit/Text';


const About: FC = () => {
  const navigate = useNavigate();
  return (
      <div className="center-items">
        <Text as="p" size="l" view="primary">О тестовом задании</Text>
        <div className="text-area">
            <Text as="p" size="s" view="primary">Выполнялось по вечерам в отрыве от основной работы. Использованы различные подходы в решени типовых задач. При уточнении ТЗ можно также добавить некоторый функционал.</Text>
            <Text as="p" size="s" view="primary">CSS строго для упрощения восприятия форм.</Text>
            <Text as="p" size="s" view="primary">По всем вопросам в телеграм: https://t.me/humanfrom</Text>
        </div>
        <Button
            size={"s"}
            onClick={() => navigate('/')}
            label={"На главную"}
            view="clear"
        />
      </div>
  );
}


export default About;
