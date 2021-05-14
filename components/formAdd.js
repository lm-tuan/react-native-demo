import * as React from 'react';
import { Modal, Portal, Text, Button, Provider, TextInput } from 'react-native-paper';
import { View } from "react-native";

const FormAdd = ({ isCreate, hideModalonParent }) => {
  const [visible, setVisible] = React.useState(isCreate);
  const [validate, setValidate] = React.useState([]);
  const [numberPhone, setNumberPhone] = React.useState({
    "number": "",
    "descrition": "",
    "isStatus": false
  });
  console.log('isCreate', isCreate);
  const hideModal = () => {
    const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if(vnf_regex.test(numberPhone.number)){
      hideModalonParent(numberPhone);
      setVisible(false);
      setNumberPhone({...numberPhone, number :'' } )
      setValidate([]);
      return numberPhone;
    }else{
      
      setValidate([...validate, 'Number phone not is incorrect format '])
    }

  }

  const cancelForm = () => {
    setVisible(false);
  }

  const containerStyle = {backgroundColor: 'white', padding: 20};

  React.useEffect(() => {
    setVisible(isCreate);
  }, [isCreate])
  return (
    <Provider>
      <Portal >
        <Modal 
        visible={visible} 
        onDismiss={false} 
        contentContainerStyle={containerStyle}
        style = {{
            width:"100%",
            height:"100%",
            // backgroundColor:"red",
            zIndex:99
        }}
        >
          {
            validate.length > 0 && 
            <Text style = {{ color:'red'}}>{validate[0]}</Text>
          }
          {
            validate.length === 0 && 
            <Text>Example Modal.  Click outside this area to dismiss.</Text>
          }
          
          <TextInput
            mode = "outlined"
            label=" example: 0359124552"
            value={numberPhone.number}
            onChangeText={number => 
                setNumberPhone({ ...numberPhone, number})
              }
            />

          <View style = {{ flexDirection:'row', justifyContent:'space-evenly'}}>
            <Button 
            icon="camera" 
            mode="contained"
            onPress={hideModal}
            style = {{ marginTop:10}}
            >
                  Create
            </Button>
            <Button 
            icon="camera" 
            mode="contained"
            onPress={cancelForm}
            style = {{ marginTop:10}}
            >
                  Cannel
            </Button>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default FormAdd;