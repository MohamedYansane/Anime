"use server";

import AnimeCard, { AnimeProp } from "@/components/AnimeCard";

export const fetchAnime = async (page: number) => {
  // we can pass a query here the page number and the max limit here
  // we define the max limit as 8 and order = popularity
  const response = await fetch(
    `https://shikimori.one/api/animes?page=${page}&limit=8&order=popularity`
  );
  const data = await response.json();
  console.log(data);
  // ca devenait lent au lieu de le map inside page i change action from ts to tsx and return directly what i want
  return data.map((item: AnimeProp, index: number) => (
    <AnimeCard key={item.id} anime={item} index={index} />
  ));
};
