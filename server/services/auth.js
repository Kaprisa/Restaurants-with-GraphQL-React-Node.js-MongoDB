import mongoose from 'mongoose'
import passport from 'passport'
import passportLocal from 'passport-local'
const LocalStrategy = passportLocal.Strategy

const User = mongoose.model('User')

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user)
	})
})

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
	User.findOne({ email }, (err, user) => {
		if (err) return done(err)
		if (!user) return done(null, false, 'Invalid Credentials')
		user.comparePassword(password, (err, isMatch) => {
			if (err) return done(err)
			if (isMatch) return done(null, user)
			return done(null, false, 'Invalid Credentials')
		})
	})
}))

export function signup({ email, password, req }) {
	const user = new User({ email, password })
	return User.findOne({ email })
		.then(existingUser => {
			if (existingUser) { throw new Error('This Email already exists') }
			return user.save()
		})
		.then(user => {
			return new Promise((resolve, reject) => {
				req.login(user, err => {
					if (err) reject(err)
					resolve(user)
				})
			})
		})
}

export function login({ email, password, req }) {
	return new Promise((resolve, reject) => {
		passport.authenticate('local', (err, user) => {
			if (!user) reject('Invalid Credentials')
			req.login(user, () => resolve(user))
		})({ body: { email, password } })
	})
}

