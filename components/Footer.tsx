import type { Dict, Locale } from "@/lib/i18n";
import { site, SERVICE_SLUGS } from "@/lib/site";
import Logo from "./Logo";

export default function Footer({ t, locale }: { t: Dict; locale: Locale }) {
  const home = `/${locale}/`;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo href={home} label={t.a11y.home} light />
            <p>{t.footer.tagline}</p>
          </div>

          <div className="footer__col">
            <p className="footer__title">{t.footer.servicesTitle}</p>
            <ul>
              {SERVICE_SLUGS.map((s) => (
                <li key={s}>
                  <a href={`${home}leistungen/${s}/`}>{t.services.items[s].title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <p className="footer__title">{t.footer.companyTitle}</p>
            <ul>
              <li><a href={`${home}#warum`}>{t.nav.why}</a></li>
              <li><a href={`${home}#referenzen`}>{t.nav.work}</a></li>
              <li><a href={`${home}#faq`}>{t.nav.faq}</a></li>
              <li><a href={`${home}impressum/`}>{t.footer.imprint}</a></li>
              <li><a href={`${home}datenschutz/`}>{t.footer.privacy}</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <p className="footer__title">{t.footer.contactTitle}</p>
            <address>
              {site.name}
              <br />
              {site.street}
              <br />
              {site.zip} {site.city}
              <br />
              <a href={site.phoneHref}>{site.phone}</a>
              <br />
              <a href={site.phone2Href}>{site.phone2}</a>
              {site.email && (
                <>
                  <br />
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </>
              )}
            </address>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} {site.name}. {t.footer.rights}
          </p>
          <p className="footer__legal">
            <a href={`${home}impressum/`}>{t.footer.imprint}</a>
            <a href={`${home}datenschutz/`}>{t.footer.privacy}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
