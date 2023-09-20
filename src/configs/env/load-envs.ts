import dotenv from "dotenv";
import fs from "fs";
import path from "path";

if (process.env.ENVIRONMENT === "test" && !fs.existsSync(path.join(__dirname, "..", "..", "..", ".env.test"))) {
  // eslint-disable-next-line no-console
  console.error("The .env.test file is missing with the variables and their values");
}

if (process.env.ENVIRONMENT !== "test" && !fs.existsSync(path.join(__dirname, "..", "..", "..", ".env"))) {
  // eslint-disable-next-line no-console
  console.error("The .env file is missing with the variables and their values");
}
dotenv.config({
  path:
    process.env.ENVIRONMENT === "test" ?
      path.join(__dirname, "..", "..", "..", ".env.test") :
      path.join(__dirname, "..", "..", "..", ".env"),
});
