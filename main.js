//APARTADO DE FUNCIONES PARA ALGORITMOS

//CLASE PARA OBJETOS TIPO PROCESO
export class proceso {
    constructor(nombre, tiemRaf, tiempoDeLlegada,prioridad, frag, TEAcumulado, TRUsadoAtras, procesoEnEspera, tiemRafR, Te, Tr, Tp, color){
        this.nombre = nombre;
        this.tiemRaf = tiemRaf;
        this.tiempoDeLlegada = tiempoDeLlegada;
        this.prioridad = prioridad;
        this.frag = frag;
        this.TEAcumulado = TEAcumulado;
        this.TRUsadoAtras = TRUsadoAtras;
        this.procesoEnEspera = procesoEnEspera;
        this.tiemRafR = tiemRafR;
        this.Te = Te;
        this.Tr = Tr;
        this.Tp = Tp;
        this.color = color;
        this.colorDecimal = parseInt(color.split('').splice(1,color.length).join(''),16);
    }

    setTiemRaf(nuevoTiemRaf){
        this.tiemRaf = nuevoTiemRaf;
    }
    setTEAcumulado(nuevoTE){
        this.TEAcumulado = nuevoTE;
    }
    setTRUsadoAtras(nuevoTR){
        this.TRUsadoAtras = nuevoTR + TRUsadoAtras;
    }
    setProcesoEnEspera(estado){
        this.procesoEnEspera = estado;
    }
}
//CLASE DE APOYO PARA PINTAR EL DIAGRAMA Y LOS PROCESOS
class procesosDiagrama{
    constructor(proceso, diagrama){
        this.proceso = proceso;
        this.diagrama = diagrama;
    }
}
// ********** TODAS LAS FUNCIONES PARA CALCULAR LOS ALGORITMOS ***********
export function fcfs(procesos = [proceso]){
        let arregloDiagrama = [];
        let nombreP = "";
        let procesoEnCola = [];
        let arregloTE = [];
        let arregloTR = [];
        let arregloTP = [];
        let tamañoDeProcesos = 0;
        let procesadorOcupado = false;
        let usoDeProcesador = 0;
    //CALCULA EL TAMAÑO DE LA DURACION DE LOS PROCESOS
    for (let i = 0; i < procesos.length; i++) {
        tamañoDeProcesos = tamañoDeProcesos + procesos[i].tiemRaf;
    }
    //EMPIEZA LA EJECUCION DE LOS PROCESOS (j se utiliza como el tiempo en el que va la ejecución) 
    for (let j = 0; j < tamañoDeProcesos; j++) {
        //SE METEN LOS PROCESOS A LA COLA DEPENDIENDO EL TIEMPO EN QUE ESTA LA EJECUCION
        for (let x = 0; x < procesos.length; x++) {
            if(j==procesos[x].tiempoDeLlegada){
                procesoEnCola.push(procesos[x]);
            }
        }
        //SE VALIDA SI EL PROCESADOR ESTA EN USO
        if(procesadorOcupado == false){
            let arrAux = [];
            procesadorOcupado = true;
            //SE METEN LOS TIEMPOS DE LLEGADA A UN ARREGLO COMO AUXILIAR
            for (let i = 0; i < procesoEnCola.length; i++) {
                arrAux.push(procesoEnCola[i].tiempoDeLlegada);
            }
            //SE VALIDA CUAL ES EL TIEMPO DE LLEGADA MENOR
            for (let k = 0; k < procesoEnCola.length; k++) {
                if(Math.min.apply(null,arrAux) == procesoEnCola[k].tiempoDeLlegada){
                    usoDeProcesador = procesoEnCola[k].tiemRaf;
                    nombreP = procesoEnCola[k].nombre;
                    //SE VALIDAN LOS POSIBLES CASOS DE SOLUCION
                    if(j == 0){
                        arregloTR.push(procesoEnCola[k].tiemRaf);
                        arregloTE.push(0);
                        arregloTP.push(procesoEnCola[k].tiemRaf + 0);
                        for (let index = 0; index < procesos.length; index++) {
                            if (procesoEnCola[k].nombre == procesos[index].nombre) {
                                procesos[index].Tr = procesoEnCola[k].tiemRaf;
                                procesos[index].Te = 0;
                                procesos[index].Tp = procesoEnCola[k].tiemRaf + 0;
                            }
                        }
                    }else{
                        arregloTR.push(procesoEnCola[k].tiemRaf + j);
                        arregloTE.push(j - procesoEnCola[k].tiempoDeLlegada);
                        arregloTP.push(procesoEnCola[k].tiemRaf + arregloTE[arregloTE.length-1]);
                        for (let index = 0; index < procesos.length; index++) {
                            if (procesoEnCola[k].nombre == procesos[index].nombre) {
                                procesos[index].Tr = procesoEnCola[k].tiemRaf + j;
                                procesos[index].Te = j - procesoEnCola[k].tiempoDeLlegada;
                                procesos[index].Tp = procesoEnCola[k].tiemRaf + arregloTE[arregloTE.length-1];
                            }
                        }
                    }
                    procesoEnCola.splice(k,1);
                    break;
                }
            }
        }
        arregloDiagrama.push(nombreP);
        usoDeProcesador--;
        if (usoDeProcesador == 0) {
            procesadorOcupado = false;
        }
        
    }
    let objProceso = new procesosDiagrama(procesos,arregloDiagrama);
    return objProceso;
}

export function sjf(procesos = [proceso]){
        let arregloDiagrama = [];
        let nombreP = "";
        let procesoEnCola = [];
        let arregloTE = [];
        let arregloTR = [];
        let arregloTP = [];
        let tamañoDeProcesos = 0;
        let procesadorOcupado = false;
        let usoDeProcesador = 0;
    //CALCULA EL TAMAÑO DE LA DURACION DE LOS PROCESOS
    for (let i = 0; i < procesos.length; i++) {
        tamañoDeProcesos = tamañoDeProcesos + procesos[i].tiemRaf;
    }
    //EMPIEZA LA EJECUCION DE LOS PROCESOS (j se utiliza como el tiempo en el que va la ejecución)
    for (let j = 0; j < tamañoDeProcesos; j++) {
        //SE METEN LOS PROCESOS A LA COLA DEPENDIENDO EL TIEMPO EN QUE ESTA LA EJECUCION
        for (let x = 0; x < procesos.length; x++) {
            if(j==procesos[x].tiempoDeLlegada){
                procesoEnCola.push(procesos[x]);
            }
        }
        //SE VALIDA SI EL PROCESADOR ESTA EN USO
        if(procesadorOcupado == false){
            let arrAux = [];
            procesadorOcupado = true;
            //SE METEN LAS RAFAGAS DE LOS PROCESOS A UN ARREGLO COMO AUXILIAR
            for (let i = 0; i < procesoEnCola.length; i++) {
                arrAux.push(procesoEnCola[i].tiemRafR);
            }
            //SE VALIDA CUAL ES LA RAFAGA MENOR Y SE SACA EL RESULTADO
            for (let k = 0; k < procesoEnCola.length; k++) {
                if(Math.min.apply(null,arrAux) == procesoEnCola[k].tiemRafR){
                    usoDeProcesador = procesoEnCola[k].tiemRaf; //EL USO DE PROCESADOR PASA A SER EL DE LA RAFAGA (ese tiempo el procesador queda ocupado)
                    nombreP = procesoEnCola[k].nombre;
                    //SE VALIDA EL CASO PARA LAS POSIBLES SOLUCIONES
                    if(j == 0){
                        arregloTR.push(procesoEnCola[k].tiemRaf);
                        arregloTE.push(0);
                        arregloTP.push(procesoEnCola[k].tiemRaf + 0);
                        for (let index = 0; index < procesos.length; index++) {
                            if (procesoEnCola[k].nombre == procesos[index].nombre) {
                                procesos[index].Tr = procesoEnCola[k].tiemRaf;
                                procesos[index].Te = 0;
                                procesos[index].Tp = procesoEnCola[k].tiemRaf + 0;
                            }
                        }
                    }else{
                        arregloTR.push(procesoEnCola[k].tiemRaf + j);
                        arregloTE.push(j - procesoEnCola[k].tiempoDeLlegada);
                        arregloTP.push(procesoEnCola[k].tiemRaf + arregloTE[arregloTE.length-1]);
                        for (let index = 0; index < procesos.length; index++) {
                            if (procesoEnCola[k].nombre == procesos[index].nombre) {
                                procesos[index].Tr = procesoEnCola[k].tiemRaf + j;
                                procesos[index].Te = j - procesoEnCola[k].tiempoDeLlegada;
                                procesos[index].Tp = procesoEnCola[k].tiemRaf + arregloTE[arregloTE.length-1];
                            }
                        }
                    }
                    procesoEnCola.splice(k,1);
                    break;
                }
            }
        }
        usoDeProcesador--;
        arregloDiagrama.push(nombreP);
        if (usoDeProcesador == 0) {
            procesadorOcupado = false;
        }
        
    }
    let objProceso = new procesosDiagrama(procesos,arregloDiagrama);
    return objProceso;
}

export function srt(procesos = [proceso]){
    let arregloDiagrama = [];
    let nombreP = "";
    let procesoEnCola = [];
    let procesoEnCurso;
    let arregloTE = [];
    let arregloTR = [];
    let arregloTP = [];
    let tamañoDeProcesos = 0;
    let procesadorOcupado = false;
    let usoDeProcesador = 0;
    let aux = 0;
//CALCULA EL TAMAÑO DE LA DURACION DE LOS PROCESOS
for (let i = 0; i < procesos.length; i++) {
    tamañoDeProcesos = tamañoDeProcesos + procesos[i].tiemRaf;
}
//EMPIEZA LA EJECUCION DE LOS PROCESOS (j se utiliza como el tiempo en el que va la ejecución) 
for (let j = 0; j < tamañoDeProcesos; j++) {
    let arrAux = [];
    //SE METEN LOS PROCESOS A LA COLA DEPENDIENDO EL TIEMPO EN QUE ESTA LA EJECUCION
    for (let x = 0; x < procesos.length; x++) {
        if(j==procesos[x].tiempoDeLlegada){
            procesoEnCola.push(procesos[x]);
        }
    }
// SE VALIDA SI HAY ALGUN PROCESO EN COLA EL CUAL SU TIEMPO DE RAFAGA SEA MENOR AL ACTUAL EN EJECUCION
// SI EL CASO ES SI --> EL PROCESO EN CURSO SE MUEVE A COLA Y ENTRA EL PROCESO DE RAFAGA MENOR. SINO --> EL PROCESO SIGUE EN EJECUCION
if (j!=0) {
    for (let i = 0; i < procesoEnCola.length; i++) {
        if (procesoEnCola[i].nombre == procesoEnCurso.nombre) {
            procesoEnCola[i].tiemRaf = (procesoEnCola[i].tiemRaf - (procesoEnCola[i].tiemRaf - usoDeProcesador));
        }
        arrAux.push(procesoEnCola[i].tiemRaf);
    }
    for (let index = 0; index < procesoEnCola.length; index++) {
        if (Math.min.apply(null,arrAux) == procesoEnCola[index].tiemRaf) {
            if (procesoEnCola[index].nombre != procesoEnCurso.nombre) {
                procesadorOcupado = false;
            }
            break;
        }
        
    }
}
        //SE VALIDA SI PROCESADOR ESTA EN EJECUCION (En este caso no es tan necesario puesto que el proceso ejecutandose se puede cambiar, es usado por cuestiones de lógica)
        if (procesadorOcupado == false) {   
            arrAux = [];
            procesadorOcupado = true;
            for (let i = 0; i < procesoEnCola.length; i++) {
                arrAux.push(procesoEnCola[i].tiemRaf);
            }
            //SE BUSCA AL PROCESO EN CUESTION Y SE PONE EN CURSO (Si hay un proceso en curso ya, ese proceso se toma como "fragmentado")
            for (let k = 0; k < procesoEnCola.length; k++) {
                if(Math.min.apply(null,arrAux) == procesoEnCola[k].tiemRaf){
                    aux = j;
                    if (j!=0 && procesoEnCurso != procesoEnCola[k]) {
                        for (let index = 0; index < procesoEnCola.length; index++) {
                            if (procesoEnCurso.nombre == procesoEnCola[index].nombre) {
                                procesoEnCola[index].frag = true;
                                procesoEnCola[index].TRUsadoAtras = (procesoEnCola[index].tiemRafR - procesoEnCola[index].tiemRaf);
                            }
                        }
                    }
                    usoDeProcesador = procesoEnCola[k].tiemRaf;
                    nombreP = procesoEnCola[k].nombre;
                    procesoEnCurso = procesoEnCola[k];
                    break;
                }
            }
        }
        usoDeProcesador--;
        arregloDiagrama.push(nombreP);
        //SE VALIDAN LOS POSIBLES CASOS DE SOLUCION
        if (usoDeProcesador == 0) {
            procesadorOcupado = false;
            for (let k = 0; k < procesoEnCola.length; k++) {
                if (procesoEnCola[k].nombre == procesoEnCurso.nombre) {
                    if (procesoEnCola[k].frag != true) {
                            if(procesoEnCola[k].tiempoDeLlegada == 0){
                                arregloTR.push(procesoEnCola[k].tiemRaf);
                                arregloTE.push(0);
                                arregloTP.push(procesoEnCola[k].tiemRaf + 0);
                                for (let index = 0; index < procesos.length; index++) {
                                    if (procesoEnCola[k].nombre == procesos[index].nombre) {
                                        procesos[index].Tr = procesoEnCola[k].tiemRafR;
                                        procesos[index].Te = 0;
                                        procesos[index].Tp = procesoEnCola[k].tiemRafR + 0;
                                    }
                                }
                            }else{
                                arregloTR.push(procesoEnCola[k].tiemRafR + aux);
                                arregloTE.push(aux - procesoEnCola[k].tiempoDeLlegada);
                                arregloTP.push(procesoEnCola[k].tiemRafR + arregloTE[arregloTE.length-1]);
                                for (let index = 0; index < procesos.length; index++) {
                                    if (procesoEnCola[k].nombre == procesos[index].nombre) {
                                        procesos[index].Tr = procesoEnCola[k].tiemRafR + aux;
                                        procesos[index].Te = (aux + procesoEnCola[k].TRUsadoAtras) - procesoEnCola[k].tiempoDeLlegada;
                                        procesos[index].Tp = procesoEnCola[k].tiemRafR + arregloTE[arregloTE.length-1];
                                    }
                                }
                            }
                            procesoEnCola.splice(k,1);
                    }else if (procesoEnCola[k].frag == true) {
                        if(procesoEnCola[k].tiempoDeLlegada == 0){
                            arregloTR.push((procesoEnCola[k].tiemRafR + aux)-procesoEnCola[k].TRUsadoAtras);
                            arregloTE.push(aux - procesoEnCola[k].TRUsadoAtras);
                            arregloTP.push(procesoEnCola[k].tiemRafR + arregloTE[arregloTE.length-1]);
                            for (let index = 0; index < procesos.length; index++) {
                                if (procesoEnCola[k].nombre == procesos[index].nombre) {
                                    procesos[index].Tr = (procesoEnCola[k].tiemRafR + aux)-procesoEnCola[k].TRUsadoAtras;
                                    procesos[index].Te = aux - procesoEnCola[k].TRUsadoAtras;
                                    procesos[index].Tp = procesoEnCola[k].tiemRafR + arregloTE[arregloTE.length-1];
                                }
                            }
                        }else{
                            arregloTR.push((procesoEnCola[k].tiemRafR + aux)-procesoEnCola[k].TRUsadoAtras);
                            arregloTE.push((aux - procesoEnCola[k].tiempoDeLlegada)+(aux - procesoEnCola[k].TRUsadoAtras));
                            arregloTP.push(procesoEnCola[k].tiemRafR + arregloTE[arregloTE.length-1]);
                            for (let index = 0; index < procesos.length; index++) {
                                if (procesoEnCola[k].nombre == procesos[index].nombre) {
                                    procesos[index].Tr = (procesoEnCola[k].tiemRafR + aux)-procesoEnCola[k].TRUsadoAtras;
                                    procesos[index].Te = (aux - procesoEnCola[k].tiempoDeLlegada)+(aux - procesoEnCola[k].TRUsadoAtras);
                                    procesos[index].Tp = procesoEnCola[k].tiemRafR + arregloTE[arregloTE.length-1];
                                }
                            }
                        }
                        procesoEnCola.splice(k,1);
                    }
                }
                
            }

        }
}
let objProceso = new procesosDiagrama(procesos,arregloDiagrama);
    return objProceso;
}

export function prioridades(procesos = [proceso]){
    let arregloDiagrama = [];
    let nombreP = "";
    let procesoEnCola = [];
    let arregloTE = [];
    let arregloTR = [];
    let arregloTP = [];
    let tamañoDeProcesos = 0;
    let procesadorOcupado = false;
    let usoDeProcesador = 0;
//CALCULA EL TAMAÑO DE LA DURACION DE LOS PROCESOS
for (let i = 0; i < procesos.length; i++) {
    tamañoDeProcesos = tamañoDeProcesos + procesos[i].tiemRaf;
}
//EMPIEZA LA EJECUCION DE LOS PROCESOS (j se utiliza como el tiempo en el que va la ejecución) 
for (let j = 0; j < tamañoDeProcesos; j++) {
    
    //SE METEN LOS PROCESOS A LA COLA DEPENDIENDO EL TIEMPO EN QUE ESTA LA EJECUCION
    for (let x = 0; x < procesos.length; x++) {
        if(j==procesos[x].tiempoDeLlegada){
            procesoEnCola.push(procesos[x]);
        }
    }
    //SE VALIDA SI EL PROCESADOR ESTA EN USO
    if(procesadorOcupado == false){
        let arrAux = [];
        procesadorOcupado = true;
        //SE AGRUPAN LAS PRIORIDADES DE LOS PROCESOS COMO AUXILIAR
        for (let i = 0; i < procesoEnCola.length; i++) {
            arrAux.push(procesoEnCola[i].prioridad);
        }
        //SE BUSCA EL PROCESO CON PRIORIDAD MENOR
        for (let k = 0; k < procesoEnCola.length; k++) {
            if(Math.min.apply(null,arrAux) == procesoEnCola[k].prioridad){
                usoDeProcesador = procesoEnCola[k].tiemRaf;
                nombreP = procesoEnCola[k].nombre;
                //SE VALIDAN LOS POSIBLES CASOS DE SOLUCION
                if(j == 0){
                    arregloTR.push(procesoEnCola[k].tiemRaf);
                    arregloTE.push(0);
                    arregloTP.push(procesoEnCola[k].tiemRaf + 0);
                    for (let index = 0; index < procesos.length; index++) {
                        if (procesoEnCola[k].nombre == procesos[index].nombre) {
                            procesos[index].Tr = procesoEnCola[k].tiemRaf;
                            procesos[index].Te = 0;
                            procesos[index].Tp = procesoEnCola[k].tiemRaf + 0;
                        }
                    }
                }else{
                    arregloTR.push(procesoEnCola[k].tiemRaf + j);
                    arregloTE.push(j - procesoEnCola[k].tiempoDeLlegada);
                    arregloTP.push(procesoEnCola[k].tiemRaf + arregloTE[arregloTE.length-1]);
                    for (let index = 0; index < procesos.length; index++) {
                        if (procesoEnCola[k].nombre == procesos[index].nombre) {
                            procesos[index].Tr = procesoEnCola[k].tiemRaf + j;
                            procesos[index].Te = j - procesoEnCola[k].tiempoDeLlegada;
                            procesos[index].Tp = procesoEnCola[k].tiemRaf + arregloTE[arregloTE.length-1];
                        }
                    }
                }
                procesoEnCola.splice(k,1);
                break;
            }
        }
    }
    arregloDiagrama.push(nombreP);
    usoDeProcesador--;
    if (usoDeProcesador == 0) {
        procesadorOcupado = false;
    }
    
}
let objProceso = new procesosDiagrama(procesos,arregloDiagrama);
return objProceso;
}

export function roundRobin(procesos = [proceso], Quantum){
        let arregloDiagrama = [];
        let nombreP = "";
        let procesoEnCola = [];
        let arregloTE = [];
        let arregloTR = [];
        let arregloTP = [];
        var aux = 0;
        var tamañoDeProcesos = 0;
        var procesadorOcupado = false;
        var usoDeProcesador = 0;
    //CALCULA EL TAMAÑO DE LA DURACION DE LOS PROCESOS
    for (let i = 0; i < procesos.length; i++) {
        tamañoDeProcesos = tamañoDeProcesos + procesos[i].tiemRaf;
    }
    //EMPIEZA LA EJECUCION DE LOS PROCESOS (j se utiliza como el tiempo en el que va la ejecución) 
    for (let j = 0; j < tamañoDeProcesos; j++) {
        //SE METEN LOS PROCESOS A LA COLA DEPENDIENDO EL TIEMPO EN QUE ESTA LA EJECUCION
        for (let x = 0; x < procesos.length; x++) {
            if(j==procesos[x].tiempoDeLlegada){
                procesoEnCola.push(procesos[x]);
            }
        }
        //SE VALIDA SI EL PROCESADOR ESTA OCUPADO
        if(procesadorOcupado == false){
            let arrAux = [];
            aux = 0;
            procesadorOcupado = true;
            //SE UTILIZA UN PROCESO DE PONER EN ESPERA A LOS PROCESOS YA EJECUTADOS
            for (let i = 0; i < procesoEnCola.length; i++) {
                if (procesoEnCola[i].procesoEnEspera == 1) {
                    aux++;
                }
                //SE VALIDA SI TODOS LOS PROCESOS YA FUERON EJECUTADOS
                //SI --> LOS PROCESOS VUELVEN A ESTADO DE EJECUCION || NO --> LOS PROCESOS SIGUEN EN ESPERA A SER EJECUTADOS LOS DEMAS
                if(aux == procesoEnCola.length){
                    for (let index = 0; index < procesoEnCola.length; index++) {
                        procesoEnCola[index].setProcesoEnEspera(0);
                    }
                }
            }
            //ENTRAN A VALIDAR EJECUCION LOS PROCESOS QUE NO ESTEN EN ESPERA
            for (let i = 0; i < procesoEnCola.length; i++) {
                if(procesoEnCola[i].procesoEnEspera == 0){
                    arrAux.push(procesoEnCola[i].tiempoDeLlegada);
                }
            }
            //SE BUSCA EL PROCESO CON LLEGADA MENOR PARA EJECUCION
            for (let k = 0; k < procesoEnCola.length; k++) {
                if(Math.min.apply(null,arrAux) == procesoEnCola[k].tiempoDeLlegada){
                    //SE VALIDAN LOS POSIBLES CASOS DE SOLUCION
                    if (procesoEnCola[k].tiemRaf <= Quantum) {
                        usoDeProcesador = procesoEnCola[k].tiemRaf;
                        nombreP = procesoEnCola[k].nombre;
                        if(j == 0){
                            arregloTR.push(procesoEnCola[k].tiemRaf);
                            arregloTE.push(0);
                            arregloTP.push(procesoEnCola[k].tiemRafR + 0);
                            for (let index = 0; index < procesos.length; index++) {
                                if (procesoEnCola[k].nombre == procesos[index].nombre) {
                                    procesos[index].Tr = procesoEnCola[k].tiemRaf;
                                    procesos[index].Te = 0;
                                    procesos[index].Tp = procesoEnCola[k].tiemRafR + 0;
                                }
                            }
                        }else if(procesoEnCola[k].frag == true){
                            arregloTR.push(procesoEnCola[k].tiemRaf + j);
                            arregloTE.push(procesoEnCola[k].TEAcumulado - procesoEnCola[k].tiempoDeLlegada + ((j - procesoEnCola[k].TEAcumulado)-(procesoEnCola[k].TRUsadoAtras*Quantum)));
                            arregloTP.push(procesoEnCola[k].tiemRafR + arregloTE[arregloTE.length-1]);
                            for (let index = 0; index < procesos.length; index++) {
                                if (procesoEnCola[k].nombre == procesos[index].nombre) {
                                    procesos[index].Tr = procesoEnCola[k].tiemRaf + j;
                                    procesos[index].Te = procesoEnCola[k].TEAcumulado - procesoEnCola[k].tiempoDeLlegada + ((j - procesoEnCola[k].TEAcumulado)-(procesoEnCola[k].TRUsadoAtras*Quantum));
                                    procesos[index].Tp = procesoEnCola[k].tiemRafR + arregloTE[arregloTE.length-1];
                                }
                            }

                        }else{
                            arregloTR.push(procesoEnCola[k].tiemRaf + j);
                            arregloTE.push(j - procesoEnCola[k].tiempoDeLlegada);
                            arregloTP.push(procesoEnCola[k].tiemRafR + arregloTE[arregloTE.length-1]);
                            for (let index = 0; index < procesos.length; index++) {
                                if (procesoEnCola[k].nombre == procesos[index].nombre) {
                                    procesos[index].Tr = procesoEnCola[k].tiemRaf + j;
                                    procesos[index].Te = j - procesoEnCola[k].tiempoDeLlegada;
                                    procesos[index].Tp = procesoEnCola[k].tiemRafR + arregloTE[arregloTE.length-1];
                                }
                            }
                        }
                        procesoEnCola.splice(k,1);
                    }else if(procesoEnCola.length == 1 && j !=0 && procesoEnCola[k].frag == true){
                        usoDeProcesador = procesoEnCola[k].tiemRaf;
                        nombreP = procesoEnCola[k].nombre;
                        arregloTR.push(procesoEnCola[k].tiemRaf + j);
                        arregloTE.push(procesoEnCola[k].TEAcumulado - procesoEnCola[k].tiempoDeLlegada + ((j - procesoEnCola[k].TEAcumulado)-(procesoEnCola[k].TRUsadoAtras*Quantum)));
                        arregloTP.push(procesoEnCola[k].tiemRafR + arregloTE[arregloTE.length-1]);
                        for (let index = 0; index < procesos.length; index++) {
                            if (procesoEnCola[k].nombre == procesos[index].nombre) {
                                procesos[index].Tr = procesoEnCola[k].tiemRaf + j;
                                procesos[index].Te = procesoEnCola[k].TEAcumulado - procesoEnCola[k].tiempoDeLlegada + ((j - procesoEnCola[k].TEAcumulado)-(procesoEnCola[k].TRUsadoAtras*Quantum));
                                procesos[index].Tp = procesoEnCola[k].tiemRafR + arregloTE[arregloTE.length-1];
                            }
                        }
   
                        procesoEnCola.splice(0,1);
                    }else if(procesoEnCola.length == 1 && j !=0){
                        usoDeProcesador = procesoEnCola[k].tiemRaf;
                        nombreP = procesoEnCola[k].nombre;
                        arregloTR.push(procesoEnCola[k].tiemRaf + j);
                        arregloTE.push(j - procesoEnCola[k].tiempoDeLlegada);
                        arregloTP.push(procesoEnCola[k].tiemRafR + arregloTE[arregloTE.length-1]);
                        for (let index = 0; index < procesos.length; index++) {
                            if (procesoEnCola[k].nombre == procesos[index].nombre) {
                                procesos[index].Tr = procesoEnCola[k].tiemRaf + j;
                                procesos[index].Te = j - procesoEnCola[k].tiempoDeLlegada;
                                procesos[index].Tp = procesoEnCola[k].tiemRafR + arregloTE[arregloTE.length-1];
                            }
                        }
                        procesoEnCola.splice(0,1);
                    }else{ //SI NO ENTRA EN NINGUN CASO DE SOLUCION EL PROCESO QUEDA COMO FRAGMENTADO Y ENTRA EN ESPERA
                        if(procesoEnCola[k].frag == false){
                            procesoEnCola[k].setTEAcumulado(j);
                        }
                        procesoEnCola[k].setProcesoEnEspera(1);
                        procesoEnCola[k].frag = true;
                        procesoEnCola[k].setTiemRaf(procesoEnCola[k].tiemRaf - Quantum);
                        usoDeProcesador = Quantum;
                        nombreP = procesoEnCola[k].nombre;
                        procesoEnCola[k].TRUsadoAtras = procesoEnCola[k].TRUsadoAtras + 1;
                    }
                    
                }
            }
        }
        usoDeProcesador--;
        arregloDiagrama.push(nombreP);
        if (usoDeProcesador == 0) {
            procesadorOcupado = false;
        }
        
    }
    let objProceso = new procesosDiagrama(procesos,arregloDiagrama);
    return objProceso;
}