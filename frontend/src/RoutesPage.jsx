import { BrowserRouter, Route, Routes } from "react-router-dom";

// import RequireAuth from "@auth-kit/react-router/RequireAuth";
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Logout from "./pages/Logout/Logout";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import InvoiceIn from "./pages/InvoiceIn/InvoiceIn";
import InvoiceOut from "./pages/InvoiceOut/InvoiceOut";
// import Secure from "./componants/Secure";
import CreateInvoice from './pages/CreateInvoice/CreateInvoice';

const RoutesPage = () => {

    return (
        <BrowserRouter>
            <Routes>
                {/* public */}
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register />} />

                {/* private */}
                <Route element={<AuthOutlet fallbackPath='/login' />}>
                    <Route path='/' element={<Home/>} />
                    <Route path='/invoice-in' element={<InvoiceIn/>} />
                    <Route path='/invoice-out' element={<InvoiceOut/>} />
                    <Route path='/create-invoice' element={<CreateInvoice/>} />

                    {/* <Route path='/profile/:userId' element={<Profile />} /> */}
                    <Route path='/logout' element={<Logout />} />
                </Route>

                {/* error page */}
                <Route path='*' element={<ErrorPage />}/>

            </Routes>
        </BrowserRouter>
    );
};

export default RoutesPage;
