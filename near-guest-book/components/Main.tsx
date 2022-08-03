import { providers } from "near-api-js";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  delete_all,
  delete_mine,
  get_msgs,
  login,
  logout,
  set_msgs,
} from "../utils/Nearinit";

function Main() {
  const [value, setvalue] = useState<number>(0);
  const [TEXT, setTEXT] = useState<string>("");
  const [Get_Msgs, setGet_Msgs] = useState<Array<Array<String>>>();
  const router = useRouter();
  const { transactionHashes } = router.query;
  const { errorMessage } = router.query;
  //   console.log("dudo look", transactionHashes);
  useEffect(() => {
    if (typeof window !== "undefined") {
      get_msgs().then((response) => {
        setGet_Msgs(response);
        // console.log(response, "RESPOOO");
      });

      if (
        decodeURIComponent(errorMessage as string) !==
        "User rejected transaction"
      ) {
        if (transactionHashes) {
          console.log(errorMessage);
          const provider = new providers.JsonRpcProvider(
            "https://archival-rpc.testnet.near.org"
          );

          const getState = async (txHash: string, accountId: string) => {
            console.log("here");

            await provider
              .txStatus(txHash, "window.testnet")
              .then((resp) => {
                if (resp["transaction"]["signer_id"] == window.accountId) {
                  toast.success(
                    <div>
                      yo message succesfully delivered <br /> Hash in Console
                      logs
                    </div>
                  );
                  console.log("Transaction Hash : " + txHash);
                  console.log("Bonus here is Heart   " + "♥");
                }
              })
              .catch((err) => {
                console.log("we lost the battle");
              });
          };
          getState(transactionHashes as string, window.accountId);
        }
      } else {
        toast.error("U DENAID IT 💔");
      }
    }
  }, [router.isReady]);

  return (
    <div className=''>
      <video
        id='background-video'
        autoPlay
        loop
        muted
        poster='https://assets-global.website-files.com/617fd6a2d7dd9a6b1c4c4dc6/61848f2b62515713b731f15a_city_bg_loop-poster-00001.jpg'
      >
        <source
          src='https://assets-global.website-files.com/617fd6a2d7dd9a6b1c4c4dc6/61848f2b62515713b731f15a_city_bg_loop-transcode.mp4'
          type='video/mp4'
        />
      </video>
      <div className='flex justify-center items-center h-screen '>
        <div className='h-5/6 w-5/6  bg-white shadow-lg space-y-12 rounded-3xl bg-clip-padding bg-opacity-50 border backdrop-filter border-gray-200 overflow-y-scroll scrollbarhide'>
          <div className='flex justify-between   items-center bg-white shadow-lg rounded-t-3xl bg-clip-padding bg-opacity-50 border backdrop-filter border-gray-200 '>
            <div className='text-slate-600 py-3 px-10 text-xl'>
              Tip Something
            </div>
            <div className='border-l-2 border-slate-400 hover:bg-white rounded-tr-3xl'>
              <button className='text-slate-600 py-3 pl-5 pr-10 text-xl font-mono'>
                {window.walletConnection.isSignedIn() ? (
                  <button onClick={() => logout()}>LOGOUT </button>
                ) : (
                  <button onClick={() => login()}>LOGIN </button>
                )}
              </button>
            </div>
          </div>
          <div className='py-11 px-16 space-y-4'>
            <textarea
              required
              id='message'
              rows={4}
              className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Your message 💖💖'
              onChange={(e) => setTEXT(e.target.value)}
              value={TEXT}
            ></textarea>
            <div className='justify-around flex'>
              <input
                type='number'
                className='form-control block w-2/5 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:outline-none'
                id='exampleNumber0'
                placeholder='Number input'
                onChange={(e) => {
                  setvalue(parseFloat(e.target.value));
                  //   console.log(value, "macha value");
                }}
                value={value}
              />
              <button
                className='border border-solid w-2/5 bg-gray-400 hover:bg-gray-500 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 border-gray-300 rounded transition ease-in-out m-0'
                onClick={() => {
                  if (TEXT !== "") {
                    toast.promise(
                      set_msgs(TEXT, value)
                        .then(() => console.log("macha success"))
                        .catch((err) => console.log(err, "peekindi")),
                      {
                        loading: "Loading",
                        success: (
                          <div>
                            yo message succesfully delivered <br /> Hash in
                            Console logs
                          </div>
                        ),
                        error: "Error when fetching",
                      }
                    );
                  } else {
                    toast("Fill Something out Dude");
                  }
                }}
              >
                Less GOO
              </button>
            </div>
          </div>
          <div className='space-y-4 flex flex-col'>
            <div className='border-b-2 border-slate-300 pb-3 px-4 font-bold text-2xl text-slate-500 font-mono'>
              Messages Of Our Beloved Peeps
            </div>
            <div className='justify-center items-center flex flex-col space-y-3 py-6'>
              {Get_Msgs?.map((ele, index) => (
                <div className='bg-white shadow-lg rounded-xl w-4/6 justify-start px-4 flex min-h-1/2 items-start py-3 bg-clip-padding bg-opacity-50 border backdrop-filter border-gray-200 flex-col'>
                  <div className='font-bold text-slate-600' key={index}>
                    {ele[0]} said :
                  </div>{" "}
                  <div>{ele[1]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Toaster position='top-right' reverseOrder={false} />
      </div>
      {/* <div>{Get_Msgs?.map((ele) => ele[1])}</div>
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
      </div> */}
    </div>
  );
}

export default Main;
