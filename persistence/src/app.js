import express from 'express'
import contactsRouter from './routes/contacts.router.js'
import mongoose from 'mongoose'

const app = express()
const PORT = 8080
const connection = mongoose.connect("MONGO_URL")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/contacts", contactsRouter)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

