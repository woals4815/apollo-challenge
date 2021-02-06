import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import {myProfile} from '../__generated__/myProfile';
import {editProfile, editProfileVariables} from "../__generated__/editProfile";
import React, { useEffect } from 'react';
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
    const {data, loading, error ,refetch} = useQuery<myProfile>(USER);
    const { register, getValues, errors, handleSubmit, formState } = useForm<IEditForm>({
        mode: 'onChange',
    });
    const client = useApolloClient();
    const onCompleted = (editData: editProfile) => {
        console.log(editData?.editProfile.ok);
        const {
            editProfile: {
                ok
            }
        } = editData;
        if(ok && data){
            const {
                me: {
                    id, email: prvEmail
                }
            } = data;
            console.log('On Completeddddddd')
            const {email: newEmail} = getValues();
            console.log('here 1')
            if (prvEmail !== newEmail){
                console.log('here 2')
                client.writeFragment({
                    id: `User:${id}`,
                    fragment: gql`
                        fragment EditedUser on User {
                            email
                        }
                    `,
                    data: {
                        email: newEmail
                    },
                });
                console.log('done!!!!')
            }
        }  
    };
    const [editProfile, {data: editData, loading: editLoading}] = useMutation<editProfile, editProfileVariables>(EDIT_PROFILE, {
        onCompleted
    });
    const onSubmit =() => {
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
        <div className="bg-gray-800 w-screen h-screen flex flex-col items-center">
            <div className="py-16 mt-20">
                <span className="text-5xl text-white">My Profile</span>
            </div>
            <div className="flex flex-col border-white border-2 w-11/12 text-center h-1/3 justify-center items-center rounded-2xl relative">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
                    <div className="text-red-200 mb-2 flex flex-col">
                        <input ref={register({
                                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            })} 
                        type="email" 
                        name="email"
                        className="bg-gray-800 focus:outline-none"
                        defaultValue={data.me.email}                   
                        />
                        <input ref={register} name="password" type="password" placeholder="Password" className="bg-gray-800 focus:outline-none"/>
                    </div>
                    <div className={`${!editLoading? "bg-red-200": "bg-gray-300 pointer-events-none"} w-14 rounded-3xl absolute bottom-4`}>
                        <button className="focus:outline-none">Edit</button>
                    </div>
                </form>
                <span className="text-red-200 mb-2 pr-16 mr-1">Role: {data.me.role}</span>
            </div>
        </div>
    )
}