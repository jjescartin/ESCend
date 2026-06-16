import { BoardContent } from "@/Interface/Dashboard"

type Props = Pick<BoardContent, 'name' | 'end_date'>

export default function BoardHeader({ name, end_date }: Props) {
    return (
        <div className="pb-5">
            <div className="w-full flex items-center justify-between pb-2">
                <div className="text-3xl">
                    <span>{name}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="pr-3">
                        {/* {end_date} */}
                        9 Days Remaining
                    </div>
                    <div>
                        <button className="bg-gray-200 px-3 py-1 rounded-md">Complete Project</button>
                    </div>
                </div>
            </div>
            <div className="board-filter">
                <input className="w-72 rounded-md border-1 mr-3"></input>
                <label className="text-lg">Filter</label>
            </div>
        </div>

    )
}