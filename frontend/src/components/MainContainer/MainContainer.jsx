import React from 'react';
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const MainContainer = ({children, type = "default"}) => {
    return (
        <div className="flex flex-col items-start min-h-screen">
            <Navbar />

            <main className="w-full flex flex-col justify-center items-center">

                {type == "home" ? (
                    <div className="w-full px-10">
                        <h2 className="text-center scroll-m-20 text-lg font-extrabold tracking-tight lg:text-4xl py-5">
                            Home
                        </h2>
                        {children}
                    </div>
                        
                ) : null}

                {type == "feed" ? (
                    <div className="max-w-full w-[700px]">
                        <h2 className="text-center scroll-m-20 text-lg font-extrabold tracking-tight lg:text-4xl py-5">
                            Home
                        </h2>
                        {children}
                    </div>
                    
                ) : null}

                {type == "profile" ? (
                    <div className="max-w-full flex flex-col justify-center items-center">
                        <h2 className="text-center scroll-m-20 text-lg font-extrabold tracking-tight lg:text-4xl py-5">
                            Profile
                        </h2>
                        {children}
                    </div>
                ) : null}

                {type == "default" ? (
                    <div className="max-w-full w-[700px] flex flex-col justify-center items-center">
                        {children}
                    </div>
                ) : null}


            </main>

            <Footer />
        </div>
    )
}

export default MainContainer;
