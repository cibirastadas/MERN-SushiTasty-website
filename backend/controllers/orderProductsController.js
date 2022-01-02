import OrderProduct from "../models/orderProduct.js";
export const getAllOrderProducts = async (req, res, next) => {
  const mergedCollections = await Promise.all(
    res.paginatedResults.results.map(async (order) => {
      const orderProducts = await OrderProduct.find(
        {
          order: String(order._id),
        },
        "-order "
      );
      return { order, orderProducts };
    })
  );
  res.json({
    results: mergedCollections,
    paginationNavigation: res.paginatedResults.paginationNavigation,
  });
  try {
  } catch (err) {
    res.json(err);
  }
};
export const getAllFilteredOrderProducts = async (req, res, next) => {
  try {
    const mergedCollections = await Promise.all(
      res.paginatedResults.results.map(async (order) => {
        const orderProducts = await OrderProduct.find(
          {
            order: String(order._id),
          },
          "-order "
        );
        return { order, orderProducts };
      })
    );
    res.json({
      results: mergedCollections,
      paginationNavigation: res.paginatedResults.paginationNavigation,
    });
  } catch (err) {
    res.json(err);
  }
};
export const getAllUserOrderProducts = async (req, res, next) => {
  try {
    const mergedCollections = await Promise.all(
      res.paginatedResults.results.map(async (order) => {
        const orderProducts = await OrderProduct.find(
          {
            order: String(order._id),
          },
          "-order "
        );
        return { order, orderProducts };
      })
    );
    res.json({
      results: mergedCollections,
      paginationNavigation: res.paginatedResults.paginationNavigation,
    });
  } catch (err) {
    res.json(err);
  }
};
