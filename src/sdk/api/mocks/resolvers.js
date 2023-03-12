export const errorResolver = (req, res, ctx) => {
  const response = {
    message: "Request Failed",
  };
  return res(ctx.status(400), ctx.json(response));
};

export const noDataResolver = (req, res, ctx) => {
  const response = {
    total_count: 0,
    items: [],
  };
  return res(ctx.status(200), ctx.json(response));
};
