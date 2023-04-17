const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = 3000;

mongoose.connect(
    `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.ufj0f.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
app.use(morgan("dev"));

app.use(cors({
    origin: "*"
}));

app.use(express.json());

// Book router
app.use("/book", require("./routes/book"));


app.listen(PORT, () => console.log(`App is running on ${PORT}`));