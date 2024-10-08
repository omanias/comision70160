import express from "express";
import cookieParser from "cookie-parser"
import session from "express-session"
import FileStore from "session-file-store"
import MongoStore from "connect-mongo";

const app = express()
const PORT = 8080
const fileStorage = FileStore(session)

app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl:"MONGOURL",
        mongoOptions:{},
        ttl:15
    }),
    secret: "coderhouse",
    resave:false,
    saveUninitialized:false
}))

app.get("/", (req,res)=>{
    if(req.session.views){
        req.session.views++
        res.send(`<p>Visitas ${req.session.views}</p>`)
    }else{
        req.session.views=1
        res.send("Bienvenido a la página por primera vez")
    }

    console.log("Sesión", req.session)
})

// mongodb+srv://omarmanias:<db_password>@cluster0.bxjfm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0



app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT} `)
})