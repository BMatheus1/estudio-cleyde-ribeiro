import { ArrowUpRight, Plus } from "lucide-react";
import { formatStartingPrice, pricingNotes, promotions, serviceGroups, serviceWhatsApp } from "../data/services";

function ServiceRow({ name, price, context, description }: { name: string; price: number | null; context?: string; description?: string }) {
  return <div className="catalog-row">
    <div><strong>{name}</strong><p className="catalog-price">{formatStartingPrice(price)}</p>{description && <p>{description}</p>}</div>
    <a className="text-link" href={serviceWhatsApp(context ? `${name} (${context})` : name, price)}
      aria-label={`Consultar ${name} pelo WhatsApp`}>WhatsApp <ArrowUpRight size={15} /></a>
  </div>;
}

export function Services() {
  return <div className="studio-services">
    {serviceGroups.map(group => <details key={group.id} name="catalog-categories" className="studio-service catalog-category">
      <summary><span>{group.name}</span><Plus className="studio-indicator" size={17} aria-hidden="true" /></summary>
      {group.services.map(service => service.options
        ? <details className="studio-service catalog-options" key={service.id}>
            <summary><span>{service.name}<span className="catalog-price">{formatStartingPrice(service.price)}</span></span><Plus className="studio-indicator" size={17} aria-hidden="true" /></summary>
            {service.options.map(option => <ServiceRow key={option.id} name={option.name} price={option.price} />)}
          </details>
        : <ServiceRow key={service.id} name={service.name} price={service.price} description={service.description} context={group.id === "dep-masc" ? group.name : undefined} />)}
      {group.id === "cabelos" && <p className="catalog-note">{pricingNotes.hair}</p>}
    </details>)}
    <p className="catalog-note">{pricingNotes.other}</p>
  </div>;
}

export function Promotions() {
  // This site is statically exported, so publication dates are evaluated on each build.
  const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Sao_Paulo" }).format(new Date());
  const available = promotions.filter(promo => promo.active && promo.approved &&
    (!promo.startsOn || promo.startsOn <= today) && (!promo.endsOn || today <= promo.endsOn));

  if (!available.length) return <p>Consulte o estúdio sobre os próximos combos e promoções.</p>;

  return <>
    {available.map(promo => <div key={promo.id}>
      <ServiceRow name={promo.name} price={promo.price} description={promo.description} />
      {promo.id === "combo-depilacao-feminina" && <p>Inclui {promo.included.join(", ")}.</p>}
      {promo.payment && <p>Pagamento via {promo.payment}.</p>}
    </div>)}
    <p className="catalog-note">{pricingNotes.other}</p>
  </>;
}
