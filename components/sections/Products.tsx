"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { apiRequest } from "@/app/lib/api";

import Card from "../ui/Card";
import Container from "../ui/Container";
import SectionBadge from "../ui/SectionBadge";
import SectionTitle from "../ui/SectionTitle";

interface Product {
  id: string;
  name: string;
  description?: string;
  sku: string;
  price: number;
  stock: number;
  isFeatured: boolean;
  isActive: boolean;
  categoryId: string;

  category: {
    id: string;
    name: string;
  };

  images: {
    imageUrl: string;
    altText?: string | null;
  }[];
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await apiRequest<{
          success: boolean;
          data: Product[];
        }>("/api/products");

        const activeProducts =
          response.data.filter(
            (product) => product.isActive
          );

        setProducts(activeProducts);
      } catch (error) {
        console.error(
          "Failed to load products:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <section
      id="products"
      className="py-24 bg-slate-50"
    >
      <Container>

        {/* Section Header */}

        <div className="text-center">

          <SectionBadge>
            Our Products
          </SectionBadge>

          <SectionTitle
            title="Premium Paper Products for Every Industry"
            subtitle="From premium notebooks to customized stationery, our products are crafted to meet the evolving needs of educational institutions, corporate offices, publishers, wholesalers, and businesses across India."
          />

        </div>

        {/* Loading */}

        {loading && (
          <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[480px] rounded-2xl bg-white border border-slate-200 animate-pulse"
              />
            ))}

          </div>
        )}

        {/* No Products */}

        {!loading && products.length === 0 && (
          <div className="mt-16 rounded-2xl bg-white border border-slate-200 p-12 text-center">

            <h3 className="text-xl font-semibold text-slate-900">
              No products available
            </h3>

            <p className="mt-2 text-slate-500">
              Products will appear here once they are
              added to the store.
            </p>

          </div>
        )}

        {/* Products */}

        {!loading && products.length > 0 && (
          <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

            {products.map((product) => {

              const image =
                product.images[0]?.imageUrl ||
                "/images/products/notebook.jpg";

              return (
                <Card
                  key={product.id}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-3 hover:border-green-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
                >

                  {/* Image */}

                  <div className="relative h-64 overflow-hidden bg-slate-100">

                    <img
                      src={image}
                      alt={
                        product.images[0]?.altText ||
                        product.name
                      }
                      className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-90"
                    />

                    {/* Category */}

                    <span className="absolute left-4 top-4 rounded-full bg-green-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-lg">
                      {product.category.name}
                    </span>

                  </div>

                  {/* Content */}

                  <div className="flex flex-1 flex-col p-6">

                    <h3 className="text-2xl font-bold leading-tight text-slate-900">
                      {product.name}
                    </h3>

                    <p className="mt-4 flex-1 text-base leading-7 text-slate-600">
                      {product.description ||
                        "Quality paper product designed to meet your everyday needs."}
                    </p>

                    {/* Price */}

                    <div className="mt-5">

                      <span className="text-2xl font-bold text-slate-900">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </span>

                    </div>

                    {/* Stock */}

                    <div className="mt-3">

                      {product.stock > 0 ? (
                        <span className="inline-flex w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex w-fit rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                          Out of Stock
                        </span>
                      )}

                    </div>

                    {/* Featured */}

                    {product.isFeatured && (
                      <span className="mt-3 inline-flex w-fit rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700">
                        ⭐ Featured Product
                      </span>
                    )}

                    {/* CTA */}

                    <Link
                      href={`/products/${product.id}`}
                      className="mt-8 inline-flex items-center gap-2 font-semibold text-green-600 transition-all duration-300 hover:gap-3 hover:text-green-700"
                    >
                      View Product

                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>

                  </div>

                </Card>
              );
            })}

          </div>
        )}

      </Container>
    </section>
  );
}