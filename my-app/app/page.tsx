
import Link from 'next/link'
import { Button } from "@/components/ui/button"
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
       <Link href = "/posts"><Button variant="outline">Post list</Button></Link>
       <Link href = "/users"><Button variant="outline">User list</Button></Link>

    </div>
  );
}
