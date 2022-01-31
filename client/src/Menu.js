import React, { Component} from 'react'
import './App.css'
import Api from './Api.js'
import MenuItem from './MenuItem.js'


class Menu extends Component {
    state = {
        data: null,
        loading: true,
    }
    
    componentDidMount() {
    Api.getMenu()
        .then(res => this.setState({ loading: false, data: res.data}))
        .catch(err => console.log(err))
    }

    render() {
    if(!this.state.loading){
        return (
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {Object.keys(this.state.data).map((key) => { 
                            let mItem = this.state.data[key]
                            return (<MenuItem key={key} item={mItem} />)
                            })}
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li className="nav-item">
                                <a className="btn btn-social-icon btn-linkedin" href="https://www.linkedin.com/in/jacob-padgett-wa/" rel="noreferrer" target="_blank"><i className="fa fa-linkedin"></i></a>
                                <a className="btn btn-social-icon btn-github" href="https://www.github.com/jacob-padgett-fdg" rel="noreferrer" target="_blank"><i className="fa fa-github"></i></a>
                                <a className="btn btn-social-icon btn-instagram" href="https://www.instagram.com/theartak/" rel="noreferrer" target="_blank"><i className="fa fa-instagram"></i></a>
                                <a className="btn btn-social-icon btn-twitter" href="https://www.twitter.com/theartak" rel="noreferrer" target="_blank"><i className="fa fa-twitter"></i></a> 
                            </li>
                        </ul>
                    </ul>
                    
                </div>
            </nav>
        )
    } else {
        return (
            <div className="Menu">
                Loading...
            </div>
        )
    }
        
    }
}

export default Menu