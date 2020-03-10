import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { isSameMonth, isSameDay, getDate } from 'date-fns';

import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = (theme: Theme) => createStyles({
  dayCell: {
    display: 'flex',
    flex: '1 0 13%',
    flexDirection: 'column',
    border: '1px solid lightgray',
    cursor: 'pointer'
  },
  dayCellOutsideMonth: {
    display: 'flex',
    flex: '1 0 13%',
    flexDirection: 'column',
    border: '1px solid lightgray',
    backgroundColor: 'rgba( 211, 211, 211, 0.4 )',
    cursor: 'pointer'
  },
  dateNumber: {
    margin: 5,
    height: '28px',
    width: '28px',
    fontSize: '0.85rem',
    color: '#000',
    backgroundColor: 'transparent'
  },
  todayAvatar: {
    margin: 5,
    height: '28px',
    width: '28px',
    fontSize: '0.85rem',
    color: '#fff',
    backgroundColor: deepPurple[400],
  },
  focusedAvatar: {
    margin: 5,
    height: '28px',
    width: '28px',
    fontSize: '0.85rem',
    color: '#000',
    backgroundColor: '#f1f1f1',
  },
  focusedTodayAvatar: {
    margin: 5,
    height: '28px',
    width: '28px',
    fontSize: '0.85rem',
    color: '#fff',
    backgroundColor: deepPurple[800],
  },
  remindersContainer: {
    height: '100%'
  },
  reminder: {
    width: '100%',
    padding: 0
  }
});

interface DateObj {
  date: Date
}

interface Props extends WithStyles<typeof styles>{
  calendarDate: Date,
  dateObj: DateObj,
  onDayClick: (dateObj: DateObj) => void,
  reminders: Array<any>
}

const CalendarDay = (props: Props) => {
  const { classes, dateObj, calendarDate, onDayClick, reminders } = props;
  const [ focused, setFocused ] = useState(false)

  const isToday = isSameDay( dateObj.date, new Date() );
  const avatarClass = isToday && focused ? classes.focusedTodayAvatar :
    isToday ? classes.todayAvatar :
    focused ? classes.focusedAvatar :
    classes.dateNumber;

  const onMouseOver = () => setFocused(true)
  const onMouseOut = () => setFocused(false)

  const todaysReminders = reminders.filter(
      rem => isSameMonth(rem.time, dateObj.date)
          && isSameDay(rem.time, dateObj.date)
  ).sort((first, second) => first.time < second.time ? -1 : 1);

  return (
    <div
      onMouseOver={ onMouseOver }
      onMouseOut={ onMouseOut }
      onClick={ () => onDayClick( dateObj ) }
      className={
        isSameMonth( dateObj.date, calendarDate )
          ? classes.dayCell
          : classes.dayCellOutsideMonth
      }
    >
      <Avatar className={ avatarClass }>{ getDate( dateObj.date ) }</Avatar>
      <div className={ classes.remindersContainer }>
        <List>
          {
              todaysReminders.map(({title, time, color}, i) => (
                  i < 3 ? (
                      <ListItem key={i} className={classes.reminder}>
                        <ListItemText
                          style={{backgroundColor: color, marginBottom: '2px', padding: '2.5px'}}>
                          <span style={{color: 'white'}}>
                            {time.toLocaleTimeString()} - {title}
                          </span>
                        </ListItemText>
                      </ListItem>
                  ) : null
              ))
          }
          { todaysReminders.length >= 3 && <Button color='primary'>More Reminders</Button>}
        </List>
      </div>
    </div>
  )
}

export default withStyles( styles )( CalendarDay );
