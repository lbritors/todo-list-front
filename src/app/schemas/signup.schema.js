import * as Yup from 'yup';

let signUpSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    cpf: Yup.string().required('CPF é obrigatório'),
    password: Yup.string().required('Senha é obrigatória').min(6),
    confirmPassword: Yup.string().required('Confirmação de senha é obrigatória').min(6).oneOf([Yup.ref('password'), null], 'Senhas não conferem'),
    // emails: yup.array().of(yup.object().shape({
    //     email: yup.string().email('Email inválido.').required('Email é obrigatório').min(1),
    // })),
    // phones: yup.array().of(yup.object().shape({
    //     phone: yup.string().required('Telefone é obrigatório').min(1).matches(/^\d{10,11}$/, 'Telefone inválido'),
    //     phoneType: yup.string().required('Tipo de telefone é obrigatório').min(1),
    // })),
    // street: yup.string().required('Rua é obrigatória'),
    // city: yup.string().required('Cidade é obrigatória'),
    // district: yup.string().required('Bairro é obrigatório'),
    // state: yup.string().required('Estado é obrigatório'),
    // zipCode: yup.string().required().matches(/^\d{8}$/, 'CEP inválido'),
    // complement: yup.string().optional(),

});

export default signUpSchema;