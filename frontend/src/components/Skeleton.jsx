function Skeleton({ lines = 1, height = 14 }) {
    return (
        <>
            {Array.from({ length: lines }).map((_, i) => (
                <div key={i} className="soc-skeleton" style={{ height, width: `${100 - i * 12}%` }} />
            ))}
        </>
    );
}

export function StatSkeleton() {
    return (
        <div className="col-md-3 col-sm-6 mb-3">
            <div className="soc-card"><div className="soc-card-body"><Skeleton lines={2} /></div></div>
        </div>
    );
}

export default Skeleton;
