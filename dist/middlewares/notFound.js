const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "API Route Not Found!",
        errorSources: [
            {
                path: req.originalUrl,
                message: "Your requested path is invalid",
            },
        ],
    });
};
export default notFound;
//# sourceMappingURL=notFound.js.map