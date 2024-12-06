# Blog Management API

Welcome to the **Blog Management API**! This application is a RESTful API built with Node.js, Express, and MongoDB for managing blogs. It allows you to perform CRUD operations, search blogs, and retrieve data with filtering and pagination.

---

## Features

- Create a blog with title, content, category, and tags.
- Retrieve all blogs with pagination and filtering by category or tags.
- Retrieve a specific blog by its ID.
- Edit an existing blog.
- Delete a blog.
- Search functionality using MongoDB's text indexing.

---

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing blog data.
- **Mongoose**: ODM library for MongoDB.
- **Morgan**: HTTP request logger for development.

---

## Folder Structure

├── controllers/  
│ └── blogControllers.js # Handles business logic for blogs  
├── models/  
│ └── Blog.js # Defines blog schema and model  
├── routes/  
│ └── blogRoutes.js # Routes for blog-related endpoints  
├── utils/  
│ └── db.js # MongoDB connection logic  
├── app.js # Main server entry point  
└── README.md # Project documentation 


---

## API Endpoints

### 1. **Create a Blog**

**POST** `/apiv1//blogs`

- **Description**: Adds a new blog to the database.
- **Request Body**:
  ```json
  {
    "title": "Your Blog Title",
    "content": "Blog content goes here...",
    "category": "Category Name",
    "tags": ["Tag1", "Tag2", "Tag3"]
  }
  
Response:
201: Blog created successfully.
400: Validation error.

### 2. **Get All Blogs**
GET /api/v1/blogs

Description: Retrieves all blogs with optional filtering, pagination, and sorting.
Query Parameters:
category (optional): Filter by category.
tag (optional): Filter by tag.
page (optional): Page number for pagination (default: 1).
limit (optional): Number of blogs per page (default: 10).
Example:

```
GET /api/v1/blogs?category=Programming&tag=Node.js&page=2&limit=5
Response:

{
  "blogs": [
    {
      "_id": "64c34b9b8e64f29a5b8cd7e3",
      "title": "Introduction to Node.js",
      "content": "Node.js is a JavaScript runtime built on Chrome's V8 engine...",
      "category": "Programming",
      "tags": ["Node.js", "JavaScript", "Backend"],
      "createdAt": "2024-10-01T08:00:00.000Z",
      "updatedAt": "2024-10-01T08:00:00.000Z"
    }
  ],
  "totalBlogs": 25,
  "currentPage": 2,
  "totalPages": 5
}

```
### 3. **Get a Specific Blog**
GET /api/v1/blogs/:id

Description: Retrieves a single blog by its unique ID.
Path Parameter:
id: The ID of the blog to retrieve.
Example:
```
GET /api/v1/blogs/64c34b9b8e64f29a5b8cd7e3
Response:
200: Blog retrieved successfully.
400: Invalid blog ID.
404: Blog not found.
```
### 4. **Update a Blog**
PUT /api/v1/blogs/:id

Description: Updates a blog by its ID.
Path Parameter:
id: The ID of the blog to update.
Request Body:
```
{
  "title": "Updated Title",
  "content": "Updated content...",
  "category": "Updated Category",
  "tags": ["UpdatedTag1", "UpdatedTag2"]
}
Response:
200: Blog updated successfully.
400: Validation or ID error.
404: Blog not found.
```

### 5. **Delete a Blog**
DELETE /api/v1/blogs/:id

Description: Deletes a blog by its ID.
Path Parameter:
id: The ID of the blog to delete.
Response:
200: Blog deleted successfully.
400: Invalid blog ID.
404: Blog not found.


### 6. **Search Blogs**
GET /api/v1/blogs/search

Description: Searches blogs based on title or content using MongoDB's text indexing.
Query Parameter:
q: Search keyword.
Example:
```
GET /api/v1/blogs/search?q=Node.js
Response:
json
Copy code
{
  "blogs": [
    {
      "_id": "64c34b9b8e64f29a5b8cd7e3",
      "title": "Introduction to Node.js",
      "content": "Node.js is a JavaScript runtime built on Chrome's V8 engine...",
      "category": "Programming",
      "tags": ["Node.js", "JavaScript", "Backend"],
      "createdAt": "2024-10-01T08:00:00.000Z",
      "updatedAt": "2024-10-01T08:00:00.000Z"
    }
  ]
}
```

How to Use Query Parameters
Filtering
Use category or tag to filter blogs.
Example:
```
GET /api/v1/blogs?category=Programming
Pagination
Use page and limit to control pagination.
```
Example:
```
GET /api/v1/blogs?page=2&limit=5
Search
Use the q parameter to search for keywords in the blog's title or content.
Example:


GET /api/v1/blogs/search?q=Express
How to Run the Application
Clone the Repository:

```
git clone https://github.com/your-repo/blog-api.git
cd blog-api
Install Dependencies:

```
npm install
Set Up Environment Variables: Create a .env file and add the following:

```
MONGO_URI=your-mongodb-uri
PORT=5000
Run the Server:

```
npm start
Test the API: Use Postman, cURL, or any HTTP client to test the endpoints.

Future Enhancements
User authentication with JWT.
Role-based access control for managing blogs.
Enhanced analytics and reporting.


Feel free to reach out for support or suggestions! Happy coding! 🎉