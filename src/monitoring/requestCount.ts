import { NextFunction, Request, Response } from "express";
import client from "prom-client";

export const requestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
});

export const requestCount = (req: Request, res: Response, next: NextFunction) => {

        // Increment the  request counter
        requestCounter.inc({
            method: req.method,//GET / POST 
            route: req.route ? req.route.path : req.path,//route
        });

    next();
};