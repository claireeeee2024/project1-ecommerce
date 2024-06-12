import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    description: { 
        type: String, 
        required: true 
    },

    category: {
        type: String,
        required: true,
    },


    price: {
        type: Number,
        required: true,
        default: 0,
    },

    inStock: { 
        type: Number, 
        required: true, 
        default: 0 
    },

    images: [{
        type: String,
        required: true,
    }],

    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', 
    },

    createdAt: { 
        type: Date, 
        default: Date.now 
    },

    updatedAt: { 
        type: Date, 
        default: Date.now, 
    },
});

productSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });

const Product = mongoose.model('Product', productSchema);

export default Product;