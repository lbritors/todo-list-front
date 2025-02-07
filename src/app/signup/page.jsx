"use client";

import React, { useState } from "react";
import { Card } from "@mui/material";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import signUpSchema from "../schemas/signup.schema";
import axios from "axios";
import { useRouter } from "next/navigation";
import api from "../utils/api";

export default function InvalidStateDemo() {

  const phoneTypes = ["celular", "comercial", "residencial"];
  const [phoneType, setPhoneType] = useState("celular");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      cpf: "",
      password: "",
      confirmPassword: "",
      email: "",
      phone: "",
      phoneType: "celular",
      estado:  "",
      cidade: "",
	  logradouro: "",
      bairro: "",
      zipCode: "",
      complemento: "",
    }, 
    onSubmit: async (values) => {
		try{
			await signUpSchema.validate(values, { abortEarly: false });
      const response = {
        name: values.name,
        cpf: validateData(values.cpf),
        password: values.password,
        address: {
          zipCode: validateData(values.zipCode),
          state: values.estado,
          city: values.cidade,
          district: values.bairro,
          street: values.logradouro,
          complement: values.complemento
        },
        email: [{email: values.email}],
        phone: [{phone: validateData(values.phone), type: phoneType}],

      }
		
      await api.post("/user", response);
      router.push("/")

		}catch(error) {
			console.error("Validation Error:", error);
		}  
    },
  });

  
async function fetchAddress(cep) {
  const zipCodeTratado = validateData(cep);
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${zipCodeTratado}/json/`);
    if(!response.data.erro) {
      formik.setValues({
        ...formik.values,
        estado: response.data.uf || "",
        cidade: response.data.localidade || "",
        bairro: response.data.bairro || "",
        logradouro: response.data.logradouro || "",
        complemento: response.data.complemento || "",
      });
    }else {
      formik.setValues({
        ...formik.values,
        estado: "",
        cidade: "",
        bairro: "",
        logradouro: "",
        complemento: "",
      });
    }

  } catch (error) {
    console.error("Error fetching address:", error);
    formik.setValues({
      ...formik.values,
      estado: "",
      cidade: "",
      bairro: "",
      logradouro: "",
      complemento: "",
    });
  }
}


  function validateData(mask) {
    return mask.replace(/\D/g, "");
   
  }

  const handlePhoneTypeChange = (e) => {
	setPhoneType(e.value);
	formik.setFieldValue("phoneType", e.value);
};
  

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) =>
    isFormFieldValid(name) && (
      <small className="p-error">{formik.errors[name]}</small>
    );

  return (
    <Card className="flex mt-28 p-6 flex-col items-center justify-center rounded-xl w-5/6 min-h-screen bg-red-100">
      <h5 className="text-4xl font-bold">Sign Up</h5>
      <div className="flex items-center rounded-lg w-2/3 justify-center min-h-screen">
        <form onSubmit={formik.handleSubmit}
          className="flex flex-col ml-10 justify-center items-center w-2/3 card gap-10"
        >
          <div className="flex flex-col items-center justify-center card border-zinc-400 w-full">
            <div className="field mt-3 w-[500px]">
              <label htmlFor="name">Name</label>
              <InputText
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full ${isFormFieldValid("name") ? "p-invalid" : ""}`}
              />
              {getFormErrorMessage("name")}
            </div>

            <div className="field mt-3 w-[500px]">
              <label htmlFor="cpf">CPF</label>
              <InputMask
                id="cpf"
                name="cpf"
                mask="999.999.999-99"
                value={formik.values.cpf}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full ${isFormFieldValid("cpf") ? "p-invalid" : ""}`}
              />
              {getFormErrorMessage("cpf")}
            </div>

            <div className="field mt-3 w-[500px]">
              <label htmlFor="email">Email</label>
              <InputText
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full ${isFormFieldValid("email") ? "p-invalid" : ""}`}
              />
              {getFormErrorMessage("email")}
            </div>

            <div className="field mt-3 w-[500px]">
              <label htmlFor="password">Senha</label>
              <Password
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full ${
                  isFormFieldValid("password") ? "p-invalid" : ""
                }`}
              />
              {getFormErrorMessage("password")}
            </div>

            <div className="field mt-3 w-[500px]">
              <label htmlFor="confirmPassword">Confirme a senha</label>
              <Password
                id="confirmPassword"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full ${
                  isFormFieldValid("confirmPassword") ? "p-invalid" : ""
                }`}
              />
              {getFormErrorMessage("confirmPassword")}
            </div>
          </div>

          <div className="field mt-3 w-[500px]">
              <label htmlFor="phoneType">Tipo</label>
              <Dropdown
                id="phoneType"
                options={phoneTypes}
                value={formik.values.phoneType}
                onChange={handlePhoneTypeChange}
                className="w-full"
              />
            </div>

          <div className="flex flex-col justify-center items-center card w-full">
            <div className="flex field mt-3 w-[500px]">
              <label htmlFor="phone">Telefone</label>
              <InputMask
                id="phone"
                name="phone"
                mask={
                  phoneType === "celular" ? "(99) 99999-9999" : "(99) 9999-9999"
                }
                value={formik.values.phone}
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.setFieldValue("phoneType", phoneType);
                }}
                onBlur={formik.handleBlur}
                className={`w-full ${isFormFieldValid("phone") ? "p-invalid" : ""}`}
              />
              {getFormErrorMessage("phone")}
            </div>

           

            {/* CEP, Estado, Cidade, Bairro e Complemento */}
            <div className="field mt-3 w-[500px]">
              <label htmlFor="zipCode">CEP</label>
              <InputMask
                id="zipCode"
                name="zipCode"
                mask="99999-999"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
                onBlur={() => fetchAddress(formik.values.zipCode)}
                className={`w-full ${isFormFieldValid("zipCode") ? "p-invalid" : ""}`}
              />
              {getFormErrorMessage("zipCode")}
            </div>

            {["estado", "cidade", "bairro", "logradouro", "complemento"].map((field) => (
              <div key={field} className="field mt-3 w-[500px]">
                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <InputText
                  id={field}
                  name={field}
                  value={formik.values[field]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full ${isFormFieldValid(field) ? "p-invalid" : ""}`}
                />
                {getFormErrorMessage(field)}
              </div>
            ))}
          </div>

          <Button
            className="bg-gray-800 text-white w-52 items-center justify-center mb-20 h-8"
            type="submit"
			label="Enviar"
          />
        </form>
      </div>
    </Card>
  );
}
