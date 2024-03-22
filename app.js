const CONFIG_POST_URL = "http://localhost:8080/config"

const http = require('http');
const express = require("express")
const path = require("path")
const app = express()

function http_post(url, key, value){
  http.get(`${url}?${key}=${value}`);
}

app.use("/public", express.static(path.join(__dirname, "static", )))
app.get("/", (req, res)=>{
  res.sendFile(path.join(__dirname, "static", "index.html"))
})
app.get("/config_json", (req, res)=>{
  res.sendFile(path.join(__dirname, "static", "config.json"))
})
app.get("/config_post", (req, res)=>{
  let config_post_json = req.query.info
  console.log(config_post_json)
  http_post(CONFIG_POST_URL, "config", 10)
})


app.listen(3000)
console.log("server-OK")

