
//HORA Y FECHA

    function mostrarFechaHora() {
        const ahora = new Date();
        const dia = ahora.getDate().toString().padStart(2, '0');
        const mes = (ahora.getMonth() + 1).toString().padStart(2, '0');
        const año = ahora.getFullYear();

        const horas = ahora.getHours().toString().padStart(2, '0');
        const minutos = ahora.getMinutes().toString().padStart(2, '0');
        const segundos = ahora.getSeconds().toString().padStart(2, '0');

        const fechaHoraFormateada = `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;
        document.getElementById('Fecha').innerText = fechaHoraFormateada;
    }

    mostrarFechaHora();
    setInterval(mostrarFechaHora, 1000);
