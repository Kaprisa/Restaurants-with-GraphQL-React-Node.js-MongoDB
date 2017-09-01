import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql'
import mongoose from 'mongoose'
const User = mongoose.model('User')

const UserType = new GraphQLObjectType({
	name: 'UserType',
	fields: () => ({
		id: { type: GraphQLID },
		email: { type: GraphQLString }
	})
})

export default UserType