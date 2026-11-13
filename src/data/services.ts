import { whatsapp } from "./business";

type Service = { id: string; name: string; price: number | null; description?: string; options?: Service[] };

export const serviceGroups: { id: string; name: string; services: Service[] }[] = [
  { id: "cabelos", name: "Cabelos e tratamentos", services: [
    { id: "escova", name: "Escova", price: 50 },
    { id: "escova-blindada", name: "Escova blindada", price: 80 },
    { id: "progressiva", name: "Progressiva", price: 130 },
    { id: "cronograma-liz-ploton", name: "Cronograma capilar Liz Ploton", price: 150 },
    { id: "corte", name: "Corte", price: 50 },
    { id: "luzes", name: "Luzes", price: 150, options: [
      { id: "luzes-touca", name: "Luzes na touca", price: 150 },
      { id: "luzes-papelote", name: "Luzes no papelote", price: 200 },
      { id: "freehand", name: "Freehand", price: 150 },
      { id: "irisada", name: "Irisada", price: 200 },
    ] },
    { id: "ozonioterapia", name: "Pacote de ozonioterapia", price: 200 },
    { id: "tratamentos-gerais", name: "Tratamentos capilares em geral", price: 80 },
    { id: "penteados", name: "Penteados", price: null },
    { id: "coloracao", name: "Coloração", price: null },
  ] },
  { id: "estetica", name: "Estética e unhas", services: [
    { id: "pe-mao", name: "Pé e mão", price: 70 },
    { id: "limpeza-pele", name: "Limpeza de pele", price: 130 },
    { id: "sobrancelhas", name: "Design de sobrancelhas", price: null },
    { id: "cilios", name: "Cílios", price: null },
    { id: "maquiagem", name: "Maquiagem", price: null },
    { id: "dep-feminina", name: "Depilação feminina", price: null },
  ] },
  { id: "dep-masc", name: "Depilação masculina", services: [
    { id: "dep-masc-costas", name: "Costas", price: 80 },
    { id: "dep-masc-peito", name: "Peito", price: 90 },
    { id: "dep-masc-axila", name: "Axila", price: 40 },
    { id: "dep-masc-perna", name: "Perna inteira", price: 80 },
    { id: "dep-masc-meia-perna", name: "Meia perna", price: 60 },
  ] },
  { id: "bem-estar", name: "Bem-estar", services: [
    { id: "argiloterapia", name: "Argiloterapia", price: null },
    { id: "massagem-relaxante", name: "Massagem relaxante", price: null },
    { id: "drenagem-linfatica", name: "Drenagem linfática", price: null },
  ] },
];

export const combo: Service = {
  id: "combo-depilacao-feminina",
  name: "Combo Depilação Feminina",
  price: 85,
  description: "Inclui buço, meia perna e axila.",
};

export const pricingNotes = {
  hair: "Os valores são a partir dos preços informados e podem variar conforme o comprimento, volume e necessidades de cada cabelo. Consulte o valor final antes de agendar.",
  other: "Valores iniciais sujeitos às condições do atendimento. Consulte para confirmar o orçamento.",
};

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function formatStartingPrice(price: number | null): string {
  return price === null ? "Consultar valor" : `A partir de ${currency.format(price).replace(/\u00a0/g, " ")}`;
}

export function serviceWhatsApp(name: string, price: number | null) {
  return whatsapp(price === null
    ? `Olá! Vim pelo site e gostaria de consultar o valor de ${name}.`
    : `Olá! Vim pelo site do Estúdio Cleyde Ribeiro e gostaria de saber mais sobre o serviço de ${name}, anunciado ${formatStartingPrice(price).replace(/^A/, "a")}.`);
}
