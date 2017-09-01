import mongoose from 'mongoose'

const restaurantSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	author: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}
})

restaurantSchema.virtual('products', {
	ref: 'Product',
	localField: '_id',
	foreignField: 'restaurant'
})

export default mongoose.model('Restaurant', restaurantSchema)