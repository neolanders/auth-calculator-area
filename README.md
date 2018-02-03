# MyCalculator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Check Unitest ceverage

ng test --watch=false --code-coverage

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


### Start Mock Server
npm run start-auth


### Deploy APP IN AMAZON (EC2 instance)
- 1) REPLACE SERVER_NAME in buildspec.yml
- 2) SETUP YOUR AMAZON INSTANCE: [SAMPLE INSTRUCTIONS FOR ANGULAR APP USING ANGULAR CLI USING AWS suite](https://www.linkedin.com/pulse/create-angular-app-using-deploy-aws-suite-andr%C3%A9s-casta%C3%B1o/)


### Other packages I used in this project
- [@ngrx/store-devtools](https://github.com/ngrx/store-devtools) instruments your store letting you use a
[powerful time-travelling debugger](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en).
- [ngrx-store-localstorage](https://github.com/ngrx/router-store) simple syncing between ngrx store and local storage used to persist the state of the apllication 
- [@ngrx/store](./docs/store/README.md) - RxJS powered state management for Angular applications, inspired by Redux 
