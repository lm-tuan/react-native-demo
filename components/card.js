import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { stylesCard } from '../assets/css/index.style';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const CardComponent = () => (
  <Card style = {stylesCard.card}>
    <Card.Content>
      <Title>Card title</Title>
      <Paragraph>
        orem ipsum dolor sit amet, consectetur adipiscing elit. 
        Curabitur mattis, justo sed finibus congue,
      </Paragraph>
      
    </Card.Content>
  </Card>
);

export default CardComponent;