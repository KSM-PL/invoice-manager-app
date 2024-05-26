import React from 'react';
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const MainContainer = ({children, type = "default"}) => {
    return (
        <div className="flex flex-col items-start min-h-screen">
            <Navbar />
            <div className='absolute left-0 right-0 top-0 -z-10 h-52 bg-gradient-to-b from-primary/10 from-10% ' />

            <main className="w-full flex flex-col justify-center items-center">

                {type == "dashboard" ? (
                    <main className="max-w-full w-[1400px] px-10">
                        <h2 className="text-center scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-4xl pt-4 md:pt-8 [text-shadow:_0_0_5px_rgb(255_255_255_/_100%)]">
                            Dashboard
                        </h2>
                        {children}
                    </main>
                        
                ) : null}

                {type == "invoice-in" ? (
                    <div className="max-w-full w-[1400px] px-10">
                        <h2 className="text-center scroll-m-20 text-lg font-extrabold tracking-tight lg:text-4xl pt-4 md:pt-8 [text-shadow:_0_0_5px_rgb(255_255_255_/_100%)]">
                            Invoice in
                        </h2>
                        {children}
                    </div>
                    
                ) : null}

                {type == "invoice-out" ? (
                    <div className="max-w-full w-[1400px] px-10">
                        <h2 className="text-center scroll-m-20 text-lg font-extrabold tracking-tight lg:text-4xl pt-4 md:pt-8 [text-shadow:_0_0_5px_rgb(255_255_255_/_100%)]">
                            Invoice out
                        </h2>
                        {children}
                    </div>
                    
                ) : null}

                {type == "profile" ? (
                    <div className="max-w-full flex flex-col justify-center items-center">
                        <h2 className="text-center scroll-m-20 text-lg font-extrabold tracking-tight lg:text-4xl pt-4 md:pt-8 [text-shadow:_0_0_5px_rgb(255_255_255_/_100%)]">
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
