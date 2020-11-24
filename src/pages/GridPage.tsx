import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  CellValueChangedEvent,
  ColDef,
  ColGroupDef,
  GridApi,
  GridReadyEvent,
  ITextFilterParams,
  ValueSetterParams
} from 'ag-grid-community';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from '../store';
import { deleteManyUsers, fetchUsers, updateUser } from '../store/actions/usersActions';
import { Box, Button, ButtonGroup, TextField } from '@material-ui/core';
import { setIn } from 'immutable';
import { useMount } from 'react-use';

import { AvatarComponent, MenuComponent } from '../components/grid';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import DataService from '../services/DataService';

const dataService = new DataService();

const GridPage: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const [selected, setSelected] = useState(false);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  const setValue2 = (field: string) => ({ data, newValue }: ValueSetterParams) => {
    const keys = field.split('.');
    const newData = setIn(data, keys, newValue);
    dispatch(updateUser(newData));
  };

  const setValue = (field: string) => ({ data, newValue }: ValueSetterParams) => {
    const keys = field.split('.');
    const lastKey = keys.length - 1;

    const clonedData = JSON.parse(JSON.stringify(data));

    keys.reduce((obj, key) => {
      if (key === keys[lastKey]) {
        obj[key] = newValue;
        dispatch(updateUser(clonedData));
      }

      return obj[key];
    }, clonedData);
  };

  const columnDefs: ColDef[] = [
    {
      headerName: 'Personal info',
      marryChildren: true,
      children: [
        {
          flex: 2,
          // width: 400,
          field: 'name',
          rowDrag: true,
          headerName: 'Name',
          checkboxSelection: true,
          cellRenderer: 'menuComponent',
          filter: 'agTextColumnFilter',
          valueSetter: setValue('name')
        },
        {
          flex: 1,
          maxWidth: 80,
          field: 'name',
          headerName: 'Avatar',
          headerTooltip: 'Avatar',
          cellRenderer: 'avatarComponent',
          cellStyle: {
            display: 'flex',
            alignItems: 'center',
          }
        },
        {
          flex: 1,
          headerName: 'Username',
          field: 'username',
          filter: 'agTextColumnFilter',
          valueSetter: setValue('username'),
          filterParams: {
            filterOptions: ['contains', 'notContains'],
            suppressAndOrCondition: true
          } as ITextFilterParams
        },
        {
          flex: 1,
          headerName: 'Email',
          field: 'email',
          valueSetter: setValue('email')
        },
      ]
    } as ColGroupDef,
    {
      headerName: 'Address',
      marryChildren: true,
      children: [
        {
          flex: 1,
          headerName: 'City',
          field: 'address.city',
          valueSetter: setValue2('address.city')
        },
        {
          flex: 1,
          headerName: 'Street',
          field: 'address.street',
          valueSetter: setValue('address.street')
        },
        {
          flex: 1,
          headerName: 'Suite',
          field: 'address.suite',
          columnGroupShow: 'open',
          valueSetter: setValue('address.suite')
        },
        {
          flex: 1,
          headerName: 'Zipcode',
          field: 'address.zipcode',
          columnGroupShow: 'open',
          suppressMovable: true,
          valueSetter: setValue('address.zipcode')
        },
      ]
    } as ColGroupDef,
    {
      headerName: 'Geo',
      marryChildren: true,
      children: [
        {
          flex: 1,
          headerName: 'lat',
          field: 'address.geo.lat',
          valueSetter: setValue2('address.geo.lat'),
        },
        {
          flex: 1,
          headerName: 'lng',
          field: 'address.geo.lng',
          valueSetter: setValue2('address.geo.lng'),
        },
      ]
    } as ColGroupDef,
  ];

  const defaultColDef = {
    sortable: true,
    resizable: true,
    editable: true,
    floatingFilter: true,
  };

  useMount(() => {
    dataService.fetchAllUsers().subscribe(x => console.log(x));
  });

  const onGridReady = ({ api, columnApi }: GridReadyEvent) => {
    setGridApi(api);
    dispatch(fetchUsers.request());
    // api.sizeColumnsToFit();
    // columnApi.autoSizeAllColumns();
  };

  const onCellValueChanged = (e: CellValueChangedEvent) => {
    console.log('data after changes is: ', e.data);
  };

  const onSelection = () => {
    if (!gridApi) return;
    const selectedRows = gridApi.getSelectedRows();

    if (selectedRows.length > 1) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  };

  const deleteSelectedRows = () => {
    if (!gridApi) return;
    const ids = gridApi.getSelectedRows().map((row) => row.id);
    dispatch(deleteManyUsers(ids));
  };

  const handleSearchField = (
    { target }: React.ChangeEvent<HTMLInputElement>) => {
    gridApi?.setQuickFilter(target.value);
  };

  return (
    <div
      className="ag-theme-alpine-dark"
      style={{ height: '600px' }}
    >
      <Box paddingBottom={10}>
        <TextField
          fullWidth
          size="small"
          label="Quick search"
          color="primary"
          variant="outlined"
          onChange={handleSearchField}
        />
      </Box>
      {
        selected && (
          <Box paddingBottom={10}>
            <ButtonGroup>
              <Button
                onClick={deleteSelectedRows}
              >Delete</Button>
              <Button>Highlight</Button>
            </ButtonGroup>
          </Box>
        )
      }
      <AgGridReact
        rowData={users}
        immutableData={true}
        getRowNodeId={(data) => data.id}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        frameworkComponents={{
          avatarComponent: AvatarComponent,
          menuComponent: MenuComponent
        }}
        onGridReady={onGridReady}
        onSelectionChanged={onSelection}
        onCellValueChanged={onCellValueChanged}
        rowDragManaged={true}
        animateRows={true}
        rowSelection="multiple"
      />
    </div>
  );
};

export default GridPage;