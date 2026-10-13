export const CMS_URL = (import.meta.env.VITE_CMS_URL || '').replace(/\/+$/, '');

// Global in-memory cache map for populated media objects
const mediaCacheMap = new Map();

export function populateMediaCache(data) {
  if (!data) return;
  if (Array.isArray(data)) {
    data.forEach((item) => populateMediaCache(item));
  } else if (typeof data === 'object' && data !== null) {
    if (data.id && data.url) {
      mediaCacheMap.set(String(data.id), data);
    }
    for (const key in data) {
      if (typeof data[key] === 'object' && data[key] !== null) {
        populateMediaCache(data[key]);
      }
    }
  }
}

/**
 * Fetch UIP HomePage Global data from Payload CMS (clean GET request without CORS-breaking custom headers)
 */
export async function getUipHomePageData() {
  try {
    const res = await fetch(`${CMS_URL}/api/globals/uip-home-page?depth=2&_t=${Date.now()}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch UIP home page data: ${res.statusText}`);
    }
    const data = await res.json();
    populateMediaCache(data);
    return data;
  } catch (error) {
    console.error('Error fetching UIP HomePage data from Payload CMS:', error);
    return null;
  }
}

/**
 * Universal Media URL Resolver with caching, fallback, and background prefetching
 */
export function getMediaUrl(mediaObj, fallbackUrl = null) {
  if (!mediaObj) return fallbackUrl;

  const formatUrl = (rawUrl) => {
    if (!rawUrl || typeof rawUrl !== 'string') return fallbackUrl;

    let cleanUrl = rawUrl;
    // Handle localhost mapping dynamically
    if (cleanUrl.includes('localhost:4000') || cleanUrl.includes('localhost:3000')) {
      cleanUrl = cleanUrl.replace(/^http:\/\/localhost:(4000|3000)/, CMS_URL);
    }

    if (cleanUrl.startsWith('http') || cleanUrl.startsWith('blob:') || cleanUrl.startsWith('data:')) {
      return cleanUrl;
    }
    return `${CMS_URL}${cleanUrl.startsWith('/') ? '' : '/'}${cleanUrl}`;
  };

  // 1. If mediaObj is already a populated object
  if (typeof mediaObj === 'object' && mediaObj !== null) {
    if (mediaObj.id && mediaObj.url) {
      mediaCacheMap.set(String(mediaObj.id), mediaObj);
    }
    if (mediaObj.url) {
      return formatUrl(mediaObj.url);
    }
    if (mediaObj.filename) {
      return `${CMS_URL}/api/media/file/${mediaObj.filename}`;
    }
    if (mediaObj.id) {
      mediaObj = mediaObj.id;
    }
  }

  // 2. Check if media ID exists in mediaCacheMap
  const strId = String(mediaObj);
  if (mediaCacheMap.has(strId)) {
    const cached = mediaCacheMap.get(strId);
    if (cached?.url) return formatUrl(cached.url);
    if (cached?.filename) return `${CMS_URL}/api/media/file/${cached.filename}`;
  }

  // 3. If mediaObj is a direct URL string
  if (typeof mediaObj === 'string' && !/^\d+$/.test(mediaObj) && !/^[a-f\d]{24}$/i.test(mediaObj)) {
    return formatUrl(mediaObj);
  }

  // 4. Background prefetch if it's an ID not yet in cache
  if (/^\d+$/.test(strId) || /^[a-f\d]{24}$/i.test(strId)) {
    fetch(`${CMS_URL}/api/media/${strId}?_t=${Date.now()}`)
      .then((res) => res.json())
      .then((fetchedMedia) => {
        if (fetchedMedia && (fetchedMedia.url || fetchedMedia.filename)) {
          mediaCacheMap.set(strId, fetchedMedia);
          window.dispatchEvent(new CustomEvent('payload-media-cached', { detail: { id: strId } }));
        }
      })
      .catch(() => {});
  }

  return fallbackUrl;
}

/**
 * Fetch UIP AboutPage Global data from Payload CMS
 */
export async function getUipAboutPageData() {
  try {
    const res = await fetch(`${CMS_URL}/api/globals/uip-about-page?depth=2&_t=${Date.now()}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch UIP About Page data: ${res.statusText}`);
    }
    const data = await res.json();
    populateMediaCache(data);
    return data;
  } catch (err) {
    console.error('[API] getUipAboutPageData error:', err);
    return null;
  }
}

/**
 * Fetch UIP StoriesPage Global data from Payload CMS
 */
export async function getUipStoriesPageData() {
  try {
    const res = await fetch(`${CMS_URL}/api/globals/uip-stories-page?depth=2&_t=${Date.now()}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch UIP Stories Page data: ${res.statusText}`);
    }
    const data = await res.json();
    populateMediaCache(data);
    return data;
  } catch (err) {
    console.error('[API] getUipStoriesPageData error:', err);
    return null;
  }
}

/**
 * Fetch UIP PartnersPage Global data from Payload CMS
 */
export async function getUipPartnersPageData() {
  try {
    const res = await fetch(`${CMS_URL}/api/globals/uip-partners-page?depth=2&_t=${Date.now()}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch UIP Partners Page data: ${res.statusText}`);
    }
    const data = await res.json();
    populateMediaCache(data);
    return data;
  } catch (err) {
    console.error('[API] getUipPartnersPageData error:', err);
    return null;
  }
}

/**
 * Fetch UIP WaysToGivePage Global data from Payload CMS
 */
export async function getUipWaysToGivePageData() {
  try {
    const res = await fetch(`${CMS_URL}/api/globals/uip-waystogive-page?depth=2&_t=${Date.now()}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch UIP Ways To Give Page data: ${res.statusText}`);
    }
    const data = await res.json();
    populateMediaCache(data);
    return data;
  } catch (err) {
    console.error('[API] getUipWaysToGivePageData error:', err);
    return null;
  }
}

/**
 * Fetch UIP CarePacksPage Global data from Payload CMS
 */
export async function getUipCarePacksPageData() {
  try {
    const res = await fetch(`${CMS_URL}/api/globals/uip-carepacks-page?depth=2&_t=${Date.now()}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch UIP Care Packs Page data: ${res.statusText}`);
    }
    const data = await res.json();
    populateMediaCache(data);
    return data;
  } catch (err) {
    console.error('[API] getUipCarePacksPageData error:', err);
    return null;
  }
}

/**
 * Fetch UIP InvolvedPage Global data from Payload CMS
 */
export async function getUipInvolvedPageData() {
  try {
    const res = await fetch(`${CMS_URL}/api/globals/uip-involved-page?depth=2&_t=${Date.now()}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch UIP Involved Page data: ${res.statusText}`);
    }
    const data = await res.json();
    populateMediaCache(data);
    return data;
  } catch (err) {
    console.error('[API] getUipInvolvedPageData error:', err);
    return null;
  }
}
