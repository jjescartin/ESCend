import { useDashboard } from "@/Context/DashboardContext";

export default function AlertsPanel () {
    const context = useDashboard();
    if(!context) return null;

    const {alerts} = context;

    return (
        alerts.map((alert, index)=>(
            <div key={index}>{alert.message}</div>
        ))
    );
}