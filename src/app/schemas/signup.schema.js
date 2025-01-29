import * as Yup from 'yup';

let signUpSchema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    cpf: Yup.string().required('CPF é obrigatório'),
    password: Yup.string().required('Senha é obrigatória').min(6),
    confirmPassword: Yup.string().required('Confirmação de senha é obrigatória').min(6, "Senhas devem ter no mínimo 6 caracteres").oneOf([Yup.ref('password'), null], 'Senhas não conferem'),
    email: Yup.string().email('Email inválido.').required('Email é obrigatório'),
    phone: Yup.string().required('Telefone é obrigatório'),
    phoneType: Yup.string().required('Tipo de telefone é obrigatório'),
    logradouro: Yup.string().required('Rua é obrigatória'),
    cidade: Yup.string().required('Cidade é obrigatória'),
    bairro:Yup.string().required('Bairro é obrigatório'),
    estado: Yup.string().required('Estado é obrigatório'),
    zipCode: Yup.string().required(),
    complemento: Yup.string()

});

export default signUpSchema;