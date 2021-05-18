import * as React from 'react';
import { Modal, Portal, Text, Button, Provider, TextInput, Card, Colors, Title, Paragraph, IconButton } from 'react-native-paper';
import { View } from "react-native";
import { v4 as uuidv4 } from 'uuid';

const FormAddMultiple   = ({ isCreateMut, onInsertNumberMut }) => {
  const [visible, setVisible] = React.useState(isCreateMut);
  const [validate, setValidate] = React.useState(false);
  const [numberPhone, setNumberPhone] = React.useState({
    "number": "",
    "descrition": "",
    "isStatus": false
  });
  const [numbers, setNumbers] = React.useState([
    // {
    //   "number": "0359124552",
    //   "descrition": "",
    //   "isStatus": false
    // }
  ]);
  const hideModal = () => {
    const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (vnf_regex.test(numberPhone.number)) {
      console.log('form add');
      onInsertNumberMut(numberPhones);
      setVisible(false);
      setNumberPhone({ ...numberPhone, number: '' })
      setValidate([]);
      return numberPhone;
    } else {
      setValidate([...validate, 'Number phone not is incorrect format '])
    }
  }
  const cancelForm = () => {
    onInsertNumberMut({});
    setVisible(false);
  }
  const containerStyle = { backgroundColor: 'white', padding: 20 };
  React.useEffect(() => {
    setVisible(isCreateMut);
  }, [isCreateMut])

  // Process
  
  // Remove
  const onRemoveNum= (num) => {
    
    console.log("num", num);
  }

  // Add number
  const onInsertNum = () => {
    console.log("num", numberPhone);
  }
  const lst = numbers.map((num, index)=> (
  <View key = {{index}} style = {{ flexDirection:'row', justifyContent:'space-between' }}>
      <Text 
      style = {{ marginTop: 10, fontFamily:'Lato-Black'}}>
        { num.id}
      </Text>
      <IconButton
        icon={require('../assets/images/times.png')}
        color={Colors.red500}
        size={20}
        onPress={() => onRemoveNum}
      />
    </View>))

  return (
    <Provider>
      <Portal >
        <Modal
          visible={visible}
          onDismiss={false}
          contentContainerStyle={containerStyle}
          style={{
            width: "100%",
            height: "100%",
            zIndex: 99,
            position:'relative',
            // backgroundColor:'red'
          }}
        >
          {/* {
            validate.length > 0 &&
            <Text style={{ color: 'red' }}>{validate[0]}</Text>
          }
          {
            validate.length === 0 &&
            <Text>Example Modal.  Click outside this area to dismiss.</Text>
          } */}
          <View> 
            <Card>
              <Card.Content style = {{ height: "auto"}}>
                <Title style = {{ fontSize: 13}}>List number can insert</Title>
                {/* <View style = {{ flexDirection:'row', justifyContent:'space-between' }}>
                    <Text 
                    style = {{ marginTop: 10, fontFamily:'Lato-Black'}}>
                      fdff
                    </Text>
                    <IconButton
                      icon={require('../assets/images/times.png')}
                      color={Colors.red500}
                      size={20}
                      onPress={() => onRemoveNum}
                    />
                </View>) */}
                {
                  numbers.length > 0 && numbers.map((num, index) => 
                    <View key = {index} style = {{ flexDirection:'row', justifyContent:'space-between' }}>
                      <Text 
                      style = {{ marginTop: 10, fontFamily:'Lato-Black'}}>
                        {num.number}
                      </Text>
                      <IconButton
                        icon={require('../assets/images/times.png')}
                        color={Colors.red500}
                        size={20}
                        onPress={() => onRemoveNum}
                      />
                    </View>
                    
                    )
                }
                <View style = {{ flexDirection:'row', justifyContent:'space-between'}}>
                <TextInput
                    style = {{
                      height:40,
                      width:200,
                      fontSize:13
                    }}
                    mode="outlined"
                    label=" example: 0359124552"
                    value={numberPhone.number}
                    onChangeText={number =>
                        setNumberPhone({ ...numberPhone, number })

                      }
                    autoFocus = {true}
                  />
                  <IconButton
                    icon={require('../assets/images/add.png')}
                    color={Colors.red500}
                    size={30}
                    onPress={() => onInsertNum}
                    style = {{ marginRight: 100}}
                  />
                </View>
              </Card.Content>
            </Card>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <Button
              icon="camera"
              mode="contained"
              onPress={hideModal}
              style={{ marginTop: 10 }}
            >
              Save
            </Button>
            <Button
              icon="camera"
              mode="contained"
              onPress={cancelForm}
              style={{ marginTop: 10 }}
            >
              Cannel
            </Button>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};
export default FormAddMultiple;