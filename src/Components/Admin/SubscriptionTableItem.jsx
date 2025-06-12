
const SubscriptionTableItem = ({ _id, email, date, deleteEmail }) => {
    const BlogDate = new Date(date);
    return (
        <tr className='bg-white border-b'>
            <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                {email ? email : "No Email"}
            </th>
            <td className='px-6 py-4 hidden sm:block'>
                {BlogDate ? BlogDate?.toDateString() : 'No Date'}
            </td>
            <td onClick={() => deleteEmail(_id)} className='px-6 py-4 hover:cursor-pointer'>
                X
            </td>

        </tr>
    );
};

export default SubscriptionTableItem;