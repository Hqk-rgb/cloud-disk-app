module.exports = (option, app) => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
      //404处理
      if (ctx.status === 404 && !ctx.body) {
        ctx.body = {
          msg: "fail",
          data: "404页面不存在",
        };
      }
    } catch (err) {
      //记录一条错误日志
      app.emit("error", err, ctx);

      const status = err.status || 500;
      const error =
        status === 500 && app.config.env === "prod"
          ? "Internal Server Error"
          : err.message;

      //从error对象上读出各个属性,设置到响应中
      ctx.body = {
        msg: "fail",
        data: error,
      };
      ctx.status = status;
    }
  };
};
