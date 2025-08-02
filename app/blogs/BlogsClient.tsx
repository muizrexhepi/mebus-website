"use client";

import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/constants/blog";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Clock, User, Tag } from "lucide-react";
import { useState } from "react";

export default function BlogsClientPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="paddingX max-w-6xl mx-auto py-10">
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <h1 className="text-center text-3xl sm:text-4xl text-transparent font-normal button-gradient bg-clip-text">
              Travel Insights & Guides
            </h1>
            <p className="text-center text-base sm:text-lg text-black/60 mx-auto max-w-2xl">
              Expert travel advice, comprehensive booking guides, and insider
              tips for seamless bus travel across Macedonia and the Balkans.
            </p>

            <div className="max-w-md mx-auto pt-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="search"
                  placeholder="Search articles, tips, guides..."
                  className="w-full pl-12 pr-4 py-3 text-base border-gray-200 focus:ring-2 focus:ring-[#ff284d]/20 focus:border-[#ff284d] bg-white rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="paddingX max-w-6xl mx-auto py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Card
              key={post.slug}
              className="group overflow-hidden rounded-2xl border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-1"
            >
              <Link href={`/blogs/${post.slug}`} className="block">
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.imageAlt}
                    width={600}
                    height={280}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700 backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#ff284d] transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <span className="text-[#ff284d] hover:text-[#ff284d]/80 font-medium text-sm group-hover:underline transition-all">
                      Read Article →
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-lg"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No articles found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search terms or browse all articles.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-[#ff284d] hover:underline font-medium"
              >
                Clear search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
