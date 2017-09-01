import React from 'react'
import { formatPrice } from '../lib/helpers'

const OrderItem = ({ order }) => {
	return	(
		<li className="order__item">
			<span className="order__count">{order.count}bs</span>
			<span className="order__name">{order.name}</span>
			<span className="order__price">{formatPrice(order.total)}</span>
		</li>
	)
}

export default OrderItem