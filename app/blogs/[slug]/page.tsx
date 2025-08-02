import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/constants/blog";
import { ChevronLeft, Share2, Clock, User, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ShareButton from "@/components/share-button";

interface BlogPostPageProps {
  params: { slug: string };
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | GoBusly",
      description: "The requested blog post could not be found.",
    };
  }

  const baseUrl = "https://gobusly.com";
  const postUrl = `${baseUrl}/blogs/${post.slug}`;

  return {
    title: `${post.title} | GoBusly - Book Bus Tickets Online Macedonia`,
    description: post.excerpt,
    keywords: [
      ...post.tags,
      "book bus ticket online",
      "bus tickets Macedonia",
      "GoBusly",
      "Tetovo to Skopje",
      "Balkan bus travel",
      "online bus booking",
      "Macedonia bus routes",
      "bus travel guide",
      "Skopje bus tickets",
      "Ohrid bus booking",
      "Balkans travel",
      "bus schedule Macedonia",
      "cheap bus tickets",
      "secure bus booking",
    ].join(", "),
    authors: [{ name: post.author }],
    creator: post.author,
    publisher: "GoBusly",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: "GoBusly",
      images: [
        {
          url: typeof post.image === "string" ? post.image : post.image.src,
          width: 1200,
          height: 630,
          alt: post.imageAlt,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
      section: post.category,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [typeof post.image === "string" ? post.image : post.image.src],
      creator: "@GoBusly",
      site: "@GoBusly",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
      yandex: "your-yandex-verification-code",
    },
    category: post.category,
  };
}

// Generate static params for better SEO and performance
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const baseUrl = "https://gobusly.com";
  const postUrl = `${baseUrl}/blogs/${post.slug}`;

  // JSON-LD structured data for maximum SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${postUrl}#article`,
        isPartOf: {
          "@id": `${postUrl}#webpage`,
        },
        author: {
          "@type": "Person",
          name: post.author,
          "@id": `${baseUrl}/#/schema/person/${post.author
            .replace(/\s+/g, "")
            .toLowerCase()}`,
        },
        headline: post.title,
        datePublished: new Date(post.date).toISOString(),
        dateModified: new Date(post.date).toISOString(),
        mainEntityOfPage: {
          "@id": `${postUrl}#webpage`,
        },
        wordCount: post.content.split(" ").length,
        commentCount: 0,
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
        image: {
          "@id": `${postUrl}#primaryimage`,
        },
        thumbnailUrl:
          typeof post.image === "string" ? post.image : post.image.src,
        keywords: post.tags.join(", "),
        articleSection: [post.category],
        inLanguage: "en-US",
        potentialAction: [
          {
            "@type": "CommentAction",
            name: "Comment",
            target: [`${postUrl}#respond`],
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${postUrl}#webpage`,
        url: postUrl,
        name: post.title,
        isPartOf: {
          "@id": `${baseUrl}/#website`,
        },
        primaryImageOfPage: {
          "@id": `${postUrl}#primaryimage`,
        },
        image: {
          "@id": `${postUrl}#primaryimage`,
        },
        thumbnailUrl:
          typeof post.image === "string" ? post.image : post.image.src,
        datePublished: new Date(post.date).toISOString(),
        dateModified: new Date(post.date).toISOString(),
        description: post.excerpt,
        breadcrumb: {
          "@id": `${postUrl}#breadcrumb`,
        },
        inLanguage: "en-US",
        potentialAction: [
          {
            "@type": "ReadAction",
            target: [postUrl],
          },
        ],
      },
      {
        "@type": "ImageObject",
        inLanguage: "en-US",
        "@id": `${postUrl}#primaryimage`,
        url: typeof post.image === "string" ? post.image : post.image.src,
        contentUrl:
          typeof post.image === "string" ? post.image : post.image.src,
        width: 1200,
        height: 630,
        caption: post.imageAlt,
        name: post.title,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${postUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${baseUrl}/blogs`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: postUrl,
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "GoBusly",
        description:
          "Book bus tickets online in Macedonia and the Balkans. Fast, secure, and convenient bus travel booking platform.",
        publisher: {
          "@id": `${baseUrl}/#organization`,
        },
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${baseUrl}/search?query={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        ],
        inLanguage: "en-US",
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: "GoBusly",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          inLanguage: "en-US",
          "@id": `${baseUrl}/#/schema/logo/image/`,
          url: `${baseUrl}/logo.png`,
          contentUrl: `${baseUrl}/logo.png`,
          width: 512,
          height: 512,
          caption: "GoBusly",
        },
        image: {
          "@id": `${baseUrl}/#/schema/logo/image/`,
        },
        sameAs: [
          "https://facebook.com/gobusly",
          "https://twitter.com/gobusly",
          "https://instagram.com/gobusly",
          "https://linkedin.com/company/gobusly",
        ],
      },
    ],
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[#F9FAFB]">
        {/* Navigation with Breadcrumbs */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-10 backdrop-blur-sm bg-white/95">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto py-4">
            <div className="flex items-center justify-between">
              <nav
                aria-label="Breadcrumb"
                className="flex items-center space-x-2 text-sm"
              >
                <Link
                  href="/"
                  className="text-gray-500 hover:text-[#ff284d] transition-colors"
                >
                  Home
                </Link>
                <span className="text-gray-300">/</span>
                <Link
                  href="/blogs"
                  className="text-gray-500 hover:text-[#ff284d] transition-colors"
                >
                  Blog
                </Link>
                <span className="text-gray-300">/</span>
                <span className="text-gray-900 font-medium truncate max-w-[200px]">
                  {post.title}
                </span>
              </nav>
              <ShareButton />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <article className="bg-white">
          <header className="container px-4 md:px-6 max-w-4xl mx-auto pt-12 pb-8">
            {/* Category Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#ff284d]/10 text-[#ff284d]">
                {post.category}
              </span>
            </div>

            {/* Title with proper heading hierarchy */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span itemProp="author">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time
                  itemProp="datePublished"
                  dateTime={new Date(post.date).toISOString()}
                >
                  {post.date}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Featured Image with proper alt text and lazy loading */}
            <figure className="relative w-full h-[300px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl mb-8">
              <Image
                src={
                  typeof post.image === "string" ? post.image : post.image.src
                }
                alt={post.imageAlt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                itemProp="image"
              />
              <figcaption className="sr-only">{post.imageAlt}</figcaption>
            </figure>
          </header>

          {/* Content with semantic HTML and proper structure */}
          <div className="bg-white">
            <div className="container px-4 md:px-6 max-w-4xl mx-auto pb-16">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
                itemProp="articleBody"
                style={{
                  color: "#374151",
                  lineHeight: "1.75",
                }}
              />

              {/* Tags with semantic markup */}
              <section
                className="mt-12 pt-8 border-t border-gray-200"
                aria-labelledby="tags-heading"
              >
                <h2
                  id="tags-heading"
                  className="text-lg font-semibold text-gray-900 mb-4"
                >
                  Related Topics
                </h2>
                <div className="flex flex-wrap gap-3" itemProp="keywords">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 text-sm rounded-xl hover:bg-gray-100 transition-colors"
                      itemProp="about"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              {/* CTA Section */}
              <section
                className="mt-16 p-8 bg-gradient-to-r from-[#ff284d]/5 to-orange-50 rounded-2xl text-center"
                aria-labelledby="cta-heading"
              >
                <h2
                  id="cta-heading"
                  className="text-2xl font-bold text-gray-900 mb-4"
                >
                  Ready to Book Your Next Journey?
                </h2>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Experience the convenience of online bus booking with GoBusly.
                  Find the best routes, compare prices, and secure your tickets
                  in minutes.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center px-8 py-3 bg-[#ff284d] text-white rounded-xl hover:bg-[#ff284d]/90 transition-colors font-medium"
                    aria-label="Book bus tickets online with GoBusly"
                  >
                    Book Your Ticket Now
                  </Link>
                  <Link
                    href="/blogs"
                    className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                    aria-label="Read more travel guides and tips"
                  >
                    Read More Articles
                  </Link>
                </div>
              </section>

              {/* Related Articles Section for internal linking */}
              <section className="mt-16" aria-labelledby="related-heading">
                <h2
                  id="related-heading"
                  className="text-2xl font-bold text-gray-900 mb-8"
                >
                  Related Articles
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {blogPosts
                    .filter((relatedPost) => relatedPost.slug !== post.slug)
                    .slice(0, 2)
                    .map((relatedPost) => (
                      <article
                        key={relatedPost.slug}
                        className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow"
                      >
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          <Link
                            href={`/blogs/${relatedPost.slug}`}
                            className="hover:text-[#ff284d] transition-colors"
                          >
                            {relatedPost.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{relatedPost.readTime}</span>
                          <span>{relatedPost.category}</span>
                        </div>
                      </article>
                    ))}
                </div>
              </section>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
