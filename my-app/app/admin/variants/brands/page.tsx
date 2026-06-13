"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  Upload,
  ChevronLeft,
  ChevronRight,
  Building2,
  Smartphone,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const mockBrands = [
  {
    id: 1,
    name: "Apple",
    slug: "apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    description: "Thương hiệu công nghệ hàng đầu thế giới đến từ Mỹ.",
    productCount: 24,
  },
  {
    id: 2,
    name: "Samsung",
    slug: "samsung",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
    description: "Tập đoàn điện tử đa quốc gia của Hàn Quốc.",
    productCount: 31,
  },
  {
    id: 3,
    name: "Xiaomi",
    slug: "xiaomi",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg",
    description: "Tập đoàn công nghệ Trung Quốc nổi tiếng với giá trị cao.",
    productCount: 18,
  },
  {
    id: 4,
    name: "OPPO",
    slug: "oppo",
    logo: "",
    description: "Thương hiệu điện thoại nổi bật về camera và sạc nhanh.",
    productCount: 15,
  },
  {
    id: 5,
    name: "Vivo",
    slug: "vivo",
    logo: "",
    description: "Hãng điện thoại Trung Quốc tập trung vào selfie và âm nhạc.",
    productCount: 9,
  },
  {
    id: 6,
    name: "Realme",
    slug: "realme",
    logo: "",
    description: "Thương hiệu trẻ với cấu hình mạnh, giá hợp lý.",
    productCount: 12,
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────
type Brand = (typeof mockBrands)[0];
type ModalMode = "add" | "edit" | "delete" | null;

// ─── Sub-components ───────────────────────────────────────────────────────────

function BrandAvatar({ brand }: { brand: Brand }) {
  if (brand.logo) {
    return (
      <div className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center overflow-hidden shrink-0">
        <img
          src={brand.logo}
          alt={brand.name}
          className="w-7 h-7 object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>
    );
  }
  return (
    <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
      <Building2 className="w-5 h-5 text-blue-400" />
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 px-5 py-4 flex flex-col gap-1">
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
        {label}
      </span>
      <span
        className="text-2xl font-bold"
        style={{ color: accent ?? "#0F172A" }}
      >
        {value}
      </span>
      {sub && <span className="text-xs text-slate-400">{sub}</span>}
    </div>
  );
}

// ─── Add / Edit Modal ─────────────────────────────────────────────────────────

function BrandFormModal({
  mode,
  brand,
  onClose,
}: {
  mode: "add" | "edit";
  brand?: Brand;
  onClose: () => void;
}) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-[#0F172A] font-semibold text-lg">
            {mode === "add" ? "Thêm hãng mới" : `Chỉnh sửa — ${brand?.name}`}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {/* Logo upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">
              Logo hãng
            </Label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center">
                {brand?.logo ? (
                  <img
                    src={brand.logo}
                    alt="logo"
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  <Building2 className="w-7 h-7 text-slate-300" />
                )}
              </div>
              <div className="flex-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-slate-600"
                >
                  <Upload className="w-4 h-4" />
                  Tải ảnh lên
                </Button>
                <p className="text-xs text-slate-400 mt-1.5">
                  PNG, SVG, JPG tối đa 2MB. Khuyến nghị nền trong suốt.
                </p>
              </div>
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">
              Tên hãng <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="Ví dụ: Apple, Samsung..."
              defaultValue={brand?.name}
              className="border-slate-300 focus-visible:ring-[#3B82F6]"
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">
              Slug (URL){" "}
              <span className="text-xs text-slate-400 font-normal">
                Tự động tạo
              </span>
            </Label>
            <Input
              placeholder="apple, samsung..."
              defaultValue={brand?.slug}
              className="border-slate-300 bg-slate-50 text-slate-500 focus-visible:ring-[#3B82F6]"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">
              Mô tả ngắn
            </Label>
            <Textarea
              placeholder="Thông tin giới thiệu về hãng..."
              defaultValue={brand?.description}
              rows={3}
              className="border-slate-300 focus-visible:ring-[#3B82F6] resize-none"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 pt-2">
          <Button variant="outline" onClick={onClose} className="text-slate-600">
            Hủy
          </Button>
          <Button
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white gap-2"
          >
            {mode === "add" ? (
              <>
                <Plus className="w-4 h-4" /> Thêm hãng
              </>
            ) : (
              <>
                <Pencil className="w-4 h-4" /> Lưu thay đổi
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────

function DeleteModal({
  brand,
  onClose,
}: {
  brand: Brand;
  onClose: () => void;
}) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#0F172A] font-semibold text-lg">
            Xóa hãng điện thoại
          </DialogTitle>
        </DialogHeader>
        <div className="py-2 space-y-3">
          <p className="text-slate-600 text-sm leading-relaxed">
            Bạn sắp xóa hãng{" "}
            <span className="font-semibold text-slate-900">{brand.name}</span>.
            Hành động này không thể hoàn tác.
          </p>
          {brand.productCount > 0 && (
            <div className="flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-lg px-4 py-3">
              <Smartphone className="w-4 h-4 text-[#F97316] mt-0.5 shrink-0" />
              <p className="text-sm text-orange-700">
                Hãng này đang có{" "}
                <span className="font-semibold">{brand.productCount} sản phẩm</span>.
                Vui lòng chuyển hoặc xóa sản phẩm trước khi xóa hãng.
              </p>
            </div>
          )}
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} className="text-slate-600">
            Hủy
          </Button>
          <Button
            disabled={brand.productCount > 0}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Xóa hãng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function BrandsPage() {
  const [search, setSearch] = useState("");
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedBrand, setSelectedBrand] = useState<Brand | undefined>();

  const filtered = mockBrands.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.slug.toLowerCase().includes(search.toLowerCase())
  );

  const totalProducts = mockBrands.reduce((s, b) => s + b.productCount, 0);

  function openEdit(brand: Brand) {
    setSelectedBrand(brand);
    setModalMode("edit");
  }
  function openDelete(brand: Brand) {
    setSelectedBrand(brand);
    setModalMode("delete");
  }
  function closeModal() {
    setModalMode(null);
    setSelectedBrand(undefined);
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 space-y-6">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
            <span>Quản lý sản phẩm</span>
            <span>/</span>
            <span className="text-[#3B82F6] font-medium">Hãng điện thoại</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
            Hãng điện thoại
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Quản lý tất cả thương hiệu được bán tại cửa hàng
          </p>
        </div>
        <Button
          onClick={() => setModalMode("add")}
          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white gap-2 h-10 px-5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Thêm hãng mới
        </Button>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          label="Tổng hãng"
          value={mockBrands.length}
          sub="thương hiệu đang hoạt động"
        />
        <StatCard
          label="Tổng sản phẩm"
          value={totalProducts}
          sub="thuộc các hãng"
          accent="#3B82F6"
        />
        <StatCard
          label="Hãng nổi bật"
          value="Samsung"
          sub="nhiều sản phẩm nhất"
          accent="#F97316"
        />
        <StatCard
          label="Mới nhất"
          value="Realme"
          sub="thêm gần đây"
          accent="#22C55E"
        />
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Tìm tên hãng, slug..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 border-slate-300 focus-visible:ring-[#3B82F6] h-9 text-sm"
            />
          </div>
          <span className="text-sm text-slate-400 shrink-0">
            {filtered.length} / {mockBrands.length} hãng
          </span>
        </div>

        {/* Table */}
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="w-12 text-center text-xs font-semibold text-slate-500 uppercase tracking-wide">
                #
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Hãng
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">
                Slug
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">
                Mô tả
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide text-center">
                Sản phẩm
              </TableHead>
              <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">
                Hành động
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-16">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <Building2 className="w-10 h-10 opacity-30" />
                    <p className="text-sm">Không tìm thấy hãng nào</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearch("")}
                      className="text-[#3B82F6] text-xs"
                    >
                      Xóa bộ lọc
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {filtered.map((brand, idx) => (
              <TableRow
                key={brand.id}
                className="hover:bg-blue-50/40 transition-colors group"
              >
                {/* STT */}
                <TableCell className="text-center text-sm text-slate-400 font-mono">
                  {idx + 1}
                </TableCell>

                {/* Brand info */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <BrandAvatar brand={brand} />
                    <div>
                      <p className="font-semibold text-[#0F172A] text-sm">
                        {brand.name}
                      </p>
                      <p className="text-xs text-slate-400 md:hidden">
                        {brand.slug}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Slug */}
                <TableCell className="hidden md:table-cell">
                  <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded">
                    {brand.slug}
                  </span>
                </TableCell>

                {/* Description */}
                <TableCell className="hidden lg:table-cell">
                  <p className="text-sm text-slate-500 max-w-xs truncate">
                    {brand.description || (
                      <span className="italic text-slate-300">Chưa có mô tả</span>
                    )}
                  </p>
                </TableCell>

                {/* Product count */}
                <TableCell className="text-center">
                  <Badge
                    variant="secondary"
                    className={
                      brand.productCount > 0
                        ? "bg-blue-50 text-[#3B82F6] border border-blue-100 font-semibold"
                        : "bg-slate-100 text-slate-400"
                    }
                  >
                    {brand.productCount}
                  </Badge>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem
                        onClick={() => openEdit(brand)}
                        className="gap-2 text-sm cursor-pointer"
                      >
                        <Pencil className="w-4 h-4 text-[#3B82F6]" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openDelete(brand)}
                        className="gap-2 text-sm cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        Xóa hãng
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50">
          <p className="text-xs text-slate-500">
            Hiển thị <span className="font-medium">{filtered.length}</span> hãng
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 border-slate-200 text-slate-500"
              disabled
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </Button>
            <Button
              size="sm"
              className="h-7 w-7 bg-[#3B82F6] text-white text-xs font-semibold hover:bg-[#2563EB]"
            >
              1
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 border-slate-200 text-slate-500"
              disabled
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      {modalMode === "add" && <BrandFormModal mode="add" onClose={closeModal} />}
      {modalMode === "edit" && selectedBrand && (
        <BrandFormModal mode="edit" brand={selectedBrand} onClose={closeModal} />
      )}
      {modalMode === "delete" && selectedBrand && (
        <DeleteModal brand={selectedBrand} onClose={closeModal} />
      )}
    </div>
  );
}