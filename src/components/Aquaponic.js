import React from 'react';
import { connect } from 'react-redux';
import { setSelectedFilter, startAddEntry } from '../actions/aquaponic';
import D3LineGraph from './D3LineGraph';

class Aquaponic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'view all',
      input: '',
      error: ''
    };
  }

  handleOnClick = evt => {
    // update text of form span
    this.setState({ selected: evt.target.innerHTML });

    // remove active btn class from others
    const els = document.querySelectorAll('.aquaponic__btn');
    els.forEach(btn => btn.classList.remove('aquaponic__btn-active'));

    // give this class active
    evt.target.classList.add('aquaponic__btn-active');

    //set id of input field
    const input = document.getElementsByClassName('aquaponic__input')[0];
    if (input) input.setAttribute('id', evt.target.innerHTML);
    if (input) document.getElementsByClassName('aquaponic__input')[0].focus(); //send cursor to input when btn clicked

    this.props.setSelectedFilter(evt.target.innerHTML);

    // hide the non-selected data visualisation (lines)
    const line1 = document.getElementsByClassName('aquaponic__line1')[0];
    const line2 = document.getElementsByClassName('aquaponic__line2')[0];
    const line3 = document.getElementsByClassName('aquaponic__line3')[0];
    const line4 = document.getElementsByClassName('aquaponic__line4')[0];
    const dots1 = document.getElementsByClassName('circle-ph');
    const dots2 = document.getElementsByClassName('circle-amm');
    const dots3 = document.getElementsByClassName('circle-ite');
    const dots4 = document.getElementsByClassName('circle-ate');

    // hide the non-selected graph information
    switch (evt.target.innerHTML) {
      case 'pH':
        line2.style.opacity = 0;
        line3.style.opacity = 0;
        line4.style.opacity = 0;
        for (let dot of dots2) dot.style.opacity = 0;
        for (let dot of dots3) dot.style.opacity = 0;
        for (let dot of dots4) dot.style.opacity = 0;
        break;
      case 'ammonia':
        line1.style.opacity = 0;
        line3.style.opacity = 0;
        line4.style.opacity = 0;
        for (let dot of dots1) dot.style.opacity = 0;
        for (let dot of dots3) dot.style.opacity = 0;
        for (let dot of dots4) dot.style.opacity = 0;
        break;
      case 'nitrite':
        line1.style.opacity = 0;
        line2.style.opacity = 0;
        line4.style.opacity = 0;
        for (let dot of dots1) dot.style.opacity = 0;
        for (let dot of dots2) dot.style.opacity = 0;
        for (let dot of dots4) dot.style.opacity = 0;
        break;
      case 'nitrate':
        line2.style.opacity = 0;
        line3.style.opacity = 0;
        line1.style.opacity = 0;
        for (let dot of dots2) dot.style.opacity = 0;
        for (let dot of dots3) dot.style.opacity = 0;
        for (let dot of dots1) dot.style.opacity = 0;
        break;
        // case all
      default: //view all
        break;
    }
  };

  handleOnInputChange = evt => {
    const value = evt.target.value;
    
    if (this.state.selected === 'pH') { 
      const regex = /^(1[0-3](\.\d{0,1})?)$|^\d?(\.\d{0,1})?$|^14$/; // 1 -> 14 with opt .0
      if (!value || value.match(regex)) {
          console.log(`ph: ${value}`);
          this.setState(() => ({ input: value, error: '' }));
        } else {
          this.setState(() => ({ error: `${this.state.selected} range is 1 -> 14` }));
        }
        
    } else if (this.state.selected === 'nitrate') { //0 -> 200 with opt .0
      const regex = /^1?\d?\d?(\.\d{0,1})?$|^200$/;
      if (!value || value.match(regex)) {
        console.log(`nitrate: ${value}`);
        this.setState(() => ({ input: value, error: '' }));
      } else {
        this.setState(() => ({ error: 'nitrate should be in the range 0 -> 120 ppm' }));
      }

    } else {
      const regex = /^10(\.0?)?$|^\d(\.\d{0,1})?$/; //ammonia or nitrite, 0 -> 10 
      if (!value || value.match(regex)) {
        console.log(`amm/nitrite: ${value}`);
        this.setState(() => ({ input: value, error: '' }));
      } else {
        this.setState(() => ({ error: `${this.state.selected} should be in the range 0 -> 10 ppm` }));
      }
    }
  }
  
  onSubmit = evt => {
    evt.preventDefault();
    const input = document.querySelector('.aquaponic__input');
    let val = input.value;
    if (val.endsWith('.')) val = val += '0'; // if entry ends in decimal, concat a 0
    const obj = {value: val, name: this.state.selected, date: new Date().toString()};
    this.props.startAddEntry(obj)
    this.setState(() => ({ input: '', error: '' }));
  };

  render() {
    return (
      <div className="aquaponic">
        <section className="content-container aquaponic__flex-container">
          <div className="aquaponic__btn-bar">
            <button className="aquaponic__btn aquaponic__btn--ph" onClick={this.handleOnClick}>
              pH
            </button>
            <button className="aquaponic__btn aquaponic__btn--amm" onClick={this.handleOnClick}>
              ammonia
            </button>
            <button className="aquaponic__btn aquaponic__btn--ite" onClick={this.handleOnClick}>
              nitrite
            </button>
            <button className="aquaponic__btn aquaponic__btn--ate" onClick={this.handleOnClick}>
              nitrate
            </button>
            <button
              className="aquaponic__btn aquaponic__btn-active"
              onClick={this.handleOnClick}
            >
              view all
            </button>
            <div className="content-container flex-container">
              <form
                className="aquaponic__form"
                onSubmit={this.onSubmit}
                autoComplete="off"
              >
                {this.state.selected !== 'view all' && (
                  <p> How much <span>{this.state.selected}</span> today?</p>
                )}

                {this.state.selected !== 'view all' && (
                  <input
                    autoFocus
                    className="aquaponic__input"
                    type="text"
                    id="pH"
                    value={this.state.input}
                    onChange={this.handleOnInputChange}
                  />
                )}
                {this.state.error && (
                  <p className="aquaponic__error-msg">{this.state.error}</p>
                )}
              </form>
            </div>
          </div>
          {console.log(window.innerWidth)          }
          {window.innerWidth < 850 ? <D3LineGraph windowWidth={window.innerWidth }/>
          : <D3LineGraph />
          }
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setSelectedFilter: wqm => dispatch(setSelectedFilter(wqm)),
  startAddEntry: entry => dispatch(startAddEntry(entry)),
});

export default connect(undefined,mapDispatchToProps)(Aquaponic);