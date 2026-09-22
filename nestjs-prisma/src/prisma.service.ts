import { Injectable } from "@nestjs/common";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/client.js";


@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaMariaDb({
      host: "localhost",
      port: 3306,
      user: 'root',
      password: '1111',
      database: 'event-db',
      connectionLimit: 5,
    });

    super({ adapter });
  }
}