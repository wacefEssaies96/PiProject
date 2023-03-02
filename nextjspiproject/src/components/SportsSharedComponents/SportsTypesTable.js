import {BiEdit, BiTrashAlt} from 'react-icons/bi'

export default function SportTypesTable () {
    return (
        <table className="table table-hover table-bordered border-sucess">
            <thead>
                <tr className='text-center'>
                    <th><span>Title</span></th>
                    <th><span>Sub Types</span></th>
                    <th><span>Actions</span></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className='px-16 py-2 flex justify-content-center'>
                        <button className="btn">
                            <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
                        </button>
                        <button className="btn">
                            <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}