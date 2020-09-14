import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as counterActions from '../store/counter/counterActions';

class Counter extends Component {

  constructor() {
    super();

    this.state = {
      initCounter: '',
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  setInitCounter = (setCounter, initCounter) => {
    if (!initCounter) return;
    setCounter(initCounter);
    this.setState({ initCounter: '' });
  };

  render () {
    const { 
      counter, 
      increaseCounter, 
      decreaseCounter,
      setCounter
    } = this.props;

    const { initCounter } = this.state;

    return (
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5>Counter</h5>
          <div>
            <div className="input-group">
              <input 
                type="text" 
                className="form-control"
                placeholder="Set counter"
                name="initCounter"
                onChange={this.onInputChange}
                value={initCounter}
              />
              <div className="input-group-append">
                <button 
                  className="btn btn-outline-primary" 
                  onClick={() => this.setInitCounter(setCounter, +initCounter)}
                >Set</button>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">{counter}</h5>
          <div className="pt-4">
            <button 
              className="btn btn-danger mr-2"
              onClick={decreaseCounter}
              disabled={counter === 0}
            >Decrease</button>
            <button 
              className="btn btn-success"
              onClick={increaseCounter}
            >Increase</button>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => state.counter;
const mapDispatchToProps = (dispatch) => bindActionCreators(counterActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Counter);