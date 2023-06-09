"use client"

import { useForm, SubmitHandler } from 'react-hook-form';

interface FormInput {
_id: string;
name: string;
email: string;
comment: string;
}

interface BoxProps {
    id: string;
}

export default function CommentBox({ id }: BoxProps) {
    const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm<FormInput>()

    const onSubmit: SubmitHandler<FormInput> = (data) => {
        console.log(data);
    }

    return (
    <div className='w-full flex items-center justify-center pt-6'>
        <div className='space-y-3 flex flex-col w-2/3 lg:w-full'>
            <button type="button" className="bg-yellow-500 w-full py-2 rounded-md">Hide Comments</button>
            <div className='rounded border-2 border-solid my-2 p-3 border-yellow-400'>
                <div className='w-full px-2 py-1 flex flex-col space-y-2'>
                    <div className='w-full flex'>
                        <p className='font-bold w-1/4'>Maggie: </p>
                        <p className='w-3/4'>Excellent read!</p>
                    </div>
                    <div className='w-full flex'>
                        <p className='font-bold w-1/4'>예나: </p>
                        <p className='w-3/4'>잘 읽었어요. 다음에 또 읽을게</p>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col space-y-3 pt-6">
                <h1 className='text-3xl font-semibold'>Leave a Comment:</h1>
                <input
                    {...register("_id")}
                    type="hidden"
                    name="_id"
                    value={id}
                />
                <label className='mb-5'>
                    <span>Name</span>
                    <input
                        type="text"
                        className='border-2 rounded p-2 block w-full'
                        {...register("name", { required: true })}
                    />
                </label>
                <label>
                    <span>Email</span>
                    <input
                        type="email"
                        className='border-2 rounded p-2 block w-full'
                        {...register("email", { required: true })}
                    />
                </label>
                <label>
                    <span>Comment</span>
                    <textarea 
                        className="border-2 rounded p-2 block w-full"
                        rows={6}
                        placeholder='Your comment here'
                        {...register("comment", { required: true })}
                    />
                </label>
                <button type="submit" className="w-full bg-green-400 rounded-md my-3 py-2">Post Comment</button>
                <div>
                    {errors.name && (
                        <p className='text-red-400 font-bold'>* Invalid Name</p>
                    )}
                    {errors.email && (
                        <p className='text-red-400 font-bold'>* Invalid Email</p>
                    )}
                    {errors.comment && (
                        <p className='text-red-400 font-bold'>* Invalid Comment</p>
                    )}
                </div>
            </form>
        </div>
    </div>
    )
  }