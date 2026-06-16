import { CardDetail } from "@/Interface/Dashboard"

type Props = {
    cardDetails: CardDetail,
    onClose: () => void
}

export default function CardModal({ cardDetails, onClose }: Props) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-[900px] max-h-[90vh] flex flex-col">
                
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-2 border-b">
                    <div>
                        <span className="text-xs text-gray-400">{cardDetails.code}</span>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
                </div>

                {/* Body */}
                <div className="flex flex-1 overflow-hidden">

                    {/* LEFT - scrollable */}
                    <div className="w-[60%] overflow-y-auto px-6 py-2 flex flex-col gap-6">
                        
                        {/* Description */}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">{cardDetails.title}</h2>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">Description</h3>
                            <p className="text-sm text-gray-600">
                                {cardDetails.description ?? "No description provided."}
                            </p>
                        </div>

                        {/* Activity */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">Activity</h3>
                            
                            {/* Comment Input */}
                            <div className="flex gap-2 mb-4">
                                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold shrink-0">
                                    JE
                                </div>
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    className="flex-1 border rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300"
                                />
                            </div>

                            {/* Comments */}
                            <div className="flex flex-col gap-4">
                                {cardDetails.comments.length > 0
                                    ? cardDetails.comments.map(comment => (
                                        <div key={comment.id} className="flex gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold shrink-0">
                                                {comment.user.initials}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs font-semibold text-gray-700">{comment.user.name}</span>
                                                    <span className="text-xs text-gray-400">{comment.created_at}</span>
                                                </div>
                                                <p className="text-sm text-gray-600">{comment.message}</p>
                                            </div>
                                        </div>
                                    ))
                                    : <p className="text-sm text-gray-400">No comments yet.</p>
                                }
                            </div>
                        </div>

                    </div>

                    {/* RIGHT - fixed details */}
                    <div className="w-[40%] px-4 py-4 flex flex-col gap-4 text-sm shrink-0">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Details</h3>
                        {/* Priority */}
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-400 mb-1">Priority</p>
                            <span className="font-semibold text-gray-700 capitalize">{cardDetails.priority}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-400 mb-1">Date Created</p>
                            <span className="font-semibold text-gray-700">{cardDetails.due_date ?? "—"}</span>
                        </div>

                        {/* Due Date */}
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-400 mb-1">Due Date</p>
                            <span className="font-semibold text-gray-700">{cardDetails.due_date ?? "—"}</span>
                        </div>

                        {/* Assignees */}
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-400 mb-1">Assignees</p>
                            <div className="flex flex-col gap-2">
                                {cardDetails.assignees.map(assignee => (
                                    <div key={assignee.id} className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold">
                                            {assignee.initials}
                                        </div>
                                        <span className="text-gray-700">{assignee.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Tags</p>
                            <div className="flex flex-wrap gap-1">
                                {cardDetails.tags.map(tag => (
                                    <span
                                        key={tag.id}
                                        className="text-xs px-2 py-0.5 rounded-full text-white"
                                        style={{ backgroundColor: tag.color }}
                                    >
                                        {tag.label}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}