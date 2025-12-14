import loroPianaLogo from "../public/brands/loro-piana.png";
import alumoLogo from "../public/brands/alumo.png";
import aristonLogo from "../public/brands/ariston.png";
import borelliLogo from "../public/brands/borelli.png";
import cavaniLogo from "../public/brands/cavani.png";
import dormeuilLogo from "../public/brands/dormeuil.png";
import dragoLogo from "../public/brands/drago.png";
import enricoZenoniLogo from "../public/brands/enrico-zenoni.png";
import zegnaLogo from "../public/brands/zegna.png";
import ethomasLogo from "../public/brands/ethomas.png";
import lombardoLogo from "../public/brands/lombardo.png";
import redaLogo from "../public/brands/reda.png";
import scabalLogo from "../public/brands/scabal.png";
import vitaleLogo from "../public/brands/vitale.png";
import type { Brand, GalleryItem } from "./types";

export const brands: Brand[] = [
  {
    slug: "loro-piana",
    name: "Loro Piana",
    blurb: "Italy — Renowned for ultra-fine wools, cashmeres, and vicuñas",
    logo: loroPianaLogo.src,
  },
  {
    slug: "vitale-barberis-canonico",
    name: "Vitale Barberis Canonico",
    blurb: "Italy — 370 years of heritage excellence",
    logo: vitaleLogo.src,
  },
  { slug: "cavani", name: "Cavani", blurb: "Italy — Modern Italian craftsmanship", logo: cavaniLogo.src },
  { slug: "drago", name: "Drago", blurb: "Italy — Contemporary sophistication", logo: dragoLogo.src },
  { slug: "ermenegildo-zegna", name: "Ermenegildo Zegna", blurb: "Italy — Luxury since 1910", logo: zegnaLogo.src },
  { slug: "scabal", name: "Scabal", blurb: "Belgium — The Rolls Royce of fabrics", logo: scabalLogo.src },
  { slug: "e-thomas", name: "E. Thomas", blurb: "UK — British heritage textiles", logo: ethomasLogo.src },
  { slug: "ariston", name: "Ariston", blurb: "Italy — Refined suiting fabrics", logo: aristonLogo.src },
  { slug: "dormeuil", name: "Dormeuil", blurb: "France/UK — Luxury since 1842", logo: dormeuilLogo.src },
  { slug: "alumo", name: "Alumo", blurb: "Italy — Exceptional shirting fabrics", logo: alumoLogo.src },
  { slug: "reda", name: "Reda", blurb: "Italy — Sustainable luxury woolens", logo: redaLogo.src },
  { slug: "grandi-rubinelli", name: "Grandi & Rubinelli", blurb: "Italy — Artisanal excellence", logo: null },
  { slug: "lombardo", name: "Lombardo", blurb: "Italy — Classic Italian tailoring", logo: lombardoLogo.src },
  { slug: "enrico-zenoni", name: "Enrico Zenoni", blurb: "Italy — Distinctive fabrics", logo: enricoZenoniLogo.src },
  { slug: "holland-and-sherry", name: "Holland & Sherry", blurb: "UK — British prestige since 1836", logo: null },
  { slug: "huddersfield", name: "Huddersfield Textiles", blurb: "UK — English heritage fabrics", logo: null },
  { slug: "borelli", name: "Borelli", blurb: "Italy — Premium shirting", logo: borelliLogo.src },
];

export const galleryFilters = ["All", "Gallery", "Business Wear", "Wedding", "Casual", "Ethnic", "Accessories"];
