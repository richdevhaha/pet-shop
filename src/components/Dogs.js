import React from "react";
import Resource from "./Resource";

const Dogs = () => {
  const webURL =
    "https://api.thedogapi.com/v1/images/search/?limit=5&page=100&order=DESC";

  const render = (data) => {
    if (data.loading === true) return <div className="loader"></div>;

    console.log("Got the data", data);

    return data.trans.map((cat) => (
      <div key={cat.id}>
        <img className="image" src={cat.url} alt="cat img" />
      </div>
    ));
  };

  return (
    <div>
      <Resource path={webURL} render={render} />
    </div>
  );
};

export default Dogs;
