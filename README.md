# ChoreDash
### A MEAN stack odd job posting web application written by Kevin Ajili, Grant Lin, Mike Hamilton, Vikram Melkote, and Jimmy Nguyen

## Demo

### Login/Registration
![Login/Registration](https://raw.githubusercontent.com/mijhamil/CMPS115/master/Scrum%20Documents/home%20and%20registration%2C%20login%2C%20profile.gif)

### Job Posting
![Posting New Job](https://raw.githubusercontent.com/mijhamil/CMPS115/master/Scrum%20Documents/posting%20and%20editing%20post%202.gif)

### Profile/Settings
![Profile/Settings](https://raw.githubusercontent.com/mijhamil/CMPS115/master/Scrum%20Documents/profile%20and%20settings.gif)

## Usage

### To start mongodb

`sudo service mongod start`

### To start node

`nodemon` or `node app.js`

### To Start angular

`ng serve (inside the angular CLI)`

### To use the webapp visit

`http://localhost:4200` in a web browser

## Development

### Creating a new component

1. `cd <components folder>`

2. `ng g component <component name>`

### Creating a new sub webpage

1. Create a new component

2. Create a new path in inside `app.module.ts` using

    `{path:'<new path here>', component: <component name>Component}`
    
3. import router into current pre path if not already inside `<pre path>.component.ts`

   `import {Router} from'@angular/router';`
   
4. set the router inside the pre path constructor at `<pre path>.component.ts`

    `private router:Router`
    
5. Create a function in pre path and set route to your new component path

    `this.router.navigate(['posts']);`
    
6. Call this function on sumbit or button click to open your new path
