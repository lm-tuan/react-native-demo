import * as React from 'react';
import { DataTable, IconButton, Colors, Button, List, Checkbox, Provider, Portal, Dialog, Paragraph } from 'react-native-paper';
import DialogComponent from './../components/dialog';
import { View } from 'react-native';

const DETAIL = "DETAIL";
const EDIT = "EDIT";

const DataTableComponent = (props) => 
  {
    
    const [visible, setVisible] = React.useState(false);
    const [visibleEdit, setVisibleEdit] = React.useState(false);
    const [ mode , setMode] = React.useState(DETAIL);
    // const [ activeEdit, setActiveEdit ] =  React.useState(false);
    const onDelete = (id) => {
      props.onDeleteParent(id);
    } 
    React.useEffect(() => {
      setVisible(props.isDelete);
      setVisible(props.isDelete);
    }, [ props.isDelete])

    const onPressDetailById = (num) => {
      props.onEditOrDetail(num,true, DETAIL);
      // setVisibleEdit()
      // console.log(num);
    } 
    const onPressEditById = (num) => {
      props.onEditOrDetail(num,true, EDIT);
      // setVisibleEdit()
      // console.log(num);
    } 

    const { numerPhones} = props;
    return (
    <DataTable>
      <DataTable.Header  >
        <DataTable.Title>No.</DataTable.Title>
        <DataTable.Title >Number</DataTable.Title>
        <DataTable.Title >Status</DataTable.Title>
        <DataTable.Title >Action</DataTable.Title>
        
      </DataTable.Header>
      {
        numerPhones.length > 0 &&
        numerPhones.map((num, index) => 
          (<DataTable.Row key = {num.id} style= {{
            flexDirection:'row',
            justifyContent:'center'
          }}
          onPress={() => onPressDetailById(num)}
          >
            
            <DataTable.Cell>{index + 1}</DataTable.Cell>
            <DataTable.Cell numeric>{num.number.substring(0,6) + '...'}</DataTable.Cell>
            <DataTable.Cell numeric>{ num.isStatus ? 0 : 1}</DataTable.Cell>
            <DataTable.Cell style = { {
                flexDirection:'row', 
                justifyContent:'flex-end',
              //   backgroundColor:'red',
                position:'relative',
                top:0,
                left:20,
                
            }}></DataTable.Cell>
            <DataTable.Cell >
              <IconButton
                  icon="shield-edit"
                  color={Colors.blue700}
                  size={15}
                  onPress={() => console.log('Pressed')}
                />
                <IconButton
                  icon="remote"
                  color={Colors.orange700}
                  size={15}
                  onPress={() => onPressEditById(num)}
                />
                <IconButton
                  icon="delete"
                  color={Colors.red500}
                  size={15}
                  onPress={ () => onDelete(num.id)}
                />
            </DataTable.Cell>
          </DataTable.Row>))
      }
      <DataTable.Pagination
      />
    </DataTable>
)};

export default DataTableComponent;