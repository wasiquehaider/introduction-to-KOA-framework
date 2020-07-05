const Koa = require("koa");
const KoaRouter = require("koa-router");
const json = require("koa-json");
const path = require("path");
const render = require("koa-ejs");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new KoaRouter();

// Replace with DB
const things = ["My Family", "Programming", "Music"];

// JSON Prettier Middleware
app.use(json());

// body Parser Middleware

app.use(bodyParser());

// Add additional properties to context

app.context.user = "Wasique";

// Simple middleware routes
// app.use(async (ctx) => (ctx.body = { message: "Hello Koa Framework" }));

render(app, {
  root: path.join(__dirname, "views"),
  layout: "layout",
  viewExt: "html",
  cache: false,
  debug: false,
});

// Routes

router.get("/test", (ctx) => (ctx.body = `Hello ${ctx.user}`));
router.get("/test2/:name", (ctx) => (ctx.body = `Hello ${ctx.params.name}`));
router.get("/", index);
router.get("/add", showAdd);
router.post("/add", add);

// Index Page
async function index(ctx) {
  await ctx.render("index", {
    title: "Things I Love:",
    things: things,
  });
}

// Show Add page
async function showAdd(ctx) {
  await ctx.render("add");
}
//  Add thing
async function add(ctx) {
  const body = ctx.request.body;
  things.push(body.thing);
  ctx.redirect("/");
}

// Router Middle ware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log("App running on Port 3000"));
