import gql from 'graphql-tag'

export default gql`
	mutation AddToOrder($productId: ID) {
	  addToOrder(productId: $productId) {
			id
	  }
	}
`