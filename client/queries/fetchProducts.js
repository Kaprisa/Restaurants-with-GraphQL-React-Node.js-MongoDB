import gql from 'graphql-tag'

export default gql`
	query Products($restaurant: ID) {
	  products(restaurant: $restaurant) {
			id
	    name
	    desc
	    image
	    price
	    status
	    likes
	  }
	}
`