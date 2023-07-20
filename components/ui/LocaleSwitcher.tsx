'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next-intl/client';
import { HiTranslate } from 'react-icons/hi';
import Icon from "./Icon";

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onSelectChange() {
    router.replace(pathname, { locale: locale === "en" ? "es" : "en" });
  }

  return (
    <Icon Icon={HiTranslate} onClick={onSelectChange} />
  );
}