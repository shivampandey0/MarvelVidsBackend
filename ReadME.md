[![wakatime](https://wakatime.com/badge/github/supminn/neoG_Backend.svg)](https://wakatime.com/badge/github/supminn/neoG_Backend)

# neoG_backend

Backend using ExpressJS connected to MongoDB through Mongoose. Common user credentails are maintained for all the apps to obtain SSO like feature.
[API_URL](https://api-supminn.herokuapp.com/)

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

## APIs used by SupMart

### Products

- GET /products - List of products available.
- POST /products - Addition of a new product into inventory.
- GET /products/product-id - Fetch the details of a single product.
- POST /products/product-id - Update the details of a single product.

### Products Wishlist

- GET /wishlist - List of all the products present in the user's wishlist.
- POST /wishlist - Add/remove products to/from wishlist.

### Products Cart

- GET /cart - List of all the products present in the user's cart.
- POST /cart - Add, move, increment/decrement products to/from cart.
- PUT /cart - Remove single item from cart (irrespective of their quantity)
- DELETE /cart - Empty user's cart.

### User Addresses

- GET /address - List of all the user addresses.
- POST /address - Add new address or update existing address
- Put /address - Remove an individual address from the given list.

## APIs used by SupVision

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

## APIs used by SupSocial

### Posts for Social Media

- GET /post - List of posts available
- POST /post - Add a new post
- PUT /post - Delete post with a specific id
- GET /post/post-id/like - List of users who have liked the post
- POST /post/post-id/like - Like or unlike this post
- GET /post/post-id/comment - List of comments for this post
- POST /post/post-id/comment - Add a user comment to this post
- PUT /post/post-id/comment - Delete a comment on this post with a specific id.

## Features

- MongoDB for database
- Mongoose to handle validation and communicate to MongoDB
- ExpressJS to create API routes.
- Backend created for products, cart, wishlist, address management, user details, videos.

### Enchancements

- Change password for users.
- Update cart logic using the quantity. (remove a product irrespective of its quantity)
- Refactor Playlist model & controller logic - populate video data.
- Create a route using cart ID. In this way, all the products to be checked out can be shared via a link.
- Paging on posts and comments (order by latest date first)
