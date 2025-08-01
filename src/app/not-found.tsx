"use client"

import I404Png from "@/assets/images/404.png";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Page404 = () => (
  <div className="nc-Page404">
    <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
      {/* HEADER */}
      <header className="text-center max-w-2xl mx-auto space-y-2">
        <Image width={800} height={600} src={I404Png} alt="not-found" />
        <span className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium">
          {`THE PAGE YOU WERE LOOKING FOR DOESN'T EXIST.`}{" "}
        </span>
        <div className="pt-8">
          <Button>
            <Link href={"/"}>Return Home Page</Link>
          </Button>
        </div>
      </header>
    </div>
  </div>
);

export default Page404;