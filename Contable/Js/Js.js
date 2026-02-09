document.getElementById("xmldocumento").addEventListener("change", function(event) {
  const documento = event.target.files[0];
  if (!documento) return;

  const leer = new FileReader();
  leer.onload = function(e) {
    const contenido = e.target.result;

    // Parsear XML
    const parser = new DOMParser();
    const documentoXML = parser.parseFromString(contenido, "application/xml");

    // Objeto donde guardaremos todo
    let informacion = {};

    // 🔹 Ejemplo 1: etiquetas con contenido interno
 const cantidad = documentoXML.getElementsByTagName("dte:Cantidad");
    let listaCantidad = [];
    for (let i = 0; i < cantidad.length; i++){
        listaCantidad.push(cantidad[i].textContent.trim());
    }
    informacion["Cantidad"] =listaCantidad;


    const Precio = documentoXML.getElementsByTagName("dte:PrecioUnitario");
    let listaPrecios = [];
    for (let i = 0; i < Precio.length; i++){
        listaPrecios.push(Precio[i].textContent.trim());
    }
    informacion["PrecioUnitario"] = listaPrecios;
    
    const descripciones = documentoXML.getElementsByTagName("dte:Descripcion");
    let listaDescripciones = [];
    for (let i = 0; i < descripciones.length; i++) {
      listaDescripciones.push(descripciones[i].textContent.trim());
    }
   
    informacion["Descripciones"] = listaDescripciones;

   

    // Ejemplo 2: etiquetas con atributos
    const receptor = documentoXML.getElementsByTagName("dte:Receptor")[0];
    if (receptor) {
      informacion["Receptor"] = {
        CorreoReceptor: receptor.getAttribute("CorreoReceptor"),
        IDReceptor: receptor.getAttribute("IDReceptor"),
        NombreReceptor: receptor.getAttribute("NombreReceptor")
      };
    }

    // Nit del receptor
    const Nitreceptor = documentoXML.getElementsByTagName("dte:NumeroAutorizacion")[0];
    if(Nitreceptor){
        informacion["NumeroAutorizacion"] = {
            Numero: Nitreceptor.getAttribute("Numero"),
            Serie: Nitreceptor.getAttribute("Serie"),
            Valor: Nitreceptor.textContent.trim()
        };
    }

    const datosGenerales = documentoXML.getElementsByTagName("dte:DatosGenerales")[0];
    if(datosGenerales){
     informacion["DatosGenerales"]={
      FechaEmision:datosGenerales.getAttribute("FechaHoraEmision"),
     }; 
    }

    const certifiacion = documentoXML.getElementsByTagName("dte:FechaHoraCertificacion")[0];

//    console.log("Información extraída:", informacion);
let productos = [];
for (let i = 0; i < informacion["Descripciones"].length; i++){
const descripcion = informacion["Descripciones"][i];
const canitdad = parseFloat(informacion["Cantidad"][i] || 0);
const precio = parseFloat(informacion["PrecioUnitario"][i] || 0);
const total = canitdad * precio;

productos.push({
    Descripcion: descripcion,
    Cantidad : canitdad,
    PrecioUnitario :precio,
    Total : total,
});
}

console.log("ReceptorNombre", informacion.Receptor.NombreReceptor);
console.log("Nit:", informacion.Receptor.IDReceptor);
  console.log("Fecha deEmisión:", informacion.DatosGenerales.FechaEmision);
  console.log("NumeroAutorizacion:", informacion.NumeroAutorizacion.Numero);
  console.log("SerieAutorizacion:", informacion.NumeroAutorizacion.Serie);
  console.log("Productos con totales:", productos);

  
  localStorage.setItem("nombrereceptor", informacion.Receptor.NombreReceptor);
  localStorage.setItem("NitReceptor", informacion.Receptor.IDReceptor);
  localStorage.setItem("Fecha_Emision", informacion.DatosGenerales.FechaEmision);
  localStorage.setItem("DTE", informacion.NumeroAutorizacion.Numero);
  localStorage.setItem("SerieAutorizacion", informacion.NumeroAutorizacion.Serie);
  localStorage.setItem("NumeroAutorizacion", informacion.NumeroAutorizacion.Valor);
  localStorage.setItem("Productos", JSON.stringify(productos));

  };


  
  leer.readAsText(documento);

})

