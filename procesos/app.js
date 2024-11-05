/* console.log(process.cwd())
console.log(process.pid)
console.log(process.memoryUsage())
console.log(process.version) */

// console.log(process.argv.slice(2))
/* import { Command } from 'commander'

const program = new Command()

program
    .option('-d', 'variable de desarrollo', false)
    .option('-p <port>', 'puerto del servidor', 8080)


program.parse()
console.log("opciones", program.opts()) */

import config from './config.js'

// console.log(config)

/* 
import express from 'express'

const app = express() */
/* const PORT = process.env.PORT

mongoose.connect(process.env.MONGO_URL) */

/* process.loadEnvFile()
console.log(process.env.PORT) */

/* app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.listen(PORT, () => console.log(`Server running on port PORT`))
 */


function listNumbers(...numbers) {
    const types = numbers.map(num => typeof num)
    if (types.some(type => type !== "number")) {
        console.error("Parámetro inválido", types)
        process.exit(-4)
    }
}

process.on("exit", (code) => {
    if (code === -4) {
        console.log("Proceso finalizado por argumentación inválida en la función")
    }
})

listNumbers(1, 2, "a", true)