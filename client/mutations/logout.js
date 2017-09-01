import gql from 'graphql-tag'

export default gql`
	mutation {
		logoutUser {
			id
			email
		}
	}
`