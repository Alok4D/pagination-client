const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1yjndj5.mongodb.net/emaJohnDB?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    const productCollection = client.db("emaJohnDB").collection("products");

    // GET products with pagination
    app.get("/products", async (req, res) => {
      const page = parseInt(req.query.page) || 0;
      const size = parseInt(req.query.size) || 10;

      const result = await productCollection.find().skip(page * size).limit(size).toArray();
      res.send(result);
    });

    // GET total product count
    app.get("/productsCount", async (req, res) => {
      const count = await productCollection.estimatedDocumentCount();
      res.send({ count });
    });

    // POST products by IDs
    app.post("/productsByIds", async (req, res) => {
      try {
        const ids = req.body;
        if (!Array.isArray(ids) || ids.length === 0) return res.status(400).send({ error: "No ids provided" });

        const idsWithObjectId = ids.map(id => new ObjectId(id));
        const products = await productCollection.find({ _id: { $in: idsWithObjectId } }).toArray();
        res.send(products);
      } catch (err) {
        console.error("❌ /productsByIds error:", err.message);
        res.status(500).send({ error: "Invalid ids" });
      }
    });

  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("🚀 Server running...");
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
