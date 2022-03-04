let titulosPeriodicosConfiables = ["The Wall Street Journal", "The Guardian", "The New York Times", "The Washington Post", "China Daily", 
                          "The Independent", "The Times of India", "El Sydney Morning Herald", "Daily Mail", "Amanecer"]
let fuentesConfiables = ["https://www.wsj.com/", "https://www.theguardian.com/", "https://www.nytimes.com/", "https://www.washingtonpost.com/", "http://www.chinadaily.com.cn/",
                        "https://www.independentespanol.com/", "https://timesofindia.indiatimes.com/", "https://www.smh.com.au/", "https://www.dailymail.co.uk/"]
let tituloPeriodico = "The Wall Street Journal";
let tituloNoticia = "wenas"
let contenido = ""
let fuente = "https://www.nytimes.com/subscription?campaignId=7UXFY&ds_c=71700000073311507&gclid=Cj0KCQiAvvKBBhCXARIsACTePW9MzpTzR7Hq-Qj7in7lHIFRL5efHWJ6T4qDi-ejv3ppEJciiyQyY8gaAhyKEALw_wcB&gclsrc=aw.ds"
let porcentajeDeFiabilidad = 0;

for (let index = 0; index < titulosPeriodicosConfiables.length; index++) {
    if ((tituloPeriodico).toLowerCase().trim() == titulosPeriodicosConfiables[index].toLowerCase().trim()) {
        porcentajeDeFiabilidad = porcentajeDeFiabilidad + 25;
        console.log("Epale")
    }
    
}
if (tituloNoticia.trim() != tituloNoticia.toUpperCase().trim()){
    porcentajeDeFiabilidad = porcentajeDeFiabilidad + 15;
}
let aux = fuente.split("");
let aux2 = [];
let cont = 0;
for (let index = 0; index < aux.length; index++) {
    aux2.push(aux[index]);
    if (aux[index] == "/") {
        cont += 1;
    }
    if (cont == 3) {
        for (let index = 0; index < fuentesConfiables.length; index++) {
            if (aux2.join('') == fuentesConfiables[index]) {
                porcentajeDeFiabilidad = porcentajeDeFiabilidad + 60;
            }
        }
    }
}
console.log(porcentajeDeFiabilidad)