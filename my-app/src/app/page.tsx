'use client';

import { ProductType, ProductTypeUpdate } from './types/ProductType';
import { api } from './utils/api';
import { useRef, useState } from 'react';

const Page = () => {

	const fileInputRef = useRef<HTMLInputElement>(null);

	const [isValidate, setIsValidate] = useState(false);
	const [loading, setLoading] = useState(false);
	const [action, setAction] = useState('Validando...');


	const [data, setData] = useState<ProductType[] | []>([]);

	const handleUploadFile = async () => {
		if (fileInputRef.current?.files && fileInputRef.current?.files?.length > 0) {

			setLoading(true);

			const file = fileInputRef.current.files[0];
			const formData = new FormData();

			formData.append('file', file);
			try {
				const response = await api.post('/api/upload/', formData);
				setData(response.data);
				if (response.data.length > 0) {
					setIsValidate(true);
					response.data.forEach((item: { valid_from: string; }) => {
						if (item.valid_from !== 'OK') {
							setIsValidate(false);
						}
					});
				}

			} catch (error) {
			} finally {

				setTimeout(() => {
					setLoading(false);
					setAction('Atualizando...');
				}, 500);
			}
		}
	}

	const handleUpdate = async () => {
		setLoading(true);
		try {
			let updateParams: ProductTypeUpdate[] = [];
			for (let i = 0; i < data.length; i++) {
				updateParams.push({
					code: data[i].code,
					new_price: data[i].new_price as number,
				});

			}

			const response = await api.post('/api/product/', JSON.stringify(updateParams), {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
			setData([]);
		} catch (error) {
		} finally {
			setIsValidate(false);
			setTimeout(() => {
				setLoading(false);
				setAction('Validando...');
			}, 500);
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
			{!loading && !isValidate &&
				<div className="max-w-md flex-column gap-3 rounded-md border-2 border-dotted border-white px-3 py-3">
					<input type="file" ref={fileInputRef} accept=".xls" />
					<button onClick={handleUploadFile} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">VALIDAR</button>
				</div>
			}
			{!loading && data.length > 0 &&
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
												Novo preço de venda
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
													<div className="text-xs text-gray-900">{item.new_price}</div>
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