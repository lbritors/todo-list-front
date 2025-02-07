import * as yup from 'yup';

let loginSchema = yup.object().shape({
    cpf: yup.string().required('CPF é obrigatório'),
    password: yup.string().required().min(6),
});

export default loginSchema;