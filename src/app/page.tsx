
import { redirect } from "next/navigation";

async function HomePage() {

   redirect("/auth/login");
}

export default HomePage;