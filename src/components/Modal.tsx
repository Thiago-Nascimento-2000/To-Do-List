type ModelProps = {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

export function Modal({ open, onClose, children }: ModelProps) {
    return (
        <div
            className={`fixed flex justify-center items_center
            ${open ? "visible" : "invisible"}`}>

            <div
                className={`
                        w-100 h-100 bg-blue-950 rounded-xl flex justify-center items-center flex-col gap-10
                        ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                {children}
            </div>
        </div>
    )
}