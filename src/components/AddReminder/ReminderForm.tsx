// Add reminder form components

import React, { useState } from 'react';

import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';

import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';

import {
    MuiPickersUtilsProvider,
    DateTimePicker
} from 'material-ui-pickers';

const styles = (theme: Theme) => createStyles({
  formInput: {
    width: '50%',
  },
  colorInput: {
    width: '10%'
  },
  submitButton: {
    padding: '1.25em',
    alignItems: 'flex-end'
  }
});

interface Props extends WithStyles<typeof styles> {
    onClose: () => void
}

const ReminderForm = (props: Props) => {
    const { onClose, classes } = props;

    const [error, setError] = useState([]);

    const [title, setTitle] = useState("");
    const [color, setColor] = useState("#2196f3");

    // Initialize to current date and time
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    // Validation
    // - start < end
    // - title <= 30 characters
    // - all fields present

    const validateForm = ({ title, start, end, color }) => {

        return [];
    };

    const _handleSubmit = e => {
        e.preventDefault();
        setError(validateForm({ title, start, end, color }));

        onClose();
    };

    return (
        <>
          <FormControl className={classes.formInput}>
            <InputLabel htmlFor='reminder-title'>Title or Event</InputLabel>
            <Input
              id='reminder-title'
              name='reminder-title'
              type='text'
              value={title}
              fullWidth={false}
              autoFocus={true}
              onChange={ ({ target }) => setTitle(target.value) }
              aria-describedby="Reminder Title" />
          </FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <FormControl required={true} className={classes.formInput}>
              <DateTimePicker
                id='reminder-start-date'
                name='reminder-start-date'
                value={start}
                emptyLabel='Reminder Start'
                onChange={ time => setStart(time) } />
            </FormControl>
            <FormControl required={true} className={classes.formInput}>
              <DateTimePicker
                id='reminder-end-date'
                name='reminder-end-date'
                value={end}
                emptyLabel='Reminder End'
                onChange={ time => setEnd(time) } />
            </FormControl>
          </MuiPickersUtilsProvider>
          <FormControl>
            <input id='reminder-color'
                   name='reminder-color'
                   type='color'
                   value={color}
                   onChange={ ({ target }) => setColor(target.value) }
                   aria-describedby="Reminder Color" />
          </FormControl>
          <FormControl className={classes.submitButton}>
            <Button
              type='submit'
              color='primary'
              onClick={_handleSubmit}>Add Reminder</Button>
          </FormControl>
        </>
     );
}

export default withStyles(styles)(ReminderForm);
