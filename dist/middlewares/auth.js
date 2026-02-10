import { auth as betterAuth } from "../lib/auth";
export var userRole;
(function (userRole) {
    userRole["CUSTOMER"] = "CUSTOMER";
    userRole["SELLER"] = "SELLER";
    userRole["ADMIN"] = "ADMIN";
})(userRole || (userRole = {}));
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const session = await betterAuth.api.getSession({
                headers: req.headers,
            });
            if (!session) {
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized",
                });
            }
            if (!session?.user.emailVerified) {
                return res.status(403).json({
                    success: false,
                    message: "Email verification required, please verify the email",
                });
            }
            req.user = {
                id: session.user.id,
                email: session.user.email,
                name: session.user.name,
                role: session.user.role,
                emailVerified: session.user.emailVerified,
            };
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden!! you don't have permission top access",
                });
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
export default auth;
//# sourceMappingURL=auth.js.map