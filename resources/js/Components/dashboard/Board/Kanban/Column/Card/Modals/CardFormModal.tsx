import { CardPayload } from "@/Interface/Dashboard"
import { useState } from "react"

type Props = {
    formData: CardPayload,
    priorityOptions: string[],
    onClose: () => void,
    onCardCreate: () => void,
    onFieldChange: (field: keyof CardPayload, value: string) => void,
}

export default function CardFormModal({
    formData,
    priorityOptions,
    onClose,
    onCardCreate,
    onFieldChange,
}: Props) {

    const [error, setError] = useState("");
    const onSubmit = () => {
        if (!formData.title.trim()) {
            setError('Card title is required' )
            return
        }
        onCardCreate()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl border border-gray-200 w-full max-w-md p-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <span className="text-base font-medium text-gray-900">Create card</span>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <span className="text-lg">&#x2715;</span>
                    </button>
                </div>

                {/* Title */}
                <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-1">Card title <span className="text-red-500">*</span></p>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={e => onFieldChange('title', e.target.value)}
                        placeholder="Enter card title"
                        className={'w-full text-sm border rounded-lg px-3 py-1.5 focus:outline-none ' + (error ? 'border-red-400 focus:border-red-400' : 'border-gray-300 focus:border-green-500')}
                        autoFocus
                    />
                    {error && (
                        <p className="text-xs text-red-500 mt-1">{error}</p>
                    )}
                </div>

                {/* Description */}
                <div className="border-t border-gray-100 pt-4 mb-4">
                    <p className="text-xs text-gray-400 mb-1">Description <span className="text-xs">(optional)</span></p>
                    <textarea
                        value={formData.description ?? ''}
                        onChange={e => onFieldChange('description', e.target.value)}
                        rows={3}
                        placeholder="Add a description..."
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-1.5 resize-y focus:outline-none focus:border-green-500"
                    />
                </div>

                {/* Priority */}
                <div className="border-t border-gray-100 pt-4 mb-4">
                    <p className="text-xs text-gray-400 mb-1">Priority</p>
                    <select
                        value={formData.priority}
                        onChange={e => onFieldChange('priority', e.target.value)}
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:border-green-500 cursor-pointer"
                    >
                        {priorityOptions.map(p => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>

                {/* Due Date */}
                <div className="border-t border-gray-100 pt-4 mb-6">
                    <p className="text-xs text-gray-400 mb-1">Due date <span className="text-xs">(optional)</span></p>
                    <input
                        type="date"
                        value={formData.due_date ?? ''}
                        onChange={e => onFieldChange('due_date', e.target.value)}
                        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-1.5 text-gray-700 focus:outline-none focus:border-green-500 cursor-pointer"
                    />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
                    <button
                        onClick={onClose}
                        className="text-sm text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSubmit}
                        className="text-sm text-white bg-green-700 px-3 py-1.5 rounded-lg hover:bg-green-800 transition-colors"
                    >
                        Create
                    </button>
                </div>

            </div>
        </div>
    )
}