export type publicRoute = {
  route: string;
  method: string;
};

const publicRoutes: publicRoute[] = [{ route: "/api/products/", method: "GET" }];

export default publicRoutes;
