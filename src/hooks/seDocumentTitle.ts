"use client";
import { useEffect } from "react";

export function useDocumentTitle(title: string, fallback = "دفترچه") {
  useEffect(() => {
    document.title = title || fallback;
  }, [title, fallback]);
}
