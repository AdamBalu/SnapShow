import React from "react";
import { db } from "@/db";
import { genres } from "@/db/schema/genre";

const Page = async () => {
  const genreList = await db.select().from(genres);
  return (
    <div>
      {genreList.map(genre =>
        <div>{genre.name}</div>
      )}
    </div>
  );
};

export default Page;
