"use client";

import { useEffect, useState } from "react";

// Fait « taper » un nombre de caractères, comme si quelqu'un écrivait au clavier.
export function useFrappe(total: number, vitesse = 28, delai = 0) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let minuteur = 0;
    const depart = window.setTimeout(() => {
      minuteur = window.setInterval(() => {
        setN((v) => {
          if (v >= total) {
            clearInterval(minuteur);
            return v;
          }
          return v + 1;
        });
      }, vitesse);
    }, delai);
    return () => {
      clearTimeout(depart);
      clearInterval(minuteur);
    };
  }, [total, vitesse, delai]);
  return n;
}

// Avance d'une étape à intervalles réguliers (0, 1, 2… jusqu'à max).
export function useSequence(max: number, intervalle: number, delai = 0) {
  const [i, setI] = useState(0);
  useEffect(() => {
    let minuteur = 0;
    const depart = window.setTimeout(() => {
      minuteur = window.setInterval(() => setI((v) => (v >= max ? v : v + 1)), intervalle);
    }, delai);
    return () => {
      clearTimeout(depart);
      clearInterval(minuteur);
    };
  }, [max, intervalle, delai]);
  return i;
}

export function Curseur() {
  return <span className="ms-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] animate-pulse bg-bleu-clair" />;
}
