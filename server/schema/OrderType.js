import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } from 'graphql'

const OrderType = new GraphQLObjectType({
	name: 'OrderType',
	fields: {
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		price: { type: GraphQLInt },
		count: { type: GraphQLInt },
		total: { type: GraphQLInt }
	}
})

export default OrderType