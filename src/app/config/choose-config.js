if (process.env.NODE_ENV === "production") {
    module.exports = require("./pro-config.js");
} else {
    module.exports = require("./dip-config.js");
}