import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import {addReminder} from '../actions';
import {deleteReminder} from '../actions';
import {clearReminder} from '../actions';
import moment from 'moment';
import { bake_cookie } from 'sfcookies';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: '',
      dueDate: ''
    }
    bake_cookie('reminders', []);
  }
  addReminder() {
    this.props.addReminder(this.state.text, this.state.dueDate);
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  renderReminders(){
    const {reminders} = this.props;
    return (
      <ul className="list-group col-sm-4">
        {
          reminders.map(reminder => {
            return (
              <li key={reminder.id} className="list-group-item">
                <div className="list-item">
                  <div>{reminder.text}</div>
                  <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                </div>
                <div 
                  className="list-item delete-button"
                  onClick={() => this.deleteReminder(reminder.id)}
                >
                  &#x2715;
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }

  render() {
    console.log('this props', this.props);
    return(
      <div className="App">
        <div className="title">Reminder pro</div>
        <div className="form-inline">
          <input
            className="form-control"
            placeholder="I have to.."
            onChange={event => this.setState({text: event.target.value})}
          />
          <input
            className="form-control"
            type="datetime-local"
            onChange={event => this.setState({dueDate: event.target.value})}
          />
        </div>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => this.addReminder()}
        >
        Add Reminder
        </button>
        {this.renderReminders()}
        <button
          className="btn btn-warning"
          onClick={() => this.props.clearReminder()}
        >
        Clear Reminder
        </button>

      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('state', state);
  return {
    reminders: state
  }
}

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminder})(App);