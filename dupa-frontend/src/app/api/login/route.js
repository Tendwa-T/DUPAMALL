const fs = require("fs");
const path = require("path");

const filePath = path.resolve("src", "userData.json");
console.log(filePath);

const readUsers = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

const writeUsers = (todos) => {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2), "utf-8");
};

export function GET(req, res) {
  const users = readUsers();
  res.json(users);
}

export function POST(req, res) {
  const users = readUsers();
  const newUser = req.body;
  users.push(newUser);
  writeUsers(users);
  res.json(newUser);
}
