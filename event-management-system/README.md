
# EventManagementSystem(EMS)

EMS is a single-page application(SPA) for managing events.This applications allows users to create, view, edit and delete events. Each event has a title, description, date and location. This application also supports user authentication(registration and login) and is responsive.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)


## Installation

- Clone the repository : https://github.com/archana-sb/Event.git
- Navigate to the project directory : cd event-management-system
- Install the dependencies : npm install, npm install -g json-server
- Start the development server : ng serve
- Start the JSON server: json-server --watch db.json
- Open your browser and navigate to `http://localhost:4200/`

## Usage

Once the application is running, you can:
- View events
- Edit existing events
- Delete events
- Add new events

## Features

- User authentication
- Responsive design
- View, Add, Delete, Edit events
- Local storage & db.json for event persistence

## Technologies Used

- Angular
- TypeScript
- Bootstrap
- RxJS
- Angular Material


## Project Structure
- App Module : This module is the root module of this application.
- Auth Module : This module contains components for login and registration, route gaurd to protect routes, auth service for authentication.
- Events Module : This module contains components for event-list, event-form(for create, edit and view), event service for crud operations.
- JSON Server : Uses db.json to mock backend
- Utility Folder: Contains reusable utility functions
- Shared Folder: Contains reusable animations
- Pipes Folder: Contains reusable pipes
- Model folder: Contains interfaces used in this application


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.





