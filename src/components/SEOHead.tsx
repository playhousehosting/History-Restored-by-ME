import { Metadata } from "next"

interface SEOHeadProps {
  title: string
  description?: string
  image?: string
  url?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  tags?: string
}

export function generateSEOMetadata({
  title,
  description,
  image,
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  tags,
}: SEOHeadProps): Metadata {
  const siteName = "History Restored by ME"
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.historyrestoredbyme.com"
  
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl
  const ogImage = image || `${siteUrl}/og-image.jpg`
  const metaDescription = description || "Expert tractor restoration services and vintage machinery preservation"

  const metadata: Metadata = {
    title: fullTitle,
    description: metaDescription,
    keywords: tags ? tags.split(",").map(t => t.trim()).join(", ") : "tractor restoration, vintage tractors, farmall restoration, antique machinery",
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    openGraph: {
      type,
      locale: "en_US",
      url: fullUrl,
      title: fullTitle,
      description: metaDescription,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: fullUrl,
    },
  }

  // Add article-specific metadata
  if (type === "article" && (publishedTime || modifiedTime)) {
    metadata.openGraph = {
      ...metadata.openGraph,
      publishedTime,
      modifiedTime,
      authors: [siteName],
      tags: tags?.split(",").map(t => t.trim()),
    }
  }

  return metadata
}
