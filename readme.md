# Uniti Full Stack Development Coding Challenge

## Introduction

Thank you for your interest in working with us at Uniti!
We all love working with talented co-workers. This challenge is intended to help us evaluate where you are in your programming career so we can determine how you might fit within our company.

## The Challenge

### Background

In order to assess your ability to develop backend and frontend applications, we ask that you develop a RESTful API in C# .Net Core, with an accompanying React or Vue Frontend.

### Setup

1. You must first fork this repo. If you do not have a GitHub account, you will need to first sign up in order to fork it.
2. Clone your forked repo and develop the application according to the requirements below.
3. Once you think you have completed the exercise to a satisfactory level, ensure all of your code has been committed to your forked repo and issue a Pull Request back to the Uniti repo.

### Requirements

You have been tasked to build a HTTP RESTful API using C# .Net Core, with an Recact or Vue frontend.

#### Backend

All data is to be sourced from `exercise.yaml` - no need to set up a real database.

Develop an API in C# .Net Core with 2 endpoints:
1. Authorizes usernames and passwords - `auth` key in `exercise.yaml`, and returns a JWT to authenticate against the customer endpoint
2. Shows customer data - `customers` key in `exercise.yaml`

#### Frontend

Develop an React or Vue application which has two parts:
1. A login screen which authorizes via the authorization endpoint in the backend
2. Once authenticated, shows a table of customers with the data retrieved from the backend's customer endpoint.

The customer table has the following requirements:
- UI layout must be based on `ui.png`
- it must implement paging
- it must provide filters on the following:
  - tags
  - number of employees - 1-10 employees, 11-50 employees, 50+ employees

As well as the filters, each column must be able to be reordered by clicking on the appropriate heading (ascending/descending)

The customer table must not be viewable unless the user is authenticated.

## Questions?

If you have any questions around the implementation of this exercise, please open an Issue on the parent repository at https://github.com/uniti-wireless

=============================================================================================================================

### Assumptions Made:
- Paging is to be 5 items per page to show how 3 pages handle 12 items
- Tag filters are intersecting, not a union
- Applying filters should take the user back to the first page
  
### Basics:
The Implementation is a small, lightweight ASP.NET MVC C# application sporting a single page React Front end.
The home page is a minimal login screen, once authenticated with JWT, the user is taken to the Customers screen with a personalised greeting. The page supports filtering on the customers for both tags and number of employees, they work together to provide an intersected result showing customers who meet all criteria.
The user can also log out where they will be presented with the login screen.
  
### Todo:
- Beautify the front end with the clients colourscheme and logo.
- Implement unit testing on Login authentication and Customer page filters using stubbed YamlParser.
- Refractor React frontend into one file per component.
