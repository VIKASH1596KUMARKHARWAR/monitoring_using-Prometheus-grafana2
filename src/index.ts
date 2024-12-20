
//COUNTER

// import express from "express";
// import { requestCount } from "./monitoring/requestCount";
// const app = express();
// import client from "prom-client";

// // // @ts-ignore
// // function middleware (req,res,next) {
// //     const startTime = Date.now();
// //     next();
// //     const endTime = Date.now();
// //     console.log("it took ", endTime - startTime,"ms");    
// // }
// // app.use(middleware);


// app.use(requestCount);

// app.get("/user", (req, res) => {
//     let user ={
//         name:"vikash kumar",
//         age : 22
//     }
//     res.json({
//         name: "vikash"
//     })
// })


// app.post("/user", (Req, res) => {
//     res.json({
//         name: "vikash"
//     })
// })


// app.get("/metrics", async (req, res) => {
//     const metrics = await client.register.metrics();
//     res.set('Content-Type', client.register.contentType);
//     res.end(metrics);
// })

// app.listen(3000);



//GAUGE

// import express from "express";
// import client from "prom-client";
// import { requestGuage } from "./monitoring/activeRequests";

// const app = express();
// app.use(requestGuage);

// app.get("/user", async (req, res) => {
//     await new  Promise ((resolve)=>setTimeout(resolve,5000));

//     let user ={
//         name:"vikash kumar",
//         age : 22
//     }
//     res.json({
//         name: "vikash"
//     })
// })
// app.get("/user2", async (req, res) => {
//     await new  Promise ((resolve)=>setTimeout(resolve,5000));

//     let user ={
//         name:"vikash kumar",
//         age : 22
//     }
//     res.json({
//         name: "vikash"
//     })
// })

// app.post("/user", (Req, res) => {
//     res.json({
//         name: "vikash"
//     })
// })


// app.get("/metrics", async (req, res) => {
//     const metrics = await client.register.metrics();
//     res.set('Content-Type', client.register.contentType);
//     res.end(metrics);
// })

// app.listen(3000);







// import express from "express";
// import client from "prom-client";
// import { metricsMiddleware } from "./monitoring/historgram";

// const app = express();
// app.use(metricsMiddleware);

// app.get("/user", async (req, res) => {

//     let user ={
//         name:"vikash kumar",
//         age : 22
//     }
//     res.json({
//         name: "vikash"
//     })
// })
// app.get("/user2", async (req, res) => {
//     await new  Promise ((resolve)=>setTimeout(resolve,1000));

//     let user ={
//         name:"vikash kumar",
//         age : 22
//     }
//     res.json({
//         name: "vikash"
//     })
// })

// app.post("/user", (Req, res) => {
//     res.json({
//         name: "vikash"
//     })
// })


// app.get("/metrics", async (req, res) => {
//     const metrics = await client.register.metrics();
//     res.set('Content-Type', client.register.contentType);
//     res.end(metrics);
// })

// app.listen(3000);

import express from "express";
import client from "prom-client";
import { metricsMiddleware } from "./monitoring/historgram"; // Fixed import
import { requestCount, requestCounter } from "./monitoring/requestCount";
import { activeRequestsGauge, requestGuage } from "./monitoring/activeRequests";

const app = express();

// Register middleware to track metrics
app.use(metricsMiddleware);

// Define routes
app.get("/user", async (req, res) => {
    let user = { name: "vikash kumar", age: 22 };
    res.json({ name: "vikash" });
});

app.get("/user2", async (req, res) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    let user = { name: "vikash kumar", age: 22 };
    res.json({ name: "vikash" });
});

app.post("/user", (req, res) => {
    res.json({ name: "vikash" });
});

// Metrics endpoint
app.get("/metrics", async (req, res) => {
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.end(metrics);
});

app.listen(3000, () => {
    console.log("Node.js app listening on port 3000");
});



//docker-compose up