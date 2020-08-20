import { PrismaClient } from "@prisma/client";

export default async function create(req, res) {
  try {
    const prisma = new PrismaClient({ log: ["query"] });
    const userData = JSON.parse(req.body);
    await prisma.user.create({
      data: {
        name: `${userData.given_name} ${userData.family_name}`,
        email: userData.email + "aabcsdfasahavdfsa",
      },
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}
