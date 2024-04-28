// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const publicRequest = async (getToken: any) => {
// 	const { VITE_API_URL: url } = import.meta.env;
// 	const token = await getToken();
// 	console.log( token );
// 	const response = await fetch(`${url}/public`);
// 	const data = await response.json();
// 	console.log(data);
// };

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const protectedRequest = async (getToken: any) => {
// 	const { VITE_API_URL: url } = import.meta.env;
// 	const token = await getToken();
// 	console.log( token );
// 	const response: Response = await fetch(`${url}/<protected>`, {
// 		headers: {
// 			authorization: `Bearer ${token}`,
// 		}
// 	});
// 	const data = await response.json();
// 	console.log(data);
// };
