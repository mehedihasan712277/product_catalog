"use client"

import { ProductType } from "@/utils/type"
import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"

const DetailsPage = ({ params }: { params: { id: string } }) => {
    const [data, setData] = useState<ProductType | null>(null)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`https://dummyjson.com/products/${params.id}`)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
    }, [params.id])

    if (loading) {
        return <div className="h-screen flex justify-center items-center">
            <p className="text-xl font-semibold">Loading...</p>
        </div>
    }
    return (
        <div className="max-w-5xl mx-auto p-4">
            {data && (
                <div className="grid md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6">
                    {/* Image Section */}
                    <div className="flex justify-center items-center">
                        <Image
                            src={data.thumbnail}
                            alt={data.title}
                            width={400}
                            height={400}
                            className="rounded-lg object-cover w-full h-auto"
                        />
                    </div>

                    {/* Product Details */}
                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold">{data.title}</h1>
                        <p className="text-gray-600">{data.description}</p>
                        <p className="text-lg font-semibold text-blue-600">${data.price}</p>
                        <p className="text-sm text-gray-500">Rating: ⭐ {data.rating} | Stock: {data.stock}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {data.tags.map((tag, index) => (
                                <span key={index} className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <p className="text-gray-700"><strong>Brand:</strong> {data.brand}</p>
                        <p className="text-gray-700"><strong>Return Policy:</strong> {data.returnPolicy}</p>
                        <p className="text-gray-700"><strong>Shipping Info:</strong> {data.shippingInformation}</p>
                        <p className="text-gray-700"><strong>Availability:</strong> {data.availabilityStatus}</p>
                    </div>
                </div>
            )}

            {/* Reviews Section */}
            {data?.reviews && (
                <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
                    <div className="space-y-4">
                        {data?.reviews.map(review => (
                            <div key={review.reviewerEmail} className="p-4 bg-white rounded-lg shadow-sm">
                                <p className="font-bold">{review.reviewerName} ({review.reviewerEmail})</p>
                                <p className="text-yellow-500">⭐ {review.rating}</p>
                                <p className="text-gray-600">{review.comment}</p>
                                <p className="text-sm text-gray-400">{review.date.slice(0, 10)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default DetailsPage
