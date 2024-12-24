import React from 'react';
import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className="bg-[#EDEDED] text-[#000000] py-4 border-t border-[#EDEDED]"> 
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between">

          <div className="mb-4 md:mb-0"> 
            <h2 className="text-2xl text-[#d4d4d4] font-semibold">LOCKER</h2>
          </div>

          <ul className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0"> 
            <li><a href="#About" className="text-sm text-[#000000] hover:underline">About</a></li>
            <li><a href="#Help" className="text-sm text-[#000000] hover:underline">Help</a></li>
            <li><a href="#Contact" className="text-sm text-[#000000] hover:underline">Contact</a></li>
          </ul>

        </div>

        <div className="flex items-center justify-between mt-6 mb-4 md:mb-0"> 
          <p className="text-xs opacity-90">© Copyright 2023, All Rights Reserved by LOCKER group</p>

          <div className="flex gap-3">
            <a href="https://facebook.com" className="bg-[#EDEDED] p-3 rounded-full">
              <FacebookOutlined className="text-[#000000] w-6 h-6" />
            </a>
            <a href="https://instagram.com" className="bg-[#EDEDED] p-3 rounded-full">
              <InstagramOutlined className="text-[#000000] w-6 h-6" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
