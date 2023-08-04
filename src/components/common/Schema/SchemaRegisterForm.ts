import * as Yup from 'yup';

const SchemRegisterForm = Yup.object().shape({
    fullName: Yup.string().max(200, 'Username must not exceed 200 characters')
    .matches(/^[a-z]/, 'Please enter valid name').min(1,'Fullname must be at least 6 characters').required('Fullname is required'),
    email: Yup.string().max(250, 'Email must not exceed 250 characters')
            .email('Please enter a valid emaeil').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 10 characters')
            .max(40, 'Password must not exceed 30 characters').required('Password is required')
            .matches(
                /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}(?=.*[0-9]){1}).*$/,
                'Password must contain at least 8 characters, one uppercase, one number and one special case character')
})

export default SchemRegisterForm;
