# Lab Report 3 Student API

This Node.js project follows the CRUD Student Handout through Step 5. It connects Express and Mongoose to MongoDB Atlas and defines the Student model. The `crud/` folder and route comments are ready for Steps 6–9.

## Run the app

1. Run `npm ci`.
2. Copy `.env.example` to `.env` and set `MONGO_URI` to your Atlas connection string for the `studentDB` database.
3. Run `npm run dev` or `npm start`.
4. Open `http://localhost:3000/`. The response is `{"message":"Student CRUD demo is running"}`. The terminal prints `MongoDB connected successfully.` when Atlas connects.

If the default DNS resolver refuses the Atlas SRV lookup, set `MONGO_DNS_SERVERS=1.1.1.1,8.8.8.8` in `.env` and restart the server.

The handout's `/demo/reset` route deletes all records in the lab's students collection.
