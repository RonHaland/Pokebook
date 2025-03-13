import { AnimatedCloseIcon } from "@/comps/animatedCloseIcon";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "dev page",
    description: "Development test page",
  };
export default function DevPage(){
    if (process.env.APP_ENVIRONMENT !== "dev")
        redirect("/");

    return <main>
        <div className="text-white w-80">
        <AnimatedCloseIcon />
        </div>
    </main>
}