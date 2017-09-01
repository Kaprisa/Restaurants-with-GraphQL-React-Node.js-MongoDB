import gql from 'graphql-tag'

export default gql`
	mutation AddRestaurant($name: String) {
	  addRestaurant(name: $name) {
	    name,
	    author {
	      id
	    }
	  }
	}
`