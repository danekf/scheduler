<a name="readme-top"></a>

[![React][React.js]][React-url]
# Interview Scheduler

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#Notable-npm-dependencies">Notable NPM Dependencies</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#get-scheduler-api">Get Scheduler API</a></li>
        <li><a href="#using-interview-scheduler">Using Interview Scheduler</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
 
  </ol>
</details>
<br>

## About the project

This project was built with the goal of creating a working single page interview shcheduler using the React framework. The project makes api calls to a custom scheduler-api using axios to fill out current interviews. 

The scheduler is able to add, edit or delete current interviews.

Storybook is used to build components to be added to the interview shceduler using mock data.





<br>

## Notable NPM Dependencies
<ul>
<li>Axios data fetching from database
<li>React: v16.9.0
<li>react-Dom: v16.9.0
<li>Cypress: Testing
<li>Jest: Testing
<li>Storybook: Component building
<li>Webpack Development Server: local hosting of site for development
</ul>

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<br>

# Getting Started

## Get Scheduler API
Clone [Scheduler Api][API-URL] and follow the setup instructions for PostgreSQL server. 

If you do not have a PostgreSQL server, you will need to install it prior to following those instructions.

<br>

## Setup Interview Scheduler

### Install dependencies 
```sh
npm install --save-dev-dependencies
```

## Using Interview Scheduler

### Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress

```sh
npm run cypress
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>
<br>

# Roadmap

- [ ] Add user log in
- [ ] Only allow users to add, edit or delete their own interviews.
- [ ] Deploy server to Heroku
- [ ] Deploy Continuous integration using CircleCI and Netlify

<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Screenshots










[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[API-URL]:https://github.com/lighthouse-labs/scheduler-api