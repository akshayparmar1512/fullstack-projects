import "reflect-metadata"
import express from "express"
import { AppDataSource } from "./db/data-source.js"
import { router } from "./routes/student.routes.js"
import cors from "cors"

const app = express()

app.use(cors({
    origin:"http://localhost:5173"
}))
app.use(express.json())
app.use("/api/student",router)


async function initializeDataSource() {
    try {
        const port = process.env.PORT

        await AppDataSource.initialize()
      

        app.listen(port, () => {
            console.log(`server listen on posrt ${port} succesfully`)
        })
    } catch (error) {
        console.log("ERROR:", error)
    }

}

initializeDataSource()