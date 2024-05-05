import React from "react";
import { Event } from "@/db/schema/events";
import Image from "next/image";

type EventDetailProps = {
  event: Event;
};

export const EventDetail = ({ event }: EventDetailProps) => {

  return (
    <div className="w-full mt-16 font-extrabold bg-zinc-900 bg-opacity-70 rounded-2xl text-white flex flex-col gap-10 items-center">

    </div>
  );
};