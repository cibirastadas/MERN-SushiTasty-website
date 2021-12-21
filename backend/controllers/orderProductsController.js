import OrderProduct from "../models/orderProduct.js";
import Order from "../models/orderModel.js";
export const getAllOrderProducts = async (req, res, next) => {
  const orders = await Order.find()
    .select(
      "-deliveryAddress.addressType -deliveryAddress.updatedAt -deliveryAddress.createdAt -deliveryAddress.user"
    )
    .sort("-createdAt");
  const mergedCollections = await Promise.all(
    orders.map(async (order) => {
      const orderProducts = await OrderProduct.find(
        {
          order: String(order._id),
        },
        "-order "
      );
      return { order, orderProducts };
    })
  );
  res.json(mergedCollections);
  try {
  } catch (err) {
    res.json(err);
  }
};
export const getAllUserOrderProducts = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .select(
        "total deliveryType trackOrder paymentMethod timeToMake createdAt deliveryAddress.street deliveryAddress.city"
      )
      .sort("-createdAt");

    const mergedCollections = await Promise.all(
      orders.map(async (order) => {
        const orderProducts = await OrderProduct.find(
          {
            order: String(order._id),
          },
          "-order "
        );
        return { order, orderProducts };
      })
    );
    res.json(mergedCollections);
  } catch (err) {
    res.json(err);
  }
};
