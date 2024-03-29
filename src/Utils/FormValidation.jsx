// formValidation.js

export const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};



export const isValidPhoneNumber = (mobileNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(mobileNumber);
};

export const isValidPassword = (password) => {
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    return (
        password.length >= 8 &&
        symbolRegex.test(password) &&
        numberRegex.test(password) &&
        upperCaseRegex.test(password) &&
        lowerCaseRegex.test(password)
    );
};

export const validateForm = (formData) => {
    let errors = {};

    if (!formData.organisationName) {
        errors.organisationName = "Company name is required";
    }
    if (!formData.name) {
        errors.name = "Name is required";
    }
    if (!formData.email) {
        errors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
        errors.email = "Invalid email format";
    }
    if (!formData.mobileNumber) {
        errors.mobileNumber = "Mobile number is required";
    } else if (!isValidPhoneNumber(formData.mobileNumber)) {
        errors.mobileNumber = "Invalid mobile number format";
    }
    if (!formData.password) {
        errors.password = "Password is required";
    } else if (!isValidPassword(formData.password)) {
        errors.password = "Password is not secure";
    }
    if (!formData.confirmPassword) {
        errors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    return errors;
};
