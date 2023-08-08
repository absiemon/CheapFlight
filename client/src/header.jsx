import { Link } from "react-router-dom";

export default function () {

    return (
        <>
        <header className='sticky top-0 z-30 -mx-4 py-3 flex justify-center border-b-2 bg-white rounded-xl'>
            <Link to={'/'} href="" className='flex items-center gap-1 ml-5'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8" style={{ color: '#8B5CF6' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                </svg>
                <span className="font-semibold text-xl">Cheap<span className="text-primary">Flight</span></span>
            </Link>
        </header>
        </>
    )
}