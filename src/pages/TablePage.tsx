import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridReadyEvent, ICellRendererParams } from 'ag-grid-community';
import { Avatar } from '@material-ui/core';
import { HighlightField } from '../components/HighlightField';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
  },
}

const AvatarRenderer = ({ value }: ICellRendererParams) => {
  return (
    <Avatar
      style={{
        width: 25,
        height: 25,
        fontSize: 12,
      }}
    >
      {value.charAt(0)}
    </Avatar>
  );
};

export const TablePage: React.FC = () => {
  const [rowData, setRowData] = useState<User[] | []>([]);

  const columnDefs: ColDef[] = [
    {
      headerName: 'Name',
      field: 'name',
      width: 250,
      cellRenderer: 'highlightFieldComponent',
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
    resizable: true
  };

  const onGridReady = async ({ api }: GridReadyEvent) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users: User[] = await response.json();

    setRowData(users);
    api.sizeColumnsToFit();
  };

  return (
    <div
      className="ag-theme-alpine-dark"
      style={{
        height: '400px'
      }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        frameworkComponents={{
          avatarComponent: AvatarRenderer,
          highlightFieldComponent: HighlightField
        }}
        onGridReady={onGridReady}
      />
    </div>
  );
};