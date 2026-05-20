import { useEffect } from 'react';
import type { Language } from '../hooks/useLanguage';

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  language?: Language;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
  keywords?: string;
  canonical?: string;
}

const SITE_NAME = 'José Gellida';

function getSiteBaseUrl() {
  const configuredBaseUrl = import.meta.env.VITE_SITE_URL?.trim().replace(/\/$/, '');

  if (configuredBaseUrl) {
    return new URL(import.meta.env.BASE_URL || '/', configuredBaseUrl);
  }

  if (typeof window !== 'undefined') {
    return new URL(import.meta.env.BASE_URL || '/', window.location.origin);
  }

  return new URL(import.meta.env.BASE_URL || '/', 'http://localhost');
}

function toAbsoluteUrl(path: string) {
  const baseUrl = getSiteBaseUrl();
  return new URL(path.replace(/^\/+/, ''), baseUrl).href;
}

function upsertTag(tagName: 'meta' | 'link', selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;

  if (!element) {
    element = document.createElement(tagName);
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element!.setAttribute(key, value);
  });

  return element;
}

export default function Seo({
  title,
  description,
  path = '/',
  language = 'es',
  image = '/portadaweb.png',
  imageAlt = 'José Gellida portfolio preview',
  type = 'website',
  noIndex = false,
  keywords,
  canonical,
}: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const canonicalUrl = canonical || toAbsoluteUrl(path);
    const imageUrl = toAbsoluteUrl(image);
    const robotsContent = noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';
    const ogLocale = language === 'es' ? 'es_ES' : 'en_US';
    const alternateLocale = language === 'es' ? 'en_US' : 'es_ES';

    const previousTitle = document.title;
    document.title = fullTitle;

    const managedKeys = [
      'seo-description',
      'seo-keywords',
      'seo-robots',
      'seo-canonical',
      'seo-og-title',
      'seo-og-description',
      'seo-og-type',
      'seo-og-url',
      'seo-og-site-name',
      'seo-og-image',
      'seo-og-image-alt',
      'seo-og-locale',
      'seo-og-locale-alt',
      'seo-twitter-card',
      'seo-twitter-title',
      'seo-twitter-description',
      'seo-twitter-image',
      'seo-twitter-image-alt',
    ] as const;

    upsertTag('meta', 'meta[data-seo="seo-description"]', {
      'data-seo': 'seo-description',
      name: 'description',
      content: description,
    });

    if (keywords) {
      upsertTag('meta', 'meta[data-seo="seo-keywords"]', {
        'data-seo': 'seo-keywords',
        name: 'keywords',
        content: keywords,
      });
    } else {
      document.head.querySelector('meta[data-seo="seo-keywords"]')?.remove();
    }

    upsertTag('meta', 'meta[data-seo="seo-robots"]', {
      'data-seo': 'seo-robots',
      name: 'robots',
      content: robotsContent,
    });

    upsertTag('link', 'link[data-seo="seo-canonical"]', {
      'data-seo': 'seo-canonical',
      rel: 'canonical',
      href: canonicalUrl,
    });

    upsertTag('meta', 'meta[data-seo="seo-og-title"]', {
      'data-seo': 'seo-og-title',
      property: 'og:title',
      content: fullTitle,
    });

    upsertTag('meta', 'meta[data-seo="seo-og-description"]', {
      'data-seo': 'seo-og-description',
      property: 'og:description',
      content: description,
    });

    upsertTag('meta', 'meta[data-seo="seo-og-type"]', {
      'data-seo': 'seo-og-type',
      property: 'og:type',
      content: type,
    });

    upsertTag('meta', 'meta[data-seo="seo-og-url"]', {
      'data-seo': 'seo-og-url',
      property: 'og:url',
      content: canonicalUrl,
    });

    upsertTag('meta', 'meta[data-seo="seo-og-site-name"]', {
      'data-seo': 'seo-og-site-name',
      property: 'og:site_name',
      content: SITE_NAME,
    });

    upsertTag('meta', 'meta[data-seo="seo-og-image"]', {
      'data-seo': 'seo-og-image',
      property: 'og:image',
      content: imageUrl,
    });

    upsertTag('meta', 'meta[data-seo="seo-og-image-alt"]', {
      'data-seo': 'seo-og-image-alt',
      property: 'og:image:alt',
      content: imageAlt,
    });

    upsertTag('meta', 'meta[data-seo="seo-og-locale"]', {
      'data-seo': 'seo-og-locale',
      property: 'og:locale',
      content: ogLocale,
    });

    upsertTag('meta', 'meta[data-seo="seo-og-locale-alt"]', {
      'data-seo': 'seo-og-locale-alt',
      property: 'og:locale:alternate',
      content: alternateLocale,
    });

    upsertTag('meta', 'meta[data-seo="seo-twitter-card"]', {
      'data-seo': 'seo-twitter-card',
      name: 'twitter:card',
      content: 'summary_large_image',
    });

    upsertTag('meta', 'meta[data-seo="seo-twitter-title"]', {
      'data-seo': 'seo-twitter-title',
      name: 'twitter:title',
      content: fullTitle,
    });

    upsertTag('meta', 'meta[data-seo="seo-twitter-description"]', {
      'data-seo': 'seo-twitter-description',
      name: 'twitter:description',
      content: description,
    });

    upsertTag('meta', 'meta[data-seo="seo-twitter-image"]', {
      'data-seo': 'seo-twitter-image',
      name: 'twitter:image',
      content: imageUrl,
    });

    upsertTag('meta', 'meta[data-seo="seo-twitter-image-alt"]', {
      'data-seo': 'seo-twitter-image-alt',
      name: 'twitter:image:alt',
      content: imageAlt,
    });

    return () => {
      document.title = previousTitle;

      managedKeys.forEach((key) => {
        document.head.querySelectorAll(`[data-seo="${key}"]`).forEach((element) => {
          element.remove();
        });
      });
    };
  }, [description, image, imageAlt, language, noIndex, path, title, type, keywords, canonical]);

  return null;
}