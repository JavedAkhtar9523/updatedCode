// import React, { useState } from "react";
// import Card from "../../pages/Card/Card";

// const ActivitySection = ({ activities }) => {

//   const [selectedFilter, setSelectedFilter] = useState("all");

//   const filterActivities = () => {
//     if (selectedFilter === "all") {
//       return activities;
//     } else {
//       return activities.filter(activity => activity.category === selectedFilter);
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <div className="text-start m-1 ps-4 fs-4 fw-bolder Activities">
//         <h3 className="fs-5 fw-semibold">Activities</h3>
//       </div>
//       {/* Filter buttons */}
//       <div className="d-flex flex-wrap my-3 ms-1  ">
//         <button
//         style={{width:"23%"}}
//           className={`btn btn-outline-secondary btn-sm m-1 ${selectedFilter === "all" ? "active" : ""}`}
//           onClick={() => setSelectedFilter("all")}
//         >
//           All
//         </button>
//         <button
//         style={{width:"23%"}}
//           className={`btn btn-outline-secondary btn-sm m-1 ${selectedFilter === "nature" ? "active" : ""}`}
//           onClick={() => setSelectedFilter("nature")}
//         >
//           Post
//         </button>
//         <button
//         style={{width:"23%"}}
//           className={`btn btn-outline-secondary btn-sm m-1 ${selectedFilter === "animals" ? "active" : ""}`}
//           onClick={() => setSelectedFilter("animals")}
//         >
//           Repost
//         </button>
//         <button
//         style={{width:"23%"}}
//           className={`btn btn-outline-secondary btn-sm m-1 ${selectedFilter === "show" ? "active" : ""}`}
//           onClick={() => setSelectedFilter("show")}
//         >
//          Show
//         </button>

//       </div>

//       <div className="d-flex flex-wrap">
//         {filterActivities().map((activity, index) => (
//           <div className=" mt-1" key={index}>
//             <Card image={activity.image} title={activity.title} description={activity.description} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ActivitySection;
// -------------------------------------

import React, { useState } from "react";
import Card from "../../pages/Card/Card";

const ActivitySection = ({ activities }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);

  const filterActivities = () => {
    if (selectedFilter === "all") {
      return activities;
    } else {
      return activities.filter(
        (activity) => activity.category === selectedFilter
      );
    }
  };

  const chunks = filterActivities().reduce(
    (acc, _, i, arr) => (i % 4 === 0 ? [...acc, arr.slice(i, i + 4)] : acc),
    []
  );

  const handlePrev = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setCurrentSlide((prev) => Math.min(prev + 1, chunks.length - 1));

  return (
    <div className="container-fluid">
      <div className="text-start m-1 ps-4 fs-4 fw-bolder Activities">
        <h3 className="fs-5 fw-semibold">Activities</h3>
      </div>
      {/* Filter buttons */}
      <div className="d-flex flex-wrap my-3 ms-1">
        <button
          style={{ width: "23%" }}
          className={`btn btn-outline-secondary btn-sm m-1 ${
            selectedFilter === "all" ? "active" : ""
          }`}
          onClick={() => setSelectedFilter("all")}
        >
          All
        </button>
        <button
          style={{ width: "23%" }}
          className={`btn btn-outline-secondary btn-sm m-1 ${
            selectedFilter === "nature" ? "active" : ""
          }`}
          onClick={() => setSelectedFilter("nature")}
        >
          Post
        </button>
        <button
          style={{ width: "23%" }}
          className={`btn btn-outline-secondary btn-sm m-1 ${
            selectedFilter === "animals" ? "active" : ""
          }`}
          onClick={() => setSelectedFilter("animals")}
        >
          Repost
        </button>
        <button
          style={{ width: "23%" }}
          className={`btn btn-outline-secondary btn-sm m-1 ${
            selectedFilter === "show" ? "active" : ""
          }`}
          onClick={() => setSelectedFilter("show")}
        >
          Show
        </button>
      </div>

      {selectedFilter === "all" ? (
        <div className="position-relative">
          <div className="carousel-inner">
            {chunks.map((chunk, index) => (
              <div
                className={`carousel-item ${
                  index === currentSlide ? "active" : ""
                }`}
                key={index}
              >
                <div className="d-flex justify-content-between">
                  {chunk.map((activity, idx) => (
                    <div className="col-3" key={idx}>
                      <Card
                        image={activity.image}
                        title={activity.title}
                        description={activity.description}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {chunks.length > 1 && (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                onClick={handlePrev}
                disabled={currentSlide === 0}
              >
                <span
                  className="carousel-control-prev-icon"
                  style={{
                    marginRight: "70px",
                    marginBottom: "80px",
                    backgroundColor: "black",
                  }}
                ></span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                onClick={handleNext}
                disabled={currentSlide === chunks.length - 1}
              >
                <span
                  className="carousel-control-next-icon"
                  style={{
                    marginLeft: "110px",
                    marginBottom: "80px",
                    backgroundColor: "black",
                  }}
                ></span>
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="d-flex flex-wrap">
          {filterActivities().map((activity, index) => (
            <div className="col-3 mt-1" key={index}>
              <Card
                image={activity.image}
                title={activity.title}
                description={activity.description}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivitySection;
