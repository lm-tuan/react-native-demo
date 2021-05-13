import React, { useEffect } from "react";
import { StyleSheet, Text, View,  } from "react-native";
import axios from 'axios';

import { Divider , Button, List, IconButton, Colors, ActivityIndicator, Provider  } from 'react-native-paper';

// compoment
import AppBar from './components/appbar';
import CardComponent from './components/card'
import ButtonComponent from './components/button'
import DataTableComponent from './components/dataTable'
import FormAdd from './components/formAdd'
import ActivityIndicatorComponent from './components/activityIndicator';
import DialogComponent from './components/dialog';


const  App = () => {
  const [isCreate, setIsCreate] = React.useState(false);
  const [isDelete, setIsDelete] = React.useState(false);
  const [numerPhones , setNumerPhones] = React.useState([]);
  // const [numerPhonesPagination , setNumerPhonesPagination] = React.useState([]);
  const [loading , setLoading] = React.useState([false]);
  const [statusAlert , setStatusAlert] = React.useState([false]);

  // call Api
  useEffect(() =>  {
    callApiList();
  }, []);

  // const checkYesNo = (status) => {
  //   console.log('status1', status)
  //   setIsDelete(statusAlert);
  // }
  
  useEffect(() =>  {
    console.log(isDelete)
  }, [isDelete]);

  const onDeleteParent = (id) => {
      // setIsDelete(true);
      // console.log('oke');
      // const { status } = checkYesNo();
      // console.log('isDelete', isDelete);
      if(id) {
        setIsDelete(true);
        axios.delete(`https://5fed4220595e420017c2c62d.mockapi.io/number_phone/${id}`)
        .then(result => {
          const { status , data } = result
          if(status === 200){
            setIsDelete(false);
            callApiList();
            // setNumerPhonesPagination(data?.slice(0, 5));
            // setLoading(false)
          }
        })
        .catch(err => {
          console.log('err', err);
        })
      }
  }
  const openDialog = () => {
    console.log('openDialog', openDialog);
  }
  // const itemsPerPage = 4;
  // const [page, setPage] = React.useState(0);
  // const from = page * itemsPerPage;
  // const to = (page + 1) * itemsPerPage;
  // const numberOfPages= Math.floor(numerPhones.length / itemsPerPage)
 
  // const onPageChange= page => {
  //   console.log('onPageChange');
  //   axios.get('https://5fed4220595e420017c2c62d.mockapi.io/number_phone')
  //   .then(result => {
  //     const { status , data } = result
  //     console.log('from', from);
  //     console.log('to',to);
  //     if(status === 200){
  //       setPage(page)
  //       setNumerPhonesPagination(data.slice(itemsPerPage - 1, itemsPerPage + 3));
       
  //       setLoading(false)
  //     }
  //   })
  //   .catch(err => {
  //     console.log('err', err);
  //   })
  //   console.log('page', page);
  // }
  // const label=`${from + 1}-${to} of ${numerPhones.length}`;

  // get List
  const callApiList = () => {
    setTimeout(() => {
      axios.get('https://5fed4220595e420017c2c62d.mockapi.io/number_phone')
      .then(result => {
        const { status , data } = result
        if(status === 200){
          setNumerPhones(data)
          // setNumerPhonesPagination(data?.slice(0, 5));
          setLoading(false)
        }
      })
      .catch(err => {
        console.log('err', err);
      })
    })
  }
  const hideModal = (numberPhone) => {
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
    // setIsCreate(false);
    console.log('hideModal on App', numberPhone)
  }
  return (
    
    <View style={[styles.container, {
      // Try setting `flexDirection` to `"row"`.
      flexDirection: "column",
      margin:0,
      padding:0,
      // backgroundColor:"blue"
    }]}>

      {/* <View style={{ flex: 0.5 }} >
        <AppBar />
      </View >
      <View style={{ flex: 1 }} >
        <CardComponent/>
      </View > */}
      <View style={{ 
        flex: 4.5, 
        flexDirection:"column",
        }} >
        {/* button group */}
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
        {/* <View>
        <Text></Text>
          <Divider />
        </View> */}
        {/* List group */}
        <View  >
           <Divider />
          <DataTableComponent 
            numerPhones = {numerPhones}
            onDeleteParent = {id => onDeleteParent(id)}
            // isDelete = { isDelete }
            // checkYesNo = {checkYesNo}
            // onPageChange = {onPageChange}
            // numberOfPages = {numberOfPages}
            // label = {label}
            // page = {page}
            // numerPhonesPagination = {numerPhonesPagination}
          />
          {/* <ActivityIndicatorComponent loading = {loading} /> */}
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
       {/* <Provider>
          <DialogComponent
              isDelete = {isDelete}
              checkYesNo = {(status) => checkYesNo(status)}
          />
      </Provider> */}

    </View>)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default App;

