import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/dashboard.tsx"),
  route("signup", "routes/signup.tsx"),
  route("login", "routes/login.tsx"),
] satisfies RouteConfig;
