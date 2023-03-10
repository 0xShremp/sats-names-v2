import classNames from "classnames";
import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import IconCheck from "../icons/check";
import IconList, { type IconProps } from "../icons/list";
import IconSearch from "../icons/search";
import IconWand from "../icons/wand";
import logo from "../images/logo.jpg";
import ResponsiveSizes from "./responsive-sizes";

export interface LayoutProps {
  children?: React.ReactNode;
}

const navData: {
  id: string;
  title: string;
  target: string;
  icon: React.FC<IconProps>;
}[] = [
  {
    id: "5A8D11E1-0530-4E95-A26E-7502BEC122AB",
    title: "About",
    target: "/about",
    icon: IconWand,
  },
  {
    id: "7E9E6873-E010-4C39-92AE-71D8FBC55C28",
    title: "List",
    target: "/list",
    icon: IconList,
  },
  {
    id: "0409E175-53FF-4C59-850E-4575773DFFC7",
    title: "Search",
    target: "/search",
    icon: IconSearch,
  },
  {
    id: "03D13AF7-EA10-49EE-8ECD-480AB16FBE3C",
    title: "First?",
    target: "/am-i-first",
    icon: IconCheck,
  },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      <div className="flex flex-col flex-grow h-full min-h-screen container-7xl md:flex-row">
        <header className="flex flex-row justify-between flex-shrink-0 w-full pt-4 space-x-3 md:w-16 md:flex-col md:justify-start md:space-x-0 md:space-y-4 md:border-b md:py-6">
          <Link to="/" className="shrink-0">
            <img
              src={logo}
              alt="Sats Names"
              className="w-12 h-12 border border-indigo-100 rounded-full aspect-square md:h-16 md:w-16"
            />
            <h1 className="hidden mt-1 text-sm font-bold leading-none text-center text-gray-700 md:block">
              Sats Names
            </h1>
          </Link>
          <nav className="flex flex-row items-center justify-center md:flex-col md:space-y-2 md:space-x-0">
            {navData.map((navItem) => (
              <NavLink
                key={navItem.id}
                to={navItem.target}
                className={({ isActive }) =>
                  classNames([
                    "flex flex-row items-center justify-center space-x-1 bg-white p-2 text-sm",
                    "md:h-16 md:w-16 md:flex-col md:space-y-1 md:space-x-0 md:rounded-xl md:p-6",
                    "border border-indigo-100 hover:border-indigo-200",
                    "transition-colors",
                    "first-of-type:rounded-l-lg -mr-px",
                    "last-of-type:rounded-r-lg",
                    {
                      "!border-indigo-500 z-10": isActive,
                    },
                  ])
                }
              >
                <div className="text-gray-500">
                  {<navItem.icon className="w-5 h-5 md:h-6 md:w-6" />}
                </div>
                <div className="text-xs text-gray-700 md:text-xs">
                  {navItem.title}
                </div>
              </NavLink>
            ))}
          </nav>
        </header>
        <main className="relative flex flex-col flex-grow w-full min-h-full py-4 md:ml-6 md:flex-grow-0 md:py-6">
          <Outlet />
        </main>
      </div>
      <ResponsiveSizes />
    </div>
  );
};

export default Layout;
