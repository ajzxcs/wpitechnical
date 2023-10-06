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

export const signupSchema = yup.object().shape({
        fullName: yup.string()
                .matches(/^[a-zA-Z\s]+$/, "Letters and spaces only")
                .required("Fullname is required"),

        organization: yup.string()
                .required("Organization/Field is required"),

        contactNumber: yup.string()
                .matches(/^[0-9\s+]+$/, "Contact number must contain only digits")
                .min(10, "Contact number must be at least 10 digits and no spaces")
                .max(13, "Contact number can't exceed 12 digits and no spaces"),

        email : yup.string()
                .email("Incorrect email format")
                .required("Please fill out the email field"),

        password: yup.string()
                // .matches(passwordRules, { message: "Please create a stronger password" })
                .required("Please enter a password")
                .min(6,"Password should be 6 char long"),

        confirmPassword: yup.string()
                // .matches(passwordRules, { message: "Please create a stronger password" })
                .required("Please enter a password")
                .min(6,"Password should be 6 char long")
                .oneOf([yup.ref('password'), null], 'Passwords must match')
})



