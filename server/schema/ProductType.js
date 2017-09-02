import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } from 'graphql'
import RestaurantType from './RestaurantType'
import mongoose from 'mongoose'
const Product = mongoose.model('Product')

const ProductType = new GraphQLObjectType({
	name: 'ProductType',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		image: { type: GraphQLString },
		desc: { type: GraphQLString },
		price: { type: GraphQLInt },
		status: { type: GraphQLString },
		restaurant: { 
			type: RestaurantType,
			resolve(_) {
				return Product.findById(_.id)
					.populate('restaurant').then(product => product.restaurant)
			}
		},
		likes: {
			type: GraphQLInt,
			resolve(_) {
				return Product.findById(_.id).then(product => (product.likes ? product.likes.length : 0))
			}
		}
	})
})

export default ProductType