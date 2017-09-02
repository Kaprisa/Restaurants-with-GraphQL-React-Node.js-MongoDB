import React from 'react'
import MenuItem from './MenuItem'

const Menu = ({ products }) => {
	if (!products || !products.length) return <div>Products not found</div>
	return	(
		<section className="menu restaurant__section">
			
			{products.map(product => <MenuItem key={product.id} product={product}/>)}
		</section>
	)
}

export default Menu