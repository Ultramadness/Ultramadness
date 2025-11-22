import { auth } from "@/auth";

export default auth((req) => {
  // req.auth contiene la sesión del usuario
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
