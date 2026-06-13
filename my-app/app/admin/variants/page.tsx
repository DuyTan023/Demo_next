"use client";

import { useState } from "react";
import {
  Smartphone,
  Tag,
  Cpu,
  Palette,
  HardDrive,
  MemoryStick,
  Layers,
  Settings2,
  ChevronRight,
  Plus,
  Pencil,
  Trash2,
  Search,
  MoreHorizontal,
  Building2,
  LayoutGrid,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Section =
  | "overview"
  | "brands"
  | "categories"
  | "colors"
  | "storages"
  | "rams"
  | "spec_groups"
  | "spec_keys"
  | "variants";

// ─── Sidebar nav items ────────────────────────────────────────────────────────

const navGroups = [
  {
    label: "Tổng quan",
    items: [
      { key: "overview" as Section, label: "Dashboard", icon: LayoutGrid },
    ],
  },
  {
    label: "Danh mục & Thương hiệu",
    items: [
      { key: "brands" as Section, label: "Thương hiệu", icon: Building2 },
      { key: "categories" as Section, label: "Phân loại sản phẩm", icon: Tag },
    ],
  },
  {
    label: "Biến thể sản phẩm",
    items: [
      { key: "colors" as Section, label: "Màu sắc", icon: Palette },
      { key: "storages" as Section, label: "Bộ nhớ ROM", icon: HardDrive },
      { key: "rams" as Section, label: "RAM", icon: MemoryStick },
      { key: "variants" as Section, label: "Biến thể sản phẩm", icon: Layers },
    ],
  },
  {
    label: "Thông số kỹ thuật",
    items: [
      { key: "spec_groups" as Section, label: "Nhóm thông số", icon: Settings2 },
      { key: "spec_keys" as Section, label: "Tên thông số", icon: Cpu },
    ],
  },
];

// ─── Mock data ────────────────────────────────────────────────────────────────

const mockBrands = [
  { id: 1, name: "Apple", slug: "apple", description: "Think Different" },
  { id: 2, name: "Samsung", slug: "samsung", description: "Do What You Can't" },
  { id: 3, name: "Xiaomi", slug: "xiaomi", description: "Innovation for Everyone" },
  { id: 4, name: "OPPO", slug: "oppo", description: "Smile to More" },
];

const mockCategories = [
  { id: 1, name: "Gaming", slug: "gaming" },
  { id: 2, name: "Phổ thông", slug: "pho-thong" },
  { id: 3, name: "Chụp hình", slug: "chup-hinh" },
  { id: 4, name: "Cao cấp", slug: "cao-cap" },
];

const mockColors = [
  { id: 1, name: "Titan Tự nhiên", hex_code: "#8E8E93" },
  { id: 2, name: "Titan Đen", hex_code: "#1C1C1E" },
  { id: 3, name: "Titan Trắng", hex_code: "#F2F2F7" },
  { id: 4, name: "Titan Sa mạc", hex_code: "#D4B896" },
  { id: 5, name: "Xanh Phantom", hex_code: "#3A4A6B" },
];

const mockStorages = [
  { id: 1, value: "64GB" },
  { id: 2, value: "128GB" },
  { id: 3, value: "256GB" },
  { id: 4, value: "512GB" },
  { id: 5, value: "1TB" },
];

const mockRams = [
  { id: 1, value: "4GB" },
  { id: 2, value: "6GB" },
  { id: 3, value: "8GB" },
  { id: 4, value: "12GB" },
  { id: 5, value: "16GB" },
];

const mockSpecGroups = [
  { id: 1, name: "Màn hình" },
  { id: 2, name: "Pin & Sạc" },
  { id: 3, name: "Cấu hình" },
  { id: 4, name: "Camera" },
  { id: 5, name: "Kết nối" },
];

const mockSpecKeys = [
  { id: 1, group: "Màn hình", name: "Kích thước màn hình" },
  { id: 2, group: "Màn hình", name: "Tần số quét" },
  { id: 3, group: "Màn hình", name: "Độ sáng tối đa" },
  { id: 4, group: "Pin & Sạc", name: "Dung lượng pin" },
  { id: 5, group: "Pin & Sạc", name: "Công suất sạc" },
  { id: 6, group: "Cấu hình", name: "Chip xử lý" },
  { id: 7, group: "Cấu hình", name: "GPU" },
  { id: 8, group: "Kết nối", name: "NFC" },
];

const mockVariants = [
  { id: 1, sku: "IP15PM-256GB-TITAN", product: "iPhone 15 Pro Max", color: "Titan Tự nhiên", storage: "256GB", ram: "8GB", price: 34990000, stock: 15 },
  { id: 2, sku: "IP15PM-512GB-BLACK", product: "iPhone 15 Pro Max", color: "Titan Đen", storage: "512GB", ram: "8GB", price: 39990000, stock: 8 },
  { id: 3, sku: "SS-S24U-256-VIOLET", product: "Samsung Galaxy S24 Ultra", color: "Xanh Phantom", storage: "256GB", ram: "12GB", price: 31990000, stock: 20 },
  { id: 4, sku: "XMI-14P-512-WHITE", product: "Xiaomi 14 Pro", color: "Titan Trắng", storage: "512GB", ram: "16GB", price: 22990000, stock: 5 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatsBar() {
  const stats = [
    { label: "Thương hiệu", value: 4, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Màu sắc", value: 5, color: "text-orange-400", bg: "bg-orange-500/10" },
    { label: "Biến thể", value: 24, color: "text-green-400", bg: "bg-green-500/10" },
    { label: "Nhóm thông số", value: 5, color: "text-purple-400", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`rounded-xl p-4 border border-white/5 ${s.bg} flex flex-col gap-1`}
        >
          <span className={`text-3xl font-bold ${s.color}`}>{s.value}</span>
          <span className="text-sm text-slate-400">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function SectionHeader({
  title,
  description,
  onAdd,
  addLabel = "Thêm mới",
}: {
  title: string;
  description?: string;
  onAdd?: () => void;
  addLabel?: string;
}) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {description && (
          <p className="text-sm text-slate-400 mt-0.5">{description}</p>
        )}
      </div>
      {onAdd && (
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={15} />
          {addLabel}
        </button>
      )}
    </div>
  );
}

function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative mb-5">
      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
      />
    </div>
  );
}

function ActionButtons() {
  return (
    <div className="flex items-center gap-1">
      <button className="p-1.5 rounded-md text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors">
        <Pencil size={14} />
      </button>
      <button className="p-1.5 rounded-md text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
        <Trash2 size={14} />
      </button>
    </div>
  );
}

// ─── Section: Overview ────────────────────────────────────────────────────────

function OverviewSection({ setSection }: { setSection: (s: Section) => void }) {
  const quickLinks = [
    { key: "brands" as Section, label: "Quản lý thương hiệu", icon: Building2, count: "4 hãng", color: "text-blue-400 bg-blue-500/10" },
    { key: "categories" as Section, label: "Phân loại sản phẩm", icon: Tag, count: "4 loại", color: "text-purple-400 bg-purple-500/10" },
    { key: "colors" as Section, label: "Màu sắc", icon: Palette, count: "5 màu", color: "text-pink-400 bg-pink-500/10" },
    { key: "storages" as Section, label: "Bộ nhớ ROM", icon: HardDrive, count: "5 tùy chọn", color: "text-orange-400 bg-orange-500/10" },
    { key: "rams" as Section, label: "RAM", icon: MemoryStick, count: "5 tùy chọn", color: "text-yellow-400 bg-yellow-500/10" },
    { key: "variants" as Section, label: "Biến thể sản phẩm", icon: Layers, count: "24 biến thể", color: "text-green-400 bg-green-500/10" },
    { key: "spec_groups" as Section, label: "Nhóm thông số", icon: Settings2, count: "5 nhóm", color: "text-teal-400 bg-teal-500/10" },
    { key: "spec_keys" as Section, label: "Tên thông số", icon: Cpu, count: "8 thông số", color: "text-cyan-400 bg-cyan-500/10" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Quản lý dữ liệu danh mục</h1>
        <p className="text-slate-400 mt-1 text-sm">
          Trung tâm quản lý thương hiệu, biến thể và thông số kỹ thuật sản phẩm
        </p>
      </div>

      <StatsBar />

      <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">
        Truy cập nhanh
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {quickLinks.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => setSection(item.key)}
              className="group flex items-center gap-3 p-4 bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 hover:border-slate-600 rounded-xl transition-all text-left"
            >
              <div className={`p-2 rounded-lg ${item.color}`}>
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-200 group-hover:text-white truncate">
                  {item.label}
                </p>
                <p className="text-xs text-slate-500">{item.count}</p>
              </div>
              <ChevronRight size={14} className="text-slate-600 group-hover:text-slate-400 shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Section: Brands ──────────────────────────────────────────────────────────

function BrandsSection() {
  return (
    <div>
      <SectionHeader
        title="Thương hiệu"
        description="Quản lý các hãng điện thoại được bán tại cửa hàng"
        onAdd={() => {}}
        addLabel="Thêm thương hiệu"
      />
      <SearchBar placeholder="Tìm kiếm thương hiệu..." />
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">ID</th>
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Logo</th>
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Tên thương hiệu</th>
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Slug</th>
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Mô tả</th>
              <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {mockBrands.map((brand) => (
              <tr key={brand.id} className="hover:bg-slate-700/20 transition-colors">
                <td className="px-4 py-3 text-slate-500">#{brand.id}</td>
                <td className="px-4 py-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                    {brand.name[0]}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="font-medium text-white">{brand.name}</span>
                </td>
                <td className="px-4 py-3">
                  <code className="text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                    {brand.slug}
                  </code>
                </td>
                <td className="px-4 py-3 text-slate-400">{brand.description}</td>
                <td className="px-4 py-3 text-right">
                  <ActionButtons />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Section: Categories ──────────────────────────────────────────────────────

function CategoriesSection() {
  return (
    <div>
      <SectionHeader
        title="Phân loại sản phẩm"
        description="Gaming, phổ thông, chụp hình,..."
        onAdd={() => {}}
        addLabel="Thêm phân loại"
      />
      <SearchBar placeholder="Tìm kiếm phân loại..." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {mockCategories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl hover:border-slate-600 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Tag size={16} className="text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-white text-sm">{cat.name}</p>
                <code className="text-xs text-slate-500">{cat.slug}</code>
              </div>
            </div>
            <ActionButtons />
          </div>
        ))}
        {/* Add new card */}
        <button className="flex items-center justify-center gap-2 p-4 border border-dashed border-slate-700 rounded-xl text-slate-500 hover:text-blue-400 hover:border-blue-500/50 transition-colors text-sm">
          <Plus size={16} />
          Thêm phân loại
        </button>
      </div>
    </div>
  );
}

// ─── Section: Colors ──────────────────────────────────────────────────────────

function ColorsSection() {
  return (
    <div>
      <SectionHeader
        title="Màu sắc"
        description="Các màu sắc biến thể sản phẩm"
        onAdd={() => {}}
        addLabel="Thêm màu"
      />
      <SearchBar placeholder="Tìm kiếm màu sắc..." />
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Màu</th>
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Tên</th>
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Mã hex</th>
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Preview</th>
              <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {mockColors.map((color) => (
              <tr key={color.id} className="hover:bg-slate-700/20 transition-colors">
                <td className="px-4 py-3">
                  <div
                    className="w-8 h-8 rounded-full border-2 border-white/10 shadow-lg"
                    style={{ backgroundColor: color.hex_code }}
                  />
                </td>
                <td className="px-4 py-3 font-medium text-white">{color.name}</td>
                <td className="px-4 py-3">
                  <code className="text-xs text-slate-300 bg-slate-700 px-2 py-0.5 rounded font-mono">
                    {color.hex_code}
                  </code>
                </td>
                <td className="px-4 py-3">
                  <div
                    className="h-5 w-24 rounded-full border border-white/5"
                    style={{ backgroundColor: color.hex_code }}
                  />
                </td>
                <td className="px-4 py-3 text-right">
                  <ActionButtons />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Section: Storages & RAMs (chung layout) ──────────────────────────────────

function ChipListSection({
  title,
  description,
  data,
  unit,
}: {
  title: string;
  description: string;
  data: { id: number; value: string }[];
  unit?: string;
}) {
  return (
    <div>
      <SectionHeader
        title={title}
        description={description}
        onAdd={() => {}}
        addLabel={`Thêm ${unit ?? ""}`}
      />
      <div className="flex flex-wrap gap-3 mb-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="group flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 hover:border-slate-600 rounded-xl px-4 py-2.5 transition-colors"
          >
            <span className="font-semibold text-white text-sm">{item.value}</span>
            <div className="hidden group-hover:flex items-center gap-0.5 ml-1">
              <button className="p-1 rounded text-slate-500 hover:text-blue-400 transition-colors">
                <Pencil size={12} />
              </button>
              <button className="p-1 rounded text-slate-500 hover:text-red-400 transition-colors">
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
        <button className="flex items-center gap-2 border border-dashed border-slate-700 rounded-xl px-4 py-2.5 text-slate-500 hover:text-blue-400 hover:border-blue-500/50 transition-colors text-sm">
          <Plus size={14} />
          Thêm tùy chọn
        </button>
      </div>

      {/* Table view */}
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">ID</th>
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Giá trị</th>
              <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-slate-700/20 transition-colors">
                <td className="px-4 py-3 text-slate-500">#{item.id}</td>
                <td className="px-4 py-3">
                  <span className="font-semibold text-white">{item.value}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <ActionButtons />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Section: Spec Groups ─────────────────────────────────────────────────────

function SpecGroupsSection() {
  return (
    <div>
      <SectionHeader
        title="Nhóm thông số kỹ thuật"
        description="Màn hình, Pin, Cấu hình, Camera, Kết nối..."
        onAdd={() => {}}
        addLabel="Thêm nhóm"
      />
      <SearchBar placeholder="Tìm kiếm nhóm thông số..." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {mockSpecGroups.map((group) => (
          <div
            key={group.id}
            className="flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl hover:border-slate-600 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-teal-500/10 flex items-center justify-center">
                <Settings2 size={16} className="text-teal-400" />
              </div>
              <span className="font-medium text-white text-sm">{group.name}</span>
            </div>
            <ActionButtons />
          </div>
        ))}
        <button className="flex items-center justify-center gap-2 p-4 border border-dashed border-slate-700 rounded-xl text-slate-500 hover:text-teal-400 hover:border-teal-500/50 transition-colors text-sm">
          <Plus size={16} />
          Thêm nhóm
        </button>
      </div>
    </div>
  );
}

// ─── Section: Spec Keys ───────────────────────────────────────────────────────

function SpecKeysSection() {
  return (
    <div>
      <SectionHeader
        title="Tên thông số kỹ thuật"
        description="Tần số quét, Độ sáng, NFC, Chất liệu khung..."
        onAdd={() => {}}
        addLabel="Thêm thông số"
      />
      <SearchBar placeholder="Tìm kiếm thông số..." />
      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">ID</th>
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Nhóm</th>
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Tên thông số</th>
              <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {mockSpecKeys.map((key) => (
              <tr key={key.id} className="hover:bg-slate-700/20 transition-colors">
                <td className="px-4 py-3 text-slate-500">#{key.id}</td>
                <td className="px-4 py-3">
                  <span className="text-xs font-medium text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full">
                    {key.group}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium text-white">{key.name}</td>
                <td className="px-4 py-3 text-right">
                  <ActionButtons />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Section: Product Variants ────────────────────────────────────────────────

function VariantsSection() {
  return (
    <div>
      <SectionHeader
        title="Biến thể sản phẩm"
        description="Quản lý SKU, giá, tồn kho theo màu sắc và bộ nhớ"
        onAdd={() => {}}
        addLabel="Thêm biến thể"
      />

      {/* Filter bar */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Tìm theo SKU, sản phẩm..."
            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <select className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-blue-500">
          <option value="">Tất cả sản phẩm</option>
          <option>iPhone 15 Pro Max</option>
          <option>Samsung Galaxy S24 Ultra</option>
        </select>
        <select className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-blue-500">
          <option value="">Tất cả màu</option>
          {mockColors.map((c) => <option key={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">SKU</th>
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Sản phẩm</th>
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Màu</th>
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">ROM</th>
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">RAM</th>
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Giá bán</th>
              <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Tồn kho</th>
              <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {mockVariants.map((v) => {
              const color = mockColors.find((c) => c.name === v.color);
              const isLowStock = v.stock <= 5;

              return (
                <tr key={v.id} className="hover:bg-slate-700/20 transition-colors">
                  <td className="px-4 py-3">
                    <code className="text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded font-mono">
                      {v.sku}
                    </code>
                  </td>
                  <td className="px-4 py-3 font-medium text-white max-w-[160px] truncate">
                    {v.product}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border border-white/10 shrink-0"
                        style={{ backgroundColor: color?.hex_code ?? "#888" }}
                      />
                      <span className="text-slate-300 text-xs">{v.color}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-300">{v.storage}</td>
                  <td className="px-4 py-3 text-slate-300">{v.ram}</td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-orange-400">
                      {v.price.toLocaleString("vi-VN")}đ
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                        isLowStock
                          ? "text-red-400 bg-red-500/10"
                          : "text-green-400 bg-green-500/10"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isLowStock ? "bg-red-400" : "bg-green-400"
                        }`}
                      />
                      {v.stock} máy
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <ActionButtons />
                      <button className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* Pagination placeholder */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-700/50">
          <span className="text-xs text-slate-500">Hiển thị 1–4 / 24 biến thể</span>
          <div className="flex gap-1">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={`w-7 h-7 rounded text-xs font-medium transition-colors ${
                  p === 1
                    ? "bg-blue-500 text-white"
                    : "text-slate-400 hover:bg-slate-700"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CatalogDashboardPage() {
  const [activeSection, setActiveSection] = useState<Section>("overview");

  const renderSection = () => {
    switch (activeSection) {
      case "overview":    return <OverviewSection setSection={setActiveSection} />;
      case "brands":      return <BrandsSection />;
      case "categories":  return <CategoriesSection />;
      case "colors":      return <ColorsSection />;
      case "storages":    return <ChipListSection title="Bộ nhớ ROM" description="Các tùy chọn dung lượng lưu trữ" data={mockStorages} unit="ROM" />;
      case "rams":        return <ChipListSection title="RAM" description="Các tùy chọn dung lượng RAM" data={mockRams} unit="RAM" />;
      case "spec_groups": return <SpecGroupsSection />;
      case "spec_keys":   return <SpecKeysSection />;
      case "variants":    return <VariantsSection />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* ── Inner sidebar (sub-nav) ── */}
      <aside className="w-56 shrink-0 border-r border-slate-700/50 bg-slate-900/50 p-4 flex flex-col gap-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2 px-2">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => setActiveSection(item.key)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-500 text-white"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                    }`}
                  >
                    <Icon size={15} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </aside>

      {/* ── Content area ── */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-8">
          {/* Breadcrumb */}
          {activeSection !== "overview" && (
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
              <button
                onClick={() => setActiveSection("overview")}
                className="hover:text-slate-300 transition-colors flex items-center gap-1"
              >
                <Smartphone size={12} />
                Quản lý danh mục
              </button>
              <ChevronRight size={12} />
              <span className="text-slate-300">
                {navGroups.flatMap((g) => g.items).find((i) => i.key === activeSection)?.label}
              </span>
            </div>
          )}

          {renderSection()}
        </div>
      </main>
    </div>
  );
}