import * as React from 'react';
import { DataTable, IconButton, Colors } from 'react-native-paper';

const DETAIL = "DETAIL";
const EDIT = "EDIT";

const DataTableComponent = (props) => {

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
      <DataTable.Header  >
        <DataTable.Title>No.</DataTable.Title>
        <DataTable.Title >Number</DataTable.Title>
        <DataTable.Title >Status</DataTable.Title>
        <DataTable.Title >Action</DataTable.Title>

      </DataTable.Header>
      {
        numerPhones.length > 0 &&
        numerPhones.map((num, index) =>
        (<DataTable.Row key={num.id} style={{
          flexDirection: 'row',
          justifyContent: 'center'
        }}
          onPress={() => onPressDetailById(num)}
        >
          <DataTable.Cell>{index + 1}</DataTable.Cell>
          <DataTable.Cell numeric>{num.number.substring(0, 6) + '...'}</DataTable.Cell>
          <DataTable.Cell numeric>{num.isStatus ? 0 : 1}</DataTable.Cell>
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
      />
    </DataTable>
  )
};

export default DataTableComponent;