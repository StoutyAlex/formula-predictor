import { FaPlus } from 'react-icons/fa';

export default function CircuitsPage() {
  return (
    <div className="flex-1 p-8" id="admin-content">
      <div className="bg-[#1A1D23] rounded-xl p-6" id="constructors-table">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Circuits List</h2>
          <div className="flex gap-4">
            <input
              type="text"
              className="bg-[#262931] text-white rounded-lg p-3 border border-gray-700 focus:border-red-500 focus:outline-none"
              placeholder="Search constructors..."
            />
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <FaPlus />
              <span>Add Constructor</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase text-gray-400 bg-background/20">
              <tr>
                <th scope="col" className="px-6 py-3 max-w-10">
                  Constructor name
                </th>
                <th scope="col" className="px-6 py-3">
                  Base
                </th>
                <th scope="col" className="px-6 py-3">
                  Principal
                </th>
                <th scope="col" className="px-6 py-3">
                  Drivers
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {(filteredConstructors || constructors).map((constructor) => (
                <tr className="bg-[#262931] dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white gap-10 flex flex-row">
                    <div className="w-3 flex -mx-6 -my-4" style={{ backgroundColor: constructor.colour }} />
                    <div className="flex flex-col gap-1">
                      {constructor.name}
                      <div className="text-xs font-normal">{constructor.fullName}</div>
                    </div>
                  </th>
                  <td className="px-6 py-4">
                    {constructor.location}, {constructor.country}
                  </td>
                  <td className="px-6 py-4">{constructor.principal}</td>
                  <td className="px-6 py-4">{constructor.drivers}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="text-blue-500 hover:text-blue-600" onClick={() => editConstructorHandler(constructor)}>
                        <FaPenToSquare />
                      </button>
                      <button className="text-red-500 hover:text-red-600" onClick={() => deleteConstructor(constructor.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
