import React from "react";

interface TableProps {
  headers: React.ReactNode[];
  rows: React.ReactNode[][];
}

const Table: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-primaryColor-5">
          <tr>
            {headers.map((header, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="bg-white border-b border-gray-200">
              {row.map((cell, cellIndex) =>
                typeof cell === "string" && cell.includes("PRIORIDAD") ? (
                  <td key={cellIndex} className="px-6 py-4 bg-errorColor-5 text-errorColor font-bold text-center">
                    {cell}
                  </td>
                ) : (
                  <td key={cellIndex} className="px-6 py-4">
                    {cell}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
