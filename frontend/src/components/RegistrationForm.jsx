import { useState } from "react"
import { useLogin } from "../contexts/UserContext"
import { Button } from "./Button"
import { useNavigate } from "react-router-dom"
import { FormProvider, useForm } from "react-hook-form"

import styled from "styled-components"

export const RegistrationForm = () => {
  // Set starting point for handling user data

  // This method gives access to different form hooks
  const methods = useForm()
  const { registerUser } = useLogin()
  const [errorMessage, setErrorMessage] = useState("")

  // Destructes register, handleSubmit and errors from useForm
  const {
    register, // validation and tracking
    handleSubmit, // function that will run when the form is submitted
    formState: { errors }, // object with validation errors for each input field
  } = methods

  const navigate = useNavigate()

  // Send the request to /users with the updated form data
  const onSubmit = async (data) => {
    const { password, confirmPassword } = data

    // Check if password is correct
    if (password !== confirmPassword) {
      // Add error message and return;
      setErrorMessage("The passwords are not identical")
      return
    }

    // Send code to backend -> do some stuff using try and catch
    try {
      await registerUser(data)

      // Redirect to login page
      navigate("/spela")
    } catch (err) {
      console.error("Error registration user", err)
    }
  }

  return (
    <RegistrationContainer>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* inaktiverar webbläsarens validering */}
          <Heading>Registrera dig</Heading>
          <label>
            <Input
              type="text"
              placeholder="Användarnamn"
              {...register("username", {
                required: "Användarnamn krävs.",
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message:
                    "Användarnamn får endast innehålla bokstäver, siffror och understreck",
                },
              })}
            />
            {errors.username && (
              <ErrorMessage>{errors.username.message}</ErrorMessage>
            )}
          </label>
          <label>
            <Input
              type="text"
              placeholder="Förnamn"
              {...register("firstName", {
                required: "Förnamn krävs",
                pattern: {
                  value: /^[a-zA-Z]+$/,
                  message: "Förnamn får endast innehålla bokstäver",
                },
              })}
            />
            {errors.firstName && (
              <ErrorMessage>{errors.firstName.message}</ErrorMessage>
            )}
          </label>
          <label>
            <Input
              type="text"
              placeholder="Efternamn"
              {...register("lastName", {
                required: "Efternamn krävs",
                pattern: {
                  value: /^[a-zA-Z]+$/,
                  message: "Efternamn får endast innehålla bokstäver",
                },
              })}
            />
            {errors.lastName && (
              <ErrorMessage>{errors.lastName.message}</ErrorMessage>
            )}
          </label>
          <label>
            <Input
              type="text"
              placeholder="Ålder"
              {...register("age", {
                required: "Ålder krävs",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Ålder måste vara ett nummer",
                },
              })}
            />
            {errors.age && <ErrorMessage>{errors.age.message}</ErrorMessage>}
          </label>
          <label>
            <Input
              type="email"
              placeholder="E-post"
              {...register("email", {
                required: "E-post krävs",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Ogiltig e-postadress",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </label>
          <label>
            <Input
              type="password"
              placeholder="Lösenord"
              {...register("password", {
                required: "Lösenord krävs",
                minLength: {
                  value: 8,
                  message: "Lösenordet måste vara minst 8 tecken långt",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
                  message:
                    "Lösenordet måste innehålla minst en stor bokstav, en liten bokstav och en siffra",
                },
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </label>
          <label>
            <Input
              type="password"
              placeholder="Bekräfta lösenord"
              {...register("confirmPassword", {
                required: "Bekräfta lösenord krävs",
              })}
            />
            {errors.confirmPassword && (
              <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
            )}
          </label>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <Button type="submit">Registrera</Button>
        </Form>
      </FormProvider>
    </RegistrationContainer>
  )
}

const RegistrationContainer = styled.div`
  border-radius: 20px;
  max-width: fit-content;
  height: fit-content;
  padding-top: 80px;
  margin: 0 auto;

  @media (min-width: 700px) {
    padding-top: 50px;
  }
`

const Heading = styled.h1`
  color: white;
  text-align: center;
  margin-top: 0;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: var(--ocean);
  border-radius: 20px;

  @media (min-width: 700px) {
    padding: 2rem 2.5rem;
  }
`

const Input = styled.input`
  border-radius: 20px;
  padding: 10px 30px;
  border: none;
  background-color: white;
`

const ErrorMessage = styled.div`
  color: #fff;
  font-size: 13px;
`
