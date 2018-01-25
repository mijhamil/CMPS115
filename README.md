# ChoreDash

## Usage

### To start mongodb

`sudo service mongod start`

### To start node

`nodemon` or `node app.js`

### To Start angular

`ng serve (inside the angular CLI)`

## Development

### Creating a new component

1. `cd <components folder>`

2. `ng g component <component name>`

### Creating a new sub webpage

1. Create a new component

2. Create a new path in inside app.module.ts using

    `{path:'<new path here>', component: <component name>Component}`
    
3. import router into current pre path if not already inside <pre path>.component.ts

   `import {Router} from'@angular/router';`
   
4. set the router inside the pre path constructor at <pre path>.component.ts

    `private router:Router`
    
5. Create a function in pre path and set route to your new component path

    `this.router.navigate(['posts']);`
    
6. Call this function on sumbit or button click to open your new path
