export type Work = { id: string; title: string; file: string; before: [number, number, number, number]; after: [number, number, number, number] };
export const works: Work[] = [
  { id: "luzes", title: "Luzes e coloração", file: "portfolio luzes.jpeg", before: [25,205,590,870], after: [634,205,590,870] },
  { id: "morena-iluminada", title: "Morena iluminada", file: "portfólio morena iluminada.jpeg", before: [0,0,652,1030], after: [660,0,652,1030] },
  { id: "lisoplastia", title: "Lisoplastia", file: "portfólio lisoplastia.jpeg", before: [12,245,600,620], after: [636,245,600,620] },
  { id: "corte", title: "Corte", file: "portfólio corte.jpeg", before: [0,115,634,1045], after: [645,115,634,1045] },
  { id: "progressiva", title: "Progressiva", file: "portfólio progressiva.jpeg", before: [35,359,465,693], after: [524,359,465,693] },
  { id: "selagem", title: "Selagem capilar", file: "portfólio selagem.jpeg", before: [12,230,575,680], after: [610,230,575,680] },
];
