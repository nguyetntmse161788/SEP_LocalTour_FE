const express = require("express");
var cors = require('cors')
const app = express();
app.use(cors());
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3039',  // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.listen(5000);