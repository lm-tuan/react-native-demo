import * as React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

const DialogComponent = () => {
  const [visible, setVisible] = React.useState(true);
  const [yes, setYes] = React.useState(false);

  const yeslAlert = () => {
    setVisible(false);
    checkYesNo(true);
    setYes(true);
  }
  const cancelAlert = () => {
    checkYesNo(false);
    setVisible(false);
    setYes(false);
  }
  React.useEffect(() => {
  })

  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={yeslAlert}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you want delete this item ? </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={yeslAlert}>Yes</Button>
            <Button onPress={cancelAlert}>No</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default DialogComponent;