import * as React from 'react';
import { DataTable, IconButton, Colors, Text, Checkbox } from 'react-native-paper';

const DETAIL = "DETAIL";
const EDIT = "EDIT";
const itemsPerPage = 5;

const DataTableComponent = (props) => {
  const [page, setPage] = React.useState(0);
  const [numbers, setNumbers] = React.useState([]);
  const [checked, setChecked] = React.useState(false);

  const from = page * itemsPerPage;
  const to = (page  + 1) * itemsPerPage;

  React.useEffect(() => {
    setNumbers(props.numerPhones);
    const indexOfLastNumber = (page + 1 ) * itemsPerPage;
    const indexOfFirstNumber = indexOfLastNumber - itemsPerPage;
    const currentNumbers = props.numerPhones.slice(indexOfFirstNumber, indexOfLastNumber);
    setNumbers(currentNumbers)
        
  }, [props.numerPhones])

  const onDelete = (id) => {
    props.onDeleteParent(id);
  }
  React.useEffect(() => {
  }, [props.isDelete])

  const onPressDetailById = (num) => {
    props.onEdit(num, DETAIL);
  }
  const onPressEditById = (num) => {
    props.onEdit(num, EDIT);
  }


  const { numerPhones } = props;
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title style ={{
          // backgroundColor:'red',
          marginTop:-5,
          justifyContent:'center',
          marginLeft:2
        }}> 
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
        </DataTable.Title>
        <DataTable.Title>No.</DataTable.Title>
        <DataTable.Title >Number</DataTable.Title>
        <DataTable.Title >Status</DataTable.Title>
        <DataTable.Title >Action</DataTable.Title>

      </DataTable.Header>
      {
        numbers.length > 0 &&
        numbers.map((num, index) =>
        (<DataTable.Row key={index + 3} style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginLeft:20,
          // backgroundColor:"red"
        }}
          onPress={() => onPressDetailById(num)}
        >
          <DataTable.Cell>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
          </DataTable.Cell>
          <DataTable.Cell>{num.id}</DataTable.Cell>
          <DataTable.Cell numeric>{num.number.substring(0, 6) + '...'}</DataTable.Cell>
          <DataTable.Cell 
            style = {{
              marginLeft:25,
              // backgroundColor:"red",
              justifyContent:'center',
              flexDirection:'row'
            }}
          >
            <Text style = {{
              fontFamily:'sans-serif',
              fontSize:13,
              fontWeight:"bold",
              color: num.isStatus ? "#767b80" : "#318fec"
            }}> {num.isStatus ? "Paid" : "Buy"}</Text>
          </DataTable.Cell>
          <DataTable.Cell style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            position: 'relative',
            top: 0,
            left: 20,

          }}></DataTable.Cell>
          <DataTable.Cell >
            <IconButton
              icon="account-edit-outline"
              color={Colors.orange700}
              size={15}
              onPress={() => onPressEditById(num)}
            />
            <IconButton
              icon="delete"
              color={Colors.red400}
              size={15}
              onPress={() => onDelete(num.id)}
            />
          </DataTable.Cell>
        </DataTable.Row>))
      }
     <DataTable.Pagination
        page={page}
        numberOfPages={Math.floor(props.numerPhones.length / itemsPerPage) + 1}
        onPageChange={page =>{
        const indexOfLastNumber = (page + 1 ) * itemsPerPage;
        const indexOfFirstNumber = indexOfLastNumber - itemsPerPage;
        const currentNumbers = props.numerPhones.slice(indexOfFirstNumber, indexOfLastNumber);
        setPage(page);
        setNumbers(currentNumbers)
        }}
        label={`${from + 1}-${to} of ${props.numerPhones.length}`}
      />
    </DataTable>
  )
};

export default DataTableComponent;