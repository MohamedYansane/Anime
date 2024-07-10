"use client";

import { fetchAnime } from "@/app/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AnimeCard, { AnimeProp } from "./AnimeCard";

let page = 2; // we gonna update it each time we get a new view

function LoadMore() {
  // the react intersection observer gonna tell us whwn we reaach a specific
  //point that gonna help us to render the next page
  const { ref, inView } = useInView();
  const [data, setData] = useState<AnimeProp[]>([]);

  useEffect(() => {
    if (inView) {
      // when we reach the bottom of the page we gonna fetch the next page
      // here we should replace the 1 with the next page number
      // and fetch the data
      fetchAnime(page).then((res) => {
        //we keep track the previous data and update at the same time
        //when we dont use the type of the res and data typescrip will complain
        //here we r using the type as an array of AnimeProp
        // cause we dont wanna get the any type or never type error of typescript
        setData([...data, ...res]);
        page++; // we increment the page number
      });
    }
  }, [inView, data]);
  return (
    <>
      {/**we copy the entire code from the home page the code i paste is for all the subsequent for page 1 */}
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data.map((item: AnimeProp, index: number) => (
          <AnimeCard key={item.id} anime={item} index={index} />
        ))}
      </section>
      <section className="flex justify-center items-center w-full">
        {/** now we r giving a ref to our div not it gonna know */}
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;
