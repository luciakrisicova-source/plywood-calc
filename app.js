function naMetre(hodnota, jednotka) {
  const cislo = Number(hodnota);

  if (!cislo || cislo <= 0) {
    return 0;
  }

  if (jednotka === "m") return cislo;
  if (jednotka === "cm") return cislo / 100;
  if (jednotka === "mm") return cislo / 1000;

  return cislo;
}

function eur(hodnota) {
  return new Intl.NumberFormat("sk-SK", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(hodnota);
}

function cislo(hodnota, desatinneMiesta = 4) {
  return new Intl.NumberFormat("sk-SK", {
    minimumFractionDigits: desatinneMiesta,
    maximumFractionDigits: desatinneMiesta
  }).format(hodnota);
}

function vypocitaj() {
  const dlzka = naMetre(
    document.getElementById("dlzka").value,
    document.getElementById("dlzkaJednotka").value
  );

  const sirka = naMetre(
    document.getElementById("sirka").value,
    document.getElementById("sirkaJednotka").value
  );

  const hrubka = naMetre(
    document.getElementById("hrubka").value,
    document.getElementById("hrubkaJednotka").value
  );

  const pocet = Number(document.getElementById("pocet").value);
  const cenaM3 = Number(document.getElementById("cenaM3").value);

  if (!dlzka || !sirka || !hrubka || !pocet || !cenaM3) {
    alert("Prosím vyplň všetky hodnoty.");
    return;
  }

  const objem1ks = dlzka * sirka * hrubka;
  const objemSpolu = objem1ks * pocet;
  const cenaZaKs = objem1ks * cenaM3;
  const cenaSpolu = cenaZaKs * pocet;

  document.getElementById("ekasaMnozstvo").textContent = `${pocet} ks`;
  document.getElementById("ekasaCenaKs").textContent = eur(cenaZaKs);
  document.getElementById("celkom").textContent = eur(cenaSpolu);

  document.getElementById("objemKs").textContent = `${cislo(objem1ks, 6)} m³`;
  document.getElementById("objemSpolu").textContent = `${cislo(objemSpolu, 4)} m³`;
}

document.getElementById("vypocitat").addEventListener("click", vypocitaj);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
