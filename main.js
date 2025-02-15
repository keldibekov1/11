//main.js
// http://localhost:3005/docs
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import BrandsRoute from "./routes/brands.routes.js"
import CategoryitemRoute from "./routes/category.item.routes.js"; 
import CategoryRoute from "./routes/category.routes.js"; 
import router from "./routes/order.routes.js";
import productRoute from "./routes/product.routes.js";
import userRoute from "./routes/user.routes.js"; 
import mainRoute from "./routes/index.js";



import swaggerDocs from "./config/swagger.js";
dotenv.config();

const port = process.env.port || 3005;
const app = express();
app.use(cors({
    origin: "*", // Barcha manbalarga ruxsat berish (faqat test uchun)
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));


app.use(express.json());
swaggerDocs(app);

app.use("/", mainRoute)
app.use("/api", BrandsRoute);

app.use("/api", CategoryitemRoute)
app.use("/api", CategoryRoute);
app.use("/api", productRoute);
app.use("/api", userRoute);
app.use("/api",router)
app.use("/api" ,CategoryRoute)

app.listen(port, () => console.log("server started on port", port));

