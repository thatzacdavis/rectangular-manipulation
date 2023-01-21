/**
 * The right sidebar of our application that allows us to:
 * 1. Select a different layout.
 * 2. Delete the selected layout.
 * 2. Add a new layout.
 */
export const ManageLayouts = ({ layouts, selectedLayoutIndex, setSelectedLayoutIndex, newLayoutName, setNewLayoutName, setLayouts }) => {
    return (
        <div className='ml-4 mr-4 h-full'>
            <div className="flex flex-col justify-between flex-1 h-full">
                <div>
                    <h3 className="text-xl font-bold mb-4">Layouts</h3>
                    <select id="layouts" value={selectedLayoutIndex} className="w-full form-select block px-3 py-1.5 text-base text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-cyan-500 focus:outline-none"
                        aria-label="Layout selection"
                        onChange={(e) => {
                            setSelectedLayoutIndex(e.target.value)
                        }}>
                        {layouts.map((layout, index) => (
                            <option key={`layout-${index}`} value={index}>{layout.name}</option>
                        )
                        )}
                    </select>
                    <button className="mt-4 bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500 disabled:opacity-25"
                        disabled={layouts.length === 1}
                        aria-disabled={layouts.length === 1}
                        onClick={() => {
                            const newLayouts = [...layouts]
                            newLayouts.splice(parseInt(selectedLayoutIndex, 10), 1)
                            setLayouts(newLayouts)
                            setSelectedLayoutIndex(0)
                        }}>
                        Delete Selected Layout
                    </button>
                </div>
                <div className="flex">
                    <input key={layouts.length} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' placeholder='New layout name...' onChange={(e) => setNewLayoutName(e.target.value)} />
                    <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded ml-2"
                        onClick={() => {
                            const newLayout = { name: newLayoutName, rectangles: []}
                            setLayouts([...layouts, newLayout])
                            setSelectedLayoutIndex(layouts.length) // The new layout will be at this index.
                            setNewLayoutName(null)
                        }}>
                        +
                    </button>
                </div>
            </div>
        </div>
    )
}