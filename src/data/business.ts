import { ArrowUpRight, Brush, Droplets, Flower2, Hand, Scissors, Sparkles, Waves } from "lucide-react";

export const business = {
  name: "Estúdio Cleyde Ribeiro",
  phone: "(11) 98486-4097",
  address: "Rua Nápoles, 23",
  district: "Parque Veneza",
  city: "São Bernardo do Campo – SP",
  maps: "https://www.google.com/maps/search/?api=1&query=Rua+N%C3%A1poles+23+Parque+Veneza+S%C3%A3o+Bernardo+do+Campo+SP",
  logo: "/originais/Logotipo.jpeg",
  description: "Salão de beleza em São Bernardo do Campo com serviços capilares, estética, bem-estar e orientação técnica com Cleyde Ribeiro.",
};
export function whatsapp(message = "Olá! Vim pelo site do Estúdio Cleyde Ribeiro e gostaria de agendar um horário.") {
  return "https://wa.me/5511984864097?text=" + encodeURIComponent(message);
}
export const navigation = [
  ["Início", "inicio"], ["Serviços", "servicos"], ["Portfólio", "portfolio"],
  ["Sobre", "sobre"], ["Mentoria", "mentoria"], ["Localização", "localizacao"],
];
export const groups = [
  { name: "Cabelos", icon: Scissors, entries: [
    ["Cabelos", "Cuidados personalizados para o seu cabelo."],
    ["Escova e penteados", "Finalização para o dia a dia e ocasiões especiais."],
    ["Tratamentos capilares", "Cuidados escolhidos de acordo com as necessidades dos fios."],
    ["Coloração e luzes", "Cor e iluminação pensadas para o seu estilo."],
  ] },
  { name: "Estética", icon: Sparkles, entries: [
    ["Limpeza de pele", "Cuidado profissional para a pele."],
    ["Design de sobrancelhas", "Desenho que acompanha seus traços."],
    ["Cílios", "Atendimento personalizado para os cílios."],
    ["Depilação feminina e masculina", "Atendimento de depilação para mulheres e homens."],
    ["Maquiagem", "Maquiagem alinhada ao seu estilo e à ocasião."],
  ] },
  { name: "Bem-estar", icon: Flower2, entries: [
    ["Argiloterapia", "Cuidado estético com argila."],
    ["Massagem relaxante", "Uma pausa dedicada ao relaxamento."],
    ["Drenagem linfática", "Atendimento individual de drenagem linfática."],
  ] },
];
export const serviceIcons = [Scissors, Brush, Droplets, Sparkles, Waves, Hand, ArrowUpRight];
