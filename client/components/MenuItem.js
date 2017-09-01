import React from 'react'
import { graphql } from 'react-apollo'
import { formatPrice } from '../lib/helpers'
import mutation from '../mutations/addToOrder'
import query from '../queries/fetchOrder'

const MenuItem = ({ product, mutate }) => {
	return	(
		<div className="menu__item product">
			<img src={product.image} alt="photo" className="product__image"/>
			<div className="product__inner">
				<h3 className="product__name">{product.name}</h3>
				<span className="product__price">{formatPrice(product.price)}</span>
				<p className="product__desc">{product.desc}</p>
			</div>
			<button onClick={() => mutate({ variables: { productId: product.id }, refetchQueries: [{ query }] } )} className="btn">Add to order</button>
		</div>
	)
}

export default graphql(mutation)(MenuItem)

