import { gql, useMutation, useQuery } from '@apollo/client';
import {myProfile} from '../__generated__/myProfile';
import {editProfile, editProfileVariables} from "../__generated__/editProfile";
import React from 'react';
import { useForm } from 'react-hook-form';

const USER = gql`
    query myProfile{
        me{
            id
            email
            password
            role
            subsriptions{
                id
                title
            }
        }
    }
`;

const EDIT_PROFILE = gql`
    mutation editProfile($input: EditProfileInput!){
        editProfile(input: $input){
            error
            ok
        }
    }
`;

interface IEditForm {
    email?: string;
    password?: string;
}

export const User = () => {
    const {data, loading, error} = useQuery<myProfile>(USER);
    const { register, getValues, watch, errors, handleSubmit, formState } = useForm<IEditForm>({
        mode: 'onChange',
        defaultValues: {
            email: data?.me.email,
          },
      });
    const [editProfile, {data: editData, loading: editLoading}] = useMutation<editProfile, editProfileVariables>(EDIT_PROFILE);
    const onSubmit = () => {
        const { email, password } = getValues();
        editProfile({
            variables: {
                input: {
                    email,
                    ...(password !== "" && { password }),
                }
            }
        })
    }
    if(!data || loading || error) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span className="font-medium text-xl tracking-wide">Loading...</span>
            </div>
        );
    }  
    return (
        <div className="bg-gray-800 w-screen h-screen flex flex-col items-center justify-center">
            <div className="flex flex-col border-white border-2 w-11/12 text-center h-1/3 justify-center items-center rounded-2xl relative">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-red-200 mb-2">
                        Email:{" "}
                        <input ref={register({
                                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            })} 
                        type="email" 
                        name="email"
                        value={data.me.email}
                        className="bg-gray-800 focus:outline-none"
                        />
                    </div>
                    <span className="text-red-200 mb-2">Role: {data.me.role}</span>
                    <div className="text-red-200">
                        Subscription:
                        {data.me.subsriptions.map(subscript => (
                        <span className="text-red-200"> {subscript.title}{" "} </span>
                        ))}
                    </div>
                    <div className="bg-red-200 w-14 rounded-3xl absolute bottom-4">
                        <button className="focus:outline-none">Edit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}