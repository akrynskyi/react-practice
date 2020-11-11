import React from 'react';
import { Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: theme.spacing(8, 8, 0),
    },
  })
);

export const PageTitle: React.FC = ({children}) => {
  const cls = useStyles();

  return (
    <Typography
      gutterBottom
      className={cls.title}
    >
      {children}
    </Typography>
  );
};