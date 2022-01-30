import React, { Component } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import logo from './logo.svg'
import './App.css'
import About from './About.js'
import Home from './Home.js'
import Api from './Api.js'
import Menu from './Menu.js'




class App extends Component {

  state = {
    data: null,
    pages: null,
    loading: true,
    error: false,
  }
  componentDidMount(){
    Api.getAvailableOptions().then(res => this.setState({ loading: false, data: res.siteOptions, pages: res.pages}))
  }
  

  render() {
    if(this.state.loading){
      return (
        <div className="App">
        <img className="App-logo" src={logo} alt="logo" />
        <p className="App-intro">Loading...</p>
      </div> 
      )
    }
    return (
      <div className="App">
        <Menu />
        <p className="App-intro" >{this.state.data.site_name}</p>
        <main>
          <BrowserRouter>
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/" element={<Home/>} />
              <Route path="*" exact={true} element={<Home/>} />
            </Routes>
          </BrowserRouter>
        </main>
      </div>
    )
  }
}

export default App