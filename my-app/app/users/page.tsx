import { GetUser } from "@/services/post.service";

export default async function ListUser(){
    const data = await GetUser();

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
              Danh sách chi tiết thông tin các thành viên trong hệ thống.
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              Thêm người dùng
            </button>
          </div>
        </div>

        {/* Bảng danh sách người dùng */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider w-24">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Họ và tên
                  </th>
                  <th scope="col" className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider w-20">
                    Tuổi
                  </th>
                  <th scope="col" className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Địa chỉ
                  </th>
                  <th scope="col" className="relative px-6 py-4 w-28">
                    <span className="sr-only">Hành động</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    {/* ID */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {user.id}
                      </span>
                    </td>
                    
                    {/* Họ tên*/}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {user.name}
                      </span>
                    </td>
                    
                    {/* Tuổi */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {user.age} tuổi
                      </span>
                    </td>
                    
                    {/* Địa chỉ */}
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {user.address}
                    </td>
                    
                    {/* Hành động (Sửa/Xóa) */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                        Sửa
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}