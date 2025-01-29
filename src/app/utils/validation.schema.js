import signUpSchema from "../schemas/signup.schema";

 const validate = async (values) => {
    try{
        await signUpSchema.validate(values, { abortEarly: false });
        return {};
    }catch(error) {
        const errors = {};
        if(error.inner && Array.isArray(error.inner)) {
            error.inner.forEach(err => {
                errors[err.path] = err.message;
            });
        } else{
            console.warn("erro na validação", error);
        }
        return  errors;
    }
}

export default validate;