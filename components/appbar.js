import * as React from 'react';
import { Appbar } from 'react-native-paper';
import { stylesAppbar } from '../assets/css/index.style';

const AppBar = () => (
 <Appbar style={stylesAppbar.bottom}>
   <Appbar.Action
     icon="archive"
     onPress={() => console.log('Pressed archive')}
    />
    <Appbar.Action icon="mail" onPress={() => console.log('Pressed mail')} />
    <Appbar.Action icon="label" onPress={() => console.log('Pressed label')} />
    <Appbar.Action
      icon="delete"
      onPress={() => console.log('Pressed delete')}
    />
  </Appbar>
 );

export default AppBar

