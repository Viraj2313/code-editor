import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
export default function Navbar() {
  return (
    <nav className="flex p-4 shadow-md justify-between items-center">
      <ul className="flex space-x-4 text-xl md:text-2xl">
        <li>
          <Link href="/">Code</Link>
        </li>
      </ul>
      <div className="flex gap-4 ">
        <Link href="/auth/login">
          <button className="px-4 py-2 bg-blue-500 rounded-md cursor-pointer text-white">
            Login
          </button>
        </Link>
        <Link href="/auth/signup">
          {" "}
          <button className="px-4 py-2 bg-blue-500 rounded-md cursor-pointer text-white">
            Sign Up
          </button>
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
