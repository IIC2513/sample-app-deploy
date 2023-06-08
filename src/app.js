/**
 * @typedef {import('koa').Context} KoaContext
 * @typedef {import('koa').Next} KoaNext
 */

PORT = 3000;

const Router = require("@koa/router");
const Koa = require("koa");
const { default: koaBody } = require("koa-body");
const KoaLogger = require("koa-logger");
const db = require("./models");
const cors = require("@koa/cors");

const app = new Koa();

const router = new Router();

/**
 * @param {KoaContext} ctx - Koa context object
 * @param {KoaNext} next - Koa next middleware function
 */
router.get("/", (ctx, next) => {
  ctx.response.body = { message: "Hello world!" };
  ctx.status = 200;
});

/**
 * @param {KoaContext} ctx - Koa context object
 * @param {KoaNext} next - Koa next middleware function
 */
router.get("/healthcheck", (ctx, next) => {
  ctx.response.body = { message: "true" };
  ctx.status = 200;
});

/**
 * @param {KoaContext} ctx - Koa context object
 * @param {KoaNext} next - Koa next middleware function
 */
router.get("/books", async (ctx, next) => {
  try {
    const books = await db.Book.findAll();
    ctx.body = books;
    ctx.status = 200;
  } catch (error) {
    console.log(error);
    ctx.status = 500;
  }
});

app.use(KoaLogger());
app.use(cors({ origin: "*" }));
app.use(koaBody());

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`app listening on port: ${PORT}`);
});
