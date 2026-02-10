import app from "./app";
import { prisma } from "./lib/prisma";
const PORT = process.env.PORT || 5000;
async function main() {
    try {
        await prisma.$connect();
        console.log("Connected to database successfully");
        app.listen(PORT, () => {
            console.log(`server is running on http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.log("An error occurred", err);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=server.js.map