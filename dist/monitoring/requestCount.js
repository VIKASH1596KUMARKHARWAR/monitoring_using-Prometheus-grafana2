"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestCount = exports.requestCounter = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
exports.requestCounter = new prom_client_1.default.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
});
const requestCount = (req, res, next) => {
    exports.requestCounter.inc({
        method: req.method,
        route: req.route ? req.route.path : req.path,
    });
    next();
};
exports.requestCount = requestCount;
