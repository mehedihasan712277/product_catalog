import { ProductType } from "./type";

export const getProductData = async (): Promise<ProductType[]> => {
    try {
        const result = await fetch(`https://dummyjson.com/products`, {
            next: { revalidate: 0 },
        }).then(res => res.json());

        return result.products; // Ensure it returns null if no data
    } catch (error) {
        console.error("Error fetching Product: ", error);
        return [];
    }
};



// export const getCategories = async (): Promise<CategoryType[]> => {
//     try {
//         const result = await fetch(`https://dummyjson.com/products/categories`, {
//             next: { revalidate: 0 },
//         }).then(res => res.json());

//         return result; // Ensure it returns null if no data
//     } catch (error) {
//         console.error("Error fetching Product: ", error);
//         return [];
//     }
// };