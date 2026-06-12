import { getPost } from "@/services/post.service"

export default async function Posts(){
    const data = await getPost();
    return(
        <div>
            <h1>Hello welcome to Posts</h1>
            {
                data.map((d) =>(
                    <div>
                        <p className="text-2xl text-red-500">Title - {d.title}</p>
                        <p className="text-xl text-blue-500">Body - {d.body}</p>
                    </div>
                ))
            }
        </div>
    )
}