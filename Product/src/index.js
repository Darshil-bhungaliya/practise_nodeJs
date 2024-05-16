import { app } from "./app.js";
import connectDb from "./db/index.js";
const PORT = 8080;


connectDb()
.then(()=>{
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((error)=>{
    console.log(error);
})