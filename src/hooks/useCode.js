
import { useQuery } from "react-query";
import { ClientService } from "../services/client.service";
export const useCode = code => {
	const { isLoading, error, data,refetch } = useQuery(
		["dozor code post", code],
		() => ClientService.postCode(code),
		{
			onSuccess: ({ data }) => {
				// console.log(data);
			},
			onError: error => {
				// console.log(error);
			},
            enabled:false
		}
	);
	return { isLoading, error, data,refetch };
};
