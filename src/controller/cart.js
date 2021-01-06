const Cart = require('../models/cart')


exports.addTocart = async (req, res) => {
    Cart.findOne({ user: req.user._id })
        .exec((errors, cart) => {
            if (errors) {
                return res.status(400).json({ errors });
            }
            //if cart already exist with same user id then update the cart 
            if (cart) {

                const prod = req.body.cartItems.product;
                const isItemExist = cart.cartItems.find(c => c.product == prod)
                let condition,update;
                //if product in a cart already exist with same product id then update the product in cart 
                if (isItemExist) {
                    condition = { "user": req.user._id, "cartItems.product": prod }
                    update = {      
                        "$set": {
//before using $ sign we were updating whole cart while we only need to update "cart items" so we will use $ sign to only update cart item              
                            "cartItems.$": {
                                ...req.body.cartItems,
                                quantity: isItemExist.quantity + req.body.cartItems.quantity
                            }
                        }
                    }
                }
                //if cart exist then..
                else {
                    condition = { user: req.user._id }
                    update = {
                        "$push": {
                            "cartItems": req.body.cartItems
                        }
                    }
                }
                Cart.findOneAndUpdate(condition,update)
                    .exec((errors, _cart) => {
                        if (errors) {
                            return res.status(400).json({ errors });
                        }
                        if (_cart) {
                            return res.status(201).json({ _cart });
                        }
                    })

            }
            // if cart not exist then make new cart
            else {

                const cart = new Cart({
                    user: req.user._id,
                    cartItems: req.body.cartItems
                });

                cart.save((errors, cart) => {
                    if (errors) {
                        return res.status(400).json({ errors });
                    }
                    if (cart) {
                        return res.status(201).json({ cart });
                    }
                })

            }
        })
}

