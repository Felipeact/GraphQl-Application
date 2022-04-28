import { Header } from "../components/Header";
import { MainContext } from "../components/MainContext";
import { UserCards } from "../components/UserCards";



export function Home() {
  return (
    <div className="bg-[#181515]">
      <Header />
      <MainContext />
      <UserCards />
    </div>
  )
}