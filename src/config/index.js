const config = () => {
    return {
        errors: {
            internal: { message: "Internal server error", code: 500 }
        }
    }
}

module.exports = config();