# Node Mongo CRUD API
This project is a basic Node.js + Express API with MongoDB for storing Work Experience and Portfolio data.

## 🛠 Stack
- Node.js
- Express
- MongoDB + Mongoose

## 📦 Setup and running
```bash
git clone
npm install
npm start

##Endpoint API
#Work Experience
POST /api/work-experiences/getAllWorkExperience
POST /api/work-experiences/insert
PUT /api/work-experiences/update/:id #:id is equal to id_user value
DELETE /api/work-experiences/delete/:id #:id is equal to id_user value

#Portfolio
POST /api/portfolios/getAllPortfolio
POST /api/portfolios/insert
PUT /api/portfolios/update/:id #:id is equal to id_user value
DELETE /api/portfolios/delete/:id #:id is equal to id_user value