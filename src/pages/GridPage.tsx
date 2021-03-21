import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  CellValueChangedEvent,
  ColDef,
  ColGroupDef,
  GridApi,
  GridReadyEvent,
  ITextFilterParams,
  ValueSetterParams,
} from 'ag-grid-community';
import { setIn } from 'immutable';
import { useMount } from 'react-use';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, ButtonGroup, IconButton, TextField, Tooltip } from '@material-ui/core';

import DataService from '../services/DataService';
import { PAGINATION_PAGE_SIZE } from '../constants/grid';
import { AvatarComponent, GridSettings, MenuComponent } from '../components/grid';
import { autosaveSelector, isUsersToUpdateExistsSelector, selectUsers } from '../store';
import { deleteManyUsers, fetchUsers, updateManyUsers, updateUser } from '../store/actions/usersActions';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

const dataService = new DataService();

const frameworkComponentsMap = {
  avatarComponent: AvatarComponent,
  menuComponent: MenuComponent
};

const GridPage: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const autosave = useSelector(autosaveSelector);
  const isUsersToUpdateExists = useSelector(isUsersToUpdateExistsSelector);

  const [pageSize, setPageSize] = useState(PAGINATION_PAGE_SIZE);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [settingsVisible, setSettingsVisible] = useState(true);
  const [quickSearchVisible, setQuickSearchVisible] = useState(false);
  const [isMultiRowsSelected, setIsMultiRowsSelected] = useState(false);

  const saveRowDataChanges = () => dispatch(updateManyUsers.request());
  const toggleSettingsVisible = () => setSettingsVisible((visible) => !visible);
  const toggleQuickSearchVisible = () => setQuickSearchVisible((visible) => !visible);

  const setValue2 = (field: string) => ({ data, newValue }: ValueSetterParams) => {
    const keys = field.split('.');
    const newData = setIn(data, keys, newValue);
    dispatch(updateUser.request(newData));
  };

  const setValue = (field: string) => ({ data, newValue }: ValueSetterParams) => {
    const keys = field.split('.');
    const lastKey = keys.length - 1;

    const clonedData = JSON.parse(JSON.stringify(data));

    keys.reduce((obj, key) => {
      if (key === keys[lastKey]) {
        obj[key] = newValue;
        dispatch(updateUser.request(clonedData));
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
          field: 'name',
          headerName: 'Name',
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

  const defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    editable: true,
    floatingFilter: true,
    checkboxSelection: ({ columnApi, column }) => {
      const displayedColumns = columnApi.getAllDisplayedColumns();
      return displayedColumns[0] === column;
    }
  };

  useMount(() => {
    dataService.fetchAllUsers().subscribe(x => console.log(x));
    // dataService.fetchMockData<User[]>().subscribe((x) => {
    //   x.forEach((u) => dataService.addUser(u).subscribe())
    // })
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

  const onSelectionChanged = () => {
    if (!gridApi) return;
    const selectedRows = gridApi.getSelectedRows();

    if (selectedRows.length > 1) {
      setIsMultiRowsSelected(true);
    } else {
      setIsMultiRowsSelected(false);
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
      style={{ height: '700px' }}
    >
      {
        quickSearchVisible && (
          <Box paddingBottom={10}>
            <TextField
              fullWidth
              size="small"
              color="primary"
              variant="outlined"
              label="Quick search"
              onChange={handleSearchField}
            />
          </Box>
        )
      }
      <AgGridReact
        rowData={users}
        animateRows={true}
        pagination={true}
        paginationPageSize={PAGINATION_PAGE_SIZE}
        immutableData={true}
        columnDefs={columnDefs}
        rowSelection="multiple"
        onGridReady={onGridReady}
        defaultColDef={defaultColDef}
        getRowNodeId={(data) => data.id}
        onSelectionChanged={onSelectionChanged}
        onCellValueChanged={onCellValueChanged}
        frameworkComponents={frameworkComponentsMap}
        suppressRowClickSelection={true}
      />
      <Box
        py={5}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex">
          <Box mr={8}>
            <IconButton
              size="medium"
              onClick={toggleSettingsVisible}
            >
              <span className="material-icons">settings</span>
            </IconButton>
          </Box>
          <Box mr={8}>
            <Tooltip
              arrow
              placement="right"
              open={isUsersToUpdateExists}
              title="Don't forget to save your changes"
            >
              <IconButton
                size="medium"
                disabled={autosave || !isUsersToUpdateExists}
                onClick={saveRowDataChanges}
              >
                <span className="material-icons">save</span>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        {
          isMultiRowsSelected && (
            <Box>
              <ButtonGroup>
                <Button
                  onClick={deleteSelectedRows}
                >
                  Delete selected
                </Button>
                <Button>
                  Highlight selected
                </Button>
              </ButtonGroup>
            </Box>
          )
        }
      </Box>
      {
        settingsVisible && (
        <GridSettings
          gridApi={gridApi}
          pageSize={pageSize}
          setPageSize={setPageSize}
          quickSearchPanelVisible={quickSearchVisible}
          toggleQuickSearchPanel={toggleQuickSearchVisible}
        />)
      }
    </div>
  );
};

export default GridPage;