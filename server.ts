import * as open from "open";
import * as express from "express";
const app = express();

exports.serve = () => {
  app.use(express.static(__dirname + "/"));
  app.listen(3000, () => {
    console.log("fetch-playground is runnig on http://localhost:3000/");
    open("http://localhost:3000/");
  });
};
