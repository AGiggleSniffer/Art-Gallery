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
| GET | Return a list of all Art from the database | /api/art |
| GET | Return a list of Art owned by the user | /api/art/owned |
| GET | Return a single Art and its associated data | /api/art/:artId |
| POST | Save a piece of Art to the datbase, provide: "name", "description", "dataURL", "tags" | /api/art |
| PUT | Update a piece of Art from datbase id, provide: "name", "description", "dataURL", and "tags" | /api/art/:artId |
| DELETE | Delete Art from database id | /api/art/:artId |

### Galleries
| Method | Description | Route |
|:---|:---|:---|
| GET | Return a list of all Galleries from the database | /api/galleries |
| GET | Return a list of Galleries owned by the user | /api/galleries/owned |
| GET | Return a single Gallery and its associated data | /api/galleries/:galleryId |
| POST | Save a Gallery to the datbase, provide: \n"name",\n"description",\n"artIdArray": Array of all associated artIds,\n"tags": String | /api/galleries |
| PUT | Update a piece of art from datbase id, provide: "name", "description", "dataURL", and "tags" | /api/galleries/:galleryId |
| DELETE | Delete art from database id | /api/galleries/:galleryId |

## Features

### 1.

### 2.

### 3.

### 4.


## Unique Additions
