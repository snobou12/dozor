import { useQuery } from 'react-query'
import {ClientService} from "../services/client.service";
export const useConnect=()=>{
    const {
         isLoading,
      error,
      data,
    }=useQuery("dozor connect",()=>ClientService.connect(),{
        onSuccess:({data})=>{
            console.log(data);
        },
        onError:(error)=>{
            console.log(error);
        },
    })
    return {isLoading,error,data}
}