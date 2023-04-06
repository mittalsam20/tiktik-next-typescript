import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

import { AiOutlineMenu, AiFillHome } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";

import Footer from "./Footer";
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const normalLink = `flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded`;

  return (
    <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
      <div
        className={"block xl:hidden m-1 ml-7 mt-3  text-xl cursor-pointer"}
        onClick={() => {
          setShowSidebar((prevState) => !prevState);
        }}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div
          className={
            "xl:w-400 w-20 flex flex-col justify-start mb-5 border-r-2 border-gray-100 xl:border-0 pt-3 pb-3 pr-1 overflow-hidden"
          }
        >
          <div className={"xl:border-b-2 border:gray-200 xl:pb-2"}>
            <Link href="/">
              <div className={normalLink}>
                <p className={"text-2x1"}>
                  <AiFillHome />
                </p>
                <span className={"text-xl hidden xl:block"}>{"For You"}</span>
              </div>
            </Link>
          </div>

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
