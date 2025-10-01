import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { LabContent } from "../context/LabContentProvider";

const Editlabs = () => {
  const { labfetchedData, fetchData, editLab } = useContext(LabContent);
  const [input, setInput] = useState({
    name: "",
    capacity: "",
    location: "",
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const loadData = async () => {
      if (labfetchedData.length === 0) {
        await fetchData();
      }
    };
    loadData();
  }, [labfetchedData, fetchData]);

  useEffect(() => {
    const lab = labfetchedData.find((item) => item.id === id);
    if (lab) {
      setInput({
        name: lab.name || "",
        capacity: lab.capacity || "",
        location: lab.location || "",
      });
    }
  }, [labfetchedData, id]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let tempObj = {};
    if (input.name.trim() === "") tempObj.name = "Name is required.";
    if (!input.capacity) tempObj.capacity = "Capacity is required.";
    if (input.location.trim() === "") tempObj.location = "Location is required.";
    setError(tempObj);

    if (Object.keys(tempObj).length === 0) {
      await editLab(id, input);
      await fetchData();
      navigate("/lab");
    } else {
      toast.error("Please fill out all required fields.");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200">
      <form
        className="w-full max-w-lg p-8 bg-gray-800 rounded-xl shadow-2xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Edit Lab
        </h2>


        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-200">
            Lab Name
          </label>
          <input
            type="text"
            id="name"
            className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5"
            placeholder="e.g., IT Studio-1"
            onChange={handleChange}
            value={input.name}
          />
          {error.name && <p className="mt-1 text-xs text-red-400">{error.name}</p>}
        </div>


        <div className="mb-5">
          <label htmlFor="capacity" className="block mb-2 text-sm font-medium text-gray-200">
            Capacity
          </label>
          <input
            type="number"
            id="capacity"
            className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5"
            placeholder="e.g., 40"
            onChange={handleChange}
            value={input.capacity}
            readOnly
          />
          {error.capacity && <p className="mt-1 text-xs text-red-400">{error.capacity}</p>}
        </div>


        <div className="mb-6">
          <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-200">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="shadow-sm bg-gray-700 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5"
            placeholder="e.g., 1st Floor"
            onChange={handleChange}
            value={input.location}
          />
          {error.location && <p className="mt-1 text-xs text-red-400">{error.location}</p>}
        </div>

        <button
          type="submit"
          className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Update Lab
        </button>
      </form>
    </div>
  );
};

export default Editlabs;
