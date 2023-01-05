const Modal = ( {title, children, onClose} ) => {
    return (
        <>
            <div id="plnt-modal-backdrop" className="modal-backdrop"/>
            <div id="plnt-modal" className="modal-div">
                <div className="modal-header">
                    <button onClick={onClose} className="cursor-pointer float-right m-r-2">x</button>
                    {title}
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Modal;