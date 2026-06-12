import { getPost } from "@/services/post.service"
import Link from 'next/link'
export default async function Posts(){
    const data = await getPost();
    return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header của trang */}
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Quản lý người dùng
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Danh sách bài viết.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              Thêm bào viết
            </button>
          </div>
        </div>

       <div className="space-y-6">
        {data.map((post) => (
          <article key={post.id} className="group">
            {/* Tiêu đề bài post */}
            <h2 className="text-lg font-semibold text-gray-950 group-hover:text-indigo-600 transition-colors cursor-pointer">
              <a href={`/posts/${post.id}`}>{post.title}</a>
            </h2>
            
            {/* Đoạn tóm tắt */}
            <p className="mt-1.5 text-sm text-gray-600 leading-relaxed line-clamp-2">
              {post.body}
            </p>

            {/* Thanh hành động (Sửa & Xóa) */}
            <div className="flex items-center space-x-3 pt-1 flex-shrink-0">
              <button 
                className="text-xs font-medium text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded transition-colors"
              >
                Sửa
              </button>
              <button 
                
                className="text-xs font-medium text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded transition-colors"
              >
                Xóa
              </button>
            </div>
          </article>
        ))}
      </div>
              
    </div>
    </div>
  );
}