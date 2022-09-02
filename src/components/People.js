import React, { useState } from "react";
import { useQuery } from "react-query";
import Person from "./Person";

const fetchPeople = async (key) => {
  const res = await fetch(
    `http://swapi.dev/api/people/?page=${key.queryKey[1]}`
  );
  return res.json();
};

const People = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(["people", page], fetchPeople, {
    keepPreviousData: true,
  });
  console.log(data);

  return (
    <div>
      <h2>People</h2>
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
            {data.results.map((person) => (
              <Person key={person.name} person={person} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default People;
