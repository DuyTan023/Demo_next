import { post, user } from "@/app/generated/prisma/browser";
import { prisma } from "@/lib/prisma";
import { CreateUserInput, PostDetail } from "@/types/type";

export async function getPost(): Promise<post[]>{
    return await prisma.post.findMany();
}

export async function getPostById(id: number): Promise<PostDetail>{
    return await prisma.post.findUniqueOrThrow(
        {
            where: {
                id: id
            },
            include: {
                user: true
            }
        }
    )
}


export async function GetUser(): Promise<user[]>{
    return await prisma.user.findMany();
}
export async function CreateUser(data: CreateUserInput){
    const newUser = prisma.user.create({
        data: {
            name: data.name,
            age: data.age,
            address: data.address
        }
    })

    return newUser;
}   