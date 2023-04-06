import React from "react";
import Link from "next/link";
import { footerList } from "@/utils/constants";

interface IFooterItem {
  text: string;
  route: string;
}

const List = ({ items }: { items: IFooterItem[] }) => {
  return (
    <div className={"flex flex-wrap gap-2 "}>
      {items.map(({ text, route }, index) => (
        <Link key={index} href={route}>
          <p className={"text-gray-400 text-sm hover:underline cursor-pointer"}>
            {text}
          </p>
        </Link>
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <div className={"mt-4 hidden xl:block"}>
      <List items={footerList} />
      <p className={"text-gray-400 text-sm mt-5"}>
        {"Developed By Samaksh Mittal @ 2023 TypeTik"}
      </p>
    </div>
  );
};

export default Footer;
