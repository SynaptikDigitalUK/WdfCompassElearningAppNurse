 # Introduction

The Compass Learning App is a progressive web app that provides educational content to
develop diabetes-related clinical capacity among primary care healthcare professionals (i.e.
medical officers, nurses and community health workers).
This README guide provides intial setup instruction for developers wishing to update or run source code.


# Developer -  Getting Started

This PWA has been developed using [Vite](https://vite.dev/), [React](https://react.dev/), with [Bootstrap CSS 5](https://getbootstrap.com/docs/5.2/getting-started/introduction/). It makes use of JSON to store content, with references to assets located within the public folder. The main react concepts used: ContextAPI, UseState


We strongly recommend using a Node version manager like [nvm](https://github.com/nvm-sh/nvm) to 
install Node.js and npm.

> Node v16+ is required to run this project

# Developer - Install dependencies


```bash
npm install
```
# Developer - Usage
To run this project on your machine and within developement mode

```bash
  npm run dev
```

To build and export project ready for production

```bash
  npm run build
```

To preview exported build 

```bash
  npm run preview
```

To preview exported build across network

```bash
  npm run host
```

# Deployment
Once you have compiled the code using `npm run build` you should then see a `dist` folder located at the root of this project. The contents of this `dist` folder should be copied to a webserver ready for public hosting. Within this `dist` folder the app can be run via the `index.html`.