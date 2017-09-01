import gql from 'graphql-tag'

export default gql`
	mutation AddProduct($name: String, $image: String, $desc: String, $price: Int, $restaurant: ID) {
	  addProduct(name: $name, image: $image, desc: $desc, price: $price, restaurant: $restaurant) {
	    id
	    name
	    restaurant {
	      id
	    }
	  }
	}
`