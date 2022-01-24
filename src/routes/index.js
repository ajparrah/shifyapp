import express from 'express'
import FilesRouter from './routers/FilesRouter.js'

const app = express()

app.use('/files', FilesRouter)

app.get('/', (req, res) => {
  res.send('Everything is OK!')
})

export default app
