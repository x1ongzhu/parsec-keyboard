"use strict";

const path = require("path");
const AutoLoad = require("@fastify/autoload");
const cors = require("@fastify/cors");
const fstatic = require("@fastify/static");
// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {};

module.exports = async function (fastify, opts) {
    // Place here your custom code!
    fastify.register(fstatic, {
        root: path.join(__dirname, "lib"),
        prefix: "/lib/",
        setHeaders: (res, path, stat) => {
            res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
        },
    });

    fastify.register(cors, {
        // put your options here
    });

    // Do not touch the following lines

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, "plugins"),
        options: Object.assign({}, opts),
    });

    // This loads all plugins defined in routes
    // define your routes in one of these
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, "routes"),
        options: Object.assign({}, opts),
    });
};
