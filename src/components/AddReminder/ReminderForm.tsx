// Add reminder form components

import React, { useState } from 'react';

import List from '@material-ui/core/List';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/List';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import EventIcon from '@material-ui/icons/Event';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';

import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';

import {
    MuiPickersUtilsProvider,
    DateTimePicker
} from 'material-ui-pickers';

const styles = (theme: Theme) => createStyles({
  error: {
    color: '#f44336',
    fontWeight: 500
  },
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

const fieldPresent = (field, value) =>
      !!value || `${field} required.`;

const titleLength = title =>
      title.length <= 30 || "Title length must be 30 characters or fewer.";

const ReminderForm = (props: Props) => {
    const { onClose, classes } = props;

    const [errors, setErrors] = useState([]);

    const [title, setTitle] = useState("");
    const [color, setColor] = useState("#2196f3");

    // Initialize to current date and time
    const [time, setTime] = useState(null);
    const [end, setEnd] = useState(null);

    // Validation
    // - title <= 30 characters
    // - all fields present

    const validateForm = ({title, time, color}) => {
        const errors = [
            fieldPresent('Reminder Title', title),
            fieldPresent('Reminder Time', time),
            fieldPresent('Color', color),

            titleLength(title)
        ];

        // Keep only error messages (filter passing tests)
        return errors.filter(failed => failed !== true);
    };

    const _handleSubmit = e => {
        e.preventDefault();
        const errors = validateForm({ title, time, color });

        setErrors(errors);

        if (!errors.length) {
            // Call redux action to add reminder
            // Close modal
            onClose();
        }
    };

    return (
        <>
          <List>
            {
                errors.map((error, i) => (
                    <ListItem key={i} className={classes.error}>{ error }</ListItem>
                ))
            }
          </List>
          <FormControl className={classes.formInput} required={true}>
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
            <FormControl className={classes.formInput}>
              <DateTimePicker
                id='reminder-date'
                name='reminder-date'
                value={time}
                emptyLabel='Reminder Date/Time'
                onChange={ time => setTime(time) } />
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
