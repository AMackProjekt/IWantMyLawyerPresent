/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
import { defaultSiteContent, type SiteContent } from '../content/siteContent';

const STORAGE_KEY = 'iwmlp.siteContent.v1';

type SiteContentContextValue = {
  content: SiteContent;
  setContent: (value: SiteContent) => void;
  patchContent: (value: Partial<SiteContent>) => void;
  resetContent: () => void;
};

const SiteContentContext = createContext<SiteContentContextValue | undefined>(undefined);

function readInitialContent(): SiteContent {
  if (typeof window === 'undefined') {
    return defaultSiteContent;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultSiteContent;
    }
    const parsed = JSON.parse(raw) as SiteContent;
    return { ...defaultSiteContent, ...parsed };
  } catch {
    return defaultSiteContent;
  }
}

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [contentState, setContentState] = useState<SiteContent>(readInitialContent);

  const setContent = (value: SiteContent) => {
    setContentState(value);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    }
  };

  const patchContent = (value: Partial<SiteContent>) => {
    const merged = { ...contentState, ...value };
    setContent(merged);
  };

  const resetContent = () => {
    setContent(defaultSiteContent);
  };

  const ctxValue = { content: contentState, setContent, patchContent, resetContent };

  return <SiteContentContext.Provider value={ctxValue}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error('useSiteContent must be used inside SiteContentProvider');
  }
  return ctx;
}
