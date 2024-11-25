# Rabobank Statement Processor

## Application Overview

This application allows users to upload and analyze bank statements.  

## Features

**Home Page**
- Upload bank statements in CSV or XML format
- View validation results for uploaded files
- Download processed data as PDF
- Delete processed data
- Filter statements

**Statement Overview**
- View all processed statements in a table format
- Sort and filter statement data

## Technology Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Shadcn/ui
- React Query
- Vite

### Backend
- Express
- TypeScript
- Multer (file handling)
- xml2js (XML parsing)
- csv-parse (CSV parsing)
- jspdf (PDF generation)

## Production Readiness Improvements

### Security
- Implement authentication/authorization
- Add rate limiting
- Implement HTTPS
- Add input sanitization

### Performance
- Implement pagination for large datasets
- Optimize file processing
- Add compression for responses

### Reliability
- Add comprehensive error handling
- Implement retry mechanisms
- Add logging system
- Set up monitoring
- Increase code coverage 
- Add E2E tests

### DevOps
- Add CI/CD pipeline 

### Features
- Add user management
- Add data export options
- Support more file formats
- Add data visualization
- Implement batch processing
- Loading / error states 

### Notes
- For easy testing of the assessment, the .env files are excluded from the .gitignore.
- There are test statements included to test with in the test-statements folder
