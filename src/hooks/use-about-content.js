"use client";
import axios from "axios";
import React from "react";
import { DEFAULT_ABOUT_CONTENT } from "@/constants/about-content";
import { normalizeAboutParagraphs } from "@/utils/about-paragraph-format";

let cachedAboutContent = null;
let fetchPromise = null;

async function loadAboutContent() {
  if (cachedAboutContent) {
    return cachedAboutContent;
  }

  if (!fetchPromise) {
    fetchPromise = axios
      .get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/about-page?populate[paragraphs]=*`
      )
      .then((response) => {
        const attrs = response?.data?.data?.attributes;

        if (!attrs) {
          cachedAboutContent = DEFAULT_ABOUT_CONTENT;
          return cachedAboutContent;
        }

        cachedAboutContent = {
          subtitle: attrs.subtitle || DEFAULT_ABOUT_CONTENT.subtitle,
          title: attrs.title || DEFAULT_ABOUT_CONTENT.title,
          vision: attrs.vision || DEFAULT_ABOUT_CONTENT.vision,
          mission: attrs.mission || DEFAULT_ABOUT_CONTENT.mission,
          values: attrs.values || DEFAULT_ABOUT_CONTENT.values,
          paragraphs: attrs.paragraphs?.length
            ? normalizeAboutParagraphs(
                attrs.paragraphs.map((item) => item?.content).filter(Boolean)
              )
            : DEFAULT_ABOUT_CONTENT.paragraphs,
        };

        return cachedAboutContent;
      })
      .catch((error) => {
        console.error("Erreur lors du chargement du contenu À propos:", error);
        cachedAboutContent = DEFAULT_ABOUT_CONTENT;
        return cachedAboutContent;
      })
      .finally(() => {
        fetchPromise = null;
      });
  }

  return fetchPromise;
}

export function useAboutContent() {
  const [aboutContent, setAboutContent] = React.useState(DEFAULT_ABOUT_CONTENT);

  React.useEffect(() => {
    let isMounted = true;

    loadAboutContent().then((content) => {
      if (isMounted) {
        setAboutContent(content);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return aboutContent;
}
