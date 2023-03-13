import { RestRequest, ResponseComposition, RestContext } from "msw";
export const errorResolver = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
  const response = {
    message: "Request Failed",
  };
  return res(ctx.status(400), ctx.json(response));
};

export const noDataResolver = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
  const response = {
    total_count: 0,
    items: [],
  };
  return res(ctx.status(200), ctx.json(response));
};
