import * as React from 'react';
import { DataTable, IconButton, Colors, Button, List, Checkbox, Provider, Portal, Dialog, Paragraph } from 'react-native-paper';
import DialogComponent from './../components/dialog';
import { View } from 'react-native';

const DataTableComponent = (props) => 
  {
    
    
    const [page, setPage] = React.useState(0);
    const [checked, setChecked] = React.useState(false);

    const from = page * itemsPerPage;
    const to = (page + 1) * itemsPerPage;
    const itemsPerPage = 3;
    // const numberOfPages=Math.floor(numerPhones.length / itemsPerPage)

    const {  numerPhones, numerPhonesPagination } = props;
    const [visible, setVisible] = React.useState(false);
    console.log('props', props);
    const onDelete = (id) => {
      console.log('props', props);
      props.onDeleteParent(id);
      // console.log('delete', id)
    } 
    React.useEffect(() => {
      console.log('useEffect');
      setVisible(props.isDelete);
    }, [ props.isDelete])

    const yeslAlert = () => {
      console.log('yeslAlert')
      setVisible(false);
      props.checkYesNo(true);
      // setYes(true);
    }
    const cancelAlert = () => {
      console.log('cancelAlert')
      checkYesNo(false);
      props.setVisible(false);
      // setYes(false);
    } 
    return (
    <DataTable>
      <DataTable.Header  >
       {/* <DataTable.Title style = {{
         marginTop:5
       }} >
        <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
       </DataTable.Title> */}
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
            {/* <DataTable.Cell>
              <Checkbox
                testID = {num.id}
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
            />
            </DataTable.Cell> */}
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
                // flexDirection:'row', 
                // justifyContent:'flex-start',
                // backgroundColor:'red',
                // position:'relative',
                // top:0,
                // right:20,
                
            }}>
              <IconButton
                  icon="shield-edit"
                  color={Colors.red500}
                  size={15}
                  onPress={() => console.log('Pressed')}
                />
                <IconButton
                  icon="remote"
                  color={Colors.red500}
                  size={15}
                  onPress={() => console.log('Pressed')}
                />
                <IconButton
                  icon="window-open"
                  color={Colors.red500}
                  size={15}
                  onPress={ () => onDelete(num.id)}
                />
            </DataTable.Cell>
          </DataTable.Row>))
      }
      <DataTable.Pagination
        // page={page}
        // numberOfPages={props.numberOfPages}
        // onPageChange= {props.onPageChange}
        // label={`${from + 1}-${to} of ${numerPhones.length}`}
        // numerPhones = {props.numerPhones}
        // onPageChange = {props.onPageChange}
        // numberOfPages = {props.numberOfPages}
        // label = {props.label}
        // page = {props.page}
        
      />
     {/* <Provider>
          <View>
            <Portal>
              <Dialog visible={visible} onDismiss={yeslAlert}>
                <Dialog.Title>Alert</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>Are you want delete this item ? </Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={yeslAlert}>Yes</Button>
                  <Button onPress={cancelAlert}>No</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
      </Provider> */}
    </DataTable>
)};

export default DataTableComponent;