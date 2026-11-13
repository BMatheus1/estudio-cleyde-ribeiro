import { ArrowUpRight, Plus } from "lucide-react";
import { combo, formatStartingPrice, pricingNotes, serviceGroups, serviceWhatsApp } from "../data/services";

function ServiceRow({ name, price, context }: { name: string; price: number | null; context?: string }) {
  return <div className="catalog-row">
    <div><strong>{name}</strong><p className="catalog-price">{formatStartingPrice(price)}</p></div>
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
        : <ServiceRow key={service.id} name={service.name} price={service.price} context={group.id === "dep-masc" ? group.name : undefined} />)}
      <p className="catalog-note">{group.id === "cabelos" ? pricingNotes.hair : pricingNotes.other}</p>
    </details>)}
  </div>;
}

export function Promotions() {
  return <>
    <ServiceRow name={combo.name} price={combo.price} />
    <p>{combo.description}</p>
    <p className="catalog-note">{pricingNotes.other}</p>
  </>;
}
