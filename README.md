# CanvasCollective
![](https://github.com/AGiggleSniffer/AGiggleSniffer.github.io/blob/main/src/assets/images/gifs/Animation5.gif)
Fun and engaging website to draw small pieces of art and share them with other users.

## API Routes

### Signup / Login
| Method | Description | Route |
|:---|:---|:---|
| POST | User Signup, provide:<br/>"email": String,<br/>"username": String,<br/>"password": String | /api/users |
| POST | User Signin, provide:<br/>"email": String<br/>OR<br/>"username": String,<br/>"password": String | /api/session |
| GET | Return the logged in user info | /api/session |
| DELETE | Delete the logged in user | /api/session |

### Art
| Method | Description | Route |
|:---|:---|:---|
| GET | Return a list of all Art from the database | /api/art |
| GET | Return a list of Art owned by the user | /api/art/owned |
| GET | Return a single Art and its associated data | /api/art/:artId |
| POST | Save a piece of Art to the datbase, provide:<br/>"name": String,<br/>"description": String,<br/>"dataURL": String,<br/>"tags": String | /api/art |
| PUT | Update a piece of Art from datbase id, provide:<br/>"name": String,<br/>"description": String,<br/>"dataURL": String,<br/>"tags": String | /api/art/:artId |
| DELETE | Delete Art from database id | /api/art/:artId |

### Galleries
| Method | Description | Route |
|:---|:---|:---|
| GET | Return a list of all Galleries from the database | /api/galleries |
| GET | Return a list of Galleries owned by the user | /api/galleries/owned |
| GET | Return a single Gallery and its associated data | /api/galleries/:galleryId |
| POST | Save a Gallery to the datbase, provide:<br/>"name": String,<br/>"description": String,<br/>"artIdArray": Array,<br/>"tags": String | /api/galleries |
| PUT | Update a piece a Gallery from datbase id, provide:<br/>"name": String,<br/>"description": String,<br/>"dataURL": String,<br/>"tags": String | /api/galleries/:galleryId |
| DELETE | Delete Gallery from database id | /api/galleries/:galleryId |
<!---
## Features

### 1. Art
Able to Create, Read, Update, and Delete Art

### 2. Galleries

### 3. Tags

## Unique Additions

### SVG Filters

### Custom Canvas Hook
-->
