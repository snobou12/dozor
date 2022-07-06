import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleChangeActionData } from '../redux/reducers/game/gameSlice';
import {ClientService} from "../services/client.service";
export const useConnect=()=>{
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const {
         isLoading,
      error,
      data:data,
    }=useQuery("dozor connect",()=>ClientService.connect(),{
        onSuccess:({data})=>{
            if(data?.body){
                let dozorData = data.body;
                console.log("kek",dozorData)
                if(dozorData.dozorSequenceOfPassingGameSet)
                if(dozorData.status === "WAITING_ACTIVE"){
                dispatch(handleChangeActionData({
                    dozor_status: "PRE_START_TIME",
                    time: "",
                }))
                    
                }
                else if(dozorData.status === "DEVELOP"){
dispatch(handleChangeActionData({
                    dozor_status: "DEVELOP",
                    time: "",
                }))
                }
                else if(dozorData.status === "ACTIVE"){
                    dispatch(handleChangeActionData({
                    dozor_status: "ACTIVE",
                    time: "",
                }))
                }
            }
            else{
                navigate("/auth")
            }
        },
        onError:(error)=>{
            console.log(error);
            navigate("/auth");
        },
    })
    return {isLoading,error,data}
}