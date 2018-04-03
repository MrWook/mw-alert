# mw-alert

AngularJS module that provide contextual feedback messages for typical user actions.

## Requirements (tested in)
- Angular (v1.6.9)

## Install

You can install this package either with `npm` or with `bower`.

### npm

```shell
npm install mw-error-messages --save
```

### bower

```shell
bower install mw-error-messages
```

## Usage

Once the script is included in your html file, simply include the module in your app:
```javascript
angular.module('myApp', ['mw-alert']);
```
    

And use the function 'open' from the Service 'mwAlertService' thusly:
```javascript
mwAlertService.open({"type": "success", "text": "It is working."})
```

The alert can be closed from the user with a click on the close button or can be closed inside the code
```javascript
mwAlertService.close()
```

You can pass the parameter 'timeout' and 'close_auto' to the message object to change the behaviour of this single message
```javascript
mwAlertService.open({"type": "success", "text": "It is working.", "close_auto": false})
```

## Config

Name                    | Type      | Default 				| Description
----------------------- | --------- | --------------------- | ------------
parent_selector         | string    | body 					| set the parent selector for the alert
timeout           		| string    | 3000 					| set the timeout
close_auto              | boolean   | true 					| should the alert be closed automaticly
templateUrl           	| string    | mw-alert.html 		| set the template URL

## Demo

<a href='#' target='_blank'>View demo on Plunker</a>


## Tasklist 
- [ ] fix spelling, grammar mistakes
- [ ] create tests
