"use client";

import { Button, FormControl, FormGroup, TextField } from "@mui/material";
import Header from "./_components/Header";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
export default function Home() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useRouter();

	function onSubmit(e) {
		e.preventDefault();
		const data = {
			email,
			password,
		};
		console.log(data);
		navigate.push("/signup");
		const response = axios
			.post("/login", data)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<Header />
			<div className="flex flex-col items-center justify-center w-[500px] flex-1 px-20 text-center gap-4">
				<h1 className="text-4xl font-bold text-gray-800">Login</h1>
				<FormGroup onSubmit={onSubmit} className="flex flex-col">
					<FormControl className="flex flex-col space-y-4">
						<TextField
							label="Email"
							variant="outlined"
							value={email}
							onChange={(e) => setEmail(e.target.value)}></TextField>

						<TextField
							label="Password"
							variant="outlined"
							value={password}
							onChange={(e) => setPassword(e.target.value)}></TextField>

						<p>
							Não tem conta? <Link href="/signup">Cadastre-se</Link>
						</p>
						<Button type="submit" onClick={onSubmit}>
							Login
						</Button>
					</FormControl>
				</FormGroup>
			</div>
		</div>
	);
}
