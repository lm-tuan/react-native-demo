import React, { useEffect } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import axios from 'axios';

import { Divider, IconButton, Colors, ActivityIndicator, Provider, Searchbar } from 'react-native-paper';

// compoment
import AppBar from './components/appbar';
import DataTableComponent from './components/dataTable';
import FormAdd from './components/formAdd';
import FormEditComponent from './components/formEdit';
import fillterNumberPhone from './helper/fillterNumberPhone';
import { getAllNumbers, getNumberById, insertNumber, editNumberById, deleteNumberById } from './services/phone.api'

const App = () => {
    // set state
    const [isCreate, setIsCreate] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [numerPhones, setNumerPhones] = React.useState([]);
    const [loading, setLoading] = React.useState([false]);
    const [number, onChangeNumber] = React.useState(null);
    const [numberPhone, setNumberPhone] = React.useState({

        id: "",
        number: "",
        descrition: "",
        isStatus: false
    });
    const [isEdit, setIsEdit] = React.useState({
        statusEdit: false,
        mode: ""
    });

    // onChange search
    const onChangeSearch = async query => {
        setSearchQuery(query)
        try {
            const response = await getAllNumbers();
            setTimeout(() => {
                const { status, data } = response;
                if (status === 200) {
                    const numbers = fillterNumberPhone(data, query);
                    setNumerPhones(numbers)
                }
            }, 1000);
        } catch (error) {
            console.log('err', err);
        }
    };

    // call Api
    useEffect(async () => {
        // const result = await getAllNumbers();
        // console.log(result);
        callApiList();
    }, []);


    // detail
    const onEditOrDetail = async (numberPhone, mode) => {
        const { id } = numberPhone;
        setIsEdit({
            statusEdit: true,
            mode,
        });
        if (id) {
            try {
                const response = await getNumberById(id);
                setTimeout(() => {
                    const { status, data } = response;
                    if (status === 200) {
                        setNumberPhone(data)
                        setIsCreate(false);
                    }
                }, 1000)
            } catch (error) {
                console.log('err', err);
            }
        }
    }
    // update  number
    const onUpdate = async (num) => {
        const { id } = num;
        setLoading(true);
        try {
            const response = await editNumberById(id, num);
            setTimeout(() => {
                const { status, data } = response;
                if(status === 200){
                    callApiList();
                    setLoading(false);
                }
            }, 1000)
        } catch (error) {
            console.log('err', err);
        }
    }
    // search number
    // const onSearch = () => {
    //     const numbers = fillterNumberPhone(numerPhones, searchQuery);
    //     setNumerPhones(numbers);
    // }

    // delete number
    const onDeleteParent = async (id) => {
        if (id) {
            setLoading(true)
            try {
                const response = await deleteNumberById(id);
                setTimeout(() => {
                    const { status } = response
                    if (status === 200) {
                        callApiList();
                        setIsCreate(false);
                        setLoading(false)
                    }
                }, 1000);
            } catch (error) {
                console.log('err', err);
            }
            
        }
    }
    // call api list number
    const callApiList = async () => {
        try {
            const response = await getAllNumbers();
            const { status, data } = response;
            setTimeout(() => {
                if (status === 200) {
                    setNumerPhones(data);
                    setLoading(false)
                }
            }, 1000)
        } catch (error) {
            console.log('err', err);
            setLoading(false)
        }
    }
    // insert number
    const hideModal = async (numberPhone) => {
        console.log('numberPhone', numberPhone);
        if (numberPhone.number) {
            setLoading(true);
            const body = numberPhone;
            try {
                const response = await insertNumber(body);
                setTimeout(() => {
                    const { status } = response;
                    if (status === 201) {
                        setIsCreate(false);
                        callApiList();
                        setLoading(false);
                    }
                }, 1000)
            } catch (error) {
                console.log(err);
                setLoading(false);
                setIsCreate(false);
            }
        }
        setIsCreate(false);
    }
    const onPressHome = () => {
        setLoading(true);
        setTimeout(async () => {
            await callApiList();
            console.log('onPressHome');
            setLoading(false);
        }, 1000)
        console.log('onPressHome');
    }
    return (

        <View style={[styles.container, {
            flexDirection: "column",
            margin: 0,
            padding: 0,
        }]}>
            <ActivityIndicator
                animating={loading}
                color={Colors.blue800}
                size="large"
                style={{
                    //  backgroundColor:'red',
                    position: 'absolute',
                    zIndex: 100,
                    top: 300,
                    width: "100%",

                    //  top:10,
                    //  flexDirection:"column",
                    //  justifyContent:"center"
                }}
            />

            <View style={{ flex: 0.5 }} >
                <AppBar
                    callApiList={callApiList}
                    onPressHome={onPressHome}
                />
            </View >
            <View style={{
                flex: 4.5,
                flexDirection: "column",
            }} >
                <View style={{
                    flexDirection: "row",
                    justifyContent: 'flex-start',
                }}>
                    {/* <Searchbar
            iconColor = "blue"
            placeholder="Search number"
            onChangeText={onChangeSearch}
            onIconPress = {onSearch}
            value={searchQuery}
            style = {{
              width: 300,
              height:35,
              marginTop:10,
              opacity :  isCreate || isEdit.statusEdit ? 0 : 1
            }}
            inputStyle = {{
              fontSize:13
            }}
          /> */}
                    <TextInput
                        style={{
                            // backgroundColor:'red',
                            width: 250,
                            height: 40,
                            marginLeft: 10,
                            paddingLeft: 30,
                            borderRadius: 5,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            fontFamily: 'Cochin',
                            borderColor: "#20232a",
                        }}
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        placeholder="search number"
                    />
                    <IconButton
                        icon="account-edit-outline"
                        color={Colors.red500}
                        size={20}
                        onPress={() => console.log('Pressed')}
                    />
                    <IconButton
                        icon="select"
                        color={Colors.red500}
                        size={20}
                        onPress={() => {
                            setIsCreate(true)
                        }}
                    />
                </View>
                <View  >
                    <Divider />
                    <DataTableComponent
                        numerPhones={numerPhones}
                        onDeleteParent={id => onDeleteParent(id)}
                        onEditOrDetail={(num, statusEdit, mode) => onEditOrDetail(num, statusEdit, mode)}
                        isEdit={isEdit}
                    />
                    {/* <ActivityIndicator 
            animating={loading} 
            color={Colors.blue800} 
            size = "large"
            style ={{
                backgroundColor:'red',
               //  position:'relative',
               //  top:10,
                flexDirection:"column",
                justifyContent:"center"
        }}
     /> */}
                </View >
            </View >
            <FormAdd
                isCreate={isCreate}
                hideModalonParent={(numberPhone) => hideModal(numberPhone)}
            />
            <FormEditComponent
                isEdit={isEdit}
                onEditOrDetail={numberPhone => onEditOrDetail(numberPhone)}
                numberPhone={numberPhone}
                onUpdate={num => onUpdate(num)}

            />
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                //  backgroundColor:'red',
            }}>
            </View>
        </View>)
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
});

export default App;

