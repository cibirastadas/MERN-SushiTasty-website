import "dotenv/config";
const paginateResults = (
  Modal,
  findIn = "_id",
  select = "",
  filterByArray = [],
  filterByObj = {}
) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const search = req.query.search;
    const documentLength = await getDocumentLength(
      Modal,
      req,
      findIn,
      search,
      filterByArray,
      filterByObj
    );
    const { paginationNavigation, startIndex } = getPaginationNavigation(
      page,
      limit,
      documentLength
    );
    try {
      const data = await getModalData(
        Modal,
        req,
        limit,
        startIndex,
        findIn,
        select,
        search,
        filterByArray,
        filterByObj
      );
      res.paginatedResults = { results: data, paginationNavigation };
      next();
    } catch (e) {
      res.status(500).json(e);
    }
  };
};

const getModalData = async (
  Modal,
  req,
  limit,
  startIndex,
  findIn,
  select,
  search,
  filterByArray,
  filterByObj
) => {
  const userId = req.params.userId;
  const categoryId = req.params.categoryId;
  if (filterByArray.length && !search) {
    return await Modal.find({
      [findIn]: { $in: filterByArray },
      ...filterByObj,
    })
      .lean()
      .sort("-createdAt")
      .select(select)
      .limit(limit)
      .skip(startIndex);
  }
  if (search) {
    return await Modal.find({
      $or: [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          role: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          trackOrder: {
            $regex: search,
            $options: "i",
          },
        },
      ],
      ...(filterByArray.length && { [findIn]: { $in: filterByArray } }),
    })
      .lean()
      .limit(limit);
  }
  if (userId) {
    return await Modal.find({ [findIn]: userId })
      .lean()
      .sort("-createdAt")
      .select(select)
      .limit(limit)
      .skip(startIndex);
  }
  if (categoryId) {
    return await Modal.find({ [findIn]: categoryId })
      .lean()
      .sort("-createdAt")
      .select(select)
      .limit(limit)
      .skip(startIndex);
  }
  return await Modal.find()
    .sort("-createdAt")
    .lean()
    .limit(limit)
    .skip(startIndex);
};

const getPaginationNavigation = (page, limit, documentLength) => {
  let paginationNavigation = {};
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const lastPage = Math.ceil(documentLength / limit);
  if (endIndex < documentLength) {
    paginationNavigation.next = {
      page: page + 1,
      limit: limit,
    };
  }
  if (lastPage > 2 && lastPage > page + 1) {
    paginationNavigation.last = {
      page: lastPage,
      limit: limit,
    };
  }
  if (page > 2) {
    paginationNavigation.first = {
      page: 1,
      limit: limit,
    };
  }
  if (startIndex > 0) {
    paginationNavigation.prev = {
      page: page - 1,
      limit: limit,
    };
  }
  paginationNavigation.current = {
    page: page,
    limit: limit,
  };
  paginationNavigation.total = {
    page: lastPage,
    limit: limit,
  };
  return { paginationNavigation, startIndex };
};

const getDocumentLength = async (
  Modal,
  req,
  findIn,
  search,
  filterByArray,
  filterByObj
) => {
  const userId = req.params.userId;
  const categoryId = req.params.categoryId;
  if (filterByArray.length && !search) {
    return await Modal.countDocuments({
      [findIn]: { $in: filterByArray },
      ...filterByObj,
    }).exec();
  }
  if (search) {
    return await Modal.countDocuments({
      $or: [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          role: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          trackOrder: {
            $regex: search,
            $options: "i",
          },
        },
      ],
      ...(filterByArray.length && { [findIn]: { $in: filterByArray } }),
    }).exec();
  }
  if (userId) {
    return await Modal.countDocuments({ [findIn]: userId }).exec();
  }
  if (categoryId) {
    return await Modal.countDocuments({ [findIn]: categoryId }).exec();
  }
  return await Modal.countDocuments().exec();
};
export default paginateResults;
