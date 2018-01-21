---
layout: post
title: "Using var to declare variables? That's old-school."
subtitle:
date: 2017-05-01
author: Pratik Sampat
category: Web Development
finished: true
permalink: /today-i-learned/:categories/:title/
---
## ES2015: Two new ways to declare variables

![Cool unnecessary ES2015 picture](http://egorsmirnov.me/assets/berlin-angular-meetup-26/images/es2015.jpg)

**let**  - Keyword for variable declaration that solves JS's variable hoisting issue which can result in scoping issues. While *var* hoists the variable to the nearest function, *let* will scope variables to the **nearest block**.

Reassigning is allowed :white_check_mark: :
```javascript
let userName = "Pratik";
userName = "Sampat";
```
Redeclaring is not allowed in the same scope :x: :
```javascript
let userName = "Pratik";
let userName = "Sampat";
```
Redeclaring is allowed in different scopes :white_check_mark: :
```javascript
let userName = "Pratik"
function loadUser(userArray) {
     let userName = "Sampat";
     return userName;
}
```

**const** - Creates read-only named constants, typically in all CAPS. They cannot be reassigned and must be assigned an initial value.  They are block scoped not hoisted to the top of the function.

Typically declared in uppercase :white_check_mark: :
```javascript
const FIRST_NAME = "Pratik"; //I dont expect my first name to ever change
```

## Advantages of these new types of variables


*let* and *const* prevent scoping issues. This is extremely clear in **asynchronous** javascript.   For example, the code below produces unexpected behavior:

```javascript
function loadProfiles (userArray) {
  for (var i of userArray) {
    setTimeout(function() {console.log("Fetched for ", i);}, 0);
    }
}

loadProfiles(["Pratik", "Sohil"]);
```
Result :x: :

```
Expected:
Fetched for Pratik
Fetched for Sohil

Actual:
Fetched for Sohil
Fetched for Sohil
```
In this case, ```var``` hoisted the ```i``` variable to the top of the ```loadProfiles``` function (out of the ```for``` loop scope). When the callback is executed, the ```i``` variable referenced was outside the loop.  Keep in mind, because our callbacks are async, the loop completes before any are actually executed.

We can use *let* or *const* to fix this!


```javascript
function loadProfiles (userArray) {
  for (let i of userArray) {
    setTimeout(function() {console.log("Fetched for ", i);}, 0);
    }
}

loadProfiles(["Pratik", "Sohil"]);
```

Result :white_check_mark: :

```
Expected:
Fetched for Pratik
Fetched for Sohil

Actual:
Fetched for Pratik
Fetched for Sohil
```
Because ```i``` is now locally scoped within the ```for``` loop, a new ```i``` is created for each callback function.

## Let vs Const

They both behave very similarly, but use *let* for variables that you expect to change over the lifespan of the program.  *Const* expresses the idea of values that should not be changed.
