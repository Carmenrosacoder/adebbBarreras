
var matriz = [];
var listaTotal;
var registrosPagina = 15;
var indicePagina = 0;
var paginasBloque = 8;
var indiceBloque = 0;

window.onload = function(){
	var listaAnios = document.getElementById("spnListaAnios").innerHTML.split("|");
	var listaMeses = document.getElementById("spnListaMeses").innerHTML.split("|");
	var listaSectores = document.getElementById("spnListaSectores").innerHTML.split("|");
	var listaDenunciadas = document.getElementById("spnListaDenunciadas").innerHTML.split("|");
	crearCombo(listaAnios, "cboAnio", "Todos");
	crearCombo(listaMeses, "cboMes", "Todos");
	crearCombo(listaSectores, "cboSector", "Todos");
	crearCombo(listaDenunciadas, "cboEntidad", "Todos");
	listaTotal = document.getElementById("spnListaTotal").innerHTML.split("ß");
	configurarBotones();
};

function configurarBotones(){
	document.getElementById("btnBuscar").onclick = function(){
		filtrarMatriz();
	};
};

function filtrarMatriz() {
    indicePagina = 0;
    crearMatriz();
    mostrarMatriz();
};

function crearMatriz() {
    matriz = [];
    var nRegistros = listaTotal.length;
    var exito;
    var nCampos;
    var contador = 0;
    var cboAnio = document.getElementById("cboAnio").options[document.getElementById("cboAnio").selectedIndex].text.toLowerCase();
    var cboMes = document.getElementById("cboMes").options[document.getElementById("cboMes").selectedIndex].text.toLowerCase();
    var cboSector = document.getElementById("cboSector").options[document.getElementById("cboSector").selectedIndex].text.toLowerCase();
    var cboEntidad = document.getElementById("cboEntidad").options[document.getElementById("cboEntidad").selectedIndex].text.toLowerCase();
    var txtBuscador = document.getElementById("txtBuscador");
    for (var i = 0; i < nRegistros; i++) {
        campos = listaTotal[i].split("|");
        nCampos = campos.length;
        exito = ((cboAnio == "todos" || campos[0].toLowerCase() == cboAnio) && 
        		 (cboMes == "todos" || campos[1].toLowerCase() == cboMes) &&
        		 (cboSector == "todos" || campos[9].toLowerCase() == cboSector) &&
        		 (cboEntidad == "todos" || campos[4].toLowerCase() == cboEntidad) &&
        		 ((txtBuscador.value == "" || campos[12].toLowerCase().indexOf(txtBuscador.value.toLowerCase()) > -1) || 
        		 (txtBuscador.value == "" || campos[0].toLowerCase().indexOf(txtBuscador.value.toLowerCase()) > -1) ||
        		 (txtBuscador.value == "" || campos[1].toLowerCase().indexOf(txtBuscador.value.toLowerCase()) > -1) ||
        		 (txtBuscador.value == "" || campos[2].toLowerCase().indexOf(txtBuscador.value.toLowerCase()) > -1) ||
        		 (txtBuscador.value == "" || campos[3].toLowerCase().indexOf(txtBuscador.value.toLowerCase()) > -1) ||
        		 (txtBuscador.value == "" || campos[4].toLowerCase().indexOf(txtBuscador.value.toLowerCase()) > -1) ||
        		 (txtBuscador.value == "" || campos[5].toLowerCase().indexOf(txtBuscador.value.toLowerCase()) > -1) ||
        		 (txtBuscador.value == "" || campos[6].toLowerCase().indexOf(txtBuscador.value.toLowerCase()) > -1) ||
        		 (txtBuscador.value == "" || campos[7].toLowerCase().indexOf(txtBuscador.value.toLowerCase()) > -1) ||
        		 (txtBuscador.value == "" || campos[8].toLowerCase().indexOf(txtBuscador.value.toLowerCase()) > -1) ||
        		 (txtBuscador.value == "" || campos[9].toLowerCase().indexOf(txtBuscador.value.toLowerCase()) > -1) ||
        		 (txtBuscador.value == "" || campos[10].toLowerCase().indexOf(txtBuscador.value.toLowerCase()) > -1) ||
        		 (txtBuscador.value == "" || campos[11].toLowerCase().indexOf(txtBuscador.value.toLowerCase()) > -1) ||
        		 (txtBuscador.value == "" || campos[13].toLowerCase().indexOf(txtBuscador.value.toLowerCase()) > -1)));
        if (exito) {
            matriz[contador] = [];
            for (var j = 0; j < nCampos; j++) {
                if (isNaN(campos[j])) matriz[contador][j] = campos[j];
                else matriz[contador][j] = campos[j] * 1;
            }
            contador++;
        }
    }
};

function mostrarMatriz() {
    var contenido = "";
    var nRegistros = 0;
    var contenidoCantidad = "";
    if (matriz != null && matriz.length > 0) {
        nRegistros = matriz.length;
        var nCampos = matriz[0].length;
        var inicio = registrosPagina * indicePagina;
        var fin = inicio + registrosPagina;
        for (var i = inicio; i < fin; i++) {
            if (i < nRegistros) {

                contenido += "<div id='dvBarrera";
                contenido += i.toString();
                contenido += "'>";

                contenido += "<div id='dvTextoBarrera";
                contenido += i.toString();
                contenido += "'>Barrera: </div>";
                contenido += "<div id='dvValueBarrera";
                contenido += i.toString();
                contenido += "'>";
                contenido += matriz[i][12];
                contenido += "</div>";

                contenido += "<div id='dvTextoEntidad";
                contenido += i.toString();
                contenido += "'>Entidad: </div>";
                contenido += "<div id='dvValueEntidad";
                contenido += i.toString();
                contenido += "'>";
                contenido += matriz[i][4];
                contenido += "</div>";

                contenido += "<div id='dvTextoDenunciante";
                contenido += i.toString();
                contenido += "'>Denunciante: </div>";
                contenido += "<div id='dvValueDenunciante";
                contenido += i.toString();
                contenido += "'>";
                contenido += matriz[i][5];
                contenido += "</div>";

                    contenido += "<div id='dvTextoSector";
                    contenido += i.toString();
                    contenido += "'>Sector: </div>";
                    contenido += "<div id='dvValueSector";
                    contenido += i.toString();
                    contenido += "'>";
                    contenido += matriz[i][9];
                    contenido += "</div>";

                    contenido += "<div id='dvTextoClase";
                    contenido += i.toString();
                    contenido += "'>Clase: </div>";
                    contenido += "<div id='dvValueClase";
                    contenido += i.toString();
                    contenido += "'>";
                    contenido += matriz[i][10];
                    contenido += "</div>";

                    contenido += "<div id='dvTextoAnioMes";
                    contenido += i.toString();
                    contenido += "'>Año - Mes: </div>";
                    contenido += "<div id='dvValueAnioMes";
                    contenido += i.toString();
                    contenido += "'>";
                    contenido += matriz[i][0];
                    contenido += " - ";
                    contenido += matriz[i][1];
                    contenido += "</div>";

                    contenido += "<div id='dvTextoInstancia";
                    contenido += i.toString();
                    contenido += "'>Instancia: </div>";
                    contenido += "<div id='dvValueInstancia";
                    contenido += i.toString();
                    contenido += "'>";
                    contenido += matriz[i][3];
                    contenido += "</div>";

                    contenido += "<div id='dvTextoEfectos";
                    contenido += i.toString();
                    contenido += "'>Efectos: </div>";
                    contenido += "<div id='dvValueEfectos";
                    contenido += i.toString();
                    contenido += "'>";
                    contenido += matriz[i][13].replace('�','');
                    contenido += "</div>";

                    contenido += "<div id='dvTextoResolucion";
                    contenido += i.toString();
                    contenido += "'>Resolución: </div>";
                    contenido += "<div id='dvValueResolucion";
                    contenido += i.toString();
                    contenido += "'>";
                    contenido += matriz[i][2];
                    contenido += "</div>";
                    
                    contenido += "</div>";
            } else break;
        }
        crearPaginacion();
        
    }else{
    	contenido = "<div>No se encontraron resultados</div>";
    }
    document.getElementById("divResultados").innerHTML = contenido;
    document.getElementById("divCantidadResultados").innerHTML = "Resultados encontrados: " + nRegistros;
};

function crearPaginacion() {
    var contenido = "";
    if (matriz != null && matriz.length > 0) {
        var nRegistros = matriz.length;
        var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
        if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;

        var registrosBloque = registrosPagina * paginasBloque;
        var indiceUltimoBloque = Math.floor(nRegistros / registrosBloque);
        if (nRegistros % registrosBloque == 0) indiceUltimoBloque--;

        var inicio = paginasBloque * indiceBloque;
        var fin = inicio + paginasBloque;
        if (indiceBloque > 0) {
            contenido += "<input type='button' class='Navega' value='<<' onclick='paginar(-1);' />";
            contenido += "<input type='button' class='Navega' value='<' onclick='paginar(-2);'/>";
        }
        for (var i = inicio; i < fin; i++) {
            if (i <= indiceUltimaPagina && indiceUltimaPagina > 0) {
                contenido += "<input type='button' class='Navega' value='";
                contenido += (i + 1);
                contenido += "' onclick='paginar(";
                contenido += i;
                contenido += ");' />";
            } else break;
        }
        if (indiceBloque < indiceUltimoBloque) {
            contenido += "<input type='button' class='Navega' value='>' onclick='paginar(-3);' />";
            contenido += "<input type='button' class='Navega' value='>>' onclick='paginar(-4);' />";
        }

    }
    document.getElementById("divPaginacion").innerHTML = contenido;
};

function paginar(indice) {
    if (indice > -1) {
        indicePagina = indice;
    } else {
        var nRegistros = matriz.length;
        var indiceUltimaPagina = Math.floor(nRegistros / registrosPagina);
        if (nRegistros % registrosPagina == 0) indiceUltimaPagina--;
        var registrosBloque = registrosPagina * paginasBloque;
        var indiceUltimoBloque = Math.floor(nRegistros / registrosBloque);
        if (nRegistros % registrosBloque == 0) indiceUltimoBloque--;
        switch (indice) {
            case -1:
                indicePagina = 0;
                indiceBloque = 0;
                break;
            case -2:
                indiceBloque--;
                indicePagina = indiceBloque * paginasBloque;
                break;
            case -3:
                indiceBloque++;
                indicePagina = indiceBloque * paginasBloque;
                break;
            case -4:
                indiceBloque = indiceUltimoBloque;
                indicePagina = indiceBloque * paginasBloque;
                break;
        }
    }
    mostrarMatriz();
};

function crearCombo(lista, idCombo, primerItem) {
    var contenido = "";
    if (primerItem != null && primerItem != "") {
        contenido += "<option value=''>";
        contenido += primerItem;
        contenido += "</option>";
    }
    if (lista != null && lista.length > 0) {
        var nRegistros = lista.length;
        var campos;
        for (var i = 0; i < nRegistros; i++) {
            campos = lista[i].split("¬");
            if (campos[1].toLowerCase() != "todos") {
            	contenido += "<option value='";
            	contenido += campos[0];
	            contenido += "'>";
	            contenido += campos[1];
	            contenido += "</option>";
            }
        }
    }
    var cbo = document.getElementById(idCombo);
    if (cbo != null) cbo.innerHTML = contenido;
};