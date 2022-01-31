import React, { Component} from 'react'
import './App.css'
import Api from './Api.js'


class Content extends Component {
state = {
    data: null
  }

  componentDidMount() {
    const page = this.props.source
    Api.callBackendAPI('/read/' + page)
      .then(res => this.setState({ data: res.data.content}))
      .catch(err => console.log(err))
  }

  render() {
    const page = this.props.source
    return (
      <div className={page}>
        <div dangerouslySetInnerHTML={{__html: this.state.data}} />
      </div>
    )
  }
}

export default Content