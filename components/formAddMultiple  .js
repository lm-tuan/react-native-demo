import * as React from 'react';
import { Modal, Portal, Text, Button, Provider, TextInput, Card, Colors, Title, Paragraph, IconButton } from 'react-native-paper';
import { View } from "react-native";
import uuid from 'react-native-uuid';

const FormAddMultiple   = ({ isCreateMut, onInsertNumberMut }) => {
  const [visible, setVisible] = React.useState(isCreateMut);
  const [validate, setValidate] = React.useState([]);
  const [numberPhone, setNumberPhone] = React.useState({
    "id":"",
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
      onInsertNumberMut(numbers);
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
    setValidate([]);
  }
  const containerStyle = { backgroundColor: 'white', padding: 20 };
  React.useEffect(() => {
    setVisible(isCreateMut);
  }, [isCreateMut])

  // Process
  
  // Remove
  const onRemoveNum= (id) => {
    let index = 0;
     numbers.forEach((num, idex) => {
      if(num.id === id) {
        index = idex;
      }
    })
    setNumbers([
      ...numbers.slice(0, index),
      ...numbers.slice(index + 1)
    ])
  }

  // Add number
  const onInsertNum = () => {
    const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (vnf_regex.test(numberPhone.number)) {
      const id = uuid.v4();
      const num = numberPhone;
      num.id = id;
      setNumberPhone({ ...numberPhone, number: ''})
      setNumbers([...numbers, num]);
      setValidate([]);
      return numberPhone;
    } else {
      setValidate([...validate, 'Number phone not is incorrect format '])
    }
    
    // numberPhone.number = "";
    // console.log("uuidv4()", uuidv4());
  }


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
          <View> 
            <Card>
              <Card.Content style = {{ height: "auto"}}>
              {/* <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <Button
                  // icon="camera"
                  mode="contained"
                  onPress={hideModal}
                  style={{ marginTop: 10 }}
                  contentStyle = {{
                    // width:40,
                    height:30,
                    fontSize:10,
                    // marginLeft:50,
                    // flexDirection: 'row-reverse',
                    width:90,
                    marginTop:3,
                    width:30,
                  
                  }}
                  labelStyle = {{
                    fontSize:10,
                    // backgroundColor:'red',
                    height:20,
                    marginRight:5,
                    width:75,
                    paddingLeft:20,
                    fontWeight:"bold"
                  }}
                >
                  Save all
                </Button>
                <Button
                  // icon="camera"
                  color = { Colors.orange700}
                  mode="contained"
                  onPress={cancelForm}
                  style={{ marginTop: 10, marginLeft: 10 }}
                  contentStyle = {{
                    height:30,
                    fontSize:10,
                    // marginLeft:50,
                    // flexDirection: 'row-reverse',
                    width:90,
                    marginTop:3,
                    width:30,
                  
                  }}
                  labelStyle = {{
                    fontSize:10,
                    // backgroundColor:'red',
                    height:20,
                    marginRight:5,
                    width:70,
                    paddingLeft:17,
                    // margin:'auto'
                    // textAlign:'center'
                    color: Colors.white,
                    fontWeight:'bold',
                  }}
                >
                  Cancel
                </Button>
              </View> */}
                <Title style = {{ fontSize: 13}}>List number can insert</Title>
                {
                  numbers.length > 0 && numbers.map((num, index) => 
                    <View key = {index + 1} style = {{ flexDirection:'row', justifyContent:'space-between' }}>
                      <Text 
                      style = {{ marginTop: 10, fontFamily:'Lato-Black'}}>
                        {num.number}
                      </Text>
                      <IconButton
                        icon={require('../assets/images/times.png')}
                        color={Colors.red500}
                        size={20}
                        onPress={() => onRemoveNum(num.id)}
                      />
                    </View>
                    
                    )
                }
                <View style = {{ flexDirection:'column', justifyContent:'space-between'}}>
                {
                  validate.length > 0 &&
                  <Text style={{ color: 'red' }}>{validate[0]}</Text>
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
                        onChangeText={number => {
                              setValidate([]);
                              setNumberPhone({ ...numberPhone, number })
                            }
                          }
                        autoFocus = {true}
                      />
                    <IconButton
                      icon={require('../assets/images/add.png')}
                      color={Colors.red500}
                      size={30}
                      onPress={onInsertNum}
                      style = {{ marginRight: 100}}
                    />
                </View>
                </View>
              </Card.Content>
            </Card>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};
export default FormAddMultiple;