import Order from "../models/orderModel.js";
import OrderProduct from "../models/orderProduct.js";
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.json({ msg: err });
  }
};
export const getAllUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (err) {
    res.json({ msg: err });
  }
};

export const getAllOrderEnums = async (req, res, next) => {
  try {
    res.json({
      deliveryTypes: Order.schema.path("deliveryType").enumValues,
      trackOrders: Order.schema.path("trackOrder").enumValues,
    });
  } catch (err) {
    res.json({ msg: err });
  }
};
export const createNewOrder = async (req, res, next) => {
  try {
    const order = Order({
      user: req.body.userId,
      timeToMake: req.body.timeToMake,
      total: req.body.total,
      deliveryType: req.body.deliveryType,
      deliveryAddress: req.body.deliveryAddress,
      paymentMethod: req.body.paymentMethod,
    });
    const orderProducts = req.body.orderProducts.map((item) => {
      return {
        ...item,
        order: order._id,
      };
    });
    await order.save();
    OrderProduct.insertMany(orderProducts);
    res.status(200).send("Uzsakymas gautas");
  } catch (err) {
    res.json({ message: err });
  }
};

export const updateOrderById = async (req, res, next) => {
  try {
    await Order.updateOne(
      { _id: req.params.id },
      {
        $set: {
          trackOrder: req.body.value,
        },
      }
    );
    res.json("Užsakymo būsena sėkmingai atnaujinta");
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
