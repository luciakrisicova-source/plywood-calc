function eur(hodnota) {
  return new Intl.NumberFormat("sk-SK", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(hodnota);
}

function cislo(hodnota, desatinneMiesta) {
  return new Intl.NumberFormat("sk-SK", {
    minimumFractionDigits: desatinneMiesta,
    maximumFractionDigits: desatinneMiesta
  }).format(hodnota);
}

function prepniKalkulacku(typ) {
  const skarovkyPanel = document.getElementById("skarovkyPanel");
  const profilPanel = document.getElementById("profilPanel");
  const tabSkarovky = document.getElementById("tabSkarovky");
  const tabProfil = document.getElementById("tabProfil");

  if (typ === "skarovky") {
    skarovkyPanel.classList.remove("hidden");
    profilPanel.classList.add("hidden");
    tabSkarovky.classList.add("active");
    tabProfil.classList.remove("active");
  } else {
    profilPanel.classList.remove("hidden");
    skarovkyPanel.classList.add("hidden");
    tabProfil.classList.add("active");
    tabSkarovky.classList.remove("active");
  }
}

function vypocitajSkarovky() {
  const dlzka = Number(document.getElementById("skDlzka").value);
  const sirka = Number(document.getElementById("skSirka").value);
  const hrubka = Number(document.getElementById("skHrubka").value);
  const pocet = Number(document.getElementById("skPocet").value);
  const cenaKs = Number(document.getElementById("skCenaKs").value);

  if (!dlzka || !sirka || !hrubka || !pocet || !cenaKs) {
    alert("Prosím vyplň všetky polia pre škárovky.");
    return;
  }

  const objemJednehoKusu = (dlzka * sirka * hrubka) / 1000000000;
  const objemJednehoKusuZaokruhleny = Number(objemJednehoKusu.toFixed(3));
  const celkoveKubiky = Number((objemJednehoKusuZaokruhleny * pocet).toFixed(3));

  if (celkoveKubiky === 0) {
    alert("Celkové kubíky vyšli 0. Skontroluj rozmery.");
    return;
  }

  const cenaZaM3 = (pocet * cenaKs) / celkoveKubiky;

  document.getElementById("skKubiky").textContent = `${cislo(celkoveKubiky, 3)} m³`;
  document.getElementById("skCenaM3").textContent = eur(cenaZaM3);
}

function vypocitajProfil() {
  const dlzka = Number(document.getElementById("tpDlzka").value);
  const sirka = Number(document.getElementById("tpSirka").value);
  const cenaM2 = Number(document.getElementById("tpCenaM2").value);
  const pocet = Number(document.getElementById("tpPocet").value);

  if (!dlzka || !sirka || !cenaM2 || !pocet) {
    alert("Prosím vyplň všetky polia pre tatranský profil.");
    return;
  }

  const plochaJednehoKusu = (dlzka * sirka) / 1000000;
  const cenaZaKs = plochaJednehoKusu * cenaM2;
  const celkovaCena = cenaZaKs * pocet;

  document.getElementById("tpPlochaKs").textContent = `${cislo(plochaJednehoKusu, 3)} m²`;
  document.getElementById("tpCenaKs").textContent = eur(cenaZaKs);
  document.getElementById("tpCenaSpolu").textContent = eur(celkovaCena);
}

document.getElementById("tabSkarovky").addEventListener("click", () => prepniKalkulacku("skarovky"));
document.getElementById("tabProfil").addEventListener("click", () => prepniKalkulacku("profil"));
document.getElementById("vypocitatSkarovky").addEventListener("click", vypocitajSkarovky);
document.getElementById("vypocitatProfil").addEventListener("click", vypocitajProfil);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
