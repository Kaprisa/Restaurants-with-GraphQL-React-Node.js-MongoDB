import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import mutation from '../mutations/addProduct'

class CreateProductForm extends Component {
	state = {
		name: '',
		image: '',
		desc: '',
		price: '',
		messages: []
	}
	handleInputChange(e, input) {
		this.setState({
			[input]: e.target.value
		})
	}
	handleSubmit = (e) => {
		e.preventDefault()
		const { name, image, desc, price } = this.state
		this.props.mutate({
			variables: {  name, image, desc, price, restaurant: localStorage.getItem('restaurant') }
		}).then(() => this.setState({ name: '', image: '', desc: '', price: '', messages: [{text: 'Your Product added successfully!', type: 'success'}] }))
			.catch(res => this.setState({ messages: res.graphQLErrors.map(err => { return { text: err.message, type: 'error' } }) }))
	}
	handleBack = (e) => {
		e.preventDefault()
		this.props.history.goBack()
	}
	render() {
		const { messages } = this.state
		const inputs = ['name', 'image', 'desc', 'price']
		return (
			<form onSubmit={this.handleSubmit} className="form">
				<a className="back" onClick={this.handleBack}>Back</a>
				<h3 className="title form__title">New Product</h3>
				{inputs.map(input => <input type="text" key={input} placeholder={input} value={this.state[input]} onChange={(e) => this.handleInputChange(e, input)} className="form__field"/>)}
				{messages.length > 0 && messages.map((msg, index) => <div key={index} className={msg.type}>{msg.text}</div>)}
				<button className="btn">Create</button>
			</form>
		)
	}
}

export default graphql(mutation)(CreateProductForm)