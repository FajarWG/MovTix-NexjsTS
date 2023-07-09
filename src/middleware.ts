export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/transactions",
    "/withdraw",
    "/topup",
    "/movies/:id*",
    "/transactions/",
  ],
};
