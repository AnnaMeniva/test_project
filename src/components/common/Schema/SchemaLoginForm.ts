import * as Yup from 'yup';

const SchemaLoginForm = Yup.object().shape({
    email: Yup.string().max(250).email("Please enter a valid emaeil").required("Required"),
    password: Yup.string().required("Required")
})

export default SchemaLoginForm;
