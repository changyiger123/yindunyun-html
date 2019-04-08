const router = require("koa-router")();
const koa = require("koa");
const proxy = require("koa-proxy");
const app = new koa();

app.use(router.allowedMethods());

app.use(
  proxy({
    host: "http://www.mockhttp.cn/" // 代理到在线HTTP接口，返回mock数据（可以替换成其他的）
  })
);

app.listen(8001, function() {
  console.log("Server running on port %s", 8001); // 本地打开localhost:8001 可以编辑接口返回数据
});
