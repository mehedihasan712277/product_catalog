import { getProductData } from "@/utils/fetchData";
import ProductFilter from "./ProductFilter"; // Client component

const Product = async () => {
    const products = await getProductData();
    const categories = [
        {
            slug: "beauty",
            name: "Beauty"
        },
        {
            slug: "fragrances",
            name: "Fragrances"
        },
        {
            slug: "furniture",
            name: "Furniture"
        },
        {
            slug: "groceries",
            name: "Groceries"
        },
    ]


    return (
        <ProductFilter products={products} categories={categories} />
    );
};

export default Product;
