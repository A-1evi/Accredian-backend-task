require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.post("/referrals", async (req, res) => {
  try {
    const { name, email, phone, referredBy } = req.body;
    const referral = await prisma.referral.create({
      data: { name, email, phone, referredBy },
    });
    res.status(201).json(referral);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
