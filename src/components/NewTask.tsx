type NewTaskProps = {
    onClick: () => void;
    children: React.ReactNode;
}

export function NewTask({ onClick, children }: NewTaskProps) {
    return (
        <div className="fixed h-full w-full flex justify-end items-end p-10">
            <div
                className="
                    w-15 h-15 flex justify-center items-center bg-blue-800 rounded-full text-white
                    hover:bg-blue-700 hover:cursor-pointer z-1"
                onClick={onClick}>
                {children}
            </div>
        </div>

    )
}