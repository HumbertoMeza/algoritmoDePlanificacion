//APARTADO DE INTERACCION CÓDIGO - GRÁFICO
import {proceso, roundRobin, fcfs, sjf, srt, prioridades} from "./main.js";
(function(){
    "use strict"
    //FUNCION PARA INTERACTUAR CON HTML
    document.addEventListener("DOMContentLoaded",function(){
        let botonAñadir = document.querySelector("#boton-añadir");
        let arregloPalabrasProceso = ["Nombre del Proceso","Tiempo de rafaga","Tiempo de llegada","Prioridad"];
        let palabras = ["Proceso", "Ráfaga", "Llegada", "Prioridad"];
        //FUNCION PARA UTILIZAR LA ACCION DEL BOTON "AÑADIR"
        botonAñadir.addEventListener("click",function(){
            let arregloDelProceso = [];
            //CICLO PARA PEDIR DATOS
             for (let index = 0; index < 4; index++) {
                 //FILTRO DE CARACTERES VALIDOS
                while(true){
                   let num = prompt(arregloPalabrasProceso[index],"");
                    for (let x = 0; x < num.length; x++) {
                        if (num.charAt(x) == "." && index != 0) {
                            num = "A"
                        }
                    }
                    if (num != null && num != "" && index ==0) {
                        arregloDelProceso.push(num);
                        break;
                    }else if(!isNaN(num) && num != null && num != "" && num>=0){
                        arregloDelProceso.push(num);
                      break;
                    }else if(num == 'fin'){
                        break;
                    }else{
                        alert('Valor no valido. Ingresa ' + arregloPalabrasProceso[index]);
                      continue;
                    }
                }
                 
             }
             //SE INSERTAN LOS DATOS EN PANTALLA
            let procesos = document.querySelector(".contenedor-de-procesos");
            let divProceso = document.createElement("div");
            divProceso.classList.add("cuadro-proceso");
            for (let index = 0; index < 4; index++) {
                let parrafo = document.createElement("p");
                parrafo.innerText = `${palabras[index]} ${arregloDelProceso[index]}`;
                divProceso.append(parrafo);
            }
            procesos.append(divProceso);
        })

        //FUNCION PARA USAR LA ACCION DEL BOTON "CALCULAR"
        let botonCalcular = document.querySelector("#boton-calcular");
            botonCalcular.addEventListener("click", function(){
            let tbody = document.querySelector(".tbody");
            tbody.innerHTML = "";
            let tDiagrama = document.querySelector(".diagrama");
            tDiagrama.innerHTML = "";
            let auxProcesos = document.querySelectorAll(".cuadro-proceso p");
            let algoritmoSelec = document.querySelector("#opciones-algoritmo");
            let procesos = [];
            if (auxProcesos.length>1) {
                 //SE GUARDAN LOS DATOS AÑADIDOS EN EL APARTADO GRAFICO
            auxProcesos.forEach(proceso =>{
                procesos.push(proceso.textContent);
            });
            //SE SEPARAN LOS DATOS
            for (let index = 0; index < procesos.length; index++) {
                procesos[index] = procesos[index].split(" ")[1];
            }
            let arregloDeprocesos = [];
            //SE CREAN LOS OBJETOS TIPO PROCESO Y SE ALMACENAN
            for (let index = 0; index < procesos.length; index+= 4) {
                    let pros = new proceso(procesos[index],parseInt(procesos[index+1]),parseInt(procesos[index+2]),parseInt(procesos[index+3]),false, 0, 0, 0,parseInt(procesos[index+1]),0,0,0,generarNuevoColor());
                    arregloDeprocesos.push(pros);
            }
            let objProceso;
            //SE SELECCIONA EL ALGORITMO QUE SE VA UTILIZAR Y SE MANDA A LLAMAR SU FUNCION RESPECTIVA
            switch (algoritmoSelec.value) {
                case "fcfs":
                    objProceso = fcfs(arregloDeprocesos);
                    arregloDeprocesos = objProceso.proceso;
                    pintarTabla(objProceso.proceso);
                    pintarDiadrama(objProceso.diagrama, arregloDeprocesos);
                    break;
                case "sjf":
                    objProceso = sjf(arregloDeprocesos);
                    arregloDeprocesos = objProceso.proceso;
                    pintarTabla(objProceso.proceso);
                    pintarDiadrama(objProceso.diagrama, arregloDeprocesos);
                    break;
                case "srt":
                    objProceso = srt(arregloDeprocesos);
                    arregloDeprocesos = objProceso.proceso;
                    pintarTabla(objProceso.proceso);
                    pintarDiadrama(objProceso.diagrama, arregloDeprocesos);
                break;
                case "prioridades":
                    objProceso = prioridades(arregloDeprocesos);
                    arregloDeprocesos = objProceso.proceso;
                    pintarTabla(objProceso.proceso);
                    pintarDiadrama(objProceso.diagrama, arregloDeprocesos);
                break;
                case "round-robin":
                    let Quantum;
                    //SE VALIDA QUE EL QUANTUM SEA VALIDO
                    while(true){
                         let num = prompt("Ingresa el Quantum","");
                         for (let x = 0; x < num.length; x++) {
                            if (num.charAt(x) == ".") {
                                num = "A"
                            }
                        }
                        if(!isNaN(num) && num != null && num != "" && num>=0){
                            Quantum = num;
                          break;
                        }else if(num == 'fin'){
                            break;
                        }else{
                            alert('Valor no valido. Ingresa Quantum');
                          continue;
                        }
                    }
                    objProceso = roundRobin(arregloDeprocesos, Quantum);
                    arregloDeprocesos = objProceso.proceso;
                    pintarTabla(objProceso.proceso);
                    pintarDiadrama(objProceso.diagrama, arregloDeprocesos);
                break;
                default:
                    alert("Selecciona un algoritmo");
                    break;
            }
            }else{
                alert("Numero de procesos a calcular invalido");
            }
           
        })

    });
})();
//TOMA EL RESULTADO DE LOS PROCESOS Y LOS PINTA EN UNA TABLA
function pintarTabla(arregloDeprocesos = [proceso]){
            let tabla = document.querySelector(".tabla");
            let tbody = document.querySelector(".tbody");
            let promeTe= 0, promeTr = 0, promeTp = 0;
            for (let index = 0; index < arregloDeprocesos.length; index++) {
                let rowTabla = document.createElement("tr");

                let nombre = document.createElement("td");
                nombre.innerText = `${arregloDeprocesos[index].nombre}`;
                rowTabla.append(nombre);

                let espera = document.createElement("td");
                espera.innerText = `${arregloDeprocesos[index].Te}`;
                rowTabla.append(espera);

                let raf = document.createElement("td");
                raf.innerText = `${arregloDeprocesos[index].Tr}`;
                rowTabla.append(raf);

                let perma = document.createElement("td");
                perma.innerText = `${arregloDeprocesos[index].Tp}`;
                rowTabla.append(perma);

                tbody.append(rowTabla);
                promeTe+= arregloDeprocesos[index].Te;
                promeTr+= arregloDeprocesos[index].Tr;
                promeTp+= arregloDeprocesos[index].Tp;
            }

            let promedios = [promeTe, promeTr, promeTp];
            let rowTabla = document.createElement("tr");
            for (let index = 0; index < 4; index++) {
                let celda = document.createElement("td");
                if(index == 0){
                    celda.innerText = "Promedios";
                }else{
                    celda.innerText = `${promedios[index-1]/arregloDeprocesos.length}`
                }
                rowTabla.append(celda);  
            }
            tbody.append(rowTabla);
            tabla.append(tbody);
}
//SE TOMAN LOS DATOS DE LA TABLA OBTENIDOS DEL RESULTADO DEL METODO Y SE PINTAN EN EL DIAGRAMA
function pintarDiadrama(colaDeProcesos, procesos){
    let diagrama = document.querySelector(".diagrama");
    let filaNumeros = document.createElement("tr");
    filaNumeros.classList.add("fila-numeros");
    let filaDiagrama = document.createElement("tr");
    filaDiagrama.classList.add("fila-diagrama");
    for (let index = 0; index < colaDeProcesos.length; index++) {
        let numeros = document.createElement("th");
        let celdaD = document.createElement("td");
        procesos.forEach(proceso =>{
            if(colaDeProcesos[index] === proceso.nombre){
                if (proceso.colorDecimal > 8386107) {
                    celdaD.style.color = "#000000";
                }
                celdaD.style.backgroundColor = proceso.color;
            }
        })
        numeros.innerText = `${index}`
        filaNumeros.append(numeros);
        celdaD.innerText = `${colaDeProcesos[index]}`;
        filaDiagrama.append(celdaD);
    }
    diagrama.append(filaNumeros);
    diagrama.append(filaDiagrama);
}
//GENERA COLORES RANDOM
function generarNuevoColor(){
    var simbolos, color;
    simbolos = "0123456789ABCDEF";
    color = "#";

    for(var i = 0; i < 6; i++){
        color = color + simbolos[Math.floor(Math.random() * 16)];
    }

    return color;
}