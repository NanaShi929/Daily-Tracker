// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import moment from "moment-timezone";
// import "./App.css";
// function App() {
//   const [form, setForm] = useState({
//     date: "",
//     activity: "",
//     hours: 0,
//     minutes: 0,
//   });
//   const [customActivity, setCustomActivity] = useState("");
//   const [allActivities, setAllActivities] = useState([]);
//   const [customActivitiesList, setCustomActivitiesList] = useState([]);
//   const [currentTime, setCurrentTime] = useState("");
//   const [predefinedActivities] = useState([
//     "Sleeping",
//     "YouTube",
//     "Laptop",
//     "Mobile",
//     "WhatsApp",
//     "Study/Project",
//     "Instagram",
//     "Twitter",
//     "Gaming",
//     "Japanese",
//     "Reading",
//     "Guitar",
//     "Manga",
//   ]);
//   const [activitiesData, setActivitiesData] = useState([]);

//   // Fetch the current date in IST format
//   useEffect(() => {
//     const currentDate = moment.tz("Asia/Kolkata").format("YYYY-MM-DD");
//     setForm({
//       ...form,
//       date: currentDate,
//     });
//     const interval = setInterval(() => {
//       setCurrentTime(moment().format("hh:mm:ss A")); // 12-hour format with AM/PM
//     }, 1000); // Update the time every second

//     fetchActivities();
//   }, []);

 
//   const BACKEND_URL = "https://daily-tracker-backend.onrender.com";

//   const fetchActivities = async () => {
//     try {
//       const response = await axios.get(`${BACKEND_URL}/api/activities`);
//       setActivitiesData(response.data);
//     } catch (error) {
//       console.error("Error fetching activities:", error);
//     }
//   };

//   // Handle form input changes
//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Add a new activity to the list of activities to be added
//   const handleAddActivity = () => {
//     const totalMinutes =
//       (parseInt(form.hours) || 0) * 60 + (parseInt(form.minutes) || 0);

//     const activityToAdd = {
//       date: form.date,
//       activity: form.activity === "custom" ? customActivity : form.activity,
//       timeSpent: totalMinutes,
//     };

//     setAllActivities((prev) => [...prev, activityToAdd]);
//     setForm({ date: form.date, activity: "", hours: 0, minutes: 0 });
//     setCustomActivity("");
//   };

//   // Add a new custom activity to the list of predefined activities
//   const handleAddNewActivity = () => {
//     if (customActivity && !customActivitiesList.includes(customActivity)) {
//       setCustomActivitiesList((prev) => [...prev, customActivity]);
//       setCustomActivity("");
//     }
//   };

//   // Handle adding all activities to the backend
//   const handleAddAllActivities = async () => {
//     const groupedActivities = allActivities.reduce((acc, curr) => {
//       acc[curr.activity] = (acc[curr.activity] || 0) + curr.timeSpent;
//       return acc;
//     }, {});

//     try {
//       await axios.put(`${BACKEND_URL}/api/activities`, {
//         date: moment(form.date).format("DD-MM-YYYY"),
//         time: moment().format("hh:mm:ss A"),
//         activities: groupedActivities,
//       });
//       setAllActivities([]); // Clear activities after sending them
//       fetchActivities(); // Refresh the activity list from the backend
//     } catch (error) {
//       console.error("Error adding activities:", error);
//     }
//   };
// const handleNumberInput = (event) => {
//   // Allow only numbers (0-9) and basic controls like backspace
//   if (event.key !== "Backspace" && !/^\d$/.test(event.key)) {
//     event.preventDefault(); // Prevent non-numeric input
//   }
// };

//   return (
//     <div className="App">
//       <h1>Daily Activity Tracker</h1>

//       <form>
//         <div className="date_time">
//           <div>
//             <label>Date :</label>
//             <span>{moment(form.date).format("DD-MM-YYYY")}</span>
//           </div>

//           <div>
//             <label>Time: </label>
//             <span>{currentTime}</span>
//           </div>
//         </div>
//         <div className="set">
//           <label className="label">Activity &nbsp;</label>
//           <select
//             name="activity"
//             value={form.activity}
//             onChange={handleChange}
//             required
//             className="area"
//           >
//             <option value="">Select Activity</option>
//             {[...predefinedActivities, ...customActivitiesList].map(
//               (activity, index) => (
//                 <option key={index} value={activity}>
//                   {activity}
//                 </option>
//               )
//             )}
//             <option value="custom">Other Activity</option>
//           </select>
//         </div>

//         {form.activity === "custom" && (
//           <div className="set">
//             <label className="label">Name &nbsp;</label>
//             <input
//               className="area1"
//               type="text"
//               value={customActivity}
//               onChange={(e) => setCustomActivity(e.target.value)}
//               required
//             />
//           </div>
//         )}

//         <div className="set">
//           <label className="label">Time &nbsp; </label>
//           <div>
//             <input
//               className="time"
//               type="text"
//               name="hours"
//               placeholder="Hours"
//               value={form.hours}
//               onChange={handleChange}
//               onKeyDown={handleNumberInput}
//               required
//             />
//             <span>:</span>
//             <input
//               className="time"
//               type="text"
//               name="minutes"
//               placeholder="Minutes"
//               value={form.minutes}
//               onChange={handleChange}
//               onKeyDown={handleNumberInput}
//               required
//             />
//           </div>
//         </div>

//         <div className="button">
//           <button type="button" className="addmore" onClick={handleAddActivity}>
//             Add More
//           </button>
//         </div>
//       </form>

//       <h2 className="set label1">List Of Activities</h2>
//       <ol className="list">
//         {allActivities.map((activity, index) => (
//           <li key={index}>
//             {activity.activity} - {Math.floor(activity.timeSpent / 60)}hr{" "}
//             {activity.timeSpent % 60}min
//           </li>
//         ))}
//       </ol>
//       {/* <table>
//         <tr>
//           <th>S.no</th>
//           <th>Activity</th>
//           <th>Time Spent</th>
//         </tr>
//         {allActivities.map((activity, index) => (
//           <tr>
//             <td>{key={index}}</td>
//             <td>{activity.activity}</td>
//             <td>
//               {Math.floor(activity.timeSpent / 60)}hr {activity.timeSpent % 60}
//               min
//             </td>
//           </tr>
//         ))}
//       </table> */}
//       <div className="button">
//         <button className="submit" onClick={handleAddAllActivities}>
//           SUBMIT
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment-timezone";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    date: "",
    activity: "",
    hours: 0,
    minutes: 0,
  });
  const [customActivity, setCustomActivity] = useState("");
  const [allActivities, setAllActivities] = useState([]);
  const [customActivitiesList, setCustomActivitiesList] = useState([]);
  const [currentTime, setCurrentTime] = useState("");
  const [error, setError] = useState({
    activity: "",
    time: "",
    customName: "",
  }); // Adjusted to handle multiple errors
  const [activitiesData, setActivitiesData] = useState([]);
  const [predefinedActivities] = useState([
    "Sleeping",
    "YouTube",
    "Laptop",
    "Mobile",
    "WhatsApp",
    "Study/Project",
    "Instagram",
    "Twitter",
    "Gaming",
    "Japanese",
    "Reading",
    "Guitar",
    "Manga",
  ]);

  const BACKEND_URL = "https://daily-tracker-backend.onrender.com";

  // Fetch the current date in IST format
  useEffect(() => {
    const currentDate = moment.tz("Asia/Kolkata").format("YYYY-MM-DD");
    setForm({ ...form, date: currentDate });

    const interval = setInterval(() => {
      setCurrentTime(moment().format("hh:mm:ss A")); // 12-hour format with AM/PM
    }, 1000); // Update the time every second

    fetchActivities(); // Fetch activities from the backend
  }, []);

  // Fetch activities from the backend
  const fetchActivities = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/activities`);
      setActivitiesData(response.data); // Store the response in activitiesData
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle number input for hours and minutes
  const handleNumberInput = (event) => {
    // Allow only numbers (0-9) and basic controls like backspace
    if (event.key !== "Backspace" && !/^\d$/.test(event.key)) {
      event.preventDefault(); // Prevent non-numeric input
    }
  };

  // Add a new activity to the list of activities to be added
  const handleAddActivity = () => {
    const totalMinutes =
      (parseInt(form.hours) || 0) * 60 + (parseInt(form.minutes) || 0);

    // Clear previous errors
    setError({ activity: "", time: "", customName: "" });

    if (!form.activity && !customActivity) {
      setError((prev) => ({
        ...prev,
        activity: "Please select or enter an activity.",
      }));
      return;
    }

    if (form.activity === "custom" && !customActivity) {
      setError((prev) => ({
        ...prev,
        customName: "Please enter a name for your custom activity.",
      }));
      return;
    }

    if (!(form.hours || form.minutes)) {
      setError((prev) => ({
        ...prev,
        time: "Please enter a valid time (hours or minutes).",
      }));
      return;
    }

    const activityToAdd = {
      date: form.date,
      activity: form.activity === "custom" ? customActivity : form.activity,
      timeSpent: totalMinutes,
    };

    setAllActivities((prev) => [...prev, activityToAdd]);
    setForm({ date: form.date, activity: "", hours: 0, minutes: 0 });
    setCustomActivity(""); // Clear the custom activity input
  };

  // Add a new custom activity to the list of predefined activities
  const handleAddNewActivity = () => {
    if (customActivity && !customActivitiesList.includes(customActivity)) {
      setCustomActivitiesList((prev) => [...prev, customActivity]);
      setCustomActivity("");
    }
  };

  // Handle adding all activities to the backend
  const handleAddAllActivities = async () => {
    const groupedActivities = allActivities.reduce((acc, curr) => {
      acc[curr.activity] = (acc[curr.activity] || 0) + curr.timeSpent;
      return acc;
    }, {});

    try {
      await axios.put(`${BACKEND_URL}/api/activities`, {
        date: moment(form.date).format("DD-MM-YYYY"),
        time: moment().format("hh:mm:ss A"),
        activities: groupedActivities,
      });
      setAllActivities([]); // Clear activities after sending them
      fetchActivities(); // Refresh the activity list from the backend
    } catch (error) {
      console.error("Error adding activities:", error);
    }
  };

  return (
    <div className="App">
      <h1>Daily Activity Tracker</h1>

      <form>
        <div className="date_time">
          <div>
            <label>Date :</label>
            <span>{moment(form.date).format("DD-MM-YYYY")}</span>
          </div>

          <div>
            <label>Time: </label>
            <span>{currentTime}</span>
          </div>
        </div>

        {/* Activity Selection */}
        <div className="set">
          <label className="label">Activity &nbsp;</label>
          <select
            name="activity"
            value={form.activity}
            onChange={handleChange}
            required
            className="area"
          >
            <option value="">Select Activity</option>
            {[...predefinedActivities, ...customActivitiesList].map(
              (activity, index) => (
                <option key={index} value={activity}>
                  {activity}
                </option>
              )
            )}
            <option value="custom">Other Activity</option>
          </select>
        </div>

        {/* Error message for activity */}
        {error.activity && <div className="error">{error.activity}</div>}

        {/* Custom Activity */}
        {form.activity === "custom" && (
          <div className="set">
            <label className="label">Name &nbsp;</label>
            <input
              className="area1"
              type="text"
              value={customActivity}
              onChange={(e) => setCustomActivity(e.target.value)}
              required
            />

            {/* Error message for custom activity name */}
          </div>
        )}
        {error.customName && <div className="error">{error.customName}</div>}
        {/* Time Input */}
        <div className="set">
          <label className="label">Time &nbsp; </label>
          <div>
            <input
              className="time"
              type="text"
              name="hours"
              placeholder="Hours"
              value={form.hours}
              onChange={handleChange}
              onKeyDown={handleNumberInput}
              required
            />
            <span>:</span>
            <input
              className="time"
              type="text"
              name="minutes"
              placeholder="Minutes"
              value={form.minutes}
              onChange={handleChange}
              onKeyDown={handleNumberInput}
              required
            />
          </div>
        </div>

        {/* Error message for time */}
        {error.time && <div className="error">{error.time}</div>}

        {/* Add More Button */}
        <div className="button">
          <button type="button" className="addmore" onClick={handleAddActivity}>
            Add
          </button>
        </div>
      </form>
      {allActivities.length > 0 && (
        <>
          <h2 className="set label1">List Of Activities</h2>
          <ol className="list">
            {allActivities.map((activity, index) => (
              <li key={index}>
                {activity.activity} - {Math.floor(activity.timeSpent / 60)}hr{" "}
                {activity.timeSpent % 60}min
              </li>
            ))}
          </ol>
        </>
      )}

      <div className="button">
        <button className="submit" onClick={handleAddAllActivities}>
          SUBMIT
        </button>
      </div>
    </div>
  );
}

export default App;
