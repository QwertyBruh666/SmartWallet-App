import "./Modal.css"

export function Modal({children, header, showFunc} : { children, header: string, showFunc: Function }) {
    return (
        <div className="overlay" onClick={() => { showFunc() }}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal__header"> { header } </div>
                { children }
            </div>
        </div>
    )
}