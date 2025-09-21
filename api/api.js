// server.js
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import webpush from "web-push";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // serve frontend

// Setup web-push
// webpush.setVapidDetails(
//     "mailto:admin@dayhome.com",
//     process.env.VAPID_PUBLIC_KEY,
//     process.env.VAPID_PRIVATE_KEY
// );

// Store subscriptions (in memory for now)
const subscriptions = [];

// Save subscription
// app.post("/api/subscribe", (req, res) => {
//     const subscription = req.body;
//     subscriptions.push(subscription);
//     res.status(201).json({ message: "Subscription saved" });
// });

// Send notification
// app.post("/api/notify", async (req, res) => {
//     const { title, message } = req.body;
//     const payload = JSON.stringify({ title, message });

//     try {
//         await Promise.all(
//             subscriptions.map(sub =>
//                 webpush.sendNotification(sub, payload).catch(err => {
//                     console.error("Push error:", err);
//                 })
//             )
//         );
//         res.json({ message: "Notification sent" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

app.listen(PORT, () => {
    console.log(`✅ API running at http://localhost:${PORT}`);
});
