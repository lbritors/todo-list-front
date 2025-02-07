"use client";

import { Button, Card, FormControl, FormGroup, TextField } from "@mui/material";
import Header from "./_components/Header";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useFormik } from "formik";
import loginSchema from "./schemas/login.schema";
import { InputMask } from "primereact/inputmask";
import { Password } from "primereact/password";
import api from "./utils/api";
export default function Home() {

	const formik = useFormik({
		initialValues: {
			cpf: "",
			password: "",
		},
		onSubmit: async (values) => {
			try {
				await loginSchema.validate(values, { abortEarly: false });
				const response = {
					cpf: validateData(values.cpf),
					password: values.password,
				};
				const result = await api.post("/auth/user", response);
				console.log(result.data);
			} catch (error) {
				console.error(error);
			}
		},
	});

	const isFormFieldValid = (name) =>
		!!(formik.touched[name] && formik.errors[name]);
	function validateData(mask) {
		return mask.replace(/\D/g, "");
	}

	const getFormErrorMessage = (name) =>
		isFormFieldValid(name) && (
		  <small className="p-error">{formik.errors[name]}</small>
		);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<Header />
			<div className="flex flex-col items-center justify-center w-[500px] flex-1 px-20 text-center gap-4">
				<h1 className="text-4xl font-bold text-gray-800">Login</h1>
				<Card
					onSubmit={formik.handleSubmit}
					className="flex flex-col rounded-xl min-w-[400px] h-96 justify-center items-center p-8  bg-red-100">
					<form className="flex flex-col justify-center items-center w-full card">	
						<div className="field mt-3  w-min-[500px]">
							<label htmlFor="cpf">CPF</label>
							<InputMask
							
								id="cpf"
								name="cpf"
								mask="999.999.999-99"
								value={formik.values.cpf}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className={`w-full h-10${
									isFormFieldValid("cpf") ? "p-invalid" : ""
								}`}
							/>
							{getFormErrorMessage("cpf")}
						</div>
						<div className="flex justify-center items-center field mt-3 flex-col w-min-[500px]">
							<label htmlFor="password">Senha</label>
							<Password
								id="password"
								name="password"
								value={formik.values.password}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className={`w-full  h-10${
									isFormFieldValid("password") ? "p-invalid" : ""
								}`}
							/>
							{getFormErrorMessage("password")}
						</div>

						<div>
							<p>
								Não tem conta? <Link href="/signup">Cadastre-se</Link>
							</p>
							<Button type="submit">Login</Button>
						</div>
					</form>
				</Card>
			</div>
		</div>
	);
}
