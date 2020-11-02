import React, { useState, useEffect } from 'react';
import { 
  CssBaseline, 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Button, 
  TextField,
  Collapse, 
  IconButton, 
  Tooltip,
  Fade
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { NotesList } from './components/NotesList';
import { useDispatch } from 'react-redux';
import { fetchNotes } from './store/actions/notesActions';

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    paper: {
      padding: '10px',
    },
    heading: {
      marginBottom: '10px',
    },
    text: {
      padding: theme.spacing(8, 8, 0),
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

function App() {
  const cls = useStyles();
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  
  const expandedToggle = () => setExpanded((state) => !state);

  useEffect(() => {
    dispatch(fetchNotes());
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Box my={10}>
          <Paper>

            <Typography 
              gutterBottom
              className={cls.text}
            >
              Your notes
            </Typography>

            <NotesList />
            
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

          </Paper>
        </Box>
      </Container>
    </>
  );
}

export default App;
