import { useState, useEffect, useRef, useContext } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import * as d3 from "d3";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Monitor, Users, Settings, Building2 } from "lucide-react";
import { AuthContext } from "../context/AuthContentProvider";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalLabs: 0,
    totalPCs: 0,
    occupiedPCs: 0,
    totalStudents: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // sidebar toggle

  const barChartRef = useRef();
  const pieChartRef = useRef();
  const lineChartRef = useRef();
  const horizontalChartRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const labsSnapshot = await getDocs(collection(db, "labs"));
        const totalLabs = labsSnapshot.size;

        const pcsSnapshot = await getDocs(collection(db, "system"));
        const totalPCs = pcsSnapshot.size;
        const occupiedPCs = pcsSnapshot.docs.filter(
          (doc) => doc.data().status === "Occupied"
        ).length;

        const studentsSnapshot = await getDocs(collection(db, "students"));
        const totalStudents = studentsSnapshot.size;

        setStats({ totalLabs, totalPCs, occupiedPCs, totalStudents });
      } catch (error) {
        console.error("Error fetching dashboard data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!stats.totalLabs && !stats.totalPCs && !stats.totalStudents) return;

    // ===== Bar Chart =====
    d3.select(barChartRef.current).selectAll("*").remove();
    const barContainer = barChartRef.current;
    const width = barContainer.offsetWidth || 400;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    const barData = [
      { label: "Labs", value: stats.totalLabs },
      { label: "PCs", value: stats.totalPCs },
      { label: "Occupied PCs", value: stats.occupiedPCs },
      { label: "Students", value: stats.totalStudents },
    ];

    const svg = d3
      .select(barChartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleBand()
      .domain(barData.map((d) => d.label))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(barData, (d) => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg
      .append("g")
      .attr("fill", "#3B82F6")
      .selectAll("rect")
      .data(barData)
      .join("rect")
      .attr("x", (d) => x(d.label))
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => y(0) - y(d.value))
      .attr("width", x.bandwidth());

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("fill", "white");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("fill", "white");

    // ===== Pie Chart =====
    d3.select(pieChartRef.current).selectAll("*").remove();
    const pieSvg = d3
      .select(pieChartRef.current)
      .append("svg")
      .attr("width", 280)
      .attr("height", 280)
      .append("g")
      .attr("transform", "translate(140,140)");

    const pie = d3.pie().value((d) => d.value);
    const arc = d3.arc().innerRadius(60).outerRadius(120);

    const pieData = [
      { label: "Occupied", value: stats.occupiedPCs },
      { label: "Available", value: stats.totalPCs - stats.occupiedPCs },
    ];

    const colors = d3
      .scaleOrdinal()
      .domain(pieData.map((d) => d.label))
      .range(["#F59E0B", "#10B981"]);

    pieSvg
      .selectAll("path")
      .data(pie(pieData))
      .join("path")
      .attr("d", arc)
      .attr("fill", (d) => colors(d.data.label));

    pieSvg
      .selectAll("text")
      .data(pie(pieData))
      .join("text")
      .text((d) => d.data.label)
      .attr("transform", (d) => `translate(${arc.centroid(d)})`)
      .attr("fill", "white")
      .style("font-size", "12px");

    // ===== Line Chart =====
    d3.select(lineChartRef.current).selectAll("*").remove();
    const lineData = [
      { month: "Jan", value: stats.totalStudents * 0.5 },
      { month: "Feb", value: stats.totalStudents * 0.7 },
      { month: "Mar", value: stats.totalStudents * 0.8 },
      { month: "Apr", value: stats.totalStudents },
    ];

    const lw = barContainer.offsetWidth || 400;
    const lh = 250;

    const lineSvg = d3
      .select(lineChartRef.current)
      .append("svg")
      .attr("width", lw)
      .attr("height", lh);

    const xLine = d3
      .scalePoint()
      .domain(lineData.map((d) => d.month))
      .range([50, lw - 20]);

    const yLine = d3
      .scaleLinear()
      .domain([0, d3.max(lineData, (d) => d.value)])
      .range([lh - 40, 20]);

    const line = d3
      .line()
      .x((d) => xLine(d.month))
      .y((d) => yLine(d.value));

    lineSvg
      .append("path")
      .datum(lineData)
      .attr("fill", "none")
      .attr("stroke", "#06B6D4")
      .attr("stroke-width", 3)
      .attr("d", line);

    lineSvg
      .selectAll("circle")
      .data(lineData)
      .join("circle")
      .attr("cx", (d) => xLine(d.month))
      .attr("cy", (d) => yLine(d.value))
      .attr("r", 5)
      .attr("fill", "#06B6D4");

    lineSvg
      .append("g")
      .attr("transform", `translate(0,${lh - 40})`)
      .call(d3.axisBottom(xLine))
      .selectAll("text")
      .attr("fill", "white");

    lineSvg
      .append("g")
      .attr("transform", `translate(50,0)`)
      .call(d3.axisLeft(yLine))
      .selectAll("text")
      .attr("fill", "white");

    // ===== Horizontal Bar Chart =====
    d3.select(horizontalChartRef.current).selectAll("*").remove();
    const hdata = [
      { label: "Labs", value: stats.totalLabs },
      { label: "PCs", value: stats.totalPCs },
    ];

    const hw = barContainer.offsetWidth || 400;
    const hh = 200;

    const hsvg = d3
      .select(horizontalChartRef.current)
      .append("svg")
      .attr("width", hw)
      .attr("height", hh);

    const yScale = d3
      .scaleBand()
      .domain(hdata.map((d) => d.label))
      .range([20, hh - 20])
      .padding(0.3);

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(hdata, (d) => d.value)])
      .range([50, hw - 20]);

    hsvg
      .selectAll("rect")
      .data(hdata)
      .join("rect")
      .attr("x", 50)
      .attr("y", (d) => yScale(d.label))
      .attr("width", (d) => xScale(d.value) - 50)
      .attr("height", yScale.bandwidth())
      .attr("fill", "#EF4444");

    hsvg
      .append("g")
      .attr("transform", `translate(0,${hh - 20})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("fill", "white");

    hsvg
      .append("g")
      .attr("transform", `translate(50,0)`)
      .call(d3.axisLeft(yScale))
      .selectAll("text")
      .attr("fill", "white");
  }, [stats]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p className="text-lg animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* ===== Mobile Hamburger Button ===== */}
      <button
        className="md:hidden p-2 text-white fixed top-4 left-4 z-50 bg-gray-800 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* ===== Sidebar ===== */}
      <aside
        className={`w-64 bg-gray-900 text-gray-200 min-h-screen p-6 flex flex-col shadow-xl fixed top-0 left-0 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 
        transition-transform duration-300 z-40`}
      >
        <h2 className="text-2xl font-bold text-blue-400 mb-10 text-center tracking-wide">
          Admin Panel
        </h2>
        <ul className="space-y-3 flex flex-col flex-grow">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "hover:bg-gray-800 hover:text-white text-gray-400"
                }`
              }
            >
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/lab"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "hover:bg-gray-800 hover:text-white text-gray-400"
                }`
              }
            >
              <Building2 size={20} />
              Labs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/systems"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "hover:bg-gray-800 hover:text-white text-gray-400"
                }`
              }
            >
              <Monitor size={20} />
              Systems
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/student"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "hover:bg-gray-800 hover:text-white text-gray-400"
                }`
              }
            >
              <Users size={20} />
              Students
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "hover:bg-gray-800 hover:text-white text-gray-400"
                }`
              }
            >
              <Settings size={20} />
              Settings
            </NavLink>
          </li>
        </ul>

        <div className="mt-auto pt-6 border-t border-gray-700">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-colors duration-200"
            onClick={logout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12H3m12 0l-4-4m4 4l-4 4m6-4h6"
              />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="flex-1 bg-gray-900 text-white md:ml-64 p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-blue-400">
          Dashboard Overview
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl flex items-center space-x-4">
            <div className="bg-blue-600 p-3 rounded-full"></div>
            <div>
              <p className="text-gray-400 font-medium">Total Labs</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {stats.totalLabs}
              </h2>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl flex items-center space-x-4">
            <div className="bg-green-600 p-3 rounded-full"></div>
            <div>
              <p className="text-gray-400 font-medium">Total PCs</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {stats.totalPCs}
              </h2>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl flex items-center space-x-4">
            <div className="bg-yellow-600 p-3 rounded-full"></div>
            <div>
              <p className="text-gray-400 font-medium">Occupied PCs</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {stats.occupiedPCs}
              </h2>
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl flex items-center space-x-4">
            <div className="bg-red-600 p-3 rounded-full"></div>
            <div>
              <p className="text-gray-400 font-medium">Total Students</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {stats.totalStudents}
              </h2>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
              Stats Overview
            </h2>
            <div ref={barChartRef} className="w-full"></div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-xl overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
              PC Status
            </h2>
            <div ref={pieChartRef} className="w-full"></div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-xl overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
              Students Growth
            </h2>
            <div ref={lineChartRef} className="w-full"></div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-xl overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
              Labs vs PCs
            </h2>
            <div ref={horizontalChartRef} className="w-full"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

