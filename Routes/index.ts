
import { Router } from "express";
import loginRoutes from './login'
import registerRoutes from './register'
import blogRoutes from './blog'


const route = Router();

route.use("/login", loginRoutes);
route.use("/register", registerRoutes);
route.use("/blog", blogRoutes);
route.use("/user", blogRoutes);


export default route;