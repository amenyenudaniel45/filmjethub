"use client";
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "@/context";
import { AuthContextProps } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [userOpen, setUserOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<any>("");
  const { auth, handleSignOut } = useContext(AuthContext) as AuthContextProps;
  const router = useRouter();

  const handleSubmit = (event: any) => {
    event?.preventDefault();
    console.log(searchTerm);
    router.push(`/Search/${searchTerm}`);
  };
  return (
    <section>
      <nav className="paddingNav gap-[1rem] bg-black py-2 flex items-center justify-between">
        <Link href={"/home"}>
          <h1 className="cursor-pointer text-red font-bold poppins lg:text-[2.5rem] md:text-[2rem] sm:text-[1.5rem] text-[1.2rem]">
            FilmJetHub
          </h1>
        </Link>
        <div className="flex items-center gap-[20px] sm:flex hidden">
          <Link
            href={"/home"}
            className="text-white lg:text-[18px] text-[16px] mont hover:text-red transition"
          >
            Movies
          </Link>
          <Link
            href={"/tvshows"}
            className="text-white lg:text-[18px] text-[16px] mont hover:text-red transition"
          >
            Tv Shows
          </Link>
          <section>
            <form
              onSubmit={handleSubmit}
              className="w-[400px] flex relative items-center justify-center  md:flex hidden"
            >
              <input
                className="w-full h-[40px] pl-3 outline-none border border-red bg-transparent rounded-[10px] text-white text-[18px]"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="cursor-pointer absolute right-[8px]"
              >
                <Image
                  src={"/search.svg"}
                  width={30}
                  height={30}
                  alt="search-icon"
                />
              </button>
            </form>
          </section>
        </div>
        <Image
          src={"/search.svg"}
          width={30}
          height={30}
          alt="search-icon"
          className="cursor-pointer md:hidden flex"
          onClick={() => setSearchOpen(!searchOpen)}
        />
        <Image
          src={"/menu.svg"}
          width={30}
          height={30}
          alt="search-icon"
          className="cursor-pointer sm:hidden flex"
          onClick={() => setToggleMenu(!toggleMenu)}
        />
        <div className="lg:flex hidden">
          {auth?.currentUser?.photoURL ? (
            <Image
              src={auth?.currentUser?.photoURL}
              width={35}
              height={35}
              alt="profile"
              className="cursor-pointer rounded-full"
              onClick={() => setUserOpen(!userOpen)}
            />
          ) : (
            <Image
              src={"/profile.svg"}
              width={35}
              height={35}
              alt="profile"
              className="cursor-pointer"
              onClick={() => setUserOpen(!userOpen)}
            />
          )}
        </div>
      </nav>

      {userOpen && (
        <button
          onClick={handleSignOut}
          className="outline-none border-none py-2 sm:px-4  px-3 text-white  mont bg-red mt-[2rem] sm:text-[22px] text-[18px] font-bold rounded-[5px] hover:bg-white hover:text-black transition absolute right-[20px] top-[30px]"
        >
          Sign Out
        </button>
      )}

      {searchOpen && (
        <section className="sm:px-[6rem] px-[2rem] py-2 bg-gray absolute left-0 top-[50px] w-[100%] h-[60px] md:hidden block">
          <form
            onSubmit={handleSubmit}
            className="flex relative items-center justify-center"
          >
            <input
              className="w-full h-[40px] pl-3 outline-none border border-red bg-transparent rounded-[10px] text-white text-[18px]"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="cursor-pointer absolute right-[8px]"
            >
              <Image
                src={"/search.svg"}
                width={30}
                height={30}
                alt="search-icon"
              />
            </button>
          </form>
        </section>
      )}

      {toggleMenu && (
        <div className="bg-gray rounded-[10px] w-[40%] h-[100px] absolute right-[10px]  flex-col items-center justify-center gap-[1rem] sm:hidden flex">
          <Link
            onClick={() => setToggleMenu(false)}
            href={"/home"}
            className="text-white lg:text-[18px] text-[16px] mont hover:text-red transition"
          >
            Movies
          </Link>
          <Link
            onClick={() => setToggleMenu(false)}
            href={"/tvshows"}
            className="text-white lg:text-[18px] text-[16px] mont hover:text-red transition"
          >
            Tv Shows
          </Link>
        </div>
      )}
    </section>
  );
};

export default Navbar;
