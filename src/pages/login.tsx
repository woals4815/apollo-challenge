import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { Button } from "../components/button";
import { FormError } from "../components/form-error";
import { loginMutation, loginMutationVariables } from "../__generated__/loginMutation";

export const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, getValues, watch, errors, handleSubmit, formState } = useForm<ILoginForm>({
    mode: 'onChange'
  });
  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token}
    } = data;
    if (ok){
      if(token){
        localStorage.setItem('token', token);
        isLoggedInVar(Boolean(localStorage.getItem('token')));
        authTokenVar(token)
      }
    }
  }
  const [loginMutation, {data: loginMutationResult, loading}] = useMutation<loginMutation, loginMutationVariables>(LOGIN_MUTATION, {
    onCompleted
  });
  const onSubmit = () => {
    if(!loading){
      const {email, password} = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password
          }
        }
      });
    }
  }
  return (
    <div className="h-screen flex items-center mx-3 flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Login | Podcast</title>
      </Helmet>
      <div className='w-full max-w-screen-sm flex flex-col px-5 items-center'>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5 w-full mb-5">
          <input
            ref={register({ required: "email is required",
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          })}
            name="email"
            required
            type="email"
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          {errors.email?.type === "pattern" && (
            <FormError errorMessage={'Please enter a valid email'} />
          )}
          <input
            ref={register({ required: "Password is required" })}
            required
            name="password"
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 10 chars." />
          )}
          <Button 
            canClick={formState.isValid}
            loading={loading}
            actionText={'Log In'}
          />
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div>
          Don't have an account?
          <Link to='/create-account'>
            Create Account
          </Link>
        </div>
      </div>
      </div>
  );
};
