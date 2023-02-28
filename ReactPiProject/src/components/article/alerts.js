import Swal from "sweetalert2"
import { deleteArticle } from "@/services/article";


export const confirmDeleteOneArticle = (props) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            await deleteArticle(props.id)
            props.refresh()
            Swal.fire(
                'Deleted!',
                'Article has been deleted.',
                'success'
            )
        }
    })
}

export const success = (message) => {
    Swal.fire(
        'Success !', message, 'success'
    )
}