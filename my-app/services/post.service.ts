import { post } from "@/app/generated/prisma/browser";
import { prisma } from "@/lib/prisma";

export async function getPost(): Promise<post[]>{
    return await prisma.post.findMany();
}