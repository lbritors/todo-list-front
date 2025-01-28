import * as yup from 'yup';

let loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
});

export default loginSchema;