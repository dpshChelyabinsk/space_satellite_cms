import * as satellite from 'satellite.js';

export default class SatelliteController {
    constructor(tleLine1, tleLine2, steps = 360, updateIntervalMs = 100) {
        this.satrec      = satellite.twoline2satrec(tleLine1, tleLine2);
        this.steps       = steps;
        this.updateInt   = updateIntervalMs;
        this.lastTs      = 0;
        this.rafId       = null;
    }

    calculateOrbitTrajectory(satrec) {
        const periodMin = 2 * Math.PI / satrec.no;
        const stepMs    = (periodMin / this.steps) * 60 * 1000;
        const now       = new Date();
        const traj      = [];
        let segment   = [];
        let prevLon   = null;

        for (let i = 0; i <= this.steps; i++) {
            const t   = new Date(now.getTime() + stepMs * i);
            const pv  = satellite.propagate(satrec, t);
            const geo = satellite.eciToGeodetic(pv.position, satellite.gstime(t));
            const lat = satellite.degreesLat(geo.latitude);
            let   lon = satellite.degreesLong(geo.longitude);
            const alt = geo.height / 6371;

            if (prevLon !== null && Math.abs(lon - prevLon) > 180) {
                traj.push(segment);
                segment = [];
            }
            segment.push({ lat, lng: lon, alt });
            prevLon = lon;
        }
        traj.push(segment);
        return traj;
    }

    /**
     * Запускает внутренний RAF‑цикл и вызывает onUpdate каждый раз,
     * когда нужно «тикнуть».
     * onUpdate получает объект:
     *   { lat, lng, alt, newRing|null, futurePath:Array }
     */
    start(onUpdate) {
        const tick = ts => {
            // только раз в this.updateInt миллисекунд
            if (ts - this.lastTs > this.updateInt) {
                const now = new Date();
                const pv  = satellite.propagate(this.satrec, now);
                const geo = satellite.eciToGeodetic(pv.position, satellite.gstime(now));
                const lat = satellite.degreesLat(geo.latitude);
                const lng = satellite.degreesLong(geo.longitude);
                const alt = geo.height / 6371;

                // кольцо покрытия (появляется ~каждую секунду)
                let newRing = null;
                if (ts % 1000 < this.updateInt) {
                    newRing = {
                        lat,
                        lng,
                        maxRadius:       2000 / 111.32,
                        propagationSpeed: 3,
                        createdAt:       Date.now(),
                    };
                }

                // пересчёт всей траектории
                const segments   = this.calculateOrbitTrajectory(this.satrec, this.steps);
                const futurePath = segments.flat();

                onUpdate({ lat, lng, alt, newRing, futurePath });
                this.lastTs = ts;
            }

            this.rafId = requestAnimationFrame(tick);
        };

        this.rafId = requestAnimationFrame(tick);
    }

    /** Останавливает цикл кадра */
    stop() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }
}
