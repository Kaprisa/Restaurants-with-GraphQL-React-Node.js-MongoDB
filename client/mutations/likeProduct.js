import gql from 'graphql-tag'

export default gql`
	mutation LikeProduct($id: ID) {
	  likeProduct(id: $id) {
	    id
	  }
	}
`