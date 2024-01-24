import * as cron from "node-cron";
import https from "https";

const url = process.env.API_URL;

const cronApiCall = cron.schedule("*/14 * * * *", () => {
  // This function will be executed every 14 minutes.
  console.log("Restarting server");

  // Perform an HTTPS GET request to hit any backend api.
  https
    .get(url, (res) => {
      if (res.statusCode === 200) {
        console.log("Server restarted");
      } else {
        console.error(
          `failed to restart server with status code: ${res.statusCode}`
        );
      }
    })
    .on("error", (err) => {
      console.error("Error during Restart:", err.message);
    });
});

export default cronApiCall;
