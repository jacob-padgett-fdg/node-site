import React, { Component } from 'react'
import './App.css'
import Api from './Api.js'

class About extends Component {
state = {
    data: null
  }

  componentDidMount() {
    Api.callBackendAPI('/read/about')
      .then(res => this.setState({ data: res.data.content}))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="About">
        <div dangerouslySetInnerHTML={{__html: this.state.data}} />
      </div>
    )
  }
}

export default About