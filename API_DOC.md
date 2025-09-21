# Task Management API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
All task-related endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Data Models

### User
```json
{
  "id": "string",
  "email": "string",
  "name": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Task
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "status": "pending | in_progress | completed | cancelled",
  "priority": "low | medium | high | urgent",
  "dueDate": "datetime (optional)",
  "assignedTo": "string (optional)",
  "createdAt": "datetime",
  "updatedAt": "datetime",
  "userId": "string",
  "subtasks": "Subtask[]"
}
```

### Subtask
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "completed": "boolean",
  "taskId": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Creates a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2023-01-01T00:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

**Status Codes:**
- `201` - User created successfully
- `400` - Bad request (validation errors)
- `409` - User already exists
- `500` - Server error

### Login User
**POST** `/auth/login`

Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2023-01-01T00:00:00.000Z"
  },
  "token": "jwt_token_here"
}
```

**Status Codes:**
- `200` - Login successful
- `400` - Bad request
- `401` - Invalid credentials
- `500` - Server error

### Get Current User Profile
**GET** `/auth/me`

Returns the current authenticated user's profile.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized (invalid or missing token)
- `500` - Server error

## Task Endpoints

### Get All Tasks
**GET** `/tasks`

Retrieves all tasks for the authenticated user.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "task_id_1",
      "title": "Complete project",
      "description": "Finish the task management API",
      "status": "in_progress",
      "priority": "high",
      "dueDate": "2023-12-31T23:59:59.000Z",
      "assignedTo": "john@example.com",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z",
      "userId": "user_id",
      "subtasks": []
    }
  ]
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `500` - Server error

### Get Task by ID
**GET** `/tasks/:id`

Retrieves a specific task by ID.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Parameters:**
- `id` (path) - Task ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "task_id",
    "title": "Complete project",
    "description": "Finish the task management API",
    "status": "in_progress",
    "priority": "high",
    "dueDate": "2023-12-31T23:59:59.000Z",
    "assignedTo": "john@example.com",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z",
    "userId": "user_id",
    "subtasks": []
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `404` - Task not found
- `500` - Server error

### Create Task
**POST** `/tasks`

Creates a new task.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description",
  "status": "pending",
  "priority": "medium",
  "dueDate": "2023-12-31T23:59:59.000Z",
  "assignedTo": "john@example.com",
  "subtasks": [
    {
      "title": "Subtask 1",
      "description": "First subtask",
      "completed": false
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "new_task_id",
    "title": "New Task",
    "description": "Task description",
    "status": "pending",
    "priority": "medium",
    "dueDate": "2023-12-31T23:59:59.000Z",
    "assignedTo": "john@example.com",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z",
    "userId": "user_id",
    "subtasks": [
      {
        "id": "subtask_id",
        "title": "Subtask 1",
        "description": "First subtask",
        "completed": false,
        "taskId": "new_task_id",
        "createdAt": "2023-01-01T00:00:00.000Z",
        "updatedAt": "2023-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

**Status Codes:**
- `201` - Task created successfully
- `400` - Bad request (validation errors)
- `401` - Unauthorized
- `500` - Server error

### Update Task
**PUT** `/tasks/:id`

Updates an existing task.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Parameters:**
- `id` (path) - Task ID

**Request Body:**
```json
{
  "title": "Updated Task Title",
  "status": "completed",
  "priority": "low"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "task_id",
    "title": "Updated Task Title",
    "description": "Task description",
    "status": "completed",
    "priority": "low",
    "dueDate": "2023-12-31T23:59:59.000Z",
    "assignedTo": "john@example.com",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T12:00:00.000Z",
    "userId": "user_id",
    "subtasks": []
  }
}
```

**Status Codes:**
- `200` - Task updated successfully
- `400` - Bad request (validation errors)
- `401` - Unauthorized
- `404` - Task not found
- `500` - Server error

### Delete Task
**DELETE** `/tasks/:id`

Deletes a task and all its subtasks.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Parameters:**
- `id` (path) - Task ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "task_id",
    "title": "Deleted Task",
    "description": "Task description",
    "status": "completed",
    "priority": "medium",
    "dueDate": "2023-12-31T23:59:59.000Z",
    "assignedTo": "john@example.com",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z",
    "userId": "user_id",
    "subtasks": []
  }
}
```

**Status Codes:**
- `200` - Task deleted successfully
- `401` - Unauthorized
- `404` - Task not found
- `500` - Server error

## Subtask Endpoints

### Get All Subtasks for a Task
**GET** `/tasks/:taskId/subtasks`

Retrieves all subtasks for a specific task.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Parameters:**
- `taskId` (path) - Task ID

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": "subtask_id_1",
      "title": "Subtask 1",
      "description": "First subtask",
      "completed": false,
      "taskId": "task_id",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `404` - Task not found or access denied
- `500` - Server error

### Get Subtask by ID
**GET** `/subtasks/:id`

Retrieves a specific subtask by ID.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Parameters:**
- `id` (path) - Subtask ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "subtask_id",
    "title": "Subtask 1",
    "description": "First subtask",
    "completed": false,
    "taskId": "task_id",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `404` - Subtask not found or access denied
- `500` - Server error

### Create Subtask
**POST** `/tasks/:taskId/subtasks`

Creates a new subtask for a specific task.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Parameters:**
- `taskId` (path) - Task ID

**Request Body:**
```json
{
  "title": "New Subtask",
  "description": "Subtask description",
  "completed": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "new_subtask_id",
    "title": "New Subtask",
    "description": "Subtask description",
    "completed": false,
    "taskId": "task_id",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

**Status Codes:**
- `201` - Subtask created successfully
- `400` - Bad request (validation errors)
- `401` - Unauthorized
- `404` - Task not found or access denied
- `500` - Server error

### Update Subtask
**PUT** `/subtasks/:id`

Updates an existing subtask.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Parameters:**
- `id` (path) - Subtask ID

**Request Body:**
```json
{
  "title": "Updated Subtask",
  "completed": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "subtask_id",
    "title": "Updated Subtask",
    "description": "Subtask description",
    "completed": true,
    "taskId": "task_id",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T12:00:00.000Z"
  }
}
```

**Status Codes:**
- `200` - Subtask updated successfully
- `400` - Bad request (validation errors)
- `401` - Unauthorized
- `404` - Subtask not found or access denied
- `500` - Server error

### Delete Subtask
**DELETE** `/subtasks/:id`

Deletes a subtask.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Parameters:**
- `id` (path) - Subtask ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "subtask_id",
    "title": "Deleted Subtask",
    "description": "Subtask description",
    "completed": false,
    "taskId": "task_id",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

**Status Codes:**
- `200` - Subtask deleted successfully
- `401` - Unauthorized
- `404` - Subtask not found or access denied
- `500` - Server error

## Error Handling

### Error Response Format
All error responses follow this format:
```json
{
  "success": false,
  "error": "Error message description"
}
```

### Common HTTP Status Codes
- `200` - OK (successful GET, PUT, DELETE operations)
- `201` - Created (successful POST operations)
- `400` - Bad Request (validation errors, malformed requests)
- `401` - Unauthorized (invalid or missing authentication token)
- `404` - Not Found (resource doesn't exist or access denied)
- `500` - Internal Server Error (server-side errors)

### Authentication Errors
When authentication fails, the following errors may occur:
- `401` - Access token required
- `401` - Invalid token
- `401` - Token expired
- `401` - User not found

## Example Usage

### Complete Workflow Example

1. **Register a new user:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

2. **Login to get a token:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

3. **Create a task:**
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Complete API Documentation",
    "description": "Write comprehensive API documentation",
    "status": "in_progress",
    "priority": "high",
    "dueDate": "2023-12-31T23:59:59.000Z"
  }'
```

4. **Add a subtask:**
```bash
curl -X POST http://localhost:3000/api/tasks/TASK_ID/subtasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Write endpoint documentation",
    "description": "Document all API endpoints",
    "completed": false
  }'
```

## Notes
- All timestamps are in ISO 8601 format (UTC)
- Task status can be: `pending`, `in_progress`, `completed`, `cancelled`
- Priority levels are: `low`, `medium`, `high`, `urgent`
- All task and subtask operations are scoped to the authenticated user
- Subtasks are automatically deleted when their parent task is deleted
- The API uses PostgreSQL as the database backend
