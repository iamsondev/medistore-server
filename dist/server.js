import app from "./app.js";
import { prisma } from "./lib/prisma.js";
prisma.$connect().catch((err) => {
    console.log("Database connection error", err);
});
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
export default app;
//# sourceMappingURL=server.js.map