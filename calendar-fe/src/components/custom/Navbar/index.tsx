// React
import React from "react";
import { Link, useNavigate } from "react-router-dom";

// Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

// Icons
import { RiLogoutCircleLine } from "react-icons/ri";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../../redux/slices/user.slice";

// Toast
import toast from "react-hot-toast";

const Navbar = () => {
  // user (redux)
  const { user } = useSelector((state: any) => state.userSlice);

  // Dispatch
  const dispatch = useDispatch();

  // Navigate
  const navigate = useNavigate();

  // Logout Click Fn
  const handleLogout = () => {
    dispatch(resetUser());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <>
      <div className="w-full h-[10dvh] border-2 bg-gray-200 text-2xl font-bold p-5 flex items-center justify-end">
        {/* <Link to="/">HOME</Link> */}
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
                {user?.email ?? "N/A"}
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
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
