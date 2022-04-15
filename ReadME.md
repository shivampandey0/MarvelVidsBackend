[![wakatime](https://wakatime.com/badge/user/876cf018-4965-4dd2-ab39-81f6bb972ec5/project/9670b052-fac5-483a-9b77-764603972612.svg)](https://wakatime.com/badge/user/876cf018-4965-4dd2-ab39-81f6bb972ec5/project/9670b052-fac5-483a-9b77-764603972612)

# neoG_backend

Backend using ExpressJS connected to MongoDB through Mongoose. Common user credentails are maintained for all the apps to obtain SSO like feature.
[API_URL](https://marvel-vids.herokuapp.com/)

## Technology Stack

- ExpressJS API
- MongoDB with mongoose for database operations
- JWT with token expiry for user authentication
- bCrypt and salt for password hashing

## List of API endpoints

### Users

- GET /users/all - List of users available
- POST /users/login - Takes username and password as a parameter and returns JWT.
- POST /users/signup - Providing username, password, name, and email would add a new user into the database.
- GET /users - Provides individual user's details based on authorization header.
- POST /users - Updates user details based on authorization header.
- PUT /users - Updates the following list of the current user and follower list of the viewing user.

### Videos

- GET /videos - List of videos available.
- POST /videos - Addition of a new video into the collection.
- GET /videos/video-id - Fetch the details of a single video.
- POST /videos/video-id - Update the details of a single video.

### Video History

- GET /history - List of videos present in watch history
- POST /history - Add video to history
- PUT /history - Remove video from history
- DELETE /history - Clear user's watch history

### Liked videos

- GET /liked-video - List of videos the user has liked
- POST /liked-video - Add/remove videos from liked videos list

### Playlist

- GET /playlist - All the playlist that a user owns
- POST /playlist - Create a new playlist
- GET /playlist/list-id - List of all the videos in this playlist
- POST /playlist/list-id - Add/remove videos from this playlist
- PUT /playlist/list-id - Rename this playlist
- DELETE /playlist/list-id - Delete this playlist

### Notes for Individual Video

- GET /note/notes/video-id - List of notes created against the specific video
- POST /note/notes/video-id - Create a new note for this video
- POST /note/note-id - Update the details of this note
- PUT /note/note-id - Delete this note

## Features

- MongoDB for database
- Mongoose to handle validation and communicate to MongoDB
- ExpressJS to create API routes.
- Backend created for user details, videos.
