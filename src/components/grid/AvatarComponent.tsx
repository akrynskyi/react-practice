import React from 'react';
import { Avatar } from '@material-ui/core';
import { ICellRendererParams } from 'ag-grid-community';

const AvatarRenderer = ({ value }: ICellRendererParams) => {
  return (
    <Avatar
      style={{
        width: 25,
        height: 25,
        fontSize: 12,
      }}
    >
      {value.charAt(0).toUpperCase()}
    </Avatar>
  );
};

export default AvatarRenderer;