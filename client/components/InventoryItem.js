import React from 'react'
import { formatPrice } from '../lib/helpers'

const InventoryItem = ({ product, handleRemove }) => {
	return	(
		<div className="inventory__item flex">
			<div className="flex-row flex-row_flex">
				<span className="flex-col inventory__field">{product.name}</span>
				<span className="flex-col inventory__field">{formatPrice(product.price)}</span>
				<span className="flex-col inventory__field">{product.status}</span>
			</div>
			<span className="flex-row inventory__field">{product.desc}</span>
			<span className="flex-row inventory__field">{product.image}</span>
			<span onClick={() => handleRemove(product.id)} className="flex-row btn">Remove</span>
		</div>
	)
}

export default InventoryItem
