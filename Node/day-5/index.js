const crypto = require("crypto")

// 1. randomBytes
// const randomvalues = crypto.randomBytes(100);

// console.log(randomvalues.toString("hex"))


// 2. createHash
// const hashvalue = crypto.createHash("sha256").update("Saurabh").digest("hex")

// const inputValue = "Saurabh"
// const matchValue = crypto.createHash("sha256").update(inputValue).digest("hex")


// if(hashvalue === matchValue){
//     console.log("you can login")
// }
// else{
//     console.log("Something went wrong")
// }

// *encryption and decryption

// Secret key and initialization vector (IV)
const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32); // 32 bytes key for AES-256
const iv = crypto.randomBytes(16);  // 16 bytes IV

// Function to encrypt
function encryptObject(obj) {
  const jsonData = JSON.stringify(obj); // convert object to string
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(jsonData, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// Function to decrypt
function decryptObject(encryptedData) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return JSON.parse(decrypted); // back to object
}

// Example usage
const sampleObj = { name: "Saura", age: 21, role: "Dev" };
console.log("Original Object:", sampleObj);

const encrypted = encryptObject(sampleObj);
console.log("Encrypted String:", encrypted);

const decrypted = decryptObject(encrypted);
console.log("Decrypted Object:", decrypted);
