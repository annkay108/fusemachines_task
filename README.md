# Simple online learning platform 

## Description

It is a website for instructor role only where they can add courses and inside each course, they can add the relevant files. The instructor can create, view, edit and delete a course.

## API Endpoints

| Http Method | URL               | Request Body                                   | Success Status | Error Status | Description                                       |
| ----------- | ----------------- | ---------------------------------------------- | -------------- | ------------ | ------------------------------------------------- |
| GET         | `/course`         |                                                | 200            | 404          | Lists all courses                                 |
| POST        | `/course`         | {coursename, lastModified}                     | 201            | 404          | Adds the course                                   |
| PUT         | `/course/:id`     | {coursename}                                   | 200            | 404          | Updates the course name of the given id           |
| DELETE      | `/course/:id`     |                                                | 200            | 400          | Deletes the course of the given id                |
| GET         | `/file`           |                                                | 200            | 404          | Lists all the files                               |
| POST        | `/file/:courseId` | {lastModified, dateAdded} and {array of files} | 201            | 404          | Adds the files for a given course Id              |
| GET         | `/file/:courseId` |                                                | 200            | 404          | Gets the list of all files with a given course Id |

## Server

### Models

```javascript
File = {
  courseId: { type: Schema.Types.ObjectId, ref: "Course" },
  fileUri: { type: String, required: true},
  lastModified: { type: Date, default: Date.now },
  dateAdded: { type: Date, default: Date.now },
  fileName: { type: String, required: true },
  size:{type: Number, required: true}
};

Course = {
  coursename: { type: String, required: true },
  courseFile: [{ type: Schema.Types.ObjectId, ref: "File" }],
  lastModified: { type: Date, default: Date.now }
};
```



# Client / Frontend

## React Router Routes (React App)

| Path                | Component/Page | Behavior                                                     |
| ------------------- | -------------- | ------------------------------------------------------------ |
| `/`                 | Splash         | Home                                                         |
| `/course`           | Course         | Shows the list of courses and the option to add and delete the course |
| `/course/:courseId` | File           | Shows the list of files inside the given courseId and the option to add the files |

## Components

- AddCourse
- AddFile
- Navbar
- PathBar
- UpdateFileListInput

## Pages

- Course
- File
- Splash

## Services

- Course Service
  - course.getAllCourse()
  - addCourse(newCourse)
  - deleteCourse(courseId)
- File Service
  - getListOfFilesByCourseId
  - addFiles

