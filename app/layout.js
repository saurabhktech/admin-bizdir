/* eslint-disable @next/next/no-head-element */
'use client'
import React,{useState} from "react";
import TopNav from "@/components/Admin/TopNav";
import LeftSidebar from "@/components/Admin/LeftSidebar/LeftSidebar"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "@/styles/admin-style.css"


export default function RootLayout({ children, session }) {
  const [showadMenu,setShowAdMenu] = useState(true);
  function toggleCart() {
    setShowAdMenu(!showadMenu);
  }
  return (
        <html>
          <body>
            <div>
            <TopNav toggleCart={toggleCart} showadMenu={showadMenu}/>
        <LeftSidebar showadMenu={showadMenu} />
        {children}
              <ToastContainer />
            </div>
          </body>
        </html>
  );
}