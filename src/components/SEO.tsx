import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  /** Comma-separated topical keywords for the page. */
  keywords?: string;
  /** Keep private/auth-only routes out of search results. */
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
}

const SITE = "https://gemini-dish-genius.lovable.app";

/** Per-route head tags: title, description, canonical, Open Graph, JSON-LD. */
export const SEO = ({
  title,
  description,
  path = "",
  image,
  type = "website",
  keywords,
  noindex = false,
  jsonLd,
}: SEOProps) => {
  const url = `${SITE}${path}`;
  const ogImage = image || `${SITE}/og-image.jpg`;
  // Keep tags within the lengths Google actually renders.
  const fullTitle = title.length > 60 ? `${title.slice(0, 57)}...` : title;
  const desc = description.length > 160 ? `${description.slice(0, 157)}...` : description;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
};
