import app from "./app/app";
import { config } from "./config";
import { v2 as cloudinary } from "cloudinary";

//cloudinary config
cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

async function main() {
  app.listen(config.port, () => {
    console.log("Sever is running on port ", config.port);
  });
}

main();
