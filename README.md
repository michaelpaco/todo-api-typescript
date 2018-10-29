# Todo List API

[![Coverage Status](https://coveralls.io/repos/github/michaelpaco/todo-api-typescript/badge.svg?branch=master)](https://coveralls.io/github/michaelpaco/todo-api-typescript?branch=master)

### The Challenge

- Create a Todo List API in Node JS
- This is a list of all operations the API have to provide :
- Get the list of all the task of the todo list
- Check/uncheck a task
- Delete a task

Technial expectation :
- Used an NoSQL database
- Build a REST or GraphQL API
- Used ES6/7 features
- Test at least one operation

# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)
- Install [VS Code](https://code.visualstudio.com/)

# Getting started
- Clone the repository
```
git clone https://github.com/michaelpaco/todo-api-typescript.git 
```
- Install dependencies
```
cd todo-api-typescript
npm install
```
- Configure your mongoDB server
```bash
# create the db directory
sudo mkdir -p /data/db
# give the db correct read/write permissions
sudo chmod 777 /data/db
```
- Start your mongoDB server (you'll probably want another command prompt)
```
mongod
```
- Build and run the project
```
npm run build
npm start
```
Or, if you're using VS Code, you can use `cmd + shift + b` to run the default build task (which is mapped to `npm run build`), and then you can use the command palette (`cmd + shift + p`) and select `Tasks: Run Task` > `npm: start` to run `npm start` for you.

> **Note on editors!** - TypeScript has great support in [every editor](http://www.typescriptlang.org/index.html#download-links), but this project has been pre-configured for use with [VS Code](https://code.visualstudio.com/). 
Throughout the README I'll try to call out specific places where VS Code really shines or where this project has been setup to take advantage of specific features.

Finally, navigate to `http://localhost:3000` and you should see the template being served and rendered locally!
