import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

export const fixLeafletIcon = () => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    });
};

export const pawIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1077/1077163.png', 
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});