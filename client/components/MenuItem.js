import React from 'react'
import { graphql } from 'react-apollo'
import { formatPrice } from '../lib/helpers'
import addToOrder from '../mutations/addToOrder'
import likeProduct from '../mutations/likeProduct'
import query from '../queries/fetchOrder'
import productLikes from '../queries/productLikes'

const MenuItem = ({ product, addToOrder, likeProduct, data }) => {
	const likes = data.productLikes 
	return	(
		<div className="menu__item product">
			<div className="product__likes likes">
				<i onClick={() => likeProduct({ variables: { id: product.id }}).then(() => data.refetch())} className="material-icons likes__icon">thumb_up</i>
				<span className="likes__text">{likes ? likes : ''}</span>
			</div>
			<img src={product.image} alt="photo" className="product__image"/>
			<div className="product__inner">
				<h3 className="product__name">{product.name}</h3>
				<span className="product__price">{formatPrice(product.price)}</span>
				<p className="product__desc">{product.desc}</p>
			</div>
			<button onClick={() => addToOrder({ variables: { productId: product.id }, refetchQueries: [{ query }] } )} className="btn">Add to order</button>
		</div>
	)
}

export default graphql(addToOrder, { name: 'addToOrder' })(graphql(likeProduct, { name: 'likeProduct' })(graphql(productLikes, {
	options: (props) => { return { variables: { id: props.product.id } } }
})(MenuItem)))
