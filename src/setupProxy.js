const { createProxyMiddleware } = require("http-proxy-middleware")
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://www.1905.com", 
      changeOrigin: true, 
      pathRewrite: { "^/api": "" }, 
    })
  )
}
