type ModelProps = {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

export function Modal({ open, onClose, children }: ModelProps) {
    return (
        <div
            className={`fixed inset-0 items-center justify-center flex z-20 transition-all duration-300
            ${open ? "visible" : "invisible"}`}>

            <div
                className={`
                        w-100 h-fit bg-blue-700/90 rounded-xl flex justify-between items-center flex-col
                        ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                {children}
            </div>
        </div>
    )
}