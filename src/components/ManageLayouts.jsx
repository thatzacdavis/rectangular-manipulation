export const ManageLayouts = ({ layouts, selectedLayoutIndex, setSelectedLayoutIndex, newLayoutName, setNewLayoutName, setLayouts }) => {
    return (
        <div className='ml-4 mr-4 h-full'>
            <div className="flex flex-col justify-between flex-1 h-full">
                <div className="">
                    <h3 className="text-xl font-bold mb-4">Layouts</h3>
                    <select id="countries" value={selectedLayoutIndex} className="w-full form-select block px-3 py-1.5 text-base text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label="Layout selection"
                        onChange={(e) => {
                            setSelectedLayoutIndex(e.target.value)
                        }}>
                        {layouts.map((layout, index) => (
                            <option key={`layout-${index}`} value={index}>{layout.name}</option>
                        )
                        )}
                    </select>
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