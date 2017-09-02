import gql from 'graphql-tag'

export default gql`
	query ProductLikes($id: ID) {
		productLikes(id: $id)
	}
`