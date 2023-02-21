export const Table = (props: { tableName?: string, headerRow: JSX.Element[], rows: JSX.Element[][] }) => {
    return (
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-xl">
            {props.tableName ?
                <header className="px-5 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-500">{props.tableName}</h2>
                </header> : <></>}
            <div className="p-3">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead className="text-xs font-semibold uppercase text-indigo-400">
                        <tr>
                            {props.headerRow.map((value, index) => {
                                return (
                                    <th key={index} className={`p-2 whitespace-nowrap bg-indigo-50 
                                    ${index === 0 ? "rounded-l-md" : ""} 
                                    ${index === props.headerRow.length - 1 ? "rounded-r-md" : ""}`}>
                                        {value}
                                    </th>
                                )
                            })}
                        </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                        {props.rows.map((row, index) => {
                            return (
                                <tr key={index}>
                                    {row.map((value, index) => {
                                        return (
                                            <td key={index} className="p-2 whitespace-nowrap">
                                                {value}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}