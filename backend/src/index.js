const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.mongodb.net/?retryWrites=true&w=majority`,
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