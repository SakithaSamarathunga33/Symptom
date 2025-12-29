import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon not showing
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const sriLankaCenter = [7.8731, 80.7718];

// Mock District Data
const districts = [
    { name: 'Colombo', coords: [6.9271, 79.8612], risk: 'High', cases: 1205 },
    { name: 'Kandy', coords: [7.2906, 80.6337], risk: 'Moderate', cases: 540 },
    { name: 'Galle', coords: [6.0535, 80.2210], risk: 'Low', cases: 210 },
    { name: 'Jaffna', coords: [9.6615, 80.0255], risk: 'Moderate', cases: 412 },
    { name: 'Trincomalee', coords: [8.5874, 81.2152], risk: 'Low', cases: 156 },
];

const getColor = (risk) => {
    switch (risk) {
        case 'High': return '#ef4444';
        case 'Moderate': return '#f59e0b';
        default: return '#10b981';
    }
};

const GeoRiskMap = () => {
    return (
        <div className="h-[calc(100vh-64px)] w-full relative">
            <div className="absolute top-4 left-4 z-[1000] bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-slate-200 max-w-sm">
                <h2 className="text-xl font-bold text-slate-800 mb-2">Geo-Health Risk Map</h2>
                <p className="text-sm text-slate-600 mb-4">Real-time community health monitoring based on reported symptoms.</p>
                <div className="space-y-2 text-xs font-medium">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> High Risk Zones</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500"></span> Moderate Risk Zones</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span> Low Risk Zones</div>
                </div>
            </div>

            <MapContainer center={sriLankaCenter} zoom={8} scrollWheelZoom={true} className="h-full w-full z-0">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {districts.map((d, i) => (
                    <CircleMarker
                        key={i}
                        center={d.coords}
                        pathOptions={{ color: getColor(d.risk), fillColor: getColor(d.risk), fillOpacity: 0.6 }}
                        radius={20 + (d.cases / 100)} // Dynamic size based on cases
                    >
                        <Popup>
                            <div className="p-2">
                                <h3 className="font-bold text-lg">{d.name}</h3>
                                <p className="text-sm text-slate-600">Risk Level: <b style={{ color: getColor(d.risk) }}>{d.risk}</b></p>
                                <p className="text-sm text-slate-600">Active Reports: {d.cases}</p>
                            </div>
                        </Popup>
                    </CircleMarker>
                ))}
            </MapContainer>
        </div>
    );
};

export default GeoRiskMap;
