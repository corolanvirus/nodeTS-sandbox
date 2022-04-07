"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cluster_1 = __importDefault(require("cluster"));
var http_1 = __importDefault(require("http"));
var os_1 = require("os");
var process_1 = __importDefault(require("process"));
var numCPUs = os_1.cpus().length;
if (cluster_1.default.isMaster) {
    console.log("Primary " + process_1.default.pid + " is running");
    console.log("Number of CPUs is " + numCPUs);
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', function (worker, code, signal) {
        console.log("worker " + worker.process.pid + " died");
    });
}
else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    http_1.default.createServer(function (req, res) {
        res.writeHead(200);
        res.end('hello world\n');
    }).listen(8000);
    console.log("Worker " + process_1.default.pid + " started, listening on port 8000");
}
