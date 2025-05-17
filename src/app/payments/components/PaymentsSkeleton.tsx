export function PaymentsSkeleton() {
  return (
    <div className="bg-white shadow rounded-lg mt-6">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Account ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 