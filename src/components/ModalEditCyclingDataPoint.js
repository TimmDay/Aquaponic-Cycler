import React from 'react';
import { connect } from 'react-redux';
import { SingleDatePicker } from 'react-dates'; // requires moment
import moment from 'moment';
import Modal from 'react-modal';
import { handleToggleModalEditCycle } from './../actions/ux';
import { startEditEntry } from './../actions/aquaponic';

class ModalEditCyclingDataPoint extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        name: '', 
        date: '', 
        value: ''
      }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isModalOpenEditCycle && !prevProps.isModalOpenEditCycle) {      
      this.handlePreFillModalInputsOnOpen();
    }
  }
  handlePreFillModalInputsOnOpen = () => {
    this.setState(() => ({
      name: this.props.selectedNode.name === null ? '' : this.props.selectedNode.name, 
      date: this.props.selectedNode.date === null ? '' : this.props.selectedNode.date, 
      value: this.props.selectedNode.value === null ? '' : this.props.selectedNode.value,
      error: ''
    }));
  };

  handleOnClickReset = () => {
    this.setState({ name: '', date: '', value: '' });
    this.handlePreFillModalInputsOnOpen();
  }

  handleOnRequestClose = () => {
      this.handleOnClickReset();
      this.props.handleToggleModalEditCycle();
  };

  handleOnNameChange = (evt) => {
    evt.preventDefault();
    const name = evt.target.value;
    this.setState(() => ({name: name}))
};

  handleOnValueChange = (evt) => {
      evt.preventDefault();
      const value = evt.target.value;
      this.setState(() => ({value: value}))
  };

  onSubmitChanges = () => {
    const obj = {
      id: this.props.selectedNode.id,
      name: this.state.name,
      value: this.state.value,
      date: (typeof this.state.date === 'string') ? this.state.date : new Date(this.state.date).toString() //make sure that string
    };
    this.props.startEditEntry(obj);
    this.props.handleToggleModalEditCycle();
  }

  stampToMoment = (dateString) => {
    if (dateString) {
      console.log(new Date(dateString).getTime());
      const timeStampFromString = new Date(dateString).getTime();
      console.log(moment(timeStampFromString));
      
      return moment(timeStampFromString);
    }
  }
  momentToStamp = (mom) => {
    if (mom) {
      console.log(mom.valueOf());
      const newTimeStamp = mom.valueOf();
      return new Date(newTimeStamp)
    }
  }
    
  
  onDateChange = (pickerGenMoment) => {
    if (pickerGenMoment) { //prevents user clearing the value
        // because if date is cleared, this func gets called with nothing
        // (we don't want to update this part of state to nothing)
        const dateString = this.momentToStamp(pickerGenMoment);
        console.log(pickerGenMoment);
        console.log(dateString);

        this.setState(() => ({ date: dateString }));
    }
};
  onFocusChange = ({ focused }) => {
    this.setState(()=> ({ calendarFocused: focused }));
  };

  render () {
    return (
      <Modal
          isOpen= {this.props.isModalOpenEditCycle}
          contentLabel="Selected Option"
          onRequestClose={this.props.handleToggleModalEditCycle}
          closeTimeoutMS={200}
          className="modal"
          ariaHideApp={false}
      >
          <form
            className="modal__form"
            onSubmit={this.onSubmit}
          >
            {this.state.error && <p className="form__error">{this.state.error}</p>}

            <select
            className="modal__styled-select"
              value={this.state.name}
              onChange={this.handleOnNameChange}
            >
              <option>pH</option>
              <option>ammonia</option>
              <option>nitrite</option>
              <option>nitrate</option>
            </select>

            <SingleDatePicker
              date={this.stampToMoment(this.state.date)}
              onDateChange={this.onDateChange}
              focused={this.state.calendarFocused}
              onFocusChange={this.onFocusChange}
              numberOfMonths={1}
              isOutsideRange={() => false} //every day available, past and future
            />

            
            <input
              className="aquaponic__input"
              type="text"
              placeholder={this.props.selectedNode.value}
              value={this.state.value}
              onChange={this.handleOnValueChange}
            />
        </form>

        <div className="form__btn-bar">
            <button
                className="form__btn"
                onClick={this.handleOnRequestClose}
            >close
            </button>

            <button
                className="form__btn"
                onClick={this.handleOnClickReset}
            >reset
            </button>

            <button
                className="form__btn"
                onClick={this.onSubmitChanges}
            >submit changes
            </button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isModalOpenEditCycle: state.uxReducer.isModalOpenEditCycle,
    selectedNode: state.aquaponicReducer.selectedNode
  }
};

const mapDispatchToProps = (dispatch) => ({
  handleToggleModalEditCycle: () => dispatch(handleToggleModalEditCycle()),
  startEditEntry: (obj) => dispatch(startEditEntry(obj))
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditCyclingDataPoint);