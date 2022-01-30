import React, { Component} from 'react'
import './App.css'
import Api from './Api.js'


class App extends Component {
state = {
    data: null
  }

  componentDidMount() {
    Api.callBackendAPI('/read/home')
      .then(res => this.setState({ data: res.data.content}))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="Home">
        <div dangerouslySetInnerHTML={{__html: this.state.data}} />
      </div>
    )
  }
}

export default App