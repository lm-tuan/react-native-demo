import * as React from 'react';
import { DataTable, IconButton, Colors, Button, List, Checkbox, Provider, Portal, Dialog, Paragraph } from 'react-native-paper';
import DialogComponent from './../components/dialog';
import { View } from 'react-native';

const DataTableComponent = (props) => 
  {
    
    const [visible, setVisible] = React.useState(false);
    const onDelete = (id) => {
      props.onDeleteParent(id);
    } 
    React.useEffect(() => {
      console.log('useEffect');
      setVisible(props.isDelete);
    }, [ props.isDelete])

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
          }}  >
            
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
            <DataTable.Cell style = { {
            }}>
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
                  onPress={() => console.log('Pressed')}
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