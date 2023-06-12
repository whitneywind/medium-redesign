import { FormInput } from "../../../../typings"

const Comment = (props: FormInput) => {
  return (
    <div className='w-full flex'>
        <p className='font-bold w-1/4'>{props.name} </p>
        <p className='w-3/4'>{props.comment}</p>
    </div>
  )
}
export default Comment