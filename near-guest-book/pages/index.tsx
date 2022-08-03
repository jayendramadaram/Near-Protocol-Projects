import type { NextPage } from "next";

import { useEffect, useState } from "react";
import Nearinit from "../utils/Nearinit";

import Main from "../components/Main";

const Home: NextPage = () => {
  // let Menu: String;
  const [Show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const Menu = async () => {
        try {
          console.log("we are here");

          window.nearInitPromise = await Nearinit();
          setShow(true);
        } catch (error) {
          console.log(error, "please work");
        }
      };
      Menu();
    }
  }, []);

  const ErrBlock = () => {
    return (
      <div className='flex justify-center items-center h-screen '>
        Ig there migh be an err please Check you internet and wallet
        connectivity watch console logs
      </div>
    );
  };

  return <div>{Show ? <Main /> : <ErrBlock />}</div>;
};

export default Home;
