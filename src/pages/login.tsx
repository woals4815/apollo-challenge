import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { isLoggedInVar } from "../apollo";
import { FormError } from "../components/form-error";
import { loginMutation, loginMutationVariables } from "../__generated__/loginMutation";

const LOGIN_MUTATION = gql`
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
  resultError?: string;
}

export const Login = () => {
  const { register, getValues, watch, errors, handleSubmit } = useForm<ILoginForm>();
  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token}
    } = data;
    if (ok){
      if(token){
        localStorage.setItem('token', token);
        isLoggedInVar(Boolean(localStorage.getItem('token')));
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
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            ref={register({ required: "email is required" })}
            name="email"
            required
            type="email"
            placeholder="Email"
            className="input"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
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
          <button className="mt-3 btn">
            {loading ? "Loading..." : "Log In"}
          </button>
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
      </div>
    </div>
  );
};
