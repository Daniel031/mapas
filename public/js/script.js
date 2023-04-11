var map = L.map('map', {
    center: [-17.7808444, -63.1472915],
    zoom: 12
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
 

const iconos = ['default','bus','car','parque'];
const menu = ["marcador","circulo","poligono"];
const colores = ["red","yellow","blue"];
var puntos = [];
var polyline = {};



var iconoSeleccionado = "default";
var mostrarOpcion = "marcador";
var circuloI = document.getElementById('radio-circulo');
var colorSeleccionado = 0;

const selectIcon = document.getElementById('iconos');
const etiqueta = document.getElementById('etiqueta');
const selectMenu = document.getElementById('menu-select');
const selectMenuColor = document.getElementById('menu-select-color');
const selectPoliColor = document.getElementById('select-color-poli');
const poligonoAdd = document.getElementById('poligonoAdd');

selectMenu.value = "0";
selectMenuColor.value = "0";
selectPoliColor.value="0";

iconos.forEach((value,index)=>{
    var optionE = document.createElement('option');
    optionE.value=index;
    optionE.innerHTML=value;
    optionE.addEventListener("click",(e)=>{
        document.getElementById('icono-seleccionado').src=`css/img/${iconos[e.originalTarget.value]}.png`;
        iconoSeleccionado= iconos[e.originalTarget.value];
    });
    selectIcon.appendChild(optionE);
});    

const mapa = document.getElementById('map');

mapa.addEventListener("mouseover",()=>{
    if (selectMenu.value == 0)
        mapa.style.cursor = `url(css/img/${iconoSeleccionado}.png),auto`;
    if (selectMenu.value == 1)
        mapa.style.cursor = `crosshair`;
    if (selectMenu.value == 2)        
        mapa.style.cursor = `pointer`;

});
map.on("click",(ev)=>{
    if (selectMenu.value == 0)
        moveTo(ev.latlng.lat,ev.latlng.lng,etiqueta.value);
    if (selectMenu.value == 1)
        L.circle(ev.latlng, {radius: circuloI.value ,color:colores[selectMenuColor.value] }).addTo(map);
    if (selectMenu.value == 2){
        if (puntos.length==0){
            puntos.push(ev.latlng);
            polyline = L.polygon(puntos, {color: colores[selectPoliColor.value]}).addTo(map);
            selectPoliColor.disabled = true;
        }else{
            puntos.push(ev.latlng);
            polyline.addLatLng(ev.latlng);
        }
    }
});

selectMenu.addEventListener("change",()=>{
    document.getElementById(mostrarOpcion).style.visibility="hidden";
    mostrarOpcion = menu[selectMenu.value];
    document.getElementById(mostrarOpcion).style.visibility="visible";
});

poligonoAdd.addEventListener("click",()=>{
    puntos=[];
    selectPoliColor.disabled = false;
});


function moveTo(longitud,latitud,message){
    var myIcon = L.icon({
iconUrl: `css/img/${iconoSeleccionado}.png`
});
    L.marker([longitud, latitud],{icon:myIcon}).addTo(map)
.bindPopup(message)
.openPopup(); 
}  
