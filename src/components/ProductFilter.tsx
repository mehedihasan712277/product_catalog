"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductType, CategoryType } from "@/utils/type";
import Link from "next/link";

interface ProductFilterProps {
    products: ProductType[];
    categories: CategoryType[];
}

const ProductFilter = ({ products, categories }: ProductFilterProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState<string>("default");

    const filteredProducts = products
        .filter((product) => {
            const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
            const matchesMaxPrice = maxPrice === null || product.price <= maxPrice;
            const matchesMinPrice = minPrice === null || product.price >= minPrice;
            return matchesCategory && matchesMaxPrice && matchesMinPrice;
        })
        .sort((a, b) => {
            if (sortBy === "price_l_to_h") return a.price - b.price;
            if (sortBy === "price_h_to_l") return b.price - a.price;
            if (sortBy === "rating_l_to_h") return a.rating - b.rating;
            if (sortBy === "rating_h_to_l") return b.rating - a.rating;
            return 0;
        });

    return (
        <div className="p-4 lg:p-8 xl:p-12">
            <div className="flex justify-end pb-4">
                <div className="flex items-center gap-2 sm:gap-4">
                    <p className="text-sm md:text-base">Sort By:</p>
                    <select
                        className="border border-gray-500 p-2 text-sm md:text-base"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="default">Default</option>
                        <option value="price_l_to_h">Price Low to High</option>
                        <option value="price_h_to_l">Price High to Low</option>
                        <option value="rating_l_to_h">Rating Low to High</option>
                        <option value="rating_h_to_l">Rating High to Low</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/4">
                    <p className="text-lg lg:text-xl font-semibold border-b pb-2">Filter by:</p>
                    <div>
                        <p className="text-md lg:text-lg font-medium py-2">Category</p>
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="category"
                                    value="All"
                                    checked={selectedCategory === "All"}
                                    onChange={() => setSelectedCategory("All")}
                                />
                                <span className="text-sm lg:text-base">All</span>
                            </label>
                            {categories.map((ele) => (
                                <label key={ele.slug} className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="category"
                                        value={ele.slug}
                                        checked={selectedCategory === ele.slug}
                                        onChange={() => setSelectedCategory(ele.slug)}
                                    />
                                    <span className="text-sm lg:text-base">{ele.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="text-md lg:text-lg font-medium py-2">Price</p>
                        <input
                            type="number"
                            placeholder="Min price"
                            className="w-full border p-2 text-sm lg:text-base"
                            value={minPrice ?? ""}
                            onChange={(e) => setMinPrice(e.target.value ? parseFloat(e.target.value) : null)}
                        />
                        <input
                            type="number"
                            placeholder="Max price"
                            className="w-full border p-2 mt-2 text-sm lg:text-base"
                            value={maxPrice ?? ""}
                            onChange={(e) => setMaxPrice(e.target.value ? parseFloat(e.target.value) : null)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((ele, i) => (
                            <div key={ele.id} className="shadow-lg p-4 w-full max-w-[250px] mx-auto">
                                <Link href={`/item/${i + 1}`}>
                                    <Image src={ele.thumbnail} alt="thumbnail" width={250} height={250} className="rounded-lg" />
                                    <p className="font-bold text-lg md:text-xl mt-2">{ele.title}</p>
                                    <p className="text-gray-600 text-sm md:text-base">{ele.brand}</p>
                                    <p className="text-md md:text-lg font-semibold">${ele.price}</p>
                                    <p className="text-sm md:text-base">{ele.rating}⭐</p>
                                    <p className="text-sm md:text-base text-gray-500">{ele.stock ? `${ele.stock} in stock` : "Stock Out"}</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {ele.tags.map((e) => (
                                            <p key={e} className="bg-yellow-400 px-2 py-1 rounded-full text-xs md:text-sm">{e}</p>
                                        ))}
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-full">No products found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;
