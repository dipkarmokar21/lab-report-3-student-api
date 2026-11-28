# Lab Report 3 Student API

This Node.js project follows the CRUD Student Handout through Step 5. It connects Express and Mongoose to MongoDB Atlas and defines the Student model. The `crud/` folder and route comments are ready for Steps 6–9.

## Run the app

1. Run `npm ci`.
2. Create a `.env` file and set `MONGO_URI` to your MongoDB Atlas connection string for the `studentDB` database. For example:

   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://<db-user>:<url-encoded-password>@<cluster-host>/studentDB?retryWrites=true&w=majority
   ```

3. Run `npm run dev` or `npm start`.
4. Open `http://localhost:3000/`. The response is `{"message":"Student CRUD demo is running"}`. The terminal prints `MongoDB connected successfully.` when Atlas connects.

## Why the DNS setting is used 

An Atlas URI beginning with `mongodb+srv://` requires an SRV DNS lookup so the MongoDB driver can discover the cluster's database hosts. This project previously got `querySrv ECONNREFUSED` from Node.js's default DNS resolver, even though SRV lookups worked through other resolvers.

The optional `MONGO_DNS_SERVERS` setting selects DNS servers for this Node.js process. In `config/db.js`, `dns.setServers()` is called before `mongoose.connect()`. The current workaround in `.env` is:

```env
MONGO_DNS_SERVERS=1.1.1.1,8.8.8.8
```

Use DNS resolvers permitted by your network. Some school, company, or ISP networks block direct DNS requests to public resolvers.

## Options without a custom DNS setting

- Remove `MONGO_DNS_SERVERS` from `.env` and use the operating system's default DNS resolver. This works if that resolver supports the SRV lookup required by `mongodb+srv://`.
- If the default resolver refuses SRV lookups, ask your network administrator or ISP to fix/configure a resolver that supports them.
- Alternatively, copy the standard `mongodb://` connection string from Atlas's **Connect → Drivers** page and use it as the full `MONGO_URI`. That avoids the SRV record lookup, but still needs normal DNS lookups to resolve the database hosts. Do not just change `mongodb+srv://` to `mongodb://`; use the complete string Atlas provides.

The handout's `/demo/reset` route deletes all records in the lab's students collection.
