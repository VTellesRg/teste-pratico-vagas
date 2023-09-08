'use client';

import React from 'react';
import { ProductType } from './types/ProductType';
import { api } from './utils/api';
import { useEffect, useRef, useState } from 'react';

const Page = () => {

	const fileInputRef = useRef<HTMLInputElement>(null);

	const [isValidate, setIsValidate] = useState(false);
	const [action, setAction] = useState('Validando...');

	const dt: ProductType[] = [
		{ valid_from: 'OK', code: 16, name: 'AZEITE  PORTUGUÊS EXTRA VIRGEM GALLO 500ML', cost_price: 18.44, sales_price: 20.49 },
		{ valid_from: 'OK', code: 18, name: 'BEBIDA ENERGÉTICA VIBE 2L', cost_price: 8.09, sales_price: 8.99 },
		{ valid_from: 'OK', code: 19, name: 'ENERGÉTICO  RED BULL ENERGY DRINK 250ML', cost_price: 6.56, sales_price: 7.29 },
		{ valid_from: 'erro a', code: 20, name: 'ENERGÉTICO RED BULL ENERGY DRINK 355ML', cost_price: 9.71, sales_price: 10.79 },
		{ valid_from: 'OK', code: 21, name: 'BEBIDA ENERGÉTICA RED BULL RED EDITION 250ML', cost_price: 10.71, sales_price: 11.71 },
		{ valid_from: 'OK', code: 22, name: 'ENERGÉTICO  RED BULL ENERGY DRINK SEM AÇÚCAR 250ML', cost_price: 6.74, sales_price: 7.49 },
		{ valid_from: 'OK', code: 23, name: 'ÁGUA MINERAL BONAFONT SEM GÁS 1,5L', cost_price: 2.15, sales_price: 2.39 },
		{ valid_from: 'OK', code: 24, name: 'FILME DE PVC WYDA 28CMX15M', cost_price: 3.59, sales_price: 3.99 },
		{ valid_from: 'OK', code: 26, name: 'ROLO DE PAPEL ALUMÍNIO WYDA 30CMX7,5M', cost_price: 5.21, sales_price: 5.79 },
		{ valid_from: 'OK', code: 1000, name: 'BEBIDA ENERGÉTICA VIBE 2L - 6 UNIDADES', cost_price: 48.54, sales_price: 53.94 },
		{ valid_from: 'OK', code: 1010, name: 'KIT ROLO DE ALUMINIO + FILME PVC WYDA', cost_price: 8.80, sales_price: 9.78 },
		{ valid_from: 'OK', code: 1020, name: 'SUPER PACK RED BULL VARIADOS - 6 UNIDADES', cost_price: 51.81, sales_price: 57.00 },
	];
	const [data, setData] = useState<ProductType[] | null>(null);
	const [loading, setLoading] = useState(false);

	const handleUploadFile = async () => {
		if (fileInputRef.current?.files && fileInputRef.current?.files?.length > 0) {
			if (fileInputRef.current.files[0].size > 1000000) {
				alert('O arquivo deve ter no máximo 1MB');
				return;
			}

			setLoading(true);

			const file = fileInputRef.current.files[0];
			const formData = new FormData();

			formData.append('file', file);
			try {
				const response = await api.post('/api/upload', file);
				console.log(response);
			} catch (error) {
				console.log(error); //falta tratar erros
			} finally {

				//remover
				setData(dt);
				setIsValidate(true);
				
				setTimeout(() => {
					setLoading(false);
					setAction('Atualizando...');
				}, 2000);
			}
		}
	}

	const handleUpdate = async () => {
		setLoading(true);
		try {
			const response = await api.get('/update');
			console.log(response);
			setData(response.data);
			setIsValidate(true);
			setData(null);
		} catch (error) {
			console.log(error); //falta tratar erros
		} finally {
			setData(null);
			setIsValidate(false);
			setTimeout(() => {
				setLoading(false);
				setAction('Validando...');
			}, 2000);
		}
	}

	return (
		< div className="max-w-md mx-auto overflow-hidden md:max-w-3xl p-5" >
			{loading &&
				<div className="flex justify-center items-center">
					<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
					<h1 className="text-1xl font-bold text-gray-900 absolute">{action}</h1>
				</div>
			}
			{!loading &&
				<div className="max-w-md flex-column gap-3 rounded-md border-2 border-dotted border-white px-3 py-3">
					<input type="file" ref={fileInputRef} accept=".xls" />
					<button onClick={handleUploadFile} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">VALIDAR</button>
				</div>
			}
			{!loading && data &&
				<div className="flex flex-col mt-5">
					<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
							<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
								<table className="min-w-full divide-y divide-gray-200">
									<thead className="bg-gray-50">
										<tr>
											<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Código
											</th>
											<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Nome
											</th>
											<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Preço de custo
											</th>
											<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Preço de venda
											</th>
											<th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
												Validação
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{data.map((item, index) => (
											<tr key={index}>
												<td className="px-4 py-2 whitespace-nowrap">
													<div className="text-xs text-gray-900">{item.code}</div>
												</td>
												<td className="px-4 py-4 whitespace-nowrap">
													<div className="text-xs text-gray-900">{item.name}</div>
												</td>
												<td className="px-4 py-4 whitespace-nowrap">
													<div className="text-xs text-gray-900">{item.cost_price}</div>
												</td>
												<td className="px-4 py-4 whitespace-nowrap">
													<div className="text-xs text-gray-900">{item.sales_price}</div>
												</td>
												<td className="px-4 py-4 whitespace-nowrap">
													<div className="text-xs text-gray-900">{item.valid_from !== 'OK' ?
														<span className="inline-block whitespace-nowrap rounded-full bg-red-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-red-700"> {item.valid_from} </span> :
														<span className="inline-block whitespace-nowrap rounded-full bg-green-100 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-green-700"> OK </span>}
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			}

			{
				!loading && isValidate &&
				<div className="flex flex-col mt-5">
					<div className="flex flex-col gap-3 rounded-md border-2 border-dotted border-white px-3 py-3">
						<button onClick={() => handleUpdate()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">ATUALIZAR</button>
					</div>
				</div>
			}
		</div >
	)
};


export default Page;