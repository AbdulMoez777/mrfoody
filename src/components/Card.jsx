import React from "react";

function Card(props) {
  console.log("Card props data:", props);
  return (
    <div className="w-[260px] shrink-0 grow">
      <div className="h-[180px] rounded-[15px] overflow-hidden relative">
        <img
          src={"http://localhost:5000/images/" + props.image}
          className="w-full h-full object-cover "
          alt=""
        />
        <div className="image-overlay absolute w-full h-full top-0 flex items-end p-2 text-white text-[23px] font-bold tracking-tighter">
          {props.offer}
        </div>
      </div>
    </div>
  );
}

export default Card;
