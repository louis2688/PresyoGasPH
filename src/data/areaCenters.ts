/** Rough centers for “Jump to area” fly-to — tune per production GIS */
export const AREA_JUMP: Record<
  string,
  { center: [number, number]; zoom: number }
> = {
  "Quezon City": { center: [14.676, 121.044], zoom: 13 },
  Pasig: { center: [14.577, 121.082], zoom: 13 },
  Manila: { center: [14.5995, 120.9842], zoom: 13 },
  Caloocan: { center: [14.657, 121.042], zoom: 13 },
  Parañaque: { center: [14.479, 121.016], zoom: 13 },
  Makati: { center: [14.554, 121.024], zoom: 13 },
  "Las Piñas": { center: [14.439, 120.983], zoom: 13 },
  Valenzuela: { center: [14.703, 120.982], zoom: 13 },
  Marikina: { center: [14.641, 121.097], zoom: 13 },
  "San Juan": { center: [14.605, 121.036], zoom: 14 },
  Mandaluyong: { center: [14.579, 121.035], zoom: 13 },
  Muntinlupa: { center: [14.408, 121.041], zoom: 13 },
  Malabon: { center: [14.663, 120.956], zoom: 13 },
  Pasay: { center: [14.524, 121.004], zoom: 13 },
  Taguig: { center: [14.518, 121.049], zoom: 13 },
  Navotas: { center: [14.673, 120.943], zoom: 13 },
  Pateros: { center: [14.546, 121.069], zoom: 14 },
};
