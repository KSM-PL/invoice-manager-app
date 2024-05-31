import React from 'react';
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

const MainContainer = ({children, type = "default", description = ""}) => {
    return (
        <div className="flex flex-col items-start min-h-screen">
            <Navbar />
            <div className='absolute left-0 right-0 top-0 -z-10 h-52 bg-gradient-to-b from-primary/10 from-10% ' />

            <main className="w-full flex flex-col justify-center items-center">

                {type == "dashboard" ? (
                    <div className="max-w-full w-[1400px] px-10">
                        <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-5xl lg:leading-[1.1] pt-4 md:pt-8 [text-shadow:_0_0_5px_rgb(255_255_255_/_100%)]">
                            Dashboard
                        </h2>
                        {children}
                    </div>
                        
                ) : null}

                {type == "invoice-in" ? (
                    <div className="max-w-full w-[1400px] px-10 flex flex-col justify-center items-center">
                        {/* text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] */}
                        <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-5xl lg:leading-[1.1] pt-4 md:pt-8 [text-shadow:_0_0_5px_rgb(255_255_255_/_100%)]">
                            Invoice in
                        </h2>
                        <h3 className="w-full text-center text-lg font-light text-foreground mt-2">
                            {description}
                        </h3>
                        {children}
                    </div>
                    
                ) : null}

                {type == "invoice-out" ? (
                    <div className="max-w-full w-[1400px] px-10 flex flex-col justify-center items-center">
                        <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-5xl lg:leading-[1.1] pt-4 md:pt-8 [text-shadow:_0_0_5px_rgb(255_255_255_/_100%)]">
                            Invoice out
                        </h2>
                        <h3 className="w-full text-center text-lg font-light text-foreground mt-2">
                            {description}
                        </h3>
                        {children}
                    </div>
                    
                ) : null}

                {type == "create-invoice" ? (
                    <div className="max-w-full w-[800px] px-10 flex flex-col justify-center items-center">
                        <h2 className="text-center text-3xl font-extrabold tracking-tight md:text-5xl lg:leading-[1.1] pt-4 md:pt-8 [text-shadow:_0_0_5px_rgb(255_255_255_/_100%)]">
                            Create invoice
                        </h2>
                        <h3 className="w-full text-center text-lg font-light text-foreground mt-2">
                            {description}
                        </h3>
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
