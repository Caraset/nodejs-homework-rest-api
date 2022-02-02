import app from '../app.js'
import mongoose from 'mongoose'

const { PORT, DB_HOST } = process.env || 3000

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
      console.log('Database connection successful')
    })
  })
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })
