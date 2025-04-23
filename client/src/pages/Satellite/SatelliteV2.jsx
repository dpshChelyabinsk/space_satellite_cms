import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import MainWrapper from "../../components/Containers/main-wrapper/MainWrapper";
import ContentContainer from "../../components/Containers/content-container/ContentContainer";
import classes from "./styles/SatelliteV2.module.css";
import SatelliteController from "../../utils/services/Satellite";
import {useSatellite} from "../../contexts/SatelliteContext";

// const tleLine1 = '1 57172U 23091G   25024.60299216  .00011779  00000+0  67414-3 0  9994';
// const tleLine2 = '2 57172  97.5818  80.7827 0016775  84.1442 276.1700 15.12680628 86908';

// Статичные данные
const citiesLabels = [
    { lat: 53.7558, lng: 37.6173, name: 'Москва' },
    { lat: 53.1644, lng: 61.4368, name: 'Челябинск' }
];
const citiesPoints = [
    { lat: 55.7558, lng: 37.6173, alt: 0 },
    { lat: 55.1644, lng: 61.4368, alt: 0 },
];

const SatelliteV2 = () => {
    // 1) Всегда вызываем хук контекста
    const { tle } = useSatellite();

    // 2) Делаем безопасное деструктурирование (tle может быть null)
    const tleLine1 = tle?.tleLine1 ?? '';
    const tleLine2 = tle?.tleLine2 ?? '';

    // 3) Объявляем ВСЕ хуки **до** любого return
    const [size, setSize]       = useState({ width: 0, height: 0 });
    const [satPoint, setSatPoint] = useState({ lat: 0, lng: 0, alt: 0 });
    const [rings, setRings]     = useState([]);
    const [futurePath, setFuturePath] = useState([]);
    const globeRef   = useRef();
    const containerRef  = useRef();
    const followRef   = useRef(true);
    const resetTimerRef = useRef();

    const customLayerData = useMemo(() => [satPoint], [satPoint]);

    // Если TLE ещё нет, возвращаем null — сами эффекты и контроллер не будут стартовать
    const satController = useMemo(() => {
        if (!tleLine1 || !tleLine2) return null;
        return new SatelliteController(tleLine1, tleLine2);
    }, [tleLine1, tleLine2]);

    // ResizeObserver
    useEffect(() => {
        if (!containerRef.current) return;
        const obs = new ResizeObserver(([e]) =>
            setSize({
                width:  e.contentRect.width,
                height: e.contentRect.height
            })
        );
        obs.observe(containerRef.current);
        return () => obs.disconnect();
    }, []);

    // Запуск/остановка RAF-цикла
    useEffect(() => {
        if (!globeRef.current || !satController) return;

        satController.start(({ lat, lng, alt, newRing, futurePath }) => {
            setSatPoint({ lat, lng, alt });
            if (newRing) setRings(prev => [...prev.slice(-2), newRing]);
            setFuturePath(futurePath);

            if (followRef.current) {
                globeRef.current.pointOfView({ lat, lng, altitude: alt + 2 }, 100);
            }
        });

        const controls = globeRef.current.controls();
        const onStart  = () => {
            followRef.current = false;
            clearTimeout(resetTimerRef.current);
            resetTimerRef.current = setTimeout(() => {
                followRef.current = true;
            }, 5000);
        };
        controls.addEventListener('start', onStart);

        return () => {
            satController.stop();
            controls.removeEventListener('start', onStart);
            clearTimeout(resetTimerRef.current);
        };
    }, [satController]);

    const createSatelliteMesh = useCallback(() => {
        const geom = new THREE.SphereGeometry(1, 16, 16);
        const mat  = new THREE.MeshPhongMaterial({ shininess: 80, color: 0xff8244 });
        return new THREE.Mesh(geom, mat);
    }, []);

    const updateSatelliteMesh = useCallback((mesh, d) => {
        const { x, y, z } = globeRef.current.getCoords(d.lat, d.lng, d.alt);
        mesh.position.set(x, y, z);
    }, []);

    return (
        <MainWrapper>
            <ContentContainer>
                <div ref={containerRef} className={classes.mapContainer}>
                    <Globe
                        ref={globeRef}
                        width={size.width}
                        height={size.height}
                        backgroundColor="rgba(0,0,0,0)"
                        globeImageUrl="https://unpkg.com/three-globe@2.24.5/example/img/earth-blue-marble.jpg"
                        showAtmosphere={false}

                        // Динамическая траектория
                        pathsData={futurePath.length ? [futurePath] : []}
                        pathPoints={d => d}
                        pathPointLat={p => p.lat}
                        pathPointLng={p => p.lng}
                        pathPointAlt={p => p.alt}
                        pathStroke={2}
                        pathResolution={2}
                        pathTransitionDuration={0}
                        pathColor={() => ['limegreen', 'rgba(255,0,0,0.5)']}

                        // Зоны покрытия
                        ringsData={rings}
                        ringLat="lat"
                        ringLng="lng"
                        ringMaxRadius="maxRadius"
                        ringPropagationSpeed="propagationSpeed"
                        ringColor={() => ['#FF8244', '#ff000020']}
                        ringRepeatPeriod={0}
                        ringResolution={64}

                        // HTML‑метки для городов
                        htmlElementsData={citiesLabels}
                        htmlLat="lat"
                        htmlLng="lng"
                        htmlElement={d => {
                            const el = document.createElement('div');
                            el.className = classes.citiesLabel;
                            el.textContent = d.name;
                            return el;
                        }}

                        // Точки городов
                        pointsData={citiesPoints}
                        pointLat="lat"
                        pointLng="lng"
                        pointAltitude="alt"
                        pointColor={() => '#FFC600'}
                        pointRadius={0.3}
                        pointLabel={d =>
                            `<div class="${classes.citiesPoint}">
                <b>Ширина: ${d.lat.toFixed(2)}</b><br/>
                <b>Долгота: ${d.lng.toFixed(2)}</b>
              </div>`
                        }

                        // Спутник
                        customLayerData={customLayerData}
                        customThreeObject={createSatelliteMesh}
                        customThreeObjectUpdate={updateSatelliteMesh}

                        rendererConfig={{ antialias: true, powerPreference: 'high-performance' }}
                    />
                </div>
            </ContentContainer>
        </MainWrapper>
    );
};

export default SatelliteV2;
