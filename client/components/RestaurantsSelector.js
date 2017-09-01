import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import query from '../queries/fetchRestaurants'

const findIndex = (code, length, index) => {
	if (code === 38 && index === 0) return length - 1
	if (code === 38) return index - 1
	if (code === 40 && index === length - 1) return 0
	if (code === 40) return index + 1
}

class RestaurantsSelector extends Component {
	state = {
		restaurant: '',
		filtered: [],
		active: null
	}
	handleRestaurantChange = (e) => {
		const restaurant = e.target.value
		const regExp = new RegExp(`^${restaurant}`,'i')
		const filtered = this.props.data.restaurants.filter(item => {
			return regExp.test(item.name)
		})
		this.setState({
			restaurant,
			filtered
		})
	}
	handleKeyDown = (e) => {
		if (![38, 40].includes(e.keyCode)) return
		const { active } = this.state
		const ids = this.props.data.restaurants.map(item => item.id)
		if (!active) {
			this.setState({
				active: ids[0]
			})
			return
		}
		const index = ids.indexOf(active)
		const length = ids.length
		const code = e.keyCode
		this.setState({
			active: ids[findIndex(code, length, index)]
		})
	}
	handleChangeRestaurant = (id) => {
		localStorage.setItem('restaurant', id)
		this.props.history.push(`/restaurant/${id}`)
	}
	render() {
		const { filtered } = this.state
		return	(
			<div className="store-selector" onKeyDown={this.handleKeyDown}>
				<input onFocus={this.handleRestaurantChange} type="text" placeholder="Select a restourant" onChange={this.handleRestaurantChange} value={this.state.restaurant} className="store-selector__input"/>
				{filtered.length > 0 && <ul className="store-selector__dropdown">
					{filtered.map(item => <li onClick={() => this.handleChangeRestaurant(item.id)} key={item.id} className={`store-selector__dropdown-item ${item.id === this.state.active ? 'store-selector__dropdown-item_active' : ''}`}>{item.name}</li>)}
				</ul>}
				<button className="btn">Visit restaurants</button>
			</div>
		)
	}	
}

export default graphql(query)(RestaurantsSelector)