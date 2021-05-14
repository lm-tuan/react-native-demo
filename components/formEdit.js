import * as React from 'react';
import { Modal, Portal, Text, Button, Provider, TextInput } from 'react-native-paper';
import { View } from 'react-native';
const FormEditComponent = ( { isEdit , onEditOrDetail, numberPhone }) => {
  const [visible, setVisible] = React.useState(false);
  const [text, setText] = React.useState('');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [num, setNum] = React.useState({
    "id":"",
    "number": "",
    "descrition": "",
    "isStatus": false
  });

  const containerStyle = { backgroundColor: 'white', padding: 20 };
  console.log('numberPhone', numberPhone);
  React.useEffect(() => {
      setVisible(isEdit);
      setNum(numberPhone);
  }, [isEdit, numberPhone])
  console.log('props', numberPhone);
  return (
    <Provider>
      <Portal>
        <Modal 
        visible={visible} onDismiss={hideModal} 
        contentContainerStyle={containerStyle}
        
        >
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
          <View >
           <Text style = {{
               fontFamily:'tahoma',
               fontWeight:'bold'
           }}>ID:</Text>  
            <TextInput
                mode = "outlined"
                label="id"
                value={num.id}
                onChangeText={text => setText(text)}
                style = {{
                    height:40,
                    width:300
                }}
                />
           </View>
           <View >
           <Text style = {{
               fontFamily:'tahoma',
               fontWeight:'bold'
           }}>Number Phone:</Text>  
            <TextInput
                mode = "outlined"
                label="number"
                value={num.number}
                onChangeText={text => setText(text)}
                style = {{
                    height:40,
                    width:300
                }}
                />
           </View>
           <View >
           <Text style = {{
               fontFamily:'tahoma',
               fontWeight:'bold'
           }}>Description:</Text>  
            <TextInput
                mode = "outlined"
                label="description"
                value={num.descrition}
                onChangeText={text => setText(text)}
                style = {{
                    height:40,
                    width:300
                }}
                />
           </View>
           <View >
           <Text style = {{
               fontFamily:'tahoma',
               fontWeight:'bold'
           }}>Status:</Text>  
            <TextInput
                mode = "outlined"
                label="status"
                value={num.isStatus ? "0" : "1"}
                onChangeText={text => setText(text)}
                style = {{
                    height:40,
                    width:300
                }}
                />
           </View>
           <View style = {{ flexDirection:'row', justifyContent:'flex-start', marginTop:10}}>
                <Button style = {{
                    marginRight:10
                }}  icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
                        Update
                </Button> 
                <Button icon="cancel" mode="contained" onPress={hideModal}>
                        Cannel
                </Button> 
            </View>
        </Modal>
      </Portal>
      <Button style={{marginTop: 30}} onPress={showModal}>
        Show
      </Button>
    </Provider>
  );
};

export default FormEditComponent;