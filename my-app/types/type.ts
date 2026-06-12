import { Prisma } from "@/app/generated/prisma/client";


export type PostDetail = Prisma.postGetPayload<{
    include: {
        user: true;
    }
}>

export type CreateUserInput = {
    name: string;
    age:number;
    address: string
}