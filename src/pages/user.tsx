import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
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
      const client = useApolloClient();
      const onCompleted = (editData: editProfile) => {
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
              const {email: newEmail} = getValues();
              if (prvEmail !== newEmail){
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
              }
          }   
      };
    const [editProfile, {data: editData, loading: editLoading}] = useMutation<editProfile, editProfileVariables>(EDIT_PROFILE, {
        onCompleted
    });
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
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
                    <div className="text-red-200 mb-2">
                        <input ref={register({
                                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            })} 
                        type="email" 
                        name="email"
                        className="bg-gray-800 focus:outline-none"
                        />
                        <input ref={register} name="password" type="password" placeholder="Password" className="bg-gray-800 focus:outline-none"/>
                    </div>
                    <div className="bg-red-200 w-14 rounded-3xl absolute bottom-4">
                        <button className="focus:outline-none">Edit</button>
                    </div>
                </form>
                <span className="text-red-200 mb-2">Role: {data.me.role}</span>
                <div className="text-red-200 flex flex-col">
                    Subscription
                    {data.me.subsriptions.map(subscript => (
                    <span className="text-red-200 text-xs"> {subscript.title}{" "} </span>
                    ))}
                </div>
            </div>
        </div>
    )
}