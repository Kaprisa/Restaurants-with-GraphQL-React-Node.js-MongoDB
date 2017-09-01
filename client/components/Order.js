import React from 'react'
import { graphql } from 'react-apollo'
import query from '../queries/fetchOrder'
import Loader from './Loader'
import OrderItem from './OrderItem'

const Order = (props) => {
	const { order, loading } = props.data
	if (loading) return <Loader />
	//if (!order.length) return 
	return	(
		<section className="order restaurant__section">
			<h1 className="title">Your order</h1>
			<ul className="order__list">		
				{order.map(item => <OrderItem key={item.id} order={item} />)}
			</ul>
		</section>
	)
}

export default graphql(query)(Order)