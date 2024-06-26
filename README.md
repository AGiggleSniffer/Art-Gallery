# CanvasCollective

(description)

## API Routes

### Signup / Login
| Method | Description | Route |
|:---|:---|:---|
| POST | User Signup, provide: "email", "username", and "password" | /api/users |
| POST | User Signin, provide: "email" OR "username" and "password" | /api/session |
| GET | Return the logged in user info | /api/session |
| DELETE | Delete the logged in user | /api/session |

### Art
| Method | Description | Route |
|:---|:---|:---|
| GET | Return a list of all Art from the Database | /api/art |
| GET | Return a list of art owned by the user | /api/art/owned |
| GET | Return a single art and its associated data | /api/art/:id |
| POST | Save a piece of art to the datbase, provide: "name", "description", "dataURL", "tags" | /api/art |
| PUT | Update a piece of art from datbase id, provide: "name", "description", "dataURL", and "tags" | /api/art/:artId |
| DELETE | Delete art from database id | /api/art/:artId |


## Features

### 1.

### 2.

### 3.

### 4.


## Unique Additions
