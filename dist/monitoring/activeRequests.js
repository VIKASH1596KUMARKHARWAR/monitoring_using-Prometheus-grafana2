"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activeRequestsGauge = void 0;
exports.requestGuage = requestGuage;
const prom_client_1 = __importDefault(require("prom-client"));
exports.activeRequestsGauge = new prom_client_1.default.Gauge({
    name: 'active_requests',
    help: "Number of active requests who request haven't resolved yet",
    labelNames: ["method", "route"]
});
function requestGuage(req, res, next) {
    exports.activeRequestsGauge.inc({
        method: req.method,
        route: req.route ? req.route.path : req.path,
    });
    res.on("finish", () => {
        exports.activeRequestsGauge.dec({
            method: req.method,
            route: req.route ? req.route.path : req.path,
        });
    });
    next();
}
