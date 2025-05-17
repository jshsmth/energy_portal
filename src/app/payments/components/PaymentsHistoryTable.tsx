// TODO: I would refactor this to use the compound component pattern.
// This would make the table more reusable and flexible. Example structure:
//
// Example usage:
// <Table>
//   <Table.Header>
//     <Table.Row>
//       <Table.HeaderCell>Date</Table.HeaderCell>
//       <Table.HeaderCell>Account ID</Table.HeaderCell>
//       <Table.HeaderCell>Amount</Table.HeaderCell>
//       <Table.HeaderCell>Status</Table.HeaderCell>
//     </Table.Row>
//   </Table.Header>
//   <Table.Body>
//     {payments.map((payment) => (
//       <Table.Row key={payment.id}>
//         <Table.Cell>{payment.date}</Table.Cell>
//         <Table.Cell>{payment.accountId}</Table.Cell>
//         <Table.Cell>${payment.amount}</Table.Cell>
//         <Table.Cell>
//           <Table.StatusBadge status={payment.status} />
//         </Table.Cell>
//       </Table.Row>
//     ))}
//   </Table.Body>
//   <Table.Footer>
//     <Table.Pagination />
//   </Table.Footer>
// </Table>
//
// This pattern would allow for:
// - Flexible header and footer customization
// - Reusable row and cell components
// - Built-in loading and error states
// - Consistent styling across all table instances
// - Easy addition of features like sorting, filtering, and pagination

import { usePaymentHistory } from "../hooks/usePaymentHistory";

export const PaymentsHistoryTable = () => {
  const { payments, isLoading, error } = usePaymentHistory();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-grey-50 flex items-center justify-center">
        <div className="text-xl">Loading payment history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-grey-50 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg mt-6">
      <table className="min-w-full divide-y divide-grey-200">
        <thead className="bg-grey-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-grey-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-grey-500 uppercase tracking-wider">
              Account ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-grey-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-grey-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-grey-200">
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-grey-900">
                {payment.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-grey-900">
                {payment.accountId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-grey-900">
                ${payment.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {payment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
