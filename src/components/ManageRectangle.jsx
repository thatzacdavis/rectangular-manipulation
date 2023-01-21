/**
 * The bottom section of our application that allows us to change the color of the selected rectangle.
 */
export const ManageRectangle = ({
  selectedId,
  setSelectedId,
  rectangles,
  setRectangles,
  newColor,
  setNewColor,
}) => {
  return (
    <>
      <button
        className="mt-4 bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setRectangles([])}
      >
        Clear
      </button>
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 mt-4">Selected Rectangle</h1>
        {!selectedId ? (
          <span>None</span>
        ) : (
          <div key={selectedId} data-testid='EditSection'>
            <div className="flex items-center justify-start mb-2">
              <div>
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="newColor"
                >
                  Color:
                </label>
              </div>
              <div>
                <input
                  id="newColor"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  defaultValue={
                    rectangles.find((r) => r.id === selectedId).fill
                  }
                  onChange={(e) => setNewColor(e.target.value)}
                />
              </div>
              <button
                className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={() => {
                  const newRectangleIndex = rectangles.findIndex(
                    (r) => r.id === selectedId,
                  );
                  const newRectangle = {
                    ...rectangles[newRectangleIndex],
                    fill: newColor,
                  };
                  const newRectangles = rectangles;
                  newRectangles[newRectangleIndex] = newRectangle;
                  setRectangles(newRectangles);
                  setSelectedId(null);
                }}
              >
                Change
              </button>
            </div>
            <span>
              <i>
                * Supports hex codes without # and all named colors that{' '}
                <a href="https://htmlcolorcodes.com/color-names/">
                  HTML supports
                </a>
                .
              </i>
            </span>
          </div>
        )}
      </div>
    </>
  );
};
