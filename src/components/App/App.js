import React, { Component } from 'react';
//import { Button } from 'antd';
import './App.css';
import { getHealth } from '../../api/api'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      health: 'UNKNOWN'
    }
  }

  componentDidMount() {
    getHealth()
      // .then(response => {
      //   this.setState({
      //     health: response
      //   });
      // }).catch(error => {
      //   console.log("Leaving state unknown. Error: ", error)
      // });
  }

  render() {
    return (
      <div className="App">
        API Health is: {this.state.health}.
      </div>
    );
  }
}

export default App;
