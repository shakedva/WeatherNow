export default function DailyCard({ dailyForecast }) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{dailyForecast.date}</h5>
                <p className="card-text">{dailyForecast.temperature}</p>
            </div>
        </div>
    )
}