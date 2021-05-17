import * as React from 'react';
import { Modal, Portal, Text, Button, Provider, TextInput, RadioButton } from 'react-native-paper';
import { View } from 'react-native';
const FormEditComponent = ({ isEdit, onEditOrDetail, numberPhone, onUpdate }) => {
  const [visible, setVisible] = React.useState(false);
  const [mode, setMode] = React.useState(false);
  const hideModal = () => setVisible(false);
  const [checked, setChecked] = React.useState(true);
  const [num, setNum] = React.useState({
    "id": "",
    "number": "",
    "descrition": "",
    "isStatus": false
  });
  const containerStyle = { backgroundColor: 'white', padding: 20 };
  React.useEffect(() => {
    setChecked(numberPhone.isStatus)
    setVisible(isEdit.statusEdit);
    setNum(numberPhone);
    setMode(isEdit.mode === "DETAIL" ? true : false);
  }, [isEdit, numberPhone])

  const onUpdateById = (id) => {
    const number = num;
    number.isStatus  = checked;
    console.log('number', number);
    onUpdate(number)
    setVisible(false);
  }
  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible} onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
          <View >
            <Text style={{
              fontFamily: 'tahoma',
              fontWeight: 'bold'
            }}>ID:</Text>
            <TextInput
              disabled={true}
              mode="outlined"
              label="id"
              value={num.id}
              onChangeText={number =>
                setNum({ ...num, number })
              }
              style={{
                height: 40,
                width: 300
              }}
            />
          </View>
          <View >
            <Text style={{
              fontFamily: 'tahoma',
              fontWeight: 'bold'
            }}>Number Phone:</Text>
            <TextInput
              disabled={mode}
              mode="outlined"
              label="number"
              value={num.number}
              onChangeText={number =>
                setNum({ ...num, number })
              }
              style={{
                height: 40,
                width: 300
              }}
            />
          </View>
          <View >
            <Text style={{
              fontFamily: 'tahoma',
              fontWeight: 'bold'
            }}>Description:</Text>
            <TextInput
              disabled={mode}
              mode="outlined"
              label="description"
              value={num.descrition}
              onChangeText={descrition =>
                setNum({ ...num, descrition })
              }
              style={{
                height: 40,
                width: 300
              }}
            />
          </View>
          <View >
            <Text style={{
              fontFamily: 'tahoma',
              fontWeight: 'bold'
            }}>Status:</Text>
            {/* <TextInput
              disabled={mode}
              mode="outlined"
              label="status"
              value={num.isStatus ? "0" : "1"}
              onChangeText={isStatus =>
                setNum({ ...num, isStatus })
              }
              style={{
                height: 40,
                width: 300
              }}
            /> */}
            <View>
             <View style = {{
               flexDirection:"row",
             }}>
                <RadioButton
                  color = "#2962ff"
                  value= {checked}
                  status={ checked ? 'checked' : 'unchecked' }
                  onPress={() => {
                      console.log('check', checked);
                      setChecked(!checked)
                    }
                  
                  }
                  disabled = {mode ? true : false}
                />
                <Text style = {{
                  color:'#2962ff',
                  marginTop:6,
                  fontFamily:'lucida grande',
                  fontSize:15,
                  fontWeight:"bold"
                }}>Buy</Text>
                
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10 }}>
            {
              !mode && <Button style={{
                marginRight: 10
              }} icon="camera" mode="contained" onPress={() => onUpdateById(num.id)}>
                Update
                    </Button>
            }
            <Button icon="cancel" mode="contained" onPress={hideModal}>
              Cannel
                    </Button>
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default FormEditComponent;