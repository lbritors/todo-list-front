"use client";

import { Card } from "@mui/material";

import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Password } from "primereact/password";
import { useEffect, useState, useRef } from "react";

export default function InvalidStateDemo() {
	const [name, setName] = useState("");
	const [cpf, setCpf] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [state, setState] = useState("");
	const [city, setCity] = useState("");
	const [district, setDistrict] = useState("");
	const [type, setType] = useState(0);
	const [complement, setComplement] = useState("");
	const [zipCode, setZipCode] = useState("");

	const phoneTypes = ["celular", "comercial", "residencial"];
	const steps = [
		{
			label: "Dados pessoais",
		},
		{
			label: "Endereço",
		},
		{
			label: "Finalizar",
		},
	];

	return (
		<Card className="flex mt-28 p-6 flex-col items-center justify-center rounded-xl w-5/6 min-h-screen bg-red-100">
			<h5 className="text-4xl font-bold">Sign Up</h5>
			<div className="flex items-center rounded-lg w-2/3 justify-center min-h-screen">
				<form className="flex flex-col ml-10 justify-center items-center w-2/3 card gap-10">
					<h2 className="Dados pessoais"> </h2>
					<div className="flex flex-col items-center justify-center card border-zinc-400 w-full">
						<div className="field mt-3 w-[500px]">
							<label htmlFor="inputtext">Name</label>
							<InputText
								className="w-full"
								type="text"
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="field mt-3 w-[500px]">
							<label htmlFor="inputmask">CPF</label>
							<InputMask
								className="w-full"
								id="cpf"
								mask="999.999.999-99"
								value={cpf}
								onChange={(e) => setCpf(e.value ?? "")}
							/>
						</div>
						<div className="field mt-3 w-[500px]">
							<label htmlFor="email">Email</label>
							<InputText
								className="w-full"
								inputId="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="field mt-3 w-[500px]">
							<label htmlFor="password">Senha</label>
							<Password
								className="w-full"
								inputId="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="field mt-3 w-[500px] ">
							<label htmlFor="password">Confirme senha</label>
							<Password
								className="w-full"
								inputId="confirm-password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</div>
					</div>

					<div className="flex flex-col justify-center items-center  card w-full">
						<div className="flex field mt-3 w-[500px]">
							<label htmlFor="inputnumber">Telefone</label>
							<InputMask
								className="w-full"
								id="inputnumber"
								value={phone}
								mask={
									type === "celular" ? "(99) 9 9999-9999" : "(99) 9999-9999"
								}
								onValueChange={(e) => setPhone(e.target.value ?? 0)}
							/>
							<label htmlFor="tipo">Tipo</label>
							<Dropdown
								className="w-full"
								id="dropdown"
								options={phoneTypes}
								value={type}
								onChange={(e) => setType(e.value)}
								optionLabel="name"
							/>
						</div>
						<div className="field mt-3 w-[500px]">
							<label htmlFor="inputmask">CEP</label>
							<InputMask
								className="w-full"
								id="cep"
								mask="99999-999"
								value={zipCode}
								onChange={(e) => setZipCode(e.value ?? "")}
							/>
							<div className="field mt-3 w-[500px]">
								<label htmlFor="text">Estado</label>
								<InputText
									className="w-full"
									id="stete"
									value={state}
									onChange={(e) => setState(e.target.value)}
									optionLabel="name"
								/>
							</div>
							<div className="field mt-3 w-[500px]">
								<label htmlFor="text">Cidade</label>
								<InputTextarea
									className="w-full"
									id="text"
									value={city}
									onChange={(e) => setCity(e.target.value)}
								/>
							</div>
							<div className="field mt-3 w-[500px]">
								<label htmlFor="text">Bairro</label>
								<InputTextarea
									className="w-full"
									id="text"
									value={district}
									onChange={(e) => setDistrict(e.target.value)}
								/>
							</div>
							<div className="field mt-3 w-[500px]">
								<label htmlFor="text">Complemento</label>
								<InputTextarea
									className="w-full"
									id="text"
									value={complement}
									onChange={(e) => setComplement(e.target.value)}
								/>
							</div>
						</div>
					</div>
					<Button
						className="bg-gray-800 text-white w-52 items-center justify-center mb-20 h-8"
						outlined
						type="submit"
						label="Finalizar"
					/>
				</form>
			</div>
		</Card>
	);
}
