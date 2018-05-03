import { ADD_REMINDER, DELETE_REMINDER,  CLEAR_REMINDER } from '../constants';
import { bake_cookie, read_cookie } from 'sfcookies';

const reminder = (action) => {
  let {text, dueDate} = action;
  return {
    id: Math.random(),
    text,
    dueDate
  }
}

const removeByID = (state = [], id) => {
  const reminders = state.filter(reminder => reminder.id != id);
  return reminders;
}

const reminders = (state = [], action) => {
  let reminders = null;
  state = read_cookie('reminders', reminders);
  switch(action.type) {
    case ADD_REMINDER:
      reminders = [...state, reminder(action)];
      console.log('reminder as state', reminders);
      bake_cookie('reminders', reminders);
      return reminders;
    case DELETE_REMINDER:
      reminders = removeByID(state, action.id);
      bake_cookie('reminders', reminders);
      return reminders;
    case CLEAR_REMINDER:
      // bake_cookie('reminders', reminders);
      reminders = [];
      bake_cookie('reminders', reminders);
      return reminders;
    default:
      return state;
  }
}

export default reminders;