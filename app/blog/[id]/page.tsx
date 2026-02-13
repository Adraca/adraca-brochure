import React from "react";
import BlogPostClient from "./BlogPostClient";
import { blogs } from "@/data/blogs";

export async function generateStaticParams() {
    return blogs.map((blog) => ({
        id: blog.id,
    }));
}

export default function BlogPostPage() {
    return <BlogPostClient />;
}
