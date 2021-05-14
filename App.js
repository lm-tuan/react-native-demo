import React, { useEffect } from "react";
import { StyleSheet ,View,  } from "react-native";
import axios from 'axios';

import { Divider , IconButton, Colors, ActivityIndicator, Provider  } from 'react-native-paper';

// compoment
import AppBar from './components/appbar';
import DataTableComponent from './components/dataTable';
import FormAdd from './components/formAdd';
import FormEditComponent from './components/formEdit';


const  App = () => {
  const [isCreate, setIsCreate] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState({
    statusEdit: false,
    mode:""
  });
  
  const [numerPhones , setNumerPhones] = React.useState([]);
  const [loading , setLoading] = React.useState([false]);
  const [numberPhone, setNumberPhone] = React.useState({
    "id":"",
    "number": "",
    "descrition": "",
    "isStatus": false
  });

  // call Api
  useEffect(() =>  {
    callApiList();
  }, []);

  const onEditOrDetail = (numberPhone, statusEdit, mode) => {
    console.log(mode);
    // console.log(statusEdit);
    setIsEdit({
      statusEdit: true,
      mode,
    });
    const { id } = numberPhone
    if(id) {
      axios.get(`https://5fed4220595e420017c2c62d.mockapi.io/number_phone/${id}`)
      .then(result => {
        const { status , data } = result
        if(status === 200){
          setNumberPhone(data)
          isCreate(false);
          isEdit(false);
        }
      })
      .catch(err => {
        console.log('err', err);
      })
    }
    // setIsEdit(statusEdit);
    // setNumberPhone(numberPhone)
  }
  const onUpdate = (num) => {
    axios.put(`https://5fed4220595e420017c2c62d.mockapi.io/number_phone/${num.id}`, num )
    .then(result => {
      const { status , data } = result
      if(status === 200){
        callApiList();

      }
    })
    .catch(err => {
      console.log('err', err);
    })
  }

  const onDeleteParent = (id) => {

      if(id) {
        axios.delete(`https://5fed4220595e420017c2c62d.mockapi.io/number_phone/${id}`)
        .then(result => {
          const { status , data } = result
          if(status === 200){
            callApiList();
            setIsCreate(false);
          }
        })
        .catch(err => {
          console.log('err', err);
        })
      }
  }
  const callApiList = () => {
    setTimeout(() => {
      axios.get('https://5fed4220595e420017c2c62d.mockapi.io/number_phone')
      .then(result => {
        const { status , data } = result
        if(status === 200){
          setNumerPhones(data)
          setLoading(false)
        }
      })
      .catch(err => {
        console.log('err', err);
      })
    })
  }
  const hideModal = (numberPhone) => {
    console.log('numberPhone', numberPhone);
    if(numberPhone.number){
      body = numberPhone;
      axios.post('https://5fed4220595e420017c2c62d.mockapi.io/number_phone',body )
      .then(result => {
        setIsCreate(false);
        callApiList();
      }).catch(err => {
        console.log(err);
      })
    }
    setIsCreate(false);
  }
  return (
    
    <View style={[styles.container, {
      flexDirection: "column",
      margin:0,
      padding:0,
    }]}>

      <View style={{ flex: 0.5 }} >
        <AppBar />
      </View >
      <View style={{ 
        flex: 4.5, 
        flexDirection:"column",
        }} >
        <View style = {{ 
          flexDirection:"row",
          justifyContent:'flex-end',
        }}>
          <IconButton
            icon="account-edit-outline"
            color={Colors.red500}
            size={20}
            onPress={() => console.log('Pressed')}
          />
          <IconButton
            icon="select-all"
            color={Colors.red500}
            size={20}
            onPress={() =>{ 
              setIsCreate(true)
            }}
          />
        </View>
        <View  >
           <Divider />
          <DataTableComponent 
            numerPhones = {numerPhones}
            onDeleteParent = {id => onDeleteParent(id)}
            onEditOrDetail = {( num, statusEdit, mode)  => onEditOrDetail(num, statusEdit, mode)}
            isEdit = { isEdit }
          />
          <ActivityIndicator 
            animating={loading} 
            color={Colors.blue800} 
            size = "large"
            style ={{
                // backgroundColor:'red',
                position:'relative',
                top:10,
        }}
     />
        </View >
      </View >
      <FormAdd 
        isCreate = { isCreate } 
        hideModalonParent = {(numberPhone)=> hideModal(numberPhone) }
        />
      <FormEditComponent 
        isEdit = { isEdit}
        onEditOrDetail = { numberPhone => onEditOrDetail(numberPhone)}
        numberPhone = { numberPhone }
        onUpdate = { num => onUpdate(num)}
      
      />
    </View>)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default App;

