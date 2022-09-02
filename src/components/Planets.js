import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async (key) => {
  console.log(key.queryKey[1]);
  const res = await fetch(
    `http://swapi.dev/api/planets/?page=${key.queryKey[1]}`
  );
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(["planets", page], fetchPlanets, {
    keepPreviousData: true,
  }); // keepPreviousDate do the same with usePaginationQuery it will keep your prev data while data is fetching
  console.log(data);

  return (
    <div>
      <h2>Planets</h2>
      {status === "loading" && <div>Loading data...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <>
          <button
            disabled={data.previous ? false : true}
            onClick={() => setPage(data.previous ? page - 1 : page)}
          >
            Previous page
          </button>
          <span>{page}</span>
          <button
            disabled={data.next ? false : true}
            onClick={() => setPage(data.next ? page + 1 : page)}
          >
            Next page
          </button>
          <div>
            {data.results.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
