import gql from 'graphql-tag'

export default gql`
	mutation SignupUser($email: String, $password: String) {
	  signupUser(email: $email, password: $password) {
	    email
	  }
	}
`