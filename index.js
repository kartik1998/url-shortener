const express = require("express");
const config = require("./utils/config");
const connections = require("./utils/connections");
const Credentials = require("./models/credentials");
const Url = require("./models/url");
const utils = require("./utils/utils");

connections.establishMongoConnection();
const app = express();
app.use(express.json());

app.get("/ping", (req, res) => {
  return res.send("pong");
});

// TODO: add validation middleware for creating a short url
// TODO: add validation for all your inputs. That means that url validation should also be there

app.get("/:shrt", async (req, res) => {
  try {
    const { shrt: shortUrl } = req.params;
    const urlDoc = await Url.findOne({ shortUrl });
    if (urlDoc) {
      return res.redirect(String(urlDoc.completeUrl));
    } else {
      return res.status(404).json({ msg: "No such url found" });
    }
  } catch (err) {
    return res.status(500).json({ msg: "code phata" });
  }
});

app.post("/v1/url/short", async (req, res) => {
  try {
    const { url, appId } = req.body;
    const shortUrl = await findUniqueShortString();
    const result = await Url.create({ completeUrl: url, shortUrl, appId });
    return res.json(JSON.parse(JSON.stringify(result)));
  } catch (err) {
    return res.status(500).json({ msg: "code phata" });
  }
});

async function findUniqueShortString() {
  const shortString = utils.generateRandomString(5);
  const exists = await Url.findOne({ shortString });

  if (exists) {
    return findUniqueShortString();
  } else {
    return shortString;
  }
}

app.post("/v1/admin/credentials", async (req, res) => {
  try {
    const { appId, appSecret } = req.body;
    const secret = utils.generateSHA256Hash(appSecret);
    const result = await Credentials.create({ appId, appSecret: secret });
    return res.status(201).json(JSON.parse(JSON.stringify(result)));
  } catch (err) {
    return res.status(500).json({ msg: "code phata" });
  }
});

app.listen(config.PORT, () => {
  console.log(`listening on port ${config.PORT}`);
});
