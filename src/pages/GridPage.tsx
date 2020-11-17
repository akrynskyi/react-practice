import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  CellValueChangedEvent,
  ColDef,
  ColGroupDef,
  GridApi,
  GridReadyEvent,
  ITextFilterParams
} from 'ag-grid-community';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from '../store';
import { deleteManyUsers, fetchUsers } from '../store/actions/usersActions';
import { Box, Button, ButtonGroup, TextField } from '@material-ui/core';

import { AvatarComponent, MenuComponent } from '../components/grid';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

const GridPage: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const [selected, setSelected] = useState(false);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);

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
          filterParams: {
            filterOptions: ['contains', 'notContains'],
            suppressAndOrCondition: true
          } as ITextFilterParams
        },
        {
          flex: 1,
          headerName: 'Email',
          field: 'email',
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
        },
        {
          flex: 1,
          headerName: 'Street',
          field: 'address.street',
        },
        {
          flex: 1,
          headerName: 'Suite',
          field: 'address.suite',
          columnGroupShow: 'open',
        },
        {
          flex: 1,
          headerName: 'Zipcode',
          field: 'address.zipcode',
          columnGroupShow: 'open',
          suppressMovable: true
        },
      ]
    } as ColGroupDef,
  ];

  const defaultColDef = {
    sortable: true,
    resizable: true,
    editable: true,
  };

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
        deltaRowDataMode={true}
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
        floatingFilter={true}
      />
    </div>
  );
};

export default GridPage;