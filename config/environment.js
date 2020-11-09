const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/sitecamp'
const port = process.env.PORT || 4000
const secret = process.env.SECRET || 'this is a glamper secret'

module.exports = {
  dbURI,
  port,
  secret
}