import React, {useEffect, useState} from 'react';
import {MapContainer, Marker, Popup, ImageOverlay, Polyline, Circle} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import * as satellite from 'satellite.js';
import styled from "styled-components";
import WorldMap from "../assets/Background/world.svg";
import {format} from 'date-fns';
import {toZonedTime} from 'date-fns-tz';
import ContentContainer from "../components/Containers/content-container/ContentContainer";
import MainWrapper from "../components/Containers/main-wrapper/MainWrapper";

const MapBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 800px;
`;

const Map = styled.div`
  display: flex;
  justify-content: center;
  top: 160px;
  width: 100%;
  max-width: 1400px;
  height: 76.29537037037037%;
  max-height: 1400px;
  object-fit: cover;
  background-size: cover;
  background-position: center;
  background-color: white;
`;

const LegendBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 17.125%;
  min-width: 350px;
  height: 80px;
  margin-top: 63px;
`;

const NoticeWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Notice = styled.p`
  font-family: var(--font-family);
  font-size: 20px;
`;

const ColorBox = styled.div`
  width: 100px;
  height: 25px;
`

const TimeDisplay = styled.div`
  font-family: var(--font-family);
  position: absolute;
  top: 58.35185185185185%;
  left: 13.125%;
  background: white;
  padding: 10px;
  border-radius: 10px;
  text-align: left;
`;

const TimeRow = styled.div`
  margin-bottom: 10px;
  color: #FF8244;
`;

const TimeValue = styled.div`
  font-weight: bold;
  font-size: 48px;
  color: #4B3EAA;
`;

const getTimeInZone = (zone) => {
    const now = new Date();
    return format(toZonedTime(now, zone), 'HH:mm:ss');
};

const Clock = () => {
    const [moscowTime, setMoscowTime] = useState(getTimeInZone('Europe/Moscow'));
    const [chelyabinskTime, setChelyabinskTime] = useState(getTimeInZone('Asia/Yekaterinburg'));

    useEffect(() => {
        const interval = setInterval(() => {
            setMoscowTime(getTimeInZone('Europe/Moscow'));
            setChelyabinskTime(getTimeInZone('Asia/Yekaterinburg'));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <TimeDisplay>
            <TimeRow>МОСКОВСКОЕ ВРЕМЯ</TimeRow>
            <TimeValue>{moscowTime}</TimeValue>
            <TimeRow>ЧЕЛЯБИНСКОЕ ВРЕМЯ</TimeRow>
            <TimeValue>{chelyabinskTime}</TimeValue>
        </TimeDisplay>
    );
};

const bounds = [
    [-62, -180],
    [95, 210]
];

const iconHtml = `<div style="width: 20px; height: 20px; background-color: var(--sunset-orange); border-radius: 50%;"></div>`;

const satelliteIcon = L.divIcon({
    html: iconHtml,
    className: '',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

const calculateTrajectory = (tleLine1, tleLine2) => {
    const satrec = satellite.twoline2satrec(tleLine1, tleLine2);
    const trajectory = [];
    const now = new Date();
    let previousLongitude = null;
    let segment = [];

    for (let i = -30; i <= 30; i += 1) {
        const time = new Date(now.getTime() + i * 60 * 1600);
        const positionAndVelocity = satellite.propagate(satrec, time);
        const positionGd = satellite.eciToGeodetic(positionAndVelocity.position, satellite.gstime(time));
        let longitude = satellite.degreesLong(positionGd.longitude);
        const latitude = satellite.degreesLat(positionGd.latitude);

        if (previousLongitude !== null && Math.abs(longitude - previousLongitude) > 180) {
            trajectory.push([...segment]);
            segment = [];
        }

        segment.push([latitude, longitude]);
        previousLongitude = longitude;
    }
    trajectory.push([...segment]);
    return trajectory;
};

const SatelliteMap = () => {
    const [satellitePosition, setSatellitePosition] = useState([0, 0]);
    const [trajectory, setTrajectory] = useState([]);
    const [coverageRadius, setCoverageRadius] = useState(2000); // Радиус зоны действия в километрах

    useEffect(() => {
        const tleLine1 = '1 57172U 23091G   25024.60299216  .00011779  00000+0  67414-3 0  9994';
        const tleLine2 = '2 57172  97.5818  80.7827 0016775  84.1442 276.1700 15.12680628 86908';


        const getSatellitePosition = () => {
            const satrec = satellite.twoline2satrec(tleLine1, tleLine2);
            const now = new Date();
            const positionAndVelocity = satellite.propagate(satrec, now);
            const positionGd = satellite.eciToGeodetic(positionAndVelocity.position, satellite.gstime(now));
            let longitude = satellite.degreesLong(positionGd.longitude);
            const latitude = satellite.degreesLat(positionGd.latitude);

            setSatellitePosition([latitude, longitude]);
            setCoverageRadius(2000); // Можно изменить радиус в зависимости от высоты спутника
        };

        getSatellitePosition();
        const interval = setInterval(getSatellitePosition, 10000);

        setTrajectory(calculateTrajectory(tleLine1, tleLine2));

        return () => clearInterval(interval);
    }, []);

    return (
        <MainWrapper>
            <ContentContainer>
                <MapBox>
                    <Map>
                        <MapContainer
                            center={[0, 0]}
                            zoom={1}
                            style={{height: "100%", width: "75%", backgroundColor: 'white'}}
                            attributionControl={false}
                            crs={L.CRS.EPSG4326}
                        >
                            <ImageOverlay
                                url={WorldMap}
                                bounds={bounds}
                            />
                            {trajectory.map((segment, index) => (
                                <Polyline key={index} positions={segment} color="rgba(255, 130, 68, 0.7)"/>
                            ))}
                            <Marker position={satellitePosition} icon={satelliteIcon}>
                                <Popup>
                                    Спутник здесь!
                                </Popup>
                            </Marker>
                            <Circle
                                center={satellitePosition}
                                radius={coverageRadius * 1000} // Радиус в метрах
                                color="rgba(75, 62, 170, 0.80)"
                                fillColor="rgba(75, 62, 170, 0.80)"
                                fillOpacity={0.1}
                            />
                        </MapContainer>
                    </Map>
                    <LegendBox>
                        <NoticeWrapper>
                            <ColorBox style={{backgroundColor: 'var(--sunset-orange)'}}></ColorBox>
                            <Notice>- Спутник</Notice>
                        </NoticeWrapper>
                        <NoticeWrapper>
                            <ColorBox style={{backgroundColor: 'var(--royal-lilac)'}}></ColorBox>
                            <Notice>- Зона покрытия</Notice>
                        </NoticeWrapper>
                        <Clock/>
                    </LegendBox>
                </MapBox>
            </ContentContainer>
        </MainWrapper>
    );
};

export default SatelliteMap;
