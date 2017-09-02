import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true
	},
	image: String,
	desc: {
		type: String,
		trim: true
	},
	price: {
		type: Number,
		default: 0
	},
	status: {
		type: String,
		enum: ['available', 'unavailable'],
		default: 'available'
	},
	restaurant: {
		type: mongoose.Schema.ObjectId,
		ref: 'Restaurant'
	},
	likes: [{
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}]
})


productSchema.statics.like = function(id, userId) {
	return this.findById(id)
		.then(product => {
			const likes = product.likes ? product.likes.map(obj => obj.toString()) : []
			const operator = likes.includes(userId) ? '$pull' : '$addToSet'
			return this.findByIdAndUpdate(id, { [operator]: { likes: userId } }, { new: true })
		})
}

export default mongoose.model('Product', productSchema)