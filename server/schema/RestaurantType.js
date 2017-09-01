import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql'
import UserType from './UserType'
import mongoose from 'mongoose'
const Restaurant = mongoose.model('Restaurant')

const RestaurantType = new GraphQLObjectType({
	name: 'RestaurantType',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		author: { 
			type: UserType,
			resolve(parentValue) {
				return Restaurant.findById(parentValue.id)
					.populate('author').then(restaurant => restaurant.author)
			}
		}
	})
})

export default RestaurantType