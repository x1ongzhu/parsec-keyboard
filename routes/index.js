"use strict";
const fs = require("fs");
const wasm = fs.readFileSync("./parsecd.wasm");
const axios = require("axios");
const { setupCache } = require("axios-cache-interceptor");

const http = setupCache(axios);
http.defaults.baseURL = "https://web.parsec.app";

module.exports = async function (fastify, opts) {
    fastify.get("/", async function (request, reply) {
        // let { data: html, headers } = await http.get(`/`);
        // // let html = fs.readFileSync("./test.html").toString();
        // let append = fs.readFileSync("./keyboard.html").toString();
        // html = html.replace("</body>", append + "</body>");
        // headers['Cross-Origin-Embedder-Policy'] = 'require-corp';
        // reply.headers(headers);
        // reply.type("text/html");
        // return html;
        reply.headers({
            "Cross-Origin-Embedder-Policy": "require-corp",
            "Referrer-Policy": "no-referrer",
            "Content-Security-Policy": "frame-ancestors 'self'",
            "Cross-Origin-Opener-Policy": "same-origin",
        });
        return reply.sendFile("index.html");
    });

    fastify.get("/parsecd", async function (request, reply) {
        reply.type("application/wasm");
        reply.send(wasm);
        return;
    });

};
