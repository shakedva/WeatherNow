const DEFAULT_ERROR = "This page does not exist"
export default function ErrorPage({ children = DEFAULT_ERROR }) {
    return (
        <div id="error-page">
            <h1> {children} </h1>
        </div>
    )
}