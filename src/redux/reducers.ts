import { combineReducers } from 'redux';
import {
  OPEN_AGENDA,
  ADD_REMINDER,
  CLOSE_AGENDA,
  OPEN_ADD_REMINDER,
  CLOSE_ADD_REMINDER
} from './actions';

const initialAgendaState = {
  isOpen: false,
  date: null
}

const initialAddReminderState = {
  isOpen: false
}

function agendaStatus( state = initialAgendaState , action: any ) {
  switch( action.type ) {
    case OPEN_AGENDA:
      return {
        isOpen: true,
        date: action.dateObj.date
      }
    case CLOSE_AGENDA:
      return {
        isOpen: false,
        date: null
      }
    default: return state
  }
}

function addReminderStatus( state = initialAddReminderState, action: any ) {
  switch( action.type ) {
    case OPEN_ADD_REMINDER:
      return {
        isOpen: true
      }
    case CLOSE_ADD_REMINDER:
      return {
        isOpen: false
      }
    default: return state
  }
}

function reminders( state = [], action: any ) {
  switch(action.type) {
      case ADD_REMINDER:
          return [...state, action.reminder]
      default: return state
  }
}

const calendarApp = combineReducers( {
  reminders,
  agendaStatus,
  addReminderStatus,
} )

export default calendarApp;
