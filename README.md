# Setup Instructions

## Pre-requisites:

1. **Ensure Node.js is Installed:**
   - Download and install Node.js from (https://nodejs.org/en/download/).
   - Verify installation by running the following in your bash terminal:
   
     **node -v**
     
     **npm -v**

2. **Ensure Docker is Installed:**
   - Download and install Docker from (https://www.docker.com/products/docker-desktop).
   - Open GUI and make sure you see "Engine running" and also Verify installation by running the following in your terminal:
   
     **docker --version**
 

## Steps to Run the Application:

1. **Install Dependencies:**
   - Navigate to the project’s root directory in your bash terminal and install the necessary dependencies for the frontend, backend, postman and playwright using:
   
     **npm run install**

2. **Start the Docker Containers:**
   - Bring up the Docker containers in another bash terminal for frontend, backend, and MySQL:
   
     **npm run dockerSetup**
     
     **N/B:** make sure docker run successfully with success message **"webpack compiled successfully"** before going back to the initial terminal to run tests
     
3. Run API Test with Newman using:

      **npm run ApiPostmanTest** 
      
    **N/B:** Once test is done, navigate to **"WasteTrackr/backend/Postman_tests/newman"** and open HTML report file to view a well detailed test report provider by newman reporter

4. Run UI Test on Chrome with playwright using:
 
    **npm run UIChromeTest** 

5. Run UI Test on firefox with playwright using:

    **npm run UIFirefoxTest**

    **N/B:** The frontend UI Tests directory can be found in **"WasteTrackr/frontend/Playwright_tests"** and Backend API Tests can be found in **"WasteTrackr/backend/Postman_tests"**

## Expected Results:

- The App Frontend UI will be available at:
    http://localhost:3000
    
- The Backend API will be running at:
    http://localhost:5050
    
- The database will be accessible at:
    http://localhost:3306

**N/B:** In order to avoid conflits, Ensure the above ports (3000, 5050, 3306) are not occupied by other services

## Thank You and Happy testing
