import Link from "next/link"

export default function Footer(){
  return(
    <footer className="bg-sky-950 pt-2 fixed bottom-0 w-full">
      <div className="flex justify-evenly">
        <div className="w-1/3 flex justify-center">
          <Link href={"https://ewm.employnet.com/"}>EWM.employnet.com</Link>
        </div>
        <div className="w-1/3 flex justify-center">
          <Link href={"/privacy"}>Privacy</Link>
        </div>
        <div className="w-1/3 flex justify-center">
          <p>App Version: 0.0.0.1</p>
        </div>
      </div>
      <div className="w-full flex m-2 pt-2 justify-center">
        &copy; {new Date().getFullYear()} Copyright:{' - '}
        <p>Employnet Workforce Management</p>
      </div>
    </footer>
  )
}