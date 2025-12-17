# Task Manager API

Simple Task Manager backend (Express + MongoDB).

Base URL: /api

**Endpoints**

- **Root:**

  - **Method:** GET
  - **Path:** /
  - **Description:** Health check / quick message showing the API is running.
  - **Response (200):** text/plain message: "Task Manager API is running"

- **Get All Tasks:**

  - **Method:** GET
  - **Path:** /api/tasks
  - **Description:** Returns all tasks sorted by newest first (`createdAt` descending).
  - **Request:** No body required. Accepts standard query headers. JSON response.
  - **Response (200):** JSON array of task objects. Example:

    ```json
    {
    "_id": "64a1e7f0e7a1f2b3c4d5e6f7",
    "title": "Buy groceries",
    "createdAt": "2025-12-17T12:34:56.789Z",
    "updatedAt": "2025-12-17T12:34:56.789Z",
    "__v": 0
    }
    ```

  - **Errors:**
    - 500 Server error: { "message": "Server error" }

- **Create Task:**

  - **Method:** POST
  - **Path:** /api/tasks
  - **Description:** Create a new task.
  - **Request:** JSON body with the following field:

    - `title` (string, required) — the task title (non-empty).
      Example request body:
    ```json
    {
    "title": "Walk the dog"
    }
    ```

  - **Response (201):** The created task object (JSON). Example:
    ```json
    {
    "\_id": "64a1e8a0e7a1f2b3c4d5e6f8",
    "title": "Walk the dog",
    "createdAt": "2025-12-17T12:35:20.123Z",
    "updatedAt": "2025-12-17T12:35:20.123Z",
    "\_\_v": 0
    }
    ```

  - **Errors:**
    - 400 Bad Request: { "message": "Task title is required" } (when `title` is missing or empty)
    - 500 Server error: { "message": "Server error" }

- **Delete Task:**
  - **Method:** DELETE
  - **Path:** /api/tasks/:id
  - **Description:** Delete a task by its MongoDB ObjectId.
  - **Request:** Route parameter `id` — the task `_id` to delete.
  - **Response (200):** 
  ```json
  { 
    "message": "Task deleted successfully" 
  }
  ```
  - **Errors:**
    - 404 Not Found: { "message": "Task not found" } (when no task matches the id)
    - 400 Bad Request: { "message": "Invalid task ID" } (for invalid id formats)

**Notes & Examples**

- All JSON requests must include the `Content-Type: application/json` header.
- Example `curl` create request:

  curl -X POST http://localhost:5000/api/tasks \
   -H "Content-Type: application/json" \
   -d '{"title":"Buy milk"}'

- Example `curl` get all tasks:

  curl http://localhost:5000/api/tasks

- Example `curl` delete:

  curl -X DELETE http://localhost:5000/api/tasks/64a1e8a0e7a1f2b3c4d5e6f8

**Model**

- `Task` schema fields:
  - `title`: String (required, trimmed)
  - `createdAt`, `updatedAt`: timestamps (auto)

**Files referenced**

- `server.js` mounts the routes and exposes the root health endpoint.
- Routes are defined in `routes/taskRoutes.js` and handled in `controllers/taskController.js`.

---