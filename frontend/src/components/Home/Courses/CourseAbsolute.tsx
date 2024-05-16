
import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../UserContext";
import { useContext } from "react";


const CourseAbsolute = (props: { onOpen: () => void; price: number; img: string; _id: string}) => {
  const { user } = useContext(UserContext); // Access user data from UserContext
  const { onOpen, price, img, _id} = props;
 
  console.log ("userdd", user.id);

  function handlePayment() {
    onOpen();
    console.log("Payment clicked", _id);
  }

  return (
    <div className=" min-h-screen xl:border text-white bg-[#ffffff] xl:text-black xl:border-white  xl:shadow-2xl shadow-neutral-800  md:min-w-[300px] ">
      <div>
        <div>
          <Image src={img} />
        </div>
        <div className="flex justify-around font-semibold text-sm h-[48px] items-center ">
          <div className={`cursor-pointer text-center w-full border-b-[1px]`}>
            Personal
          </div>

        </div>
      </div>
      <div className="px-[24px]">
        <div>
          <h3 className="font-serif font-bold max-w-[250px] py-1 ">
            Subscribe to Edu Pulsde's top courses
          </h3>
          <p className="text-[12px]">
            Get this course, plus 8,000+ of our top-rated courses with Personal
            Plan{" "}
            <a href="http://" className="underline text-blue-800 font-bold">
              Learn more
            </a>
          </p>
          <div className="bg-blue-50 text-center  w-full py-[4px] font-semibold my-2" onClick={handlePayment}>
            Start Learn
          </div>
          <div className="w-full justify-center items-center flex flex-col space-y-[8px]">
            <p className="text-[9px]">Starting at ₹750 per month</p>
            <p className="text-[9px]"> Cancel anytime</p>
          </div>
          <div className="flex justify-center items-center ">
            <div className="h-[1px] bg-slate-200 w-full"></div>
            <p className="text-[10px] mx-1 my-3">or</p>
            <div className="h-[1px] bg-slate-200 w-full"></div>
          </div>
        </div>

        <div className="flex space-x-2 text-lg place-items-baseline">
          <p className="font-bold ">RS.{price}</p>
          <p className="line-through  ">RS.</p>
          <p className="text-xs">0 off</p>
        </div>
        <div className="flex text-red-600 items-baseline space-x-1 my-2">
          <p className="text-xs font-bold">52 minutes </p>
          <p className="text-xs">left at this price!</p>
        </div>
        <Box>
          <Text>{ }</Text>
        </Box>
        <div className="border-2 w-full text-center py-[7px] bg-blue-400 hover:bg-blue-500 text-white text-sm font-bold">
        <Link 
  to={`/payment/${_id}/${price}/${user.id}`} 
  target="_blank"
  onClick={handlePayment}
>
  Buy this course
</Link>

        </div>

        <div className="items-center text-[10px] space-y-1 w-full justify-center flex flex-col py-2">

          <p>Full Lifetime Access</p>
        </div>

        <div className="underline flex text-[11px] font-bold justify-around underline-offset-2 pb-7">
          <div>
            <Link to=''>share</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseAbsolute;
