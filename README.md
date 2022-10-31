
# [Euro Football Records](https://euro-footbal-portal.vercel.app/)

![home page](public/images/Screen%20Shot%202022-10-31%20at%2010.49.29.png)

We've obtained a dataset of european football matches from the year 2001 to the year 2022. 
The aim of the project is to provide a means for various users like data analysts to be able to query this data and get direct/quick resuts but 
also to be able to see some quick operations on the data to better visualize it. In addition to that they will
be able to get the query results downloaded in multiple formats


## Technical Details
Euro football records is built using nextjs a reactjs framework. The primary reasons behind this choice of framework are

- How easy it is to setup SSR rendering which is essential in improving page load times
- The reasy availablity of a simple to use backend which is needed for my strategy to simulate a real life data platform
- Native support in vercel which would be used to deploy the application

Other good alternatives to this would be sveltekit and nuxt. 

### Dependencies
In order to achieve the tasks of this projects certain dependencies needed to be installed to fast track certain functionalities. They include:

- **@emotion/styled** - **@emotion/react**: For styling the components of the page
- **valtio** - for easy global state management
- **exceljs** - The application provides possibility for exporting results as excel workbooks. This dependency is used for that.
- **lodash.orderby** - for function based sorting for large lists

### Deployment
The application is deployed using [Vercel](//vercel.com)


## Page Speed

Page speed is `0.9s` as measured by [Page speed insights](https://pagespeed.web.dev/report?url=https%3A%2F%2Feuro-footbal-portal.vercel.app%2F&form_factor=desktop)

![page speed](public/images//Screen%20Shot%202022-10-31%20at%2010.50.23.png)

### Optimizations

#### Page load time
In order to improve page load time I did the following 

- First off I implemented SSR for the app which reduces the amount of time taken to render after initial load
- Also avoided loading the large data file with the page at once in order to avoid extra unwanted data. So data is gotten over an API which simulates an actual data platform with data available on the backend. Data from the backend is returned via a stream to enable better peformance while filtering. 

### Results display Optimizations
The application is built to support large amounts of data to be rendered at once. In order to achieve this, I had to implement a virtual scroll functionality which ensures that large amounts of data can be rendered without crashing the browser. 
In order to achive this, I am only displaying a subset of the data in a `virtual scoll`. 

## Features
Apart from the basic functionalities this project is expected to have, certain other featres have been added to make it easy to use for anyone as a data sourcing tool. 

- View query history along with number of results and time at which it was run. With the possibility of viewing the results again without having to run another query.
- Ability to group and filter query results by clicking for easy data viewing
- Ability to sort data easiyl by clicking
- Data export possibilities in various formats for easy export and usage.

## Next steps
Testing needs to be added. We would need to implement unit, integration/component and e2e tests if there was more time. 

