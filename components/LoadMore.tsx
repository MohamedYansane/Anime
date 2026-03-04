"use client";

import { fetchAnime } from "@/app/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import AnimeCard from "./AnimeCard";

let page = 2; // we gonna update it each time we get a new view
export type AnimeCard = JSX.Element;
function LoadMore() {
  // the react intersection observer gonna tell us whwn we reaach a specific
  //point that gonna help us to render the next page
  const { ref, inView } = useInView();

  // after changing the server i'm getting Type 'AnimeProp[]' is not assignable to type 'ReactNode'.
  //Type 'AnimeProp[]' is not assignable to type 'Iterable<ReactNode>'.
  //The types returned by '[Symbol.iterator]().next(...)' are incompatible between these types.
  const [hasLoaded, setHasLoaded] = useState(false);

  //* to resolve it i'm gonna create a type of jsxElement instead of aniprop im gonna call it anicard above
  const [data, setData] = useState<AnimeCard[]>([]);

  useEffect(() => {
    if (inView && !hasLoaded) {
      // when we reach the bottom of the page we gonna fetch the next page
      // here we should replace the 1 with the next page number
      // and fetch the data
      fetchAnime(page).then((res) => {
        //we keep track the previous data and update at the same time
        //when we dont use the type of the res and data typescrip will complain
        //here we r using the type as an array of AnimeProp
        // cause we dont wanna get the any type or never type error of typescript
        setData([...data, ...res]);
        // page++;  im gona comment to not increment yet cause we want to show a demo of our bot
        // we increment the page number
        setHasLoaded(true);
      });
    }
    //je vais retire data dans la dependance pour eviter le probleme de la closure et le fait que data est une dependance qui change a chaque fois que on fetch les data et ca va causer un probleme de boucle infinie
  }, [inView, hasLoaded]);
  return (
    <>
      {/**we copy the entire code from the home page the code i paste is for all the subsequent for page 1 */}
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data}
      </section>
      {!hasLoaded && (
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
      )}
    </>
  );
}

export default LoadMore;
