const jwt = require("jsonwebtoken");

module.exports = {
    decodeToken: (token) => {
        try {
            const decoded = jwt.verify(token, "secret");
            return decoded;
        } catch (error) {
            return null; // Token không hợp lệ hoặc đã hết hạn
        }
    },
};