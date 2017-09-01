import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import login from '../mutations/login'
import signup from '../mutations/signup'
import query from '../queries/fetchUser'

class LoginForm extends Component {
	state = {
		email: '',
		password: '',
		errors: []
	}
	handleSubmit = (e) => {
		e.preventDefault()
		const { email, password } = this.state
		const { path } = this.props.match
		const mutation = path === '/login' ? this.props.loginMutation : this.props.signupMutation
		mutation({
			variables: { email, password },
			refetchQueries: [{ query }]
		}).then(() => this.props.history.push('/'))
			.catch(res => this.setState({ errors: res.graphQLErrors.map(err => err.message) }))
	} 
	componentWillUpdate(nextProps) {
		const { errors } = this.state
		if (nextProps.location.pathname !== this.props.location.pathname && errors.length) {		
			this.setState({
				errors: []
			})
		}
	}
	render() {
		const { path } = this.props.match
		const { errors } = this.state
		return (
			<form onSubmit={this.handleSubmit} className="form">
				<input className="form__field" placeholder="Email" type="email" value={this.state.login} onChange={(e) => this.setState({ email: e.target.value })}/>
				<input className="form__field" placeholder="Password" type="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })}/>
				{errors.map((err, index) => <div key={index} className="error">{err}</div>)}
				<button className="btn">{path === '/login' ? 'Login' : 'Signup'}</button>
			</form>
		)
	}
}

export default graphql(login, { name: 'loginMutation' })(graphql(signup, { name: 'signupMutation' })(LoginForm))