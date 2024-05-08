import { useEffect } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastProps {
    isSuccess: number;
  }
  
  export default function Toast({ isSuccess }: ToastProps) {
    useEffect(() => {
      if (isSuccess === 1) {
        toast("Email sending request successfully sent.", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,

        });
      }else if(isSuccess === 2){
        toast("Something went wrong")
      }
    }, [isSuccess]);
  
    return <ToastContainer />;
  }