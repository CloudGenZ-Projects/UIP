import { useState, useEffect, useMemo, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLivePreview } from '@payloadcms/live-preview-react';
import {
  CMS_URL,
  populateMediaCache,
  getUipHomePageData,
  getUipAboutPageData,
  getUipStoriesPageData,
  getUipPartnersPageData,
} from '../services/api';

/**
 * Detects whether the current window is embedded inside Payload CMS Admin iframe
 */
export const isInIframe = typeof window !== 'undefined' && window.self !== window.top;

/**
 * Validates whether data is a non-empty CMS object with actual UIP content
 */
export function isValidCmsData(d) {
  if (!d || typeof d !== 'object' || Array.isArray(d)) return false;
  const keys = Object.keys(d);
  if (keys.length === 0) return false;

  return Boolean(
    d.id ||
    d.globalType ||
    d.slug ||
    d.hero_badge ||
    d.hero_title_line_1 ||
    d.hero_description ||
    d.what_we_do_title ||
    d.about_title ||
    d.community_vid_title ||
    d.donate_title ||
    d.partners_title ||
    d.mission_title ||
    d.leadership_title ||
    d.why_title ||
    d.values_title ||
    d.community_voices_title ||
    d.share_story_title ||
    d.intro_title ||
    d.support_cta_title
  );
}

/**
 * Reads persistent cached data from localStorage for instant 0ms rendering
 */
export function getStorageCache(key) {
  try {
    const raw = localStorage.getItem(`uip_data_v1_${key}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return isValidCmsData(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Saves valid data to localStorage for resilience against tab switches & network drops
 */
export function setStorageCache(key, data) {
  if (!isValidCmsData(data)) return;
  try {
    localStorage.setItem(`uip_data_v1_${key}`, JSON.stringify(data));
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * Evaluates data sources in priority order by merging postMessageData over liveData & initialData inside iframe.
 */
function getBestData(
  postMessageData,
  liveData,
  initialData,
  lastValidRef,
  cacheKey
) {
  if (isInIframe) {
    const merged = {
      ...(isValidCmsData(initialData) ? initialData : {}),
      ...(isValidCmsData(liveData) ? liveData : {}),
      ...(isValidCmsData(postMessageData) ? postMessageData : {}),
    };

    if (isValidCmsData(merged)) {
      lastValidRef.current = merged;
      setStorageCache(cacheKey, merged);
      return merged;
    }
  }

  if (isValidCmsData(initialData)) {
    lastValidRef.current = initialData;
    setStorageCache(cacheKey, initialData);
    return initialData;
  }

  if (isValidCmsData(lastValidRef.current)) {
    return lastValidRef.current;
  }

  return getStorageCache(cacheKey);
}

/**
 * Generic builder for UIP Live Preview + Query Hook
 */
function createUipLiveHook(
  cacheKey,
  queryKey,
  fetchFn,
  slug
) {
  return function useHook() {
    const lastValidRef = useRef(getStorageCache(cacheKey));
    const [mediaCacheTick, setMediaCacheTick] = useState(0);

    // Media caching listener
    useEffect(() => {
      const handleMediaCached = () => setMediaCacheTick((t) => t + 1);
      window.addEventListener('payload-media-cached', handleMediaCached);
      return () => window.removeEventListener('payload-media-cached', handleMediaCached);
    }, []);

    // TanStack Query for server data
    const {
      data: initialData,
      isLoading,
      error,
      refetch,
    } = useQuery({
      queryKey: [queryKey],
      queryFn: fetchFn,
      initialData: () => getStorageCache(cacheKey),
      staleTime: 0,
      gcTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: true,
      refetchOnMount: true,
    });

    // Populate media URLs from initial data
    useEffect(() => {
      if (isValidCmsData(initialData)) {
        populateMediaCache(initialData);
      }
    }, [initialData]);

    // Dynamically resolve serverURL from document.referrer or CMS_URL to match parent iframe origin
    const effectiveServerURL = useMemo(() => {
      if (typeof window !== 'undefined' && document.referrer) {
        try {
          const refOrigin = new URL(document.referrer).origin;
          if (refOrigin && refOrigin !== 'null') return refOrigin;
        } catch {}
      }
      return CMS_URL;
    }, []);

    // Live preview hook connected to Payload CMS
    const { data: liveData } = useLivePreview({
      initialData: initialData || lastValidRef.current || {},
      serverURL: effectiveServerURL,
      depth: 2,
    });

    useEffect(() => {
      if (isValidCmsData(liveData)) {
        populateMediaCache(liveData);
      }
    }, [liveData]);

    const [postMessageData, setPostMessageData] = useState(null);

    useEffect(() => {
      if (isValidCmsData(postMessageData)) {
        populateMediaCache(postMessageData);
      }
    }, [postMessageData]);

    // Window postMessage listener: handles live typing AND save events
    useEffect(() => {
      if (!isInIframe) return;

      const handleMessage = (event) => {
        // 1. Handle SAVE event: Payload dispatches payload-document-event when document is saved
        if (
          event?.data?.type === 'payload-document-event' ||
          (event?.data?.type === 'payload-live-preview' && event?.data?.event === 'save')
        ) {
          refetch();
          setTimeout(() => {
            refetch();
          }, 350);
          return;
        }

        // 2. Handle Live Preview typing & image updates: Payload dispatches live preview field updates
        if (
          event?.data?.type === 'payload-live-preview' ||
          event?.data?.slug === slug ||
          event?.data?.globalSlug === slug ||
          event?.data?.globalType === slug
        ) {
          const payloadData = event.data.data || event.data.doc || event.data;
          if (payloadData && typeof payloadData === 'object') {
            populateMediaCache(payloadData);
            setPostMessageData((prev) => ({ ...(prev || {}), ...payloadData }));
          }
        }
      };

      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }, [refetch]);

    const activeData = useMemo(() => {
      const best = getBestData(
        postMessageData,
        liveData,
        initialData,
        lastValidRef,
        cacheKey
      );
      return best ? { ...best } : best;
    }, [postMessageData, liveData, initialData, mediaCacheTick]);

    return {
      data: activeData,
      isLoading: !isValidCmsData(activeData) && isLoading,
      error,
      refetch,
    };
  };
}

// Export individual hook for UIP Home Page
export const useUipHomePageLive = createUipLiveHook(
  'uip-home-page',
  'uip-home-page-data',
  getUipHomePageData,
  'uip-home-page'
);

// Export individual hook for UIP About Page
export const useUipAboutPageLive = createUipLiveHook(
  'uip-about-page',
  'uip-about-page-data',
  getUipAboutPageData,
  'uip-about-page'
);

// Export individual hook for UIP Stories Page
export const useUipStoriesPageLive = createUipLiveHook(
  'uip-stories-page',
  'uip-stories-page-data',
  getUipStoriesPageData,
  'uip-stories-page'
);

// Export individual hook for UIP Partners Page
export const useUipPartnersPageLive = createUipLiveHook(
  'uip-partners-page',
  'uip-partners-page-data',
  getUipPartnersPageData,
  'uip-partners-page'
);
