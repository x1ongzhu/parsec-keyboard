// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const cors = require("@fastify/cors");
const axios = require("axios");
const fs = require("fs");

fastify.register(cors, {
    // put your options here
});

fastify.route({
    method: "GET",
    url: "*",
    schema: {
        querystring: {
            name: { type: "string" },
            excitement: { type: "integer" },
        },
        response: {
            200: {
                type: "object",
                properties: {
                    hello: { type: "string" },
                },
            },
        },
    },
    handler: function (request, reply) {
        console.log(request.url);
        if (request.url === "/parsecd") {
            const buffer = fs.readFileSync(
                "./parsecd.wasm"
            );
            reply.type("application/wasm");
            reply.send(buffer);
            return;
        } else if (request.url === "/") {
            axios.get(`https://web.parsec.app${request.url}`).then((res) => {
                let html = res.data.replace(
                    "</body>",
                    fs.readFileSync("./keyboard.html") + "</body>"
                );
                for (let key in res.headers) {
                    reply.header(key, res.headers[key]);
                }
                reply.send(html.toString());
            });
            return;
        }
        axios
            .get(`https://web.parsec.app${request.url}`, {
                // headers: request.headers,
            })
            .then((res) => {
                reply.headers = res.headers;
                for (let key in res.headers) {
                    reply.header(key, res.headers[key]);
                }
                reply.send(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    },
});
fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    // Server is now listening on ${address}
});
