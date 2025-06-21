import React from 'react';

//Taken from Tailblocks
function Footer() {
  return (
    <footer className='bg-[#041922] p-10 flex flex-col items-center gap-5'>

    <h2 className='text-4xl text-amber-400 bg-blend-overlay w-fit underline decoration-amber-400 '>
      <a href='https://github.com/arhamkac' target='_blank' rel="noopener noreferrer">
        Creator's GitHub
      </a>
    </h2>

    <p>Copyright(c) 2025 MovieZone. All rights reserved</p>
    </footer>
  );
}

export default Footer;
