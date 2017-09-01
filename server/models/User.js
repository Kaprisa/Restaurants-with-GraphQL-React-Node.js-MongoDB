import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt-nodejs'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		trim: true,
		required: true,
		lowercase: true,
		validate: [validator.isEmail, 'Email is invalid']
	},
	password: {
		type: String,
		required: true
	},
	order: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Product'
	}]
})

userSchema.pre('save', function save(next) {
	const user = this
	if (!user.isModified('password')) return next()
		bcrypt.genSalt(10, (err, salt) => {
			if (err) return next(err)
			bcrypt.hash(user.password, salt, null, (err, hash) => {
				if (err) return next(err)
				user.password = hash
				next()
			})
		})
})

userSchema.methods.comparePassword = function(password, cb) {
	bcrypt.compare(password, this.password, (err, isMatch) => {
		cb(err, isMatch)
	})
}

userSchema.statics.getOrder = function(id) {
	return this.aggregate([
		{ $match: { _id: id} },
		{ $unwind: '$order'},
		{ $lookup: { from: 'products', localField: 'order', foreignField: '_id', as: 'products' }},
		{ $group: {
			_id: '$products._id',
			products: { $first: '$products'},
			count: { $sum: 1 },
		}},
		{ $unwind: '$products'},
		{ $unwind: '$_id'},
		{ $project: {
			name: '$products.name',
			price: '$products.price',
			count: '$count'
		}}
	]).then(products => {
		return products.map(product => {
			console.log(product)
			const { count, price, _id, name  } = product
			return { count, price , name , id: _id, total: count * price }
		})
	})
}

export default mongoose.model('User', userSchema)