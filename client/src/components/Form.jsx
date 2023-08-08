import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Form({inputs, setInputs, handleSearch, loading}) {
    return (
        <div className="w-full bg-white mt-6 rounded-md p-6 flex flex-wrap relative">
            <div className="py-3 px-4">
                <label className="font-semibold">Source<span className="text-red-600">*</span></label>
                <input type="text" className="bg-gray-200" value={inputs.src} onChange={ev => setInputs((prev) => {
                    return { ...prev, src: ev.target.value }
                })} />
            </div>
            <div className="py-3 px-4">
                <label className="font-semibold">Destination<span className="text-red-600">*</span></label>
                <input type="text" className="bg-gray-200" value={inputs.dest} onChange={ev => setInputs((prev) => {
                    return { ...prev, dest: ev.target.value }
                })} />
            </div>
            <div className="py-3 px-4">
                <label className="font-semibold">Childs</label>
                <input type="number" min="0" className="bg-gray-200" value={inputs.childs} onChange={ev => setInputs((prev) => {
                    return { ...prev, childs: ev.target.value }
                })} />
            </div>
            <div className="py-3 px-4">
                <label className="font-semibold">Adults<span className="text-red-600">*</span></label>
                <input type="number" min="1" className="bg-gray-200" value={inputs.adults} onChange={ev => setInputs((prev) => {
                    return { ...prev, adults: ev.target.value }
                })} />
            </div>

            <div className="py-3 px-4">
                <label className="font-semibold">Departure<span className="text-red-600">*</span></label>

                <DatePicker
                    className="bg-gray-200"
                    selected={inputs.depart}
                    onChange={(date) => setInputs((prev) => {
                        return { ...prev, depart: date }
                    })}
                    placeholderText="Check out"
                    dateFormat="MMMM d, yyyy"
                    popperPlacement="bottom-start"
                    minDate={new Date().setDate(new Date().getDate())}
                />
            </div>

            {!loading ?
                <button className={"primary mt-4 font-semibold"} onClick={handleSearch}>
                    Search
                </button>
                :
                <button className={"loading mt-4 font-semibold"} onClick={handleSearch} disabled={loading}>
                    Searching...
                </button>
            }
        </div>
    )
}

export default Form