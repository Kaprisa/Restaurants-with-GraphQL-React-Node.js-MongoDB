import React from 'react'
import { Link } from 'react-router-dom'
import InventoryItem from './InventoryItem'

const Inventory = ({ products, handleRemove }) => {
	return	(
		<section className="inventory restaurant__section">
			<Link to="/product/create" className="btn">Add product</Link>
			{products.map(product => <InventoryItem handleRemove={handleRemove} key={product.id} product={product}/>)}
		</section>
	)
}

export default Inventory