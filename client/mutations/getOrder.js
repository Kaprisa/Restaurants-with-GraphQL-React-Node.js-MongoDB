import gql from 'graphql-tag'

export default gql`
	mutation {
	  getOrder {
	    id
	    name
	    price
	    count
	    total
	  }
	}
`