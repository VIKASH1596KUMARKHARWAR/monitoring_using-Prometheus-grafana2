"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricsMiddleware = exports.httpRequestDurationMicroseconds = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
const requestCount_1 = require("./requestCount");
const activeRequests_1 = require("./activeRequests");
exports.httpRequestDurationMicroseconds = new prom_client_1.default.Histogram({
    name: "http_request_duration_ms",
    help: "Duration of HTTP requests in ms",
    labelNames: ["method", "route", "code"],
    buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000],
});
const metricsMiddleware = (req, res, next) => {
    var _a;
    const startTime = Date.now();
    const route = ((_a = req.route) === null || _a === void 0 ? void 0 : _a.path) || req.path || "unknown";
    activeRequests_1.activeRequestsGauge.inc({
        method: req.method,
        route: route,
    });
    res.once("finish", () => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        requestCount_1.requestCounter.inc({
            method: req.method,
            route: route,
            status_code: res.statusCode,
        });
        exports.httpRequestDurationMicroseconds.observe({
            method: req.method,
            route: route,
            code: res.statusCode,
        }, duration);
        activeRequests_1.activeRequestsGauge.dec({
            method: req.method,
            route: route,
        });
    });
    next();
};
exports.metricsMiddleware = metricsMiddleware;
