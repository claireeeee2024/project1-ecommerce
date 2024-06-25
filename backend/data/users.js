import bcrypt from "bcryptjs";
const users = [
  {
    email: "vendor1@email.com",
    password: bcrypt.hashSync("123456", 10),
    isVendor: true,
  },
  {
    email: "john@email.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    email: "vendor2@email.com",
    password: bcrypt.hashSync("123456", 10),
    isVendor: true,
  },
  {
    email: "alice@email.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
