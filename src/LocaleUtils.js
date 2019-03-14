import setDay from 'date-fns/set_day';
import format from 'date-fns/format';
import en from 'date-fns/locale/en';
import es from 'date-fns/locale/es';
import pt from 'date-fns/locale/pt';
import fr from 'date-fns/locale/fr';
import de from 'date-fns/locale/de';
import pl from 'date-fns/locale/pl';
import it from 'date-fns/locale/it';
import ru from 'date-fns/locale/ru';
import ja from 'date-fns/locale/ja';
import ko from 'date-fns/locale/ko';
import tr from 'date-fns/locale/tr';
import sv from 'date-fns/locale/sv';
import nl from 'date-fns/locale/nl';
import da from 'date-fns/locale/da';
import th from 'date-fns/locale/th';
import cs from 'date-fns/locale/cs';
import zh from 'date-fns/locale/zh_cn';
import * as no from 'date-fns/locale/nb';

const MONTHS_INDICE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const locales = {
  en,
  es,
  pt,
  fr,
  de,
  pl,
  it,
  ru,
  ja,
  ko,
  tr,
  sv,
  no,
  nl,
  da,
  th,
  cs,
  zh,
};

const getLocale = locale =>
  typeof locale === 'string' ? locales[locale] : locale;

export const formatDate = (date, dateFormat, locale) =>
  format(date, dateFormat, { locale: getLocale(locale) });

export default locale => ({
  formatMonthTitle: date =>
    format(date, 'MMMM YYYY', {
      locale: getLocale(locale),
    }),

  formatWeekdayShort: index =>
    format(setDay(new Date(), index), 'dd', {
      locale: getLocale(locale),
    }),

  formatWeekdayLong: index =>
    format(setDay(new Date(), index), 'dddd', {
      locale: getLocale(locale),
    }),

  formatDay: date =>
    format(date, 'ddd ll', {
      locale: getLocale(locale),
    }),

  getMonths: () =>
    MONTHS_INDICE.map(i =>
      format(new Date(2018, i), 'MMMM', { locale: getLocale(locale) }),
    ),
});
