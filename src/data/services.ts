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
    { id: "selagem", name: "Selagem capilar", price: null },
    { id: "lisoplastia", name: "Lisoplastia", price: null },
    { id: "botox", name: "Botox capilar", price: null },
    { id: "hidratacao", name: "Hidratação", price: null },
    { id: "cauterizacao", name: "Cauterização", price: null },
    { id: "reconstrucao", name: "Reconstrução capilar", price: null },
    { id: "penteados", name: "Penteados", price: null },
    { id: "coloracao", name: "Coloração", price: null },
  ] },
  { id: "estetica", name: "Estética facial", services: [
    { id: "limpeza-pele", name: "Limpeza de pele", price: 130 },
    { id: "sobrancelha-fio-a-fio", name: "Sobrancelha fio a fio", price: 150,
      description: "Fios com design personalizado para um resultado natural que realça sua beleza." },
    { id: "sobrancelhas", name: "Design de sobrancelhas", price: null },
    { id: "cilios", name: "Cílios", price: null },
    { id: "maquiagem", name: "Maquiagem", price: null },
  ] },
  { id: "unhas", name: "Unhas", services: [
    { id: "pe-mao", name: "Pé e mão", price: 70 },
  ] },
  { id: "dep-masc", name: "Depilação masculina", services: [
    { id: "dep-masc-costas", name: "Costas", price: 80 },
    { id: "dep-masc-peito", name: "Peito", price: 90 },
    { id: "dep-masc-axila", name: "Axila", price: 40 },
    { id: "dep-masc-perna", name: "Perna inteira", price: 80 },
    { id: "dep-masc-meia-perna", name: "Meia perna", price: 60 },
  ] },
  { id: "dep-feminina", name: "Depilação feminina", services: [
    { id: "dep-feminina", name: "Depilação feminina", price: null },
  ] },
  { id: "bem-estar", name: "Bem-estar", services: [
    { id: "argiloterapia", name: "Argiloterapia", price: null },
    { id: "massagem-relaxante", name: "Massagem relaxante", price: null },
    { id: "drenagem-linfatica", name: "Drenagem linfática", price: null },
  ] },
];

type Promotion = {
  id: string;
  name: string;
  price: number;
  description: string;
  included: string[];
  active: boolean;
  approved: boolean;
  startsOn?: string;
  endsOn?: string;
  payment?: string;
};

const hairCampaign = { active: true, approved: true, payment: "Pix" };

export const promotions: Promotion[] = [
  { ...hairCampaign, id: "combo-capilar-1", name: "Corte + Escova + Hidratação", price: 89.90,
    description: "Cuidado completo para seus fios.", included: ["Corte", "Escova", "Hidratação"] },
  { ...hairCampaign, id: "combo-capilar-2", name: "Cauterização + Corte", price: 119.90,
    description: "Força, brilho e movimento.", included: ["Cauterização", "Corte"] },
  { ...hairCampaign, id: "combo-capilar-3", name: "Botox + Reconstrução + Corte", price: 199.90,
    description: "Cabelos mais saudáveis, fortes e renovados.", included: ["Botox capilar", "Reconstrução capilar", "Corte"] },
  { id: "combo-depilacao-feminina", name: "Combo Depilação Feminina", price: 85,
    description: "Três áreas, um cuidado completo.", included: ["Buço", "Meia perna", "Axila"], active: true, approved: true },
];

export const pricingNotes = {
  hair: "Os valores podem variar conforme o comprimento, volume e necessidades de cada cabelo. Consulte o valor final antes do atendimento.",
  other: "Os valores anunciados são iniciais. Consulte as condições e confirme o orçamento.",
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
