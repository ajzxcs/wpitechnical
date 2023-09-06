import * as yup from "yup"

// export const addOrderSchema = yup.object().shape({
//     name: yup.string().required(),
//     email : yup.string().email(),
//     location : yup.string().required(),
//     purchase : yup.string().required()
// })


// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

//Email and password validation
export const userSchema = yup.object().shape({
    email : yup.string()
            .email("Incorrect email format")
            .required("Please fill out the email field"),

    password: yup.string()
            // .matches(passwordRules, { message: "Please create a stronger password" })
            .required("Please enter a password")
            .min(6,"Password should be 6 char long")
});


