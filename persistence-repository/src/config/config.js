import dotenv from 'dotenv'

dotenv.config()

console.log(process.env.PERSISTENCE)
export default {
    persistence: process.env.PERSISTENCE
}