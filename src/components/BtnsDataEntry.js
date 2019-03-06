import React from 'react';
import { connect } from 'react-redux';
import { setSelectedFilter } from '../actions/aquaponic';
import InputDataEntry from './InputDataEntry';

class BtnsDataEntry extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
        selected: 'view all',
       }
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
      default: //view all
        break;
    }
  };

   render () {
       return (
        <div className="aquaponic__btn-bar">
          <button className="aquaponic__btn aquaponic__btn--ph" onClick={this.handleOnClick}>pH</button>
          <button className="aquaponic__btn aquaponic__btn--amm" onClick={this.handleOnClick}>ammonia</button>
          <button className="aquaponic__btn aquaponic__btn--ite" onClick={this.handleOnClick}>nitrite</button>
          <button className="aquaponic__btn aquaponic__btn--ate" onClick={this.handleOnClick}>nitrate</button>
          <button className="aquaponic__btn aquaponic__btn-active" onClick={this.handleOnClick}>view all</button>
          
          < InputDataEntry selected={this.state.selected} />
          
        </div>
       )
   }
}

const mapDispatchToProps = (dispatch) => ({
  setSelectedFilter: wqm => dispatch(setSelectedFilter(wqm))
});

export default connect(undefined, mapDispatchToProps)(BtnsDataEntry);