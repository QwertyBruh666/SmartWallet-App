import "./Skeleton.css"

export function Skeleton(style) {
    return (
        <div style={{ ...style, animation: "shine .5s infinite linear", backgroundColor: "rgb(175, 175, 175)" }}></div>
    )
}