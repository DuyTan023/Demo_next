import { CreateUser, getPostById } from "@/services/post.service"

export default async function PostDetail({
    params,
}:{
    params: Promise<{id: string}>
}){

    const id = Number((await params).id)
    
    const data = await getPostById(id)

    //const create = await CreateUser({name: "Phan minh Thuận", age: 20, address: "Cần Thơ"});
    return(
        <div>
            <p>{data.title}</p>
            <p>{data.body}</p>
            <p>{data.user.name}</p>
        </div>
    )
}