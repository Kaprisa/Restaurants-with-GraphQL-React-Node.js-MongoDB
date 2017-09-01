import mongoose from 'mongoose'
import { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql'
import RestaurantType from './RestaurantType'
import ProductType from './ProductType'
import UserType from './UserType'
import OrderType from './OrderType'
const Restaurant = mongoose.model('Restaurant')
const Product = mongoose.model('Product')
const User = mongoose.model('User')


const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: () => ({
		user: {
			type: UserType,
			resolve(parentValue, args, req) {
				return req.user
			}
		},
		restaurants: {
			type: new GraphQLList(RestaurantType),
			resolve(parentValue) {
				return Restaurant.find()
			}
		},
		restaurant: {
			type: RestaurantType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parentValue, { id }) {
				return Restaurant.findById(id)
			}
		},
		products: {
			type: new GraphQLList(ProductType),
			args: { restaurant: { type: GraphQLID } },
			resolve(parentValue, { restaurant }) {
				return Product.find({ restaurant })
			}
		},
		product: {
			type: ProductType,
			args: { id: { type: new GraphQLNonNull(GraphQLID) } },
			resolve(parentValue, { id }) {
				return Product.findById(id)
			}
		},
		order: {
			type: new GraphQLList(OrderType),
			async resolve(_, args, { user }) {
				const { order } = await User.findById(user.id).populate('order')
				let helper = []
				const preOrder = order.reduce((acc, cur) => {
					const { price, _id, name } = cur
					const vIndex = helper.indexOf(cur)
					if (vIndex > -1) {
						const count = acc[vIndex].count + 1
						acc[vIndex] = {...acc[vIndex], count, total: price * count }
					} else {
						helper.push(cur)
						acc.push({ id: _id, name, price , count: 1, total: price })
					}
					return acc
				}, [])
				return preOrder
			}
		}
		/*order: {
			type: new GraphQLList(ProductType),
			resolve(_, args, { user }) {
				return User.findById(user.id).populate('order').then(user => user.order)
			}
		}*/
	})
})

export default RootQuery
