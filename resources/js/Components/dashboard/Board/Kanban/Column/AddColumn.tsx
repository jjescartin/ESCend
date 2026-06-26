import { useState } from "react";

type Props = {
    onAdd: (title: string, color: string) => void;
}

export default function AddColumn({ onAdd }: Props) {
    const [isAdding, setIsAdding] = useState(false);
    const [title, setTitle] = useState("");
    const [color, setColor] = useState("#6366f1");
    const [error, setError] = useState("");

    const handleConfirm = () => {
        if (!title.trim()) {
            setError("Column title is required")
            return;
        };
        setError("");
        onAdd(title, color);
        setColor("#6366f1");
        setIsAdding(false);
    }

    const handleCancel = () => {
        setTitle("");
        setColor("#6366f1");
        setIsAdding(false);
    }

    if (isAdding) {
        return (
            <div className="flex flex-col gap-3 w-64 shrink-0 rounded-lg bg-gray-100 p-3">
                <div className="flex items-center gap-2 mb-3">
                    <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="w-7 h-7 rounded cursor-pointer border-0"
                        />
                    <input
                        type="text"
                        placeholder="Column title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-green-500"
                        autoFocus
                    />
                </div>
                {error && <p className="text-xs text-red-500">{error}</p>}
                <div className="flex gap-2 justify-center">
                    <button
                        onClick={handleConfirm}
                        className="text-sm text-white bg-green-700 px-3 py-1.5 rounded-lg hover:bg-green-800 transition-colors">
                        Add
                    </button>
                    <button
                        onClick={handleCancel}
                        className="text-sm text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                        Cancel
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div
            onClick={() => setIsAdding(true)}
            className="flex items-center justify-center w-64 shrink-0 rounded-lg border-2 border-dashed border-gray-300 text-gray-400 text-2xl cursor-pointer hover:border-gray-400 hover:text-gray-500">
            Add Column [+]
        </div>
    )
}