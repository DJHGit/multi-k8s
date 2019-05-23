import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({
      seenIndexes: seenIndexes.data
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    await axios.post('/api/values', {
      index: this.state.index
    });
    this.setState({ index: '' });
  };

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(', ');
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          Index: {key} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Value: {this.state.values[key]}
        </div>
      );
    }

    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <br/>
          <label>Enter a Fibonacci index:&nbsp;&nbsp;</label>
          <input
            value={this.state.index}
            onChange={event => this.setState({ index: event.target.value })}
          />
          &nbsp;
          <button>Submit</button>&nbsp;&nbsp;&nbsp;Refresh page (Ctrl + r) to see result
        </form>

        <h2>Indices Already Submitted</h2>
        <h4>In Order of Arrival</h4>
        <h5>Including Duplicates</h5>
        {this.renderSeenIndexes()}
        <br/><br/>
        <h2>Calculated Values</h2>
        <h4>In Order of Finonacci Index</h4>
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
