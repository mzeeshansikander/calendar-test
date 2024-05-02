import React from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

// Icons
import { RiLogoutCircleLine } from "react-icons/ri";


const Navbar = () => {
  return (
    <>
      <div className="w-full h-[10dvh] border-2 bg-gray-200 text-2xl font-bold p-5 flex items-center justify-between">
        <Link to="/">HOME</Link>
        {/*  */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="hover:cursor-pointer">
                {/* Profile Section */}
              <Avatar>
                <AvatarImage
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqh0Y-5CAdrEpHc6Wp_Od1YD-a_LWthUrMhT4OwJx5uQ&s"
                  alt=""
                />
                <AvatarFallback>W</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-3 lg:mr-11 mr-8">
            <DropdownMenuItem>
              {/* <RiInboxArchiveFill className="mr-2 h-[24px] w-[24px] text-appTheme" /> */}
              <span className="hover:bg-none font-fontPrimary text-[18px] font-medium text-[#9A9A9A]">
                example@gmail.com
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RiLogoutCircleLine className="mr-2 h-[24px] w-[24px] text-appTheme" />
              <span className="font-fontPrimary text-[18px] font-medium text-[#9A9A9A]">
                Logout
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default Navbar;
