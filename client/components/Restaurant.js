import React, { Component } from 'react'
import Menu from './Menu'
import Inventory from './Inventory'
import Order from './Order'
import { graphql } from 'react-apollo'
import query from '../queries/fetchProducts'
import removeProduct from '../mutations/removeProduct'
import fetchOrder from '../queries/fetchOrder'
import Loader from './Loader'

class Restaurant extends Component {
	handleRemove = (id) => {
		this.props.removeProduct({
			variables: { id },
			refetchQueries: [{ query: fetchOrder }]
		}).then(() => this.props.data.refetch())
	}
	render() {
		const { products, loading } = this.props.data
		if (loading) return <Loader />
		return (
			<div className="restaurant">
				<Menu products={products}/>
				<Order />
				<Inventory handleRemove={this.handleRemove} products={products}/>
			</div>
		)
	}
}

export default /*graphql(addToOrder, { name: 'addToOrder' })(*/graphql(removeProduct, { name: 'removeProduct' })(graphql(query, {
	options: () => { return { variables: { restaurant: localStorage.getItem('restaurant') } } }
})(Restaurant))//)