import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Nearinit from "../utils/Nearinit";
import {
  delete_all,
  delete_mine,
  get_msgs,
  login,
  logout,
  set_msgs,
} from "../utils/Nearinit";

const Home: NextPage = () => {
  // let Menu: String;
  const [Show, setShow] = useState<boolean>(false);
  const [value, setvalue] = useState<string>("");
  const [Get_Msgs, setGet_Msgs] = useState<Array<Array<String>>>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const Menu = async () => {
        try {
          console.log("we are here");

          window.nearInitPromise = await Nearinit();
          setShow(true);
          get_msgs().then((response) => {
            setGet_Msgs(response);
            console.log(response, "RESPOOO");
          });
        } catch (error) {
          console.log(error, "please work");
        }
      };
      Menu();
    }
  }, []);

  return (
    <div>
      {Show ? (
        <div className='space-y-10'>
          <div>{Show ? "hi mom" : "Fucked up"}</div>
          <div>{Get_Msgs?.map((ele) => ele[1])}</div>
          <div className='LoginCard'>
            {window.walletConnection.isSignedIn() ? (
              <button
                className=' border-slate-900 border-2'
                onClick={() => logout()}
              >
                {" "}
                LOGOUT{" "}
              </button>
            ) : (
              <button
                className=' border-slate-900 border-2'
                onClick={() => login()}
              >
                {" "}
                LOGIN{" "}
              </button>
            )}
          </div>
          <div className='space-y-9'>
            <input
              onChange={(e) => setvalue(e.target.value)}
              value={value}
              className='border-2 border-black'
            />
            <button
              onClick={() => {
                let resp = set_msgs(value)
                  .then(() => console.log("macha success"))
                  .catch((err) => console.log(err, "peekindi"));
                console.log("final resp", resp);
              }}
            >
              LESSS GOOO
            </button>
            <button
              onClick={() => {
                let resp = delete_all()
                  .then(() => console.log("macha success"))
                  .catch((err) => console.log(err, "peekindi"));
                console.log("final resp", resp);
              }}
            >
              Delete alll
            </button>
            <button
              onClick={() => {
                let resp = delete_mine()
                  .then(() => console.log("macha success"))
                  .catch((err) => console.log(err, "peekindi"));
                console.log("final resp", resp);
              }}
            >
              Delete mine
            </button>
          </div>
        </div>
      ) : (
        "nohhh"
      )}
    </div>
  );
};

export default Home;
