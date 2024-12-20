import { NextFunction, Request, Response } from "express";
import client from "prom-client";
import { requestCount, requestCounter } from "./requestCount";
import { activeRequestsGauge, requestGuage } from "./activeRequests";


//NOTE: use the promotheus instance to increment and derement and the responses
export const httpRequestDurationMicroseconds = new client.Histogram({
    name: "http_request_duration_ms",
    help: "Duration of HTTP requests in ms",
    labelNames: ["method", "route", "code"],
    buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000], // defien your own bucket
});

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now(); 
    const route = req.route?.path || req.path || "unknown";

    activeRequestsGauge.inc({
        method: req.method,
        route: route,
    });
    res.once("finish", () => {
        const endTime = Date.now();
        const duration = endTime - startTime; 

        requestCounter.inc({
            method: req.method,
            route: route,
            status_code: res.statusCode,
        });

        // Record the request duration in the histogram
        httpRequestDurationMicroseconds.observe({
            method: req.method,
            route: route,
            code: res.statusCode,
        }, duration);

        activeRequestsGauge.dec({
            method: req.method,
            route: route,
        });
    });
    next(); 
};
