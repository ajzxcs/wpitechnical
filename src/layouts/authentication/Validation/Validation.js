import * as yup from "yup"

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

export const passwordUpdates = yup.object().shape({
        oldPassword : yup.string()
                .required("Please enter your old password")
                .min(6,"Password should be 6 char long"),
        newPassword: yup.string()
                // .matches(passwordRules, { message: "Please create a stronger password" })
                .required("Please enter your new password")
                .min(6,"Password should be 6 char long")
    });