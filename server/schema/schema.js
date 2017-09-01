import { GraphQLSchema } from 'graphql'
import RootQueryType from './RootQueryType'
import mutation from './mutations'

export default new GraphQLSchema({
	query: RootQueryType,
	mutation
})