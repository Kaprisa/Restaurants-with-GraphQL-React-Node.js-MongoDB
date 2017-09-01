/*import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
	return	(
		<header className="header">
			<nav className="header__navigation nav">
				<NavLink className="nav__link" activeClassName="nav__link_active" exact to="/">Home</NavLink>
				<NavLink className="nav__link" activeClassName="nav__link_active" exact to="/restaurants">Select Restaurant</NavLink>
				<NavLink className="nav__link" activeClassName="nav__link_active" to="/restaurants/create">Create Restaurant</NavLink>
			</nav>
		</header>
	)
}

export default Header*/

import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { graphql } from 'react-apollo'
import query from '../queries/fetchUser'
import mutation from '../mutations/logout'
import Loader from './Loader'
import history from '../history'

class Header extends Component {	
	handleLogout = () => {
		this.props.mutate({ refetchQueries: [{ query }] }).then(() => history.replace('/'))
	}
	getButtons() {
		const { user, loading } = this.props.data
		if (loading) return <Loader />
		if (user) return <div className="btn nav__buttons" onClick={this.handleLogout}>Logout</div>
		return (
			<div className="nav__buttons">
				<NavLink className="btn" to="/login">Login</NavLink>
				<NavLink className="btn" to="/signup">Signup</NavLink>
			</div>
		)
	}
	render() {
		return (
			<header className="header">
				<nav className="nav">
					<NavLink className="nav__link" activeClassName="nav__link_active" exact to="/">Home</NavLink>
					<NavLink className="nav__link" activeClassName="nav__link_active" exact to="/restaurants">Select Restaurant</NavLink>
					<NavLink className="nav__link" activeClassName="nav__link_active" to="/restaurants/create">Create Restaurant</NavLink>
					{this.getButtons()}		
				</nav>
			</header>
		)
	}
}

export default graphql(mutation)(graphql(query)(Header))