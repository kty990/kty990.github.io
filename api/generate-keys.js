// NOT IMPLEMENTED

// generate-keys.js
import webpush from "web-push";
import fs from "fs";

const vapidKeys = webpush.generateVAPIDKeys();

const envContent = `
PORT=3000
VAPID_PUBLIC_KEY=${vapidKeys.publicKey}
VAPID_PRIVATE_KEY=${vapidKeys.privateKey}
`.trim();

fs.writeFileSync(".env", envContent);

console.log("✅ VAPID keys generated and saved to .env");
console.log("Public Key:", vapidKeys.publicKey);
console.log("Private Key:", vapidKeys.privateKey);
