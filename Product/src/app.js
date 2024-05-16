import express from "express";
import cookieParser from "cookie-parser"
import authrouter from "./routes/auth.routes.js";
import productrouter from "./routes/product.routes.js";
import buyrouter from "./routes/buyproduct.routes.js";

const app = express();

app.use(express.urlencoded({extended: true,limit:"16kb"}));
app.use(express.json({limit: "16kb"}))
app.use(cookieParser());
app.set('view engine', 'ejs');


app.use("/api/v1",authrouter);
app.use("/api/v2",productrouter);
app.use("/api/v3",buyrouter)

export{app}