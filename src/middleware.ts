export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/transactions",
    "/withdraw",
    "/topup",
    "/order/:id*",
    "/transactions/",
  ],
};
