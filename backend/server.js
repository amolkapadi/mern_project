const app = require("./api");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
mongoose.connect(process.env.DB_URL, err => {
  if (err) {
    console.log(err)
    console.log("not connected to db");
  } else {
    console.log("everything is ok!!");
  }
});
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
