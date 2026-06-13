'use client';

import React from 'react';
import { 
  Edit, 
  Trash2, 
  ArrowLeft, 
  Smartphone, 
  Cpu, 
  Battery, 
  Wifi, 
  Aperture,
  Layers
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

// Mock data dựa trên schema database của bạn
const mockVariantData = {
  product: {
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    category: 'Cao cấp',
    description: 'Điện thoại cao cấp nhất của Apple năm 2023 với khung Titanium...',
  },
  variant: {
    sku: 'IP15PM-256GB-TITAN',
    price: 34990000,
    stock: 45,
    color: { name: 'Titan Tự nhiên', hex_code: '#8B8989' },
    storage: '256GB',
    ram: '8GB',
  },
  images: [
    { id: 1, url: 'https://via.placeholder.com/400x500', is_featured: true },
    { id: 2, url: 'https://via.placeholder.com/100x100', is_featured: false },
    { id: 3, url: 'https://via.placeholder.com/100x100', is_featured: false },
  ],
  specs: {
    screen: [
      { key: 'Kích thước màn hình', value: '6.7 inch' },
      { key: 'Công nghệ màn hình', value: 'Super Retina XDR OLED' },
      { key: 'Độ phân giải', value: '2796 x 1290 pixels' },
    ],
    camera: [
      { key: 'Camera sau', value: 'Chính 48MP & Phụ 12MP, 12MP' },
      { key: 'Camera trước', value: '12MP' },
    ],
    performance: [
      { key: 'Chip xử lý (CPU)', value: 'Apple A17 Pro 6 nhân' },
      { key: 'Hệ điều hành', value: 'iOS 17' },
    ],
    battery: [
      { key: 'Dung lượng pin', value: '4422 mAh' },
      { key: 'Công suất sạc', value: '20W' },
      { key: 'Sạc không dây', value: 'MagSafe 15W, Qi 7.5W' },
    ],
    connectivity: [
      { key: 'Thẻ SIM', value: '1 Nano SIM & 1 eSIM' },
      { key: 'NFC', value: 'Có' },
    ],
    design: [
      { key: 'Mặt trước', value: 'Kính cường lực Ceramic Shield' },
      { key: 'Mặt lưng', value: 'Kính cường lực nhám' },
      { key: 'Khung viền', value: 'Titanium' },
      { key: 'Kháng nước/bụi', value: 'IP68' },
    ]
  }
};

export default function PhoneVariantDetail() {
  const { product, variant, images, specs } = mockVariantData;

  // Format tiền tệ VNĐ
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] p-6 text-slate-900">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-[#0F172A]">{product.name} - {variant.color.name}</h1>
            <p className="text-sm text-slate-500">SKU: {variant.sku}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-[#3B82F6] hover:bg-blue-600 text-white">
            <Edit className="w-4 h-4 mr-2" /> Cập nhật
          </Button>
          <Button variant="destructive">
            <Trash2 className="w-4 h-4 mr-2" /> Xóa biến thể
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cột trái: Hình ảnh */}
        <Card className="col-span-1 shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Hình ảnh sản phẩm</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {/* Ảnh đại diện */}
              <div className="aspect-[4/5] rounded-lg border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center">
                <img 
                  src={images.find(img => img.is_featured)?.url} 
                  alt={product.name} 
                  className="object-contain w-full h-full"
                />
              </div>
              {/* Thumbnail */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.filter(img => !img.is_featured).map((img) => (
                  <div key={img.id} className="w-20 h-20 rounded-md border border-slate-200 overflow-hidden flex-shrink-0 cursor-pointer hover:border-[#3B82F6]">
                    <img src={img.url} alt="thumbnail" className="object-cover w-full h-full" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cột phải: Thông tin cơ bản & Quản lý kho */}
        <Card className="col-span-1 lg:col-span-2 shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Thông tin cơ bản</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {/* Price & Status */}
              <div className="col-span-2 md:col-span-3 flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Giá bán hiện tại</p>
                  {/* Highlight Cam cho giá tiền */}
                  <p className="text-3xl font-bold text-[#F97316]">{formatPrice(variant.price)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500 mb-2">Trạng thái kho</p>
                  {variant.stock > 0 ? (
                    // Xanh lá cho status tốt
                    <Badge className="bg-[#22C55E] hover:bg-green-600 text-white px-3 py-1 text-sm">
                      Còn hàng ({variant.stock})
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="px-3 py-1 text-sm">
                      Hết hàng
                    </Badge>
                  )}
                </div>
              </div>

              {/* Phân loại biến thể */}
              <div>
                <p className="text-sm text-slate-500 mb-1">Hãng sản xuất</p>
                <p className="font-medium text-[#0F172A]">{product.brand}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Danh mục</p>
                <p className="font-medium text-[#0F172A]">{product.category}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Màu sắc</p>
                <div className="flex items-center gap-2">
                  <span 
                    className="w-4 h-4 rounded-full border border-slate-300" 
                    style={{ backgroundColor: variant.color.hex_code }}
                  ></span>
                  <span className="font-medium text-[#0F172A]">{variant.color.name}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">RAM</p>
                <Badge variant="outline" className="font-medium">{variant.ram}</Badge>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-1">Bộ nhớ trong (ROM)</p>
                <Badge variant="outline" className="font-medium">{variant.storage}</Badge>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div>
              <p className="text-sm text-slate-500 mb-2">Mô tả ngắn</p>
              <p className="text-sm text-slate-700 leading-relaxed">{product.description}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Thông số kỹ thuật chi tiết */}
      <div className="mt-6">
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Thông số kỹ thuật chi tiết</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="screen" className="w-full">
              <TabsList className="flex flex-wrap h-auto mb-6 bg-slate-50 p-1 rounded-lg">
                <TabsTrigger value="screen" className="data-[state=active]:bg-[#3B82F6] data-[state=active]:text-white"><Smartphone className="w-4 h-4 mr-2"/> Màn hình</TabsTrigger>
                <TabsTrigger value="camera" className="data-[state=active]:bg-[#3B82F6] data-[state=active]:text-white"><Aperture className="w-4 h-4 mr-2"/> Camera</TabsTrigger>
                <TabsTrigger value="performance" className="data-[state=active]:bg-[#3B82F6] data-[state=active]:text-white"><Cpu className="w-4 h-4 mr-2"/> Hiệu năng</TabsTrigger>
                <TabsTrigger value="battery" className="data-[state=active]:bg-[#3B82F6] data-[state=active]:text-white"><Battery className="w-4 h-4 mr-2"/> Pin & Sạc</TabsTrigger>
                <TabsTrigger value="connectivity" className="data-[state=active]:bg-[#3B82F6] data-[state=active]:text-white"><Wifi className="w-4 h-4 mr-2"/> Kết nối</TabsTrigger>
                <TabsTrigger value="design" className="data-[state=active]:bg-[#3B82F6] data-[state=active]:text-white"><Layers className="w-4 h-4 mr-2"/> Thiết kế</TabsTrigger>
              </TabsList>

              {/* Render Tabs Component */}
              {Object.entries(specs).map(([key, groupSpecs]) => (
                <TabsContent key={key} value={key} className="mt-0">
                  <div className="rounded-lg border border-slate-200 overflow-hidden">
                    <table className="w-full text-sm text-left">
                      <tbody>
                        {groupSpecs.map((spec, index) => (
                          <tr key={index} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                            <td className="w-1/3 py-3 px-4 font-medium text-slate-600 bg-slate-50/50">{spec.key}</td>
                            <td className="py-3 px-4 text-[#0F172A]">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}