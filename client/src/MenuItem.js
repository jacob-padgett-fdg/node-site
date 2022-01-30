import React, { Component} from 'react'
import './App.css'


class MenuItem extends Component {
    state = {
        data: null,
        loading: true,
    }

    render() {
        const menuItem = this.props.item
    return (
        <li className="nav-item">
            <a className="" href={menuItem.url}>
                <i className={menuItem.icon} />
                {menuItem.display}
            </a>
        </li>
    )
    }
}

export default MenuItem