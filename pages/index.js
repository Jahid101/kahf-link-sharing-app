import CustomLoader from "@/components/loader/loader";
import LoginForm from "@/components/login/LoginForm";
import { Spinner } from "@/components/ui/spinner";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export default function Home() {
  const { userDetails } = useSelector((state) => state.usersSlice);
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false)
  const [pageLoad, setPageLoad] = useState(true)

  useEffect(() => {
    if (userDetails && userDetails?.id) {
      router.push('/links')
    } else {
      setPageLoad(false)
    }
  }, []);


  if (pageLoad) {
    return (<CustomLoader />)
  }


  return (
    <div
      className={isHovering ?
        "flex justify-center items-center h-dvh bg-gradient-to-r from-pink-500 to-orange-500" :
        "flex justify-center items-center h-dvh bg-gradient-to-r from-teal-400 to-blue-500"
      }
    >
      <div
        className='w-[90%] md:w-[60%] lg:w-[40%] 2xl:w-[30%] px-5s py-7 flex justify-center items-center border rounded-lg shadow-lg bg-white'
        onMouseOver={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className='pb-5 w-[90%]'>
          <p className="text-[23px] text-primary text-center font-header mt-5">Welcome to Kahf Link Sharing App</p>
          <p className="text-[16px] my-3 text-label text-center font-header mb-5">Sign in to your account</p>

          {/* Login form */}
          <LoginForm />

          <p
            className="text-sm underline cursor-pointer text-primary text-center mt-3 text-label font-header"
            onClick={() => router.push('/registration')}
          >
            Create account
          </p>
        </div>
      </div>
    </div>
  );
}
