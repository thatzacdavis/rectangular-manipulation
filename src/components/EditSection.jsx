/**
 * The bottom section of our application that allows us to change the color of the selected rectangle.
 */
export const EditSection = ({ selectedId, setSelectedId, rectangles, setRectangles, newColor, setNewColor }) => {
    return (
        <>
        <button onClick={() => setRectangles([])}>Clear</button><div>
            <h1>Selected Rectangle</h1>
            {!selectedId
                ? (<span>None</span>)
                : (<div key={selectedId}>
                    <label>ID: </label><span>{selectedId}</span>
                    <br />
                    <label>Color: </label>
                    <input type='text' defaultValue={rectangles.find((r) => r.id === selectedId).fill} onChange={(e) => setNewColor(e.target.value)} />
                    <button onClick={() => {
                        const newRectangleIndex = rectangles.findIndex((r) => r.id === selectedId)
                        const newRectangle = { ...rectangles[newRectangleIndex], fill: newColor }
                        const newRectangles = rectangles
                        newRectangles[newRectangleIndex] = newRectangle
                        setRectangles(newRectangles)
                        setSelectedId(null)
                    } }>Change</button>
                    <br />
                    <span><i>* Supports hex codes without # and all named colors that <a href="https://htmlcolorcodes.com/color-names/">HTML supports</a>.</i></span>
                </div>)}
        </div>
        </>
    )
}