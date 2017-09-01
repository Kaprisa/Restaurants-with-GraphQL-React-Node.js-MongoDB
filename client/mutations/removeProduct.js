import gql from 'graphql-tag'

export default gql`
	mutation RemoveProduct($id: ID) {
	  removeProduct(id: $id) {
	    id
	  }
	}
`