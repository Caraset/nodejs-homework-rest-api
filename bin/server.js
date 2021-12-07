import app from '../app.js'

const PORT = process.env.PORT || 6969

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`)
})
