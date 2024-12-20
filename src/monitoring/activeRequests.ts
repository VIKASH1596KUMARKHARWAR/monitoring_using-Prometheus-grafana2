//guage

import { NextFunction, Request, Response } from "express";
import client from "prom-client";


export const activeRequestsGauge = new client.Gauge({
    name: 'active_requests',
    help: "Number of active requests who request haven't resolved yet",
    labelNames:["method","route"]
});



export function requestGuage(req:Request,res:Response,next:NextFunction){
    activeRequestsGauge.inc({

        method :req.method,//get / post
        route: req.route ? req.route.path : req.path,//route
    })

    res.on("finish",()=>{
        activeRequestsGauge.dec({
            method:req.method,
            route: req.route ? req.route.path : req.path,//route
        })
    })
    next();
}

