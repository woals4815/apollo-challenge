import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import {UserRole} from '../__generated__/globalTypes'
import {createAccountMutation, createAccountMutationVariables} from '../__generated__/createAccountMutation'
import { Link, useHistory } from "react-router-dom";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { Helmet } from "react-helmet-async";

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!){
    createAccount(input: $createAccountInput){
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}


export const CreateAccount = () => {
  const {register, getValues, handleSubmit, formState, errors} = useForm<ICreateAccountForm>({
    mode: 'onChange',
    defaultValues: {
      role: UserRole.Listener
    }
  });
  const history = useHistory();
  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok }
    } = data;
    if(ok){
      alert('Complete! Go to Login page.');
      history.push('/')
    }
  }
  const [createAccountMutation, 
    {loading, data: createAccountMutationResult
    }] = useMutation<
    createAccountMutation, 
    createAccountMutationVariables
    >(CREATE_ACCOUNT_MUTATION, {onCompleted});
  const onSubmit = () => {
    if(!loading){
      const { email, password, role } = getValues();
      createAccountMutation({
        variables: {
          createAccountInput: {email, password, role}
        }
      });
    }
  };
  return (
  <div className="h-screen flex items-center mx-3 flex-col mt-10 lg:mt-28">
    <Helmet>
      <title>Create Account | Podcast</title>
    </Helmet>
    <div className=" w-full max-w-screen-sm flex flex-col items-center">
      <form
        onSubmit = {handleSubmit(onSubmit)}
        className="grid gap-3 mt-5 w-full mb-5"
      >
        <input 
          ref={register({
            required: 'Email is required',
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          })}
          name="email"
          required
          type="email"
          placeholder="Email"
          className='input'
        />
        {errors.email?.message &&(
          <FormError errorMessage= {errors.email?.message} />
        )}
        {errors.email?.type === 'pattern' && (
          <FormError errorMessage={'Please enter a valid email'} />
        )}
        <input 
          ref={register({
            required: 'Password is required'
          })}
          required
          name='password'
          type='password'
          placeholder="Password"
          className='input'
        />{
          errors.password?.message &&(
            <FormError errorMessage = {errors.password.message} />
          )
        }
        <select
          name='role'
          ref={register({
            required: true
          })}
          className='justify-self-center text-lg my-5 text-blue-600'
        >
          {Object.keys(UserRole).map((role, index) => (
            <option key={index}>{role}</option>
          ))}
        </select>
        <Button 
          canClick = {formState.isValid}
          loading={loading}
          actionText={"Create Account"}
        />
        {createAccountMutationResult?.createAccount.error && (
          <FormError errorMessage={createAccountMutationResult.createAccount.error} />
        )}
      </form>
      <div>
        Already have an account?{" "}
        <Link to="/">
          Login now
        </Link>
      </div>
    </div>
    </div>
  )
};
