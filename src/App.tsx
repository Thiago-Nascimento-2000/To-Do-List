import { useState } from "react";
import { Modal } from "./components/Modal";
import { NewTask } from "./components/NewTask";
import { HiMiniPlus } from "react-icons/hi2";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlinePushpin } from "react-icons/ai";
import { v4 as uuid } from "uuid";


export default function App() {
  const [open, setOpen] = useState(false);

  type Tarefas = {
    id: string;
    nomeTarefa: string;
    concluido: boolean;
  }

  const [input, setInput] = useState('');
  const [tarefa, setTarefa] = useState<Tarefas[]>([]);

  const adicionarTarefa = () => {
    const id = uuid();
    setTarefa([...tarefa, { id, nomeTarefa: input, concluido: false }]);
    setInput('');
  }

  return (
    <main className="flex justify-center items-center flex-col h-screen bg-gray-950">

      <div className="bg-blue-100 w-6/12 h-12/12 rounded-xl flex flex-col items-center p-5 mt-10">
        <h1 className="font-semibold text-4xl">Suas Tarefas</h1>
        {tarefa.map((task) => (
          <span key={task.id}>
            {task.nomeTarefa}
          </span>
        ))}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}>
        <div className="w-full flex justify-end items-end p-2">
          <button
            onClick={() => setOpen(false)}
            className="text-white font-semibold p-2 hover:cursor-pointer">
            <MdOutlineCancel size={25} />
          </button>
        </div>

        <div className="flex-1 flex items-start">
          <input
            placeholder="Nova Task"
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value) }}
            className="bg-white rounded-l-xl p-1 border-none">
          </input>
          <button
            onClick={() => adicionarTarefa()}
            className="bg-white rounded-r-xl p-1 hover:cursor-pointer">
            <AiOutlinePushpin size={24} />
          </button>
        </div>
      </Modal>

      <NewTask
        onClick={() => setOpen(true)}>
        <HiMiniPlus size={30} />
      </NewTask>
    </main>
  )
}

