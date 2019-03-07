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
        value: '',
        colors: ['#4286f4', '#2ba85f', '#a564e5', '#f23551'],
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
  chooseColor = (filter) => {
    switch (filter) {
      case 'pH':
        return this.state.colors[0];
      case 'ammonia':
        return this.state.colors[1];
      case 'nitrite':
        return this.state.colors[2];
      case 'nitrate':
        return this.state.colors[3];
      default:
        return;
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
            <h2 
              className="modal__form--item"
              style={{ color: '#fff'}}//</form>this.chooseColor(this.props.selectedNode.name)}}
            >Edit Measurement</h2>
            {this.state.error && <p className="form__error">{this.state.error}</p>}

            <select
              className="modal__styled-select"
              style={{ backgroundColor: this.chooseColor(this.props.selectedNode.name)}}
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
              displayFormat="DD MMM YYYY"
            />

            <input
              className="aquaponic__input"
              style={{borderBottom: `${this.chooseColor(this.props.selectedNode.name)} 1px solid`}}
              type="text"
              placeholder={this.props.selectedNode.value}
              value={this.state.value}
              onChange={this.handleOnValueChange}
            />

        </form>

        <div className="modal__btn-bar">
            <button
                className="modal__btn"
                onClick={this.handleOnRequestClose}
                style={{backgroundColor: this.chooseColor(this.props.selectedNode.name)}}
            >close
            </button>

            <button
                className="modal__btn"
                onClick={this.handleOnClickReset}
                style={{backgroundColor: this.chooseColor(this.props.selectedNode.name)}}
            >reset
            </button>

            <button
                className="modal__btn"
                onClick={this.onSubmitChanges}
                style={{backgroundColor: this.chooseColor(this.props.selectedNode.name)}}
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
    selectedNode: state.aquaponicReducer.selectedNode,
    selectedFilter: state.aquaponicReducer.selectedFilter //for dynamic color picking
  }
};

const mapDispatchToProps = (dispatch) => ({
  handleToggleModalEditCycle: () => dispatch(handleToggleModalEditCycle()),
  startEditEntry: (obj) => dispatch(startEditEntry(obj))
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditCyclingDataPoint);