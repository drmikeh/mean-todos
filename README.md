# MEAN TODOs

A TODOs App using MEAN Stack and the angular-fullstack Yeoman Generator

## Table of Contents
* [Step 0 - Install / Update Tools](#step-0---install-/-update-tools)
* [Step 1 - Create the project](#step-1---create-the-project)
* [Step 2 - Kick the tires](#step-2---kick-the-tires)
* [Step 3 - Add client code for a TODO list](#step-3---add-client-code-for-a-todo-list)
* [Step 4 - Add server code for a TODO list](#step-4---add-server-code-for-a-todo-list)
* [Step 5 - Add a Delete button for TODOs.](#step-5---add-a-delete-button-for-todos.)

## Step 0 - Install / Update Tools

0a. To get started, make sure you install / update the following:

```bash
npm install -g npm                           # install / update npm
npm install -g yo                            # install / update yo
npm install -g grunt                         # install / update grunt
npm install -g bower                         # install / update bower
```

0b. Test the versions:

```bash
npm --version          # 3.3.8
yo --version           # 1.4.8
grunt --version        # grunt-cli v0.1.13
bower --version        # 1.6.3
```

Your version numbers may vary slightly but should be close to the version numbers above.

0c. Install / Update the angular-fullstack generator:

```bash
npm install -g generator-angular-fullstack
```

> If you get the following errors you can ignore them:

```
npm WARN EPEERINVALID generator-angular-fullstack@2.1.1 requires a peer of yo@>=1.2.0 but none was installed.
npm WARN EPEERINVALID generator-ng-component@0.0.10 requires a peer of yo@>=1.0.0 but none was installed.
```

## Step 1 - Create the project

1a. Use Yeoman to create your project in a new directory:

```bash
cd ~/ga/wdi/mini-projects
mkdir -p mean/todos
cd mean/todos
yo angular-fullstack
```

Choose the following for the project:

# Client

* ? What would you like to write scripts with? _JavaScript_
* ? Would you like to use Javascript ES6 in your client by preprocessing it with Babel? _No_
* ? What would you like to write markup with? _HTML_
* ? What would you like to write stylesheets with? _Sass_
* ? What Angular router would you like to use? _uiRouter_
* ? Would you like to include Bootstrap? _Yes_
* ? Would you like to include UI Bootstrap? _Yes_

# Server

* ? Would you like to use mongoDB with Mongoose for data modeling? _Yes_
* ? Would you scaffold out an authentication boilerplate? _Yes_
* ? Would you like to include additional oAuth strategies? _Google, Facebook, Twitter_
* ? Would you like to use socket.io? _Yes_

1b. Test the build

```bash
grunt
```

1c. Save your work

The generator has created a .gitignore file for you. So just run the following in the Termial:

```bash
git init
git add -A
git commit -m "Created project"
git tag step1
```

## Step 2 - Kick the tires

2a. Check out the code that was generated.

2b. Generator Observations:

* This generator uses _grunt_ instead of _gulp_, they are very similar tools.
* We have a _client_ folder and a _server_ folder. What do you think we will find in each folder?
* Running `grunt serve` will start up the server and open our browser on port 9000:

    Express server listening on 9000, in development mode

* Try the _Sign up_, _Login_, and _Logout_.
* Try adding and removing some "Things".
  - Try it with 2 browsers open side-by-side and notice the real-time updates. This is `websockets` via the `angular-socket-io` (client) and `socket.io` (server) libraries.
* See if the newly added Things are in MongoDB:

```bash
mongo todos-dev
> show collections
> db.users.find();
> db.things.find();
```

* The generator has setup 2 user accounts for you (see `server/config/seed.js`). What are these account emails and passwords?
  - name: 'Test User', email: 'test@test.com', password: 'test'
  - name: 'Admin', email: 'admin@admin.com', password: 'admin'
* The OAuth options would need some additional setup / registration to get them working (but the plumbing is there). See the files under `server/config/` and also see the documentation at [Generator Angular Fullstack](https://github.com/DaftMonk/generator-angular-fullstack#heroku).

2c. Notice the project config files:

* `Gruntfile.js`
* `package.json`
* `bower.json`
* `.bowerrc`
* `.gitignore`

2d. Check out the _client_ code:

* `client/index.html`: the main index.html page for the client (with lots of special comments).
* `client/app/app.js`: declares and configures our `todosApp` Angular module.
* Notice that this generator does not use the IIFE / Module pattern!!!
* `client/app/app.scss`: main SASS file.
* `client/app/account/`:
  - account.js`: configures the routing for the account routes.
  - `login`: LoginCtrl, view, SCSS file.
  - `settings`: SettingsCtrl, view.
  - `signup`: SignupCtrl, view.
* `client/app/admin/`: route config, AdminCtrl, view, SCSS file.
* `client/app/main/`: route config, MainCtrl, view, SCSS file.
  - MainCtrl and view manage the list of "Things".
  - MainCtrl uses `$scope` instead of "controller as" (boooo).
    * See [Enhancement](https://github.com/DaftMonk/generator-angular-fullstack/issues/984)
  - MainCtrl uses `$http` instead of delegating to a service.
* `client/components/auth`: Auth and User services (written as factories).
* `client/components/modal`: support for a nice Modal window (not called anywhere)
* `client/components/mongoose-error`: directive to remove Mongoose error after input.
* `client/components/navbar`: NavbarCtrl and view
* `client/components/socket`: socket service (written as a factory). Simply pass in a model name, array, and callback and get the array updated for you when a 'Model:save' or 'Model:remove' socket event is received. See `app/main/main.controller.js` and look for the following lines:

```javascript
...
socket.syncUpdates('thing', $scope.awesomeThings);
...
socket.unsyncUpdates('thing');
```

2d. Check out the _server_ code:

* `server/app.js`: config for Express app
* `server/routes.js`: master Router config
* `server/api/thing`: Router config (RESTful endpoints), Controller functions, Mongoose model, socketio config
* `server/api/user`: Router config (RESTful endpoints), Controller functions, Mongoose model
* `server/auth`: config for local and OAuth authentication
* `components/errors`: common error handling support
* `config/`: environment specific configuration
  - each environment (dev, test, prod) can be configured
  - use `seedDB: true` for environments that need the seed data
* `views/404.html`: the 404 error view (when 404 occurs outside of '/api' routes)
  - Seems like it isn't used, 404s just redirect to main page.

## Step 3 - Add client code for a TODO list

3a. Let's create a branch for our new feature:

```bash
git checkout -b todo-list
```

3b. The `angular-fullstack` generator comes with sub-generators that can be used to add new routes, controllers, services, endpoints, etc. We will start with creating a new client-side route (which will include the router config, the controller, and the view):

```bash
yo angular-fullstack:route todos
```

When prompted, you can accept the default values for the location of the files and the URL.

You may need to do a `grunt` build to inject the new files into `client/index.html`

Take a quick tour of the new files:

* client/app/todos/todos.controller.js
* client/app/todos/todos.controller.spec.js
* client/app/todos/todos.html
* client/app/todos/todos.js
* client/app/todos/todos.scss

3c. Add a link for hte new route to the navbar:

Edit `client/components/navbar/navbar.html` and add the following just above the Admin link:

```html
<li ng-show="isLoggedIn()" ng-class="{active: isActive('/todos')}"><a href="/todos">TODOs</a></li>
```

3c. Kick the tires of the new route (you will need to be logged in to see the navbar link).

3d. Where did the navbar go? We need to add it to our new TODOs view:

Edit `client/app/todos/todos.html` and add the following line (copied from `client/app/main/main.html`) at the very top:

```html
<div ng-include="'components/navbar/navbar.html'"></div>
```

Test it out.

3e. Add a todo service for managing the TODOs data (use the provided sub-generator):

```bash
yo angular-fullstack:service todosService
```

When prompted, you can accept the default values for the location of the files and the URL.

Edit `client/app/todoService/todosService.service.js` set its contents to the following:

```javascript
'use strict';

angular.module('todosApp')
  .service('todosService', function ($http) {

    var self = this;

    self.getAll = function() {
      return $http.get('/api/todos/');
    };

    self.add = function(todo) {
      console.log('adding:', JSON.stringify(todo));
      return $http.post('/api/todos/', { todo: todo });
    };

    self.get = function(todo) {
      return $http.get('/ai/todos/' + todo._id);
    };

    self.update = function(todo) {
      return $http.put('/api/todos/' + todo._id, { todo: todo });
    };

    self.remove = function(todo) {
      return $http.delete('/api/todos/' + todo._id);
    };
  });
```

Note that each of the above methods is returning a _promise_.

3f. Update the TodosCtrl to use the todoService

Now edit `client/app/todos/todos.controller.js` and set the content to the following:

```javascript
'use strict';

angular.module('todosApp')
  .controller('TodosCtrl', function ($scope, todosService) {

    $scope.todos = [];

    $scope.getAll = function() {
      todosService.getAll().then(function(response) {
        $scope.todos = response.data;
      });
    };

    $scope.add = function() {
      var todo = { name: $scope.newTodoName, completed: false };
      todosService.add(todo).then(function(response) {
        $scope.newTodoName = '';
        $scope.getAll();
      });
    };

    $scope.update = function(todo) {
      todosService.update(todo).then(function(response) {
        $scope.getAll();
      });
    };

    $scope.remove = function(todo) {
      todosService.remove(todo).then(function(response) {
        $scope.getAll();
      });
    };

    $scope.getAll();

  });
```

3g. Update the Todos view to display the todos

Edit `client/app/todos/todos.html` and add the following:

```html
<div ng-include="'components/navbar/navbar.html'"></div>
<div class="col-md-12">
  <h3>TODOs</h3>
  <div class="todo" ng-repeat = "todo in todos">
    <label>
      <input type="checkbox" ng-model="todo.completed" ng-change="save(todo);"> {{ todo.name }}
    </label>
  </div>
  <hr/>
  <form ng-submit="add()">
    <label>Add a TODO:
      <input type="text" ng-model="newTodoName"/>
    </label>
  </form>
</div>
```

Test it out.

3h. Save your work

```bash
git add -A
git commit -m "Added client code for TODOs"
```

## Step 4 - Add server code for a TODO list

4a. Use a sub-generator to create a new RESTful endpoint:

```bash
yo angular-fullstack:endpoint todos
```

Check out the new files:

* server/api/todo/index.js
* server/api/todo/todo.controller.js
* server/api/todo/todo.model.js
* server/api/todo/todo.socket.js
* server/api/todo/todo.spec.js

4b. Define the TODO Model Schema

Edit `server/api/todo/todo.model.js` and replace the contents with:

```javascript
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoSchema = new Schema({
  name: String,
  completed: Boolean
});

module.exports = mongoose.model('Todo', TodoSchema);
```

4c. Add the Todo model to the User model:

Edit `server/api/user/user.model.js` and add the following:

```javascript
...
var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];
var Todo = require('../todo/todo.model');     # <==== add this line
...
var UserSchema = new Schema({
  name: String,
  email: { type: String, lowercase: true },
  todos: [Todo.schema],                       # <==== add this line
...
```

4d. Add some todos to the seeds file:

Edit `server/config/seed.js`:

```javascript
var todos = [
  new Todo({ name: 'Groceries', completed: false }),
  new Todo({ name: 'Feed the cat', completed: false }),
  new Todo({ name: 'Learn AngularJS', completed: true })
];

User.find({}).remove(function() {

  var testUser = new User();
  testUser.provider = 'local';
  testUser.name = 'Test User';
  testUser.email = 'test@test.com';
  testUser.password = 'test';
  testUser.todos.push(todos[0]);
  testUser.todos.push(todos[1]);
  testUser.todos.push(todos[2]);

  var adminUser = new User();
  adminUser.provider = 'local';
  adminUser.role = 'admin';
  adminUser.name = 'Admin';
  adminUser.email = 'admin@admin.com';
  adminUser.password = 'admin';

  User.create(testUser, adminUser, function() {
    console.log('finished populating users');
  });
});
```

Test it out via `grunt serve` and `mongo`:

```bash
mongo todos-dev
> db.users.find({ email: "test@test.com" });
```

4e. Fix the todo controller functions

The generated code for the todo controller functions would work for an independent collection of TODO documents, but we have embedded the documents inside of the User model. So we need to update the controller functions to manage todos inside of a user doc.

Edit `server/api/todo/todo.controller.js` and set the content to the following:

```javascript
'use strict';

var _ = require('lodash');
var Todo = require('./todo.model');
var User = require('../user/user.model');

function findTodoById(user, id) {
  return _.find(user.todos, function(todo) {
    return todo._id.equals(id);
  });
}

// Get list of todos
exports.index = function(req, res) {
  var userId = req.user._id;  // req.user is populated by the isAuthenticated function.
  User.findById(userId, function(err, user) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(user.todos);
  });
};

// Get a single todo
exports.show = function(req, res) {
  User.findById(req.user._id, function (err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.status(404).send('Not Found'); }
    var todo = findTodoById(user, req.params.id);
    if (todo) {
      return res.json(todo);
    }
    else {
      return res.status(404).send('Not Found');
    }
  });
};

// Creates a new todo in the DB.
exports.create = function(req, res) {
  User.findById(req.user._id, function(err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.send(404); }
    user.todos.push(new Todo(req.body.todo));
    user.save(function() {
      return res.json(201, user.todos);
    });
  });
};

// Updates an existing todo in the DB.
exports.update = function(req, res) {
  User.findById(req.user._id, function(err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.send(404); }
    var todo = findTodoById(user, req.params.id);
    _.merge(todo, req.body.todo);
    user.save(function (err, saved) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(todo);
    });
  });
};

// Deletes a todo from the DB.
exports.destroy = function(req, res) {
  User.findById(req.user._id, function(err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.send(404); }
    var todo = findItemInCart(user, cartItemId);
    if (todo) {
      user.todos.pull(todo._id); // pull is a feature of MongooseArray!
    } else {
      return res.send(404);
    }
    user.save(function() {
      return res.json(200, user.todos);
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
```

4f. Add authorization checks to the todo route config:

Edit `server/api/todo/index.js` and set the content to the following (which adds the `auth.isAuthenticated()` check to each endpoint):

```javascript
'use strict';

var express = require('express');
var controller = require('./todo.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/',       auth.isAuthenticated(), controller.index);
router.get('/:id',    auth.isAuthenticated(), controller.show);
router.post('/',      auth.isAuthenticated(), controller.create);
router.put('/:id',    auth.isAuthenticated(), controller.update);
router.patch('/:id',  auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
```

4g. Test it all out.

* Create some new TODOs
* Check and uncheck the completed checkboxes for TODOs

4h. Save your work:

```bash
git add -A
git commit -m "Added TODOs list"
git tag step4

## Step 5 - Add a Delete button for TODOs.

Add a delete button to the TODOs and connect it to the TodoCtrl.remove method.
Test it out and see if you can delete a TODO.

