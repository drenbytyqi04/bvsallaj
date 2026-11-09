export default function Logo({ href, label, light = false }: { href: string; label: string; light?: boolean }) {
  return (
    <a href={href} className={`logo${light ? " logo--light" : ""}`} title={label}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" alt="" width={48} height={48} />
      <span className="logo__text">
        <span className="logo__name">
          BV-Sallaj
        </span>
        <span className="logo__sub">Boden &amp; Innenausbau</span>
      </span>
    </a>
  );
}
