export function stringReplace(base, params) {
  Object.keys(params).forEach((opt) => {
    base = base.replace(new RegExp(`\\{${opt}\\}`, 'g'), params[opt]);
  });

  return base;
}

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
}

export function handleAxiosError(err) {
  const error = {
    url: err.config && err.config.url,
    method: err.config && err.config.method,
    headers: err.config && err.config.headers,
    data: err.config && err.config.data,
    response: null,
    status: null,
    message: err.message,
  };

  if (err.response) {
    error.response = err.response.data;
    error.status = err.response.status;
  }

  return error;
}

export function controllerPaginationHelper(req) {
  return {
    offset: req.query.offset ? (req.query.offset * (req.query.limit || 10)) : 0,
    orderBy: req.query.orderBy && req.query.orderBy.split('.'),
    isDESC: req.query.isDESC === 'true',
    limit: Number(req.query.limit) || 10,
  };
}

export function serviceOrderHelper(searchParameter) {
  const order = (searchParameter.orderBy ? searchParameter.orderBy : ['createdAt']);

  order.push(
    searchParameter.isDESC ? 'DESC' : 'ASC',
  );
  return order;
}
