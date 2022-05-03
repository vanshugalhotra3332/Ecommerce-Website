const Products = require('../models/products'); // importing the products database model
const StatusCodes = require('http-status-codes');
const CustomError = require('../errors');

const getAllProducts = async (req, res) => {
    const products = await (Products.find({}));
    res.status(StatusCodes.OK).json({ nbHits: products.length, products })
}
const createProduct = async (req, res) => {
    const product = await Products.create(req.body);
    res.status(StatusCodes.CREATED).json({ product });
}
const getSingleProduct = async (req, res) => {
    const { id: productID } = req.params;
    const product = await Products.findOne({ _id: productID });

    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${productID}`);
    }
    res.status(StatusCodes.OK).json({ product });
}
const updateProduct = async (req, res) => {
    const { id: productID } = req.params;
    const product = await Products.findOneAndUpdate({ _id: productID }, req.body,
        { new: true, runValidators: true });

    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${productID}`);
    }
    res.status(StatusCodes.OK).json({ product });
}
const deleteProduct = async (req, res) => {
    const { id: productID } = req.params;
    const product = await Products.findOneAndRemove({ _id: productID });

    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${productID}`);
    }
    res.status(StatusCodes.OK).json({deleted: true});
}

module.exports = {
    getAllProducts, createProduct,
    getSingleProduct, updateProduct, deleteProduct
}