"use client";
import axios from "axios";
import React from "react";
import { DEFAULT_TEAM_PAGE_CONTENT } from "@/constants/team-content";

let cachedTeamPageContent = null;
let fetchPromise = null;

async function loadTeamPageContent() {
  if (cachedTeamPageContent) {
    return cachedTeamPageContent;
  }

  if (!fetchPromise) {
    fetchPromise = axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/team-page`)
      .then((response) => {
        const attrs = response?.data?.data?.attributes;

        if (!attrs) {
          cachedTeamPageContent = DEFAULT_TEAM_PAGE_CONTENT;
          return cachedTeamPageContent;
        }

        cachedTeamPageContent = {
          executivesTitle:
            attrs.executivesTitle || DEFAULT_TEAM_PAGE_CONTENT.executivesTitle,
          executivesIntro:
            attrs.executivesIntro || DEFAULT_TEAM_PAGE_CONTENT.executivesIntro,
          galleryTitle:
            attrs.galleryTitle || DEFAULT_TEAM_PAGE_CONTENT.galleryTitle,
          galleryIntro:
            attrs.galleryIntro || DEFAULT_TEAM_PAGE_CONTENT.galleryIntro,
        };

        return cachedTeamPageContent;
      })
      .catch((error) => {
        console.error("Erreur lors du chargement de la page Équipe:", error);
        cachedTeamPageContent = DEFAULT_TEAM_PAGE_CONTENT;
        return cachedTeamPageContent;
      })
      .finally(() => {
        fetchPromise = null;
      });
  }

  return fetchPromise;
}

export function useTeamPageContent() {
  const [content, setContent] = React.useState(DEFAULT_TEAM_PAGE_CONTENT);

  React.useEffect(() => {
    let isMounted = true;

    loadTeamPageContent().then((data) => {
      if (isMounted) {
        setContent(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return content;
}

export function getStrapiImageUrl(media) {
  const url = media?.data?.attributes?.url;
  if (!url) {
    return null;
  }

  return `${process.env.NEXT_PUBLIC_ASSETS_ORIGIN || ""}${url}`;
}

export function getExecutiveInitials(name = "") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}
