// import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function HomePage() {
  // const homePageSession =await auth()
  // // console.log("homePageSession ",homePageSession);
  
  // if(!homePageSession){
  //   redirect("/auth/login")
  // }
  //   redirect("/dashboard")

   redirect("/auth/login");
}

export default HomePage;