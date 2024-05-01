import Link from "next/link"

export default function Footer(){
  return(
    <footer className="bg-sky-950 pt-2 fixed bottom-0 w-full text-sm">
      <div className="flex flex-row justify-evenly">
        <div className="flex flex-col justify-center ">
          <Link href={"https://ewm.employnet.com/"}>EWM.employnet.com</Link>
        </div>
        <div className="flex flex-col justify-center">
          <Link href={"/privacy"}>Privacy</Link>
        </div>
        <div className="flex flex-col justify-center">
          <p>App Version: 0.0.0.1</p>
        </div>
      </div>
      <div className="w-full flex py-1 justify-center">
        &copy; {new Date().getFullYear()} Copyright:{' - '}
        <p>Employnet Workforce Management</p>
      </div>
    </footer>
  )
}