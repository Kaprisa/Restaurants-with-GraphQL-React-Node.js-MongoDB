import gql from 'graphql-tag'

export default gql`
	{
	  order {
	    id
	    name
	    price
	    count
	    total
	  }
	}
`