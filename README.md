# Tasuku - Company Task Management

Our startup company is in need of a simple task management web app that allows our team managers and their team members to create and manage their tasks. The app is designed to help individuals and teams stay organized and on track with their daily tasks and projects.

## User Stories

### Manager

1. [ ] As a manager, I want to be able to invite new team members to set up their account

2. [ ] As a manager, I want to be able to create and assign tasks to specific team members
3. [ ] As a manager, I want to be able to provide description, set priorities, and deadlines for each task.
4. [ ] As a manage, I want to be able to create projects that group related tasks together
5. [ ] As a manager, I want to be able to view my team's tasks by assignee, by status, by project, and by priority.
6. [ ] As a manager, I want to be able to monitor task progress, and update tasks as needed.
7. [ ] As a manager, I want to be able to receive notification and reminders related to the tasks I created

### Team Member

1. [ ] As a team member, I want to be able set up my account through invitation
2. [ ] As a team member, I want to be able to log in/out of my account
3. [ ] As a team member, I want to be able to view my assigned tasks, deadlines, and priorities in one place.
4. [ ] As a team member, I want to be able to receive notification and reminders related to my tasks
5. [ ] As a team member, I want to be able to update the status of my tasks, mark them as complete, and provide comments or notes as necessary.
6. [ ] As a team member, I want to be able to collaborate with my team members by sharing files or resources related to the tasks.

## Features and Specifications

### User Authentication

1. [ ] Manager can create an account and log in/ out of the manager’s app
2. [ ] Team members cannot register by themselves, but need manager’s email invitation to set up their account
3. [ ] After initial setup, team members can login/out of the app using their credentials

### Task Management

1. [ ] Manager can create a project with title, description, and add tasks to it
2. [ ] Manager can create new tasks by entering a title, description, and selecting a project or category
3. [ ] Manager can view projects, tasks in different views (by project, by assignee, by status,…)
4. [ ] Manager can assign tasks to themselves or to team members by selecting from a list of users
5. [ ] Manager can add priority, deadline to the task
6. [ ] Team member can view all their assigned tasks in one place
7. [ ] Team member can assign task to themselves if the created task doesn’t have an assignee
8. [ ] Team member can update the status of their assigned task as they progress

### Team Collaboration

1. [ ] Team member can view other members’ tasks
2. [ ] Team member and manager can leave comments on other members tasks

### Notification

1. [ ] Manager can receive email and/or in app notification about task status update by team member
2. [ ] Team member can receive receive email and/or in app notification about changes made by their manager to their tasks

## API endpoints

### Auth APIs

```javascript
/**
 * @route POST /auth/login
 * @description login with email and password
 * @body {email, password}
 * @access Public
 */
```

```javascript
/**
 * @route POST /auth/refresh
 * @description
 * @body
 * @access private
 */
```

```javascript
/**
 * @route DELETE /auth/logout
 * @description log out of account
 * @body
 * @access Public
 */
```

### User APIs

```javascript
/**
 * @route POST api/users
 * @description Create a new user
 * @access private, manager
 * @body {name, email, password}
 */
```

```javascript
/**
 * @route GET api/users
 * @description Get a list of all users
 * @access private, manager
 */
```

```javascript
/**
 * @route POST api/users/me/change_password
 * @description Change password of current user
 * @body {currentPassword, newPassword}
 * @access private
 */
```

```javascript
/**
 * @route GET api/users
 * @description Get a list of users by project
 * @access private
 */
```

### Task APIs

```javascript
/**
 * @route GET api/tasks
 * @description Get a list tasks in a project
 * @access private
 */
```

```javascript
/**
 * @route GET api/tasks/:id
 * @description Get a single task by id
 * @access private
 */
```

```javascript
/**
 * @route DELETE api/tasks/:id
 * @description Delete task by id
 * @access private
 */
```

```javascript
/**
 * @route PUT api/tasks/:id
 * @description Update a task
 * @body { description, status, priority, dueDate, assignedTo}
 * @access private
 */
```

### Project APIs

```javascript
/**
 * @route GET api/projects
 * @description Get a list of all projects
 * @access private
 */
```

```javascript
/**
 * @route GET api/projects/users/:userId
 * @description Get a list of projects of which a user is a member
 * @access private
 */
```

```javascript
/**
 * @route GET api/projects/:id
 * @description Get a single project by id
 * @access private
 */
```

```javascript
/**
 * @route PUT api/projects/:id
 * @description Update a project
 * @body {addedMemberId}
 * @access private
 */
```

### Comment APIs

```javascript
/**
 * @route POST api/comments
 * @description Create a new comment
 * @body {content}
 * @access private
 */
```

```javascript
/**
 * @route GET api/comments/tasks/:taskId
 * @description Get a list of comments about a task
 * @access private
 */
```

### Invitation APIs

```javascript
/**
 * @route POST api/invitations
 * @description create a new invitation
 * @body { email, name }
 * @access private, manager
 */
```

```javascript
/**
 * @route GET api/invitations/confirm_email
 * @description
 * @access public
 */
```

## Diagram Relation

![Diagram](./Tasuku-ERD.png)
