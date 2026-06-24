const PARTNER_LOGO_OVERRIDES = [
  {
    match: /lignes maritimes|lmc/i,
    logo: "/assets/img/partners/lmc.png",
    className: "partner-logo-lmc",
  },
  {
    match: /pads/i,
    logo: "/assets/img/partners/pads-corporation.png",
    className: "partner-logo-pads",
  },
];

export const STATIC_PARTNER_ENTRIES = [
  {
    id: "static-pads",
    attributes: {
      name: "PADS Corporation",
      website: "https://www.padsrdc.com/",
    },
  },
];

export function getPartnerLogo(item) {
  const name = item?.attributes?.name || "";
  const override = PARTNER_LOGO_OVERRIDES.find((entry) =>
    entry.match.test(name)
  );

  if (override) {
    return {
      logo: override.logo,
      className: override.className,
    };
  }

  const url = item?.attributes?.logo?.data?.attributes?.url;
  if (!url) {
    return null;
  }

  return {
    logo: `${process.env.NEXT_PUBLIC_ASSETS_ORIGIN}${url}`,
    className: "",
  };
}

export function dedupePartnerList(partners = []) {
  const seen = new Set();

  return partners.filter((item) => {
    const name = (item?.attributes?.name || "").trim().toLowerCase();
    if (!name || seen.has(name)) {
      return false;
    }

    seen.add(name);
    return true;
  });
}

export function mergePartnerList(partners = []) {
  const uniquePartners = dedupePartnerList(partners);
  const existingNames = uniquePartners.map((item) => item?.attributes?.name || "");

  const missingStatic = STATIC_PARTNER_ENTRIES.filter((entry) => {
    const staticName = entry?.attributes?.name || "";
    const override = PARTNER_LOGO_OVERRIDES.find((item) =>
      item.match.test(staticName)
    );
    if (!override) {
      return false;
    }
    return !existingNames.some((name) => override.match.test(name));
  });

  return [...uniquePartners, ...missingStatic];
}
