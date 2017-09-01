import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } from 'graphql'
import mongoose from 'mongoose'
const Restaurant = mongoose.model('Restaurant')
const Product = mongoose.model('Product')
const User = mongoose.model('User')
import RestaurantType from './RestaurantType'
import ProductType from './ProductType'
import UserType from './UserType'
import { signup, login } from '../services/auth'

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addRestaurant: {
			type: RestaurantType,
			args: { name: { type: GraphQLString } },
			resolve(_, { name }, req) {
				return (new Restaurant({ name, author: req.user.id }).save())
			}
		},
		addProduct: {
			type: ProductType,
			args: { 
				name: { type: GraphQLString },
				image: { type: GraphQLString },
				desc: { type: GraphQLString },
				price: { type: GraphQLInt },
				restaurant: { type: GraphQLID }
			},
			resolve(_, args) {
				return (new Product(args).save())
			}
		},
		removeRestaurant: {
			type: RestaurantType,
			args: { id: { type: GraphQLID } },
			resolve(_, { id }) {
				return Restaurant.remove({ _id: id })
			}
		},
		removeProduct: {
			type: ProductType,
			args: { id: { type: GraphQLID } },
			resolve(_, { id }) {
				return Product.remove({ _id: id })
			}
		},
		setProductStatus: {
			type: ProductType,
			args: {
				id: { type: GraphQLID },
				status: { type: GraphQLString }
			},
			resolve(_, { id, status }) {
				return Product.findByIdAndUpdate(id, { $set: { status } }, { new: true })
			}
		},
		likeProduct: {
			type: ProductType,
			args: { id: { type: GraphQLID } },
			resolve(_, { id }, req) {
				return Product.like(id, req.user.id)
			}
		},
		signupUser: {
			type: UserType,
			args: { 
				email: { type: GraphQLString },
				password: { type: GraphQLString }
		 	},
		 	resolve(_, { email, password }, req) {
		 		return signup({ email, password, req })
		 	}
		},
		loginUser: {
			type: UserType,
			args: {
				email: { type: GraphQLString },
				password: { type: GraphQLString }
			},
			resolve(_, { email, password }, req) {
				return login({ email, password, req })
			}
		},
		logoutUser: {
			type: UserType,
			resolve(_, args, req) {
				const { user } = req
				req.logout()
				return user
			}
		},
		addToOrder: {
			type: ProductType,
			args: { productId: { type: GraphQLID }},
			resolve(_, { productId }, { user }) {
				return User.findByIdAndUpdate(user.id, { $push: { order: productId }}, { new: true })
			}
		},
		removeFromOrder: {
			type: ProductType,
			args: { productId: { type: GraphQLID }},
			resolve(_, { productId }, { user }) {
				return User.findByIdAndUpdate(user.id, { $pull: { order: productId }}, { new: true })
			}
		},
		/*getOrder: {
			type: new GraphQLList(OrderType),
			resolve(_, args, { user }) {
				const order = User.getOrder(user.id)
				return order 
			}
		}*/
	}
})

export default Mutation