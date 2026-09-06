import { useEffect, useState } from "react";

function CountUp({ value = 0, duration = 900 }) {
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        const target = Number(value) || 0;
        let raf;
        const start = performance.now();
        const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(Math.round(target * eased));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [value, duration]);

    return <>{display}</>;
}

export default CountUp;
