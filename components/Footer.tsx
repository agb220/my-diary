import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-purple-400 w-full">
      <div className="py-8">
        <div className="mb-4 text-md text-gray-400 text-center">
          Copyright © 2025 Anna Balabon. All Rights Reserved
        </div>
        <ul className="flex gap-4 justify-center items-center text-md text-gray-300">
          <li className="hover:text-gray-400 hover:underline duration-300">
            <a
              href="https://www.linkedin.com/in/anna-balabon-b29623b9/"
              target="_blank"
            >
              Linkedin
            </a>
          </li>
          <li className="hover:text-gray-400 hover:underline duration-300">
            <a href="https://github.com/agb220" target="_blank">
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
