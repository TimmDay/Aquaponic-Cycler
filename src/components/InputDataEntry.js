import React from 'react';
import { connect } from 'react-redux';
import {  startAddEntry } from '../actions/aquaponic';

class InputDataEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      colors: ['#4286f4', '#2ba85f', '#a564e5', '#f23551'],
      error: ''
    };
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

  handleOnInputChange = evt => {
    evt.preventDefault();
    const value = evt.target.value;
    
    if (this.props.selected === 'pH') { 
      const regex = /^(1[0-3](\.\d{0,1})?)$|^\d?(\.\d{0,1})?$|^14$/; // 1 -> 14 with opt .0
      if (!value || value.match(regex)) {
          console.log(`ph: ${value}`);
          this.setState(() => ({ input: value, error: '' }));
        } else {
          this.setState(() => ({ error: `${this.props.selected} range is 1 -> 14` }));
        }
        
    } else if (this.props.selected === 'nitrate') { //0 -> 200 with opt .0
      const regex = /^1?\d?\d?(\.\d{0,1})?$|^200$/;
      if (!value || value.match(regex)) {
        console.log(`nitrate: ${value}`);
        this.setState(() => ({ input: value, error: '' }));
      } else {
        this.setState(() => ({ error: 'nitrate should be in the range 0 -> 120 ppm' }));
      }

    } else {
      const regex = /^10(\.0?)?$|^\d(\.\d{0,2})?$/; //ammonia or nitrite, 0 -> 10, with opt .00
      if (!value || value.match(regex)) {
        console.log(`amm/nitrite: ${value}`);
        this.setState(() => ({ input: value, error: '' }));
      } else {
        this.setState(() => ({ error: `${this.props.selected} should be in the range 0 -> 10 ppm, with up to 2 decimal places` }));
      }
    }
  }
  
  onSubmit = evt => {
    evt.preventDefault();
    const input = document.querySelector('.aquaponic__input');
    let val = input.value;
    if (val.endsWith('.')) val = val += '0'; // if entry ends in decimal, concat a 0
    const obj = {value: val, name: this.props.selected, date: new Date().toString()};
    this.props.startAddEntry(obj)
    this.setState(() => ({ input: '', error: '' }));
  };

  render() {
    return (
      <div className="content-container flex-container">
        <form
          className="aquaponic__form"
          onSubmit={this.onSubmit}
          autoComplete="off"
        >
          {this.props.selected !== 'view all' && (
            <p>
              {' '}
              How much{' '}
              <span style={{ color: this.chooseColor(this.props.selected) }}>
                {this.props.selected}
              </span>{' '}
              today?
            </p>
          )}

          {this.props.selected !== 'view all' && (
            <input
              autoFocus
              className="aquaponic__input"
              id="pH"
              onChange={this.handleOnInputChange}
              style={{
                borderBottom:
                  '1px solid ' + this.chooseColor(this.props.selected)
              }}
              type="text"
              value={this.state.input}
            />
          )}
          {this.state.error && (
            <p className="aquaponic__error-msg">{this.state.error}</p>
          )}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddEntry: entry => dispatch(startAddEntry(entry)),
});

export default connect(undefined, mapDispatchToProps)(InputDataEntry);