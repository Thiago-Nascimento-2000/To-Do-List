import { FcCheckmark } from "react-icons/fc";

export function Header() {
    return (
        <div className="bg-blue-600 w-12/12 h-50 flex flex-col items-center justify-center p-5 rounded-b-4xl z-2">
            <h1 className="w-8/12 m-5 text-white font-semibold text-5xl flex">Tare<span className="text-blue-950 font-bold">facil</span>&nbsp;<FcCheckmark /></h1>
            <nav className="bg-white/30 rounded-full w-8/12">
                <ul className="flex justify-between items-center mr-10">
                    <li className="text-blue-500 font-semibold bg-white rounded-full p-3 pl-10 pr-10"><a href="#">Todas Tarefas</a></li>
                    <li className="text-white/70 hover:text-blue-900 transition-all"><a href="#">Nova</a></li>
                    <li className="text-white/70 hover:text-blue-900 transition-all"><a href="#">Aprovado</a></li>
                    <li className="text-white/70 hover:text-blue-900 transition-all"><a href="#">Nova Lista</a></li>
                    <li className="text-white/70 hover:text-blue-900 transition-all"><a href="#">Carregado</a></li>
                </ul>
            </nav>
        </div>
    )
}