import { getPost } from "@/services/post.service"
import Link from 'next/link'
export default async function Posts(){
    const data = await getPost();
    return(
        <div>
            <h1>Hello welcome to Posts</h1>
            {
                data.map((d) =>(
                    <div key={d.id}>
                        <Link href={`/posts/${d.id}`}><p className="text-2xl text-red-500">Title - {d.title}</p></Link>
                        
                        <p className="text-xl text-blue-500">Body - {d.body}</p>
                    </div>
                ))
            }
        </div>
    )
}