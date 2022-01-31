import React, { Component } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import logo from './logo.svg'
import './App.css'
import './icons.css'
import Api from './Api.js'
import Menu from './Menu.js'
import Content from './Content.js'




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
              {Object.keys(this.state.pages).map((key) => { 
                let page = this.state.pages[key]
                let path = '/'+ page
                return (<Route path={path} key={key} element={<Content source={page} />} />)
              })}
              <Route path="*" exact={true} element={<Content source="home" />} />
            </Routes>
          </BrowserRouter>
        </main>
      </div>
    )
  }
}

export default App