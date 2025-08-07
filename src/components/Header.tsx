export function Header() {
    return (
        <div className="bg-blue-600 w-12/12 h-50 flex flex-col items-center justify-center p-5 rounded-b-4xl z-2">
            <h1 className="w-8/12 m-5 text-white font-semibold text-2xl">To do List</h1>
            <nav className="bg-white/30 rounded-full w-8/12">
                <ul className="flex justify-between items-center mr-10">
                    <li className="text-blue-500 font-semibold bg-white rounded-full p-3 pl-10 pr-10"><a href="#">Todas Tarefas</a></li>
                    <li className="text-white/70"><a href="#">Nova</a></li>
                    <li className="text-white/70"><a href="#">Aprovado</a></li>
                    <li className="text-white/70"><a href="#">Nova Lista</a></li>
                    <li className="text-white/70"><a href="#">Carregado</a></li>
                </ul>
            </nav>
        </div>
    )
}