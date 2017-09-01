import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import mutation from '../mutations/addRestaurant'

class CreateRestaurantForm extends Component {
	state = {
		name: '',
		messages: []
	}
	handleInputChange(e, input) {
		this.setState({
			[input]: e.target.value
		})
	}
	handleSubmit = (e) => {
		e.preventDefault()
		this.props.mutate({
			variables: { name: this.state.name }
		}).then(() => this.setState({ messages: [{text: 'Your restaurant added successfully!', type: 'success'}]}))
			.catch(res => this.setState({ messages: res.graphQLErrors.map(err => { return { text: err.message, type: 'error' } }) }))
	}
	render() {
		const { messages, name } = this.state
		return (
			<form onSubmit={this.handleSubmit} className="form">
				<h3 className="title form__title">New restaurant</h3>
				<input type="text" placeholder="Name" value={name} onChange={(e) => this.handleInputChange(e, 'name')} className="form__field"/>
				{messages.length > 0 && messages.map((msg, index) => <div key={index} className={msg.type}>{msg.text}</div>)}
				<button className="btn">Create</button>
			</form>
		)
	}
}

export default graphql(mutation)(CreateRestaurantForm)