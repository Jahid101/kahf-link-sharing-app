import RegistrationForm from "@/components/registration/RegistrationForm";
import { useRouter } from "next/router";

export default function RegistrationPage() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-dvh bg-gradient-to-r from-teal-400 to-blue-500">
      <div className='w-[90%] md:w-[60%] lg:w-[40%] 2xl:w-[30%] px-5s py-7 flex justify-center items-center border rounded-lg shadow-lg bg-white'>
        <div className='pb-5 w-[90%]'>
          <p className="text-[23px] text-primary text-center font-header mt-5">Welcome to Kahf Link Sharing App</p>
          <p className="text-[16px] my-3 text-label text-center font-header mb-5">Create your account</p>

          {/* Registration form */}
          <RegistrationForm />

          <p
            className="text-sm underline cursor-pointer text-primary text-center mt-3 text-label font-header"
            onClick={() => router.push('/')}
          >Login</p>

        </div>
      </div>
    </div>
  );
}
