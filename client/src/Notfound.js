import React, { Component} from 'react'
import './App.css'


class Notfound extends Component {
state = {
    data: null
  }

  render() {
    return (
      <div className="not-found">
        <p>This page ({window.location.pathname}) does not exist.</p>
      </div>
    )
  }
}

export default Notfound