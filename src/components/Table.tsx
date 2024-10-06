import { Link } from "react-router-dom";
import { TableProps, User } from "../types/type";

const Table = <T extends User>({ columns, data, actions }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        {/* Table header top  */}
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="p-4 text-left text-gray-700">
                {column.header}
              </th>
            ))}
            {actions && <th className="p-4">Actions</th>}
          </tr>
        </thead>

        {/* Table body contains all details of user */}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`w-full duration-500 transition-all font-medium rounded-lg ${
                rowIndex % 2 === 0
                  ? "bg-teal-600 text-white hover:bg-teal-700"
                  : "bg-white hover:bg-gray-300"
              }`}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="p-4">
                  <Link to={`/user-details/${row.id}`}>
                    {String(row[column.accessor])}
                  </Link>
                </td>
              ))}
              {actions && <td className="p-4">{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
