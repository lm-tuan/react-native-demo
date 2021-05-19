import React, { useEffect } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Divider, IconButton, Colors, ActivityIndicator, Provider, Button } from 'react-native-paper';

// compoment
import AppBar from './components/appbar';
import DataTableComponent from './components/dataTable';
import FormAdd from './components/formAdd';
import FormEditComponent from './components/formEdit';
import fillterNumberPhone from './helper/fillterNumberPhone';
import { getAllNumbers, getNumberById, insertNumber, editNumberById, deleteNumberById, insertMultipleNumber } from './services/phone.api';
import FormAddMultiple from './components/formAddMultiple  ';
import { createIconSetFromFontello } from "react-native-vector-icons";

const App = () => {
    // set state
    const [isCreate, setIsCreate] = React.useState(false);
    const [isCreateMut, setIsCreateMut] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [numerPhones, setNumerPhones] = React.useState([]);
    const [loading, setLoading] = React.useState([false]);
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


    // call Api
    useEffect(async () => {
        callApiList();
    }, []);
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

    // detail
    const onEdit = async (numberPhone, mode) => {
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
                        setSearchQuery('');
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
        setIsEdit({
            statusEdit: true,
            mode : isEdit.mode,
        });
        const { id } = num;
        setLoading(true);
        try {
            const response = await editNumberById(id, num);
            setTimeout(() => {
                const { status, data } = response;
                if(status === 200){
                    setSearchQuery('');
                    callApiList();
                    setLoading(false);
                    setIsEdit({
                        statusEdit: false,
                        mode : "",
                    });
                }
            }, 1000)
        } catch (error) {
            console.log('err', err);
        }
    }

    // delete number
    const onDeleteParent = async (id) => {
        if (id) {
            setLoading(true)
            try {
                const response = await deleteNumberById(id);
                setTimeout(() => {
                    const { status } = response
                    if (status === 200) {
                        setSearchQuery('');
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
            }, 100)
        } catch (error) {
            console.log('err', err);
            setLoading(false)
        }
    }
    // insert number
    const onInsertNumber = async (numberPhone) => {
        if (numberPhone.number) {
            setLoading(true);
            const body = numberPhone;
            try {
                const response = await insertNumber(body);
                setTimeout(() => {
                    const { status } = response;
                    if (status === 201) {
                        setSearchQuery('');
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
    const cannelInsertNumberMut = () => {
        setIsCreateMut(false);
    }
    // insert number mut
    const onInsertNumberMut = async (numberPhones) => {
        if(numberPhones.length === 0 ) {
            setIsCreateMut(true);
        }
        if (numberPhones.length > 0  && Array.isArray(numberPhones)) {
            setLoading(true);
            try {
                const response = await insertMultipleNumber(numberPhones);
                setTimeout(() => {
                    if(response.length > 0){
                        setSearchQuery('');
                        setIsCreateMut(false);
                        callApiList();
                        setLoading(false);
                    }
                    console.log('response', response);
                }, 1000)
            } catch (error) {
                console.log(error);
                setLoading(false);
                setIsCreateMut(false);
            }
        }
        // setIsCreateMut(false);
    }
    const onPressHome = () => {
        setLoading(true);
        setTimeout(async () => {
            await callApiList();
            setLoading(false);
        }, 1000)
    }

    // remove online
    const onRemoveAll = () => {
        console.log('remote all');
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
                        icon="delete"
                        color={Colors.orange700}
                        size={25}
                        onPress={ onRemoveAll }
                    />
                    <IconButton
                        icon={require('./assets/images/insert.png')}
                        color={Colors.blue700}
                        size={20}
                        onPress={() => {
                            setIsCreate(true)
                        }}
                    />
                     <IconButton
                        icon={require('./assets/images/insert_mut_2.png')}
                        color={Colors.blue700}
                        size={25}
                        onPress={() => {
                            // setIsCreate(true)
                            setIsCreateMut(true);
                        }}
                        style = {{
                            // backgroundColor:'red',
                            marginTop:4
                        }}
                    />
                </View>
                <View  >
                    <Divider />
                    <DataTableComponent
                        numerPhones={numerPhones}
                        onDeleteParent={id => onDeleteParent(id)}
                        onEdit={(num, statusEdit, mode) => onEdit(num, statusEdit, mode)}
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
                onInsertNumber={(numberPhone) => onInsertNumber(numberPhone)}
            />
            <FormAddMultiple
                isCreateMut={isCreateMut}
                onInsertNumberMut={(numberPhones) => onInsertNumberMut(numberPhones)}
                cannelInsertNumberMut  = { cannelInsertNumberMut }
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

