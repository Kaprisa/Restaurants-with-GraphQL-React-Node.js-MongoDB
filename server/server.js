import express from 'express'
import expressGraphQL from 'express-graphql'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import './models/User'
import './models/Restaurant'
import './models/Product'
import schema from './schema/schema'
import passport from 'passport'
import passportConfig from './services/auth'
import session from 'express-session'
import connectMongo from 'connect-mongo'
const MongoStore = connectMongo(session)

const app = express()

const MONGO_URI = 'mongodb://kaprisa:kaprisa@ds159963.mlab.com:59963/restaurants'
if (!MONGO_URI) {
	throw new Error('You must provide a MongoLab URI')
}

mongoose.Promise = global.Promise
mongoose.connect(MONGO_URI)
mongoose.connection
	.once('open', () => console.log('Connected to MongoLab instance.'))
	.on('error', error => console.log('Error connecting to MongoLab:', error))

app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: 'snickers',
	store: new MongoStore({
		url: MONGO_URI,
		autoReconnect: true
	})
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
	schema,
	graphiql: true
}))

const User = mongoose.model('User')

app.get('/test', async (req, res) => {
	const test = await User.getOrder(req.user._id)
	res.json(test)
})

//app.use(express.static('dist'))

/*import path from 'path'

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../dist/index.html'))
})*/


import webpackMiddleware from 'webpack-dev-middleware'
import webpack from 'webpack'
import webpackConfig from '../webpack.config'
app.use(webpackMiddleware(webpack(webpackConfig)))

export default app
