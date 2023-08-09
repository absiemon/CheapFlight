import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import IndexPageLoader from "../components/IndexPageLoader";
import { Tooltip } from "@chakra-ui/react";
import Form from "../components/Form";

export default function IndexPage() {

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({ src: "", dest: "", childs: 0, adults: 1, depart: new Date() });
  const [page, setPage] = useState(1);
  const [maxPageSize, setMaxPageSize] = useState(0);

  const handleSearch = async()=>{
    setPage(1);
    setFlights([]);
    searchFlights(1);
  }
  const searchFlights = async (page) => {
    const { src, dest, childs, adults, depart } = inputs;

    if (!src || !dest || adults === 0 || !depart) {
      toast.error("All fields are mandatory");
      return;
    }
    if (childs < 0) {
      setInputs((prev) => {
        return { ...prev, childs: 0 }
      })
    }
    if (adults < 0) {
      setInputs((prev) => {
        return { ...prev, adults: 1 }
      })
    }
    setLoading(true)
    await axios.post(`/get_prices?page=${page}`,
      {
        source: src,
        destination: dest,
        childs, adults, departure: depart.toLocaleDateString()
      }
    ).then((res) => {
      setFlights((prevFlights) => [...prevFlights, ...res.data?.result]);
      setMaxPageSize(res.data?.maxPageSize);
      setLoading(false)
    }).catch((err) => {
      toast.error("Some error occured! Please check your inputs");
      setLoading(false)
    })
  }

  useEffect(() => {
    if(page>1 && page <= maxPageSize){
      searchFlights(page);
    }
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <ToastContainer />
      <Form inputs={inputs} setInputs={setInputs} handleSearch={handleSearch} loading={loading}/>
      
      <div className="flex flex-col gap-3 mt-5">
        {flights && flights.length > 0 && flights.map((flight, index) => {
          return (
            <div className="bg-white p-4 px-8 rounded-md flex justify-between" key={index}>
              {/* First part */}
              <div className="flex gap-5 items-center">
                <img src={flight?.thumbnail} alt="icon" className="h-8 w-8" />
                <div>
                  <p className="text-lg font-semibold">
                    {flight?.departureTime} - {flight?.arrivalTime}
                  </p>
                  <p className="text-md text-gray-500">{flight?.companyName}</p>
                </div>
              </div>
              {/* Second part */}
              <div className="flex gap-6">
                <div className="flex flex-col items-center gap-1">
                  <p>{flight?.duration}</p>
                  <p className="text-gray-500 text-sm" >{inputs.src?.substring(0, 3).toUpperCase()} - {inputs.dest?.substring(0, 3).toUpperCase()}</p>
                </div>
                <div className="flex text-blue-600 font-semibold gap-1">
                  <p>{flight?.layover?.substring(0, 7)}</p>
                  <Tooltip label={flight?.layover} aria-label='A tooltip'>
                    <p className="h-6 w-6 border rounded-full px-2 bg-gray-300 cursor-pointer">!</p>
                  </Tooltip>
                </div>
                <div className="flex flex-col items-center">
                    <p>{flight?.emisions?.split(":")[1]?.split(" ")[1] || '-'} kg CO2</p>
                    <p className="text-sm text-gray-500">{flight?.emisions?.split(":")[1]?.split(" ")[3] || '-' + " " + flight?.emisions?.split(":")[1]?.split(" ")[4] || '-'}</p>
                </div>
              </div>
              {/* Third part */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-lg font-semibold">{flight?.price}</p>
                <Link className="bg-primary px-4 py-2 text-white font-semibold rounded-sm" to={flight?.sourceUrl} target="_blank">Book</Link>
              </div>
            </div>
          )
        })
      }
      {loading && <IndexPageLoader />}
      </div>
    </>
  );
}