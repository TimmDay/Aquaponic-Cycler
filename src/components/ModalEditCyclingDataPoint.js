import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { handleToggleModalEditCycle } from './../actions/ux';

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
      console.log('modal update');
      console.log(prevProps);
      console.log(this.props);
      
      
      this.handlePreFillModalInputsOnOpen();
    }
  }
  handlePreFillModalInputsOnOpen = () => {
    console.log(this.props.selectedNode.name);
    console.log(this.props);
    
    this.setState(() => ({
      name: this.props.selectedNode.name === null ? '' : this.props.selectedNode.name, 
      date: this.props.selectedNode.date === null ? '' : this.props.selectedNode.date, 
      value: this.props.selectedNode.value === null ? '' : this.props.selectedNode.value,
      error: ''
    }));
  };

  handleOnClickReset = () => this.setState({ name: '', date: '', value: '' });

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
    console.log('TODO: submit changes');
  }

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
            className="form__within-modal"
            onSubmit={this.onSubmit}
          >
            {this.state.error && <p className="form__error">{this.state.error}</p>}

            <div>
                <label>Name: </label>
                <input
                    type="text"
                    placeholder={this.props.selectedNode.name}
                    value={this.state.name}
                    onChange={this.handleOnNameChange}
                    autoFocus
                />
            </div>

            <div>
                <label>Date: </label>
                <p>TODO: react date picker</p>
            </div>

            <div>
                <label>Value: </label>
                <input
                    type="text"
                    placeholder={this.props.selectedNode.value}
                    value={this.state.value}
                    onChange={this.handleOnValueChange}
                />
            </div>
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
  handleToggleModalEditCycle: () => dispatch(handleToggleModalEditCycle())
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditCyclingDataPoint);