import React, { useState } from 'react';
import { Box, Button, Collapse, Fade, IconButton, Paper, TextField, Tooltip, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: '10px',
    },
    heading: {
      marginBottom: '10px',
    },
    box: {
      padding: theme.spacing(0, 8, 8),
      display: 'flex',
      justifyContent: 'flex-end',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  })
);

export const CreateNote: React.FC = () => {
  const cls = useStyles();
  const [expanded, setExpanded] = useState(false);
  const expandedToggle = () => setExpanded((state) => !state);

  return (
    <>
      <Box className={cls.box}>
        <Tooltip
          placement="top"
          title="Create new note"
          TransitionComponent={Fade}
        >
          <IconButton
            size="small"
            onClick={expandedToggle}
            className={`${cls.expand} ${expanded ? cls.expandOpen : null}`}
          >
            <span className="material-icons">expand_more</span>
          </IconButton>
        </Tooltip>
      </Box>
      <Collapse
        timeout="auto"
        unmountOnExit
        in={expanded}
      >
        <Paper
          className={cls.paper}
          component="form"
        >
          <Typography className={cls.heading}>
            Create new note
          </Typography>
          <TextField
            fullWidth
            label="Title"
            margin="dense"
            variant="outlined"
          />
          <TextField
            rows={4}
            fullWidth
            multiline
            label="Note"
            margin="normal"
            variant="outlined"
          />
          <Button>
            Create
          </Button>
        </Paper>
      </Collapse>
    </>
  );
};

