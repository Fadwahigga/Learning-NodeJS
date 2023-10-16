console.log("NodeJS");
//core module
const http = require("http");
// custom module 
const {log} = require("./logger");
log();
// Third pary module <packages>

const express = require("express");