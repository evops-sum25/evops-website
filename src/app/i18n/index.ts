import { headers } from "next/headers";
import i18next from "./i18next";
import { fallbackLng, headerName } from "./settings";

export async function getT(
  ns: string | string[],
  options: { keyPrefix?: string } | undefined,
) {
  const headerList = await headers();
  const lng = headerList.get(headerName);
  const usedLng = lng ?? i18next.resolvedLanguage ?? fallbackLng;
  if (lng && i18next.resolvedLanguage !== lng) {
    await i18next.changeLanguage(lng);
  }
  if (ns && !i18next.hasLoadedNamespace(ns)) {
    await i18next.loadNamespaces(ns);
  }
  return {
    t: i18next.getFixedT(
      usedLng,
      Array.isArray(ns) ? ns[0] : ns,
      options?.keyPrefix,
    ),
    i18n: i18next,
  };
}
