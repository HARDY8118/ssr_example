import React from "react";

function List({ items,redirect }) {
  return (
    <>
      <a href={redirect}><h1>Items</h1></a>
      <ul>
        {items.map((i, k) => (
          <li key={k}>{i}</li>
        ))}
      </ul>
    </>
  );
}

export default List;
