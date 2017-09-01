/*import React, { Component } from 'react'

class Root extends Component {
	render() {
		return (
			<div className="root">
				
			</div>
		)
	}
}

export default Root*/

import React, { Component } from 'react'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { Router, Route, Switch } from 'react-router-dom'
import history from '../history'
import Header from './Header'
import Home from './Home'
import RestaurantsSelector from './RestaurantsSelector'
import CreateRestaurantForm from './CreateRestaurantForm'
import Restaurant from './Restaurant'
import CreateProductForm from './CreateProductForm'
import LoginForm from './LoginForm'
import NotFound from './NotFound'

const networkInterface = createNetworkInterface({
	uri: '/graphql',
	opts: {
		credentials: 'same-origin'
	}
})

const client = new ApolloClient({
	networkInterface,
	dataIdFromObject: o => o.id
})

class Root extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<Router history={history}>
					<main className="app">
						<Header />
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/restaurants" exact component={RestaurantsSelector} />
							<Route path="/restaurants/create" component={CreateRestaurantForm} />
							<Route path="/restaurant/:id" component={Restaurant} />
							<Route path="/product/create" component={CreateProductForm} />
							<Route path="/login" component={LoginForm} />
							<Route path="/signup" component={LoginForm} />
							<Route path="*" component={NotFound}/>
						</Switch>
					</main>
				</Router>
			</ApolloProvider>
		)
	}
}

export default Root