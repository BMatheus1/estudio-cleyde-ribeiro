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
