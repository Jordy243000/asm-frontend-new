import React from "react";

export const PADS_CORPORATION_URL = "https://www.padsrdc.com/";

export const OGEFREM_SYGREM2_INTRO =
  "Dans le cadre de ses solutions, ASM accompagne également l'OGEFREM à travers PADS CORPORATION dans la digitalisation et la gestion des redevances maritimes à travers SYGREM 2.";

const OGEFREM_SYGREM2_SUFFIX =
  "Cette plateforme prend notamment en charge les opérations liées à la FERI, à l'Attestation de Destination de Continuité — ADC, à l'Attestation de Destination Régionale — ADR, à la FERE ainsi qu'à la Commission d'Intervention. Elle permet aux opérateurs économiques, aux services habilités et aux différents intervenants du secteur d'effectuer leurs démarches en ligne de manière simple, rapide, transparente et sécurisée.";

export const OGEFREM_SYGREM2_PARAGRAPH = `${OGEFREM_SYGREM2_INTRO} ${OGEFREM_SYGREM2_SUFFIX}`;

export function normalizeOgefremParagraph(content = "") {
  if (!content.includes("SYGREM 2")) {
    return content;
  }

  const suffixIndex = content.indexOf("Cette plateforme");
  const suffix =
    suffixIndex >= 0 ? content.slice(suffixIndex) : OGEFREM_SYGREM2_SUFFIX;

  return `${OGEFREM_SYGREM2_INTRO} ${suffix}`;
}

export function normalizeAboutParagraphs(paragraphs = []) {
  return paragraphs.map((content) => normalizeOgefremParagraph(content));
}

export function AboutParagraphText({ text, className = "mb-0" }) {
  const normalized = normalizeOgefremParagraph(text);
  const parts = normalized.split(/(PADS CORPORATION)/);

  return (
    <p className={className}>
      {parts.map((part, index) =>
        part === "PADS CORPORATION" ? (
          <a
            key={`pads-${index}`}
            href={PADS_CORPORATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ca-about-page-pads-link"
          >
            PADS CORPORATION
          </a>
        ) : (
          <React.Fragment key={`text-${index}`}>{part}</React.Fragment>
        )
      )}
    </p>
  );
}
