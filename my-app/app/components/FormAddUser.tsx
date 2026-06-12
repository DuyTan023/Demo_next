import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Định nghĩa cấu trúc dữ liệu form
interface UserFormInput {
  name: string;
  age: number;
  address: string;
}

export default function AddUserAlertDialog() {
  // Quản lý trạng thái đóng/mở của AlertDialog
  const [open, setOpen] = useState(false);

  // Sử dụng react-hook-form để quản lý dữ liệu ô nhập
  const { register, handleSubmit, reset } = useForm<UserFormInput>();

  // Xử lý khi nhấn nút "Lưu"
  const onSubmit = (data: UserFormInput) => {
    console.log("Dữ liệu người dùng mới:", data);
    
    // Xử lý thêm logic (gọi API, cập nhật danh sách...) ở đây
    
    reset(); // Xóa trống form
    setOpen(false); // Đóng alert dialog
  };

  // Xử lý khi nhấn nút "Hủy"
  const handleCancel = () => {
    reset(); // Xóa dữ liệu tạm thời đã nhập
    setOpen(false); // Đóng alert dialog
  };

  return (
    <div className="p-6">
      {/* Component AlertDialog chính */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        
        {/* Nút bấm để kích hoạt mở Form */}
        <AlertDialogTrigger asChild>
          <Button variant="default" className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Thêm người dùng
          </Button>
        </AlertDialogTrigger>

        {/* Nội dung hộp thoại hiển thị ở giữa màn hình */}
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-gray-900">
              Thêm mới người dùng
            </AlertDialogTitle>
            
            {/* Đưa Form vào bên trong AlertDialogDescription */}
            <AlertDialogDescription className="text-gray-600 pt-2">
              Vui lòng điền đầy đủ các thông tin bên dưới để thêm thành viên mới vào hệ thống.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Thẻ Form bọc các ô Input */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
            
            {/* Ô nhập Tên */}
            <div className="space-y-1">
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Họ và tên
              </Label>
              <Input
                id="name"
                placeholder="Nhập họ và tên..."
                {...register("name", { required: true })}
              />
            </div>

            {/* Ô nhập Tuổi */}
            <div className="space-y-1">
              <Label htmlFor="age" className="text-gray-700 font-medium">
                Tuổi
              </Label>
              <Input
                id="age"
                type="number"
                placeholder="Nhập tuổi..."
                {...register("age", { required: true, valueAsNumber: true })}
              />
            </div>

            {/* Ô nhập Địa chỉ */}
            <div className="space-y-1">
              <Label htmlFor="address" className="text-gray-700 font-medium">
                Địa chỉ
              </Label>
              <Input
                id="address"
                placeholder="Nhập địa chỉ..."
                {...register("address", { required: true })}
              />
            </div>

            {/* Thanh chứa 2 nút Lưu và Hủy */}
            <AlertDialogFooter className="pt-4 gap-2 sm:gap-0">
              {/* Nút Hủy (sử dụng component có sẵn của shadcn để tự đóng) */}
              <AlertDialogCancel type="button" onClick={handleCancel}>
                Hủy
              </AlertDialogCancel>
              
              {/* Nút Lưu (Dùng nút thường type="submit" để kích hoạt hàm onSubmit) */}
              <Button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Lưu
              </Button>
            </AlertDialogFooter>
            
          </form>
        </AlertDialogContent>
        </AlertDialog>
    </div>
  );
}