import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from '../store';
import { fetchUsers } from '../store/actions/usersActions';

import { AvatarComponent, HighlightField } from '../components/grid';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';


const GridPage: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  // const [gridApi, setGridApi] = useState<GridApi | null>(null);

  const columnDefs: ColDef[] = [
    {
      headerName: 'Name',
      field: 'name',
      width: 450,
      cellRenderer: 'highlightFieldComponent',
      rowDrag: true
    },
    {
      headerName: 'Avatar',
      field: 'name',
      cellRenderer: 'avatarComponent',
      width: 100,
      cellStyle: {
        display: 'flex',
        alignItems: 'center',
      }
    },
    {
      headerName: 'Username',
      field: 'username'
    },
    {
      headerName: 'Email',
      field: 'email'
    },
    {
      headerName: 'Street',
      field: 'address.street'
    },
    {
      headerName: 'Suite',
      field: 'address.suite'
    },
    {
      headerName: 'City',
      field: 'address.city'
    },
    {
      headerName: 'Zipcode',
      field: 'address.zipcode'
    },
  ];

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  const onGridReady = ({ api }: GridReadyEvent) => {
    // setGridApi(api);
    dispatch(fetchUsers.request());
    api.sizeColumnsToFit();
  };

  return (
    <div
      className="ag-theme-alpine-dark"
      style={{ height: '500px' }}
    >
      <AgGridReact
        rowData={users}
        immutableData={true}
        getRowNodeId={(data) => data.id}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        frameworkComponents={{
          avatarComponent: AvatarComponent,
          highlightFieldComponent: HighlightField
        }}
        onGridReady={onGridReady}
        rowDragManaged={true}
        animateRows={true}
      />
    </div>
  );
};

export default GridPage;