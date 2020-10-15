# Discover Your Montréal
This is a a full-stack MERN app, with multiple relationships and CRUD functionality, allowing users to share, rate and comment on attractions in and around the city of Montréal.

Built as part of a team, this is my third project during the Software Engineering Immersive at General Assembly.

### Project Team:
* Anouska Ralph: https://github.com/AnouskaRalph
* Puja Gharti: https://github.com/pu-za
* Simon Neil: https://github.com/Simon994
* Teresa Clark: https://github.com/TClark000


## Goal and Brief
As a group, design and build a full-stack application, using an Express API to serve data from a Mongo database. Consume the API with a separate front end, built with React.

### Timescale:
* 9 days

### Technologies used
* React.js
* Node.js
* Express
* MongoDB/Mongoose
* Semantic UI React
* Axios
* React Mapbox GL
* Nodemon
* HTTP-proxy-middleware
* Bcrypt
* jsonwebtoken
* Git, and GitHub


## The App: Discover Your Montréal
### Live version
*A live version of the app can be found here*

Discover Your Montréal is a MERN stack app designed for a community of users to share information on local attractions in and around Montreal. 
Visitors to the site can browse index and show pages that provide details of  the local attractions, including ratings and comments left by other users.
Users who are registered and logged in can post comments and ratings on locations.
Users can furthermore go through an extra sign-up step to register as Contributors. Contributors have a personal profile and can create new locations, which are then available for other users to view, comment on and rate. 


#### Homepage

![Homepage Screenshot 1](./Readme_Screenshots/Homepage_Readme_Screenshot1.png)

![Homepage Screenshot 2](./Readme_Screenshots/Homepage_Readme_Screenshot2.png)

 
### General planning and process

We used Figma to create a wireframe, outlining the look of the site,  as well as key components and the user’s journey.
This wireframe was revisited and updated at various points during the project.


The team also used Trello to organise daily tasks (agreed each day at a stand-up meeting), and record various other important aspects of the project as it progressed, such as  bugs and blockers, nice-to-have extra features etc.

#### Wireframe
![Wireframe Screenshot](./Readme_Screenshots/Wireframe_Readme_Screenshot.png)

### Models

We built a location model, with coords and comments as embedded data: 

``` javascript
const coordsSchema = new mongoose.Schema({
  latitude: { type: Number, default: 45.5017 },
  longitude: { type: Number, default: -73.5673 } 
})

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 400 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  local: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const locationsSchema = new mongoose.Schema({
  
  placeName: { type: String },
  placeDescription: { type: String },
  placePhotos: [{ type: String }],
  amenities: [{ type: String }],
  eventDate: { type: String },
  coords: [coordsSchema],
  feature: [{ type: String }],
  local: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [commentSchema]

}, {
  timestamps: true
})
``` 

We also built a user model (see below), which is referenced by the location model above.

``` javascript
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, maxlength: 50, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  userimage: { type: String },
  bio: { type: String },
  isLocal: { type: Boolean, default: false },
  usertelephone: { type: String }
})

userSchema
  .virtual('createdLocations', {
    ref: 'Location',
    localField: '_id',
    foreignField: 'local'
  })
```