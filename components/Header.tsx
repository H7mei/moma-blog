function header() {
  return (
    <div className='z-50 bg-black text-white'>
      <div className='mx-auto flex h-11 max-w-7xl items-center justify-between'>
        <div className='flex items-center'>
          <div className='ml-10 cursor-not-allowed text-xl uppercase'>moma</div>
          <ul className='ml-10 flex'>
            <li className='mr-3 h-6 hover:border-b-2'>
              <a href='/'>blog</a>
            </li>
            <li className='mr-3 h-6 hover:border-b-2'>
              <a href='/about'>about</a>
            </li>
          </ul>
        </div>
        <div className='group cursor-pointer'>
          <h1 className='mr-10 group-hover:hidden'>search</h1>
          <h1 className='mr-10 hidden bg-white p-1 text-black group-hover:inline-block'>
            working on it ^,^
          </h1>
        </div>
      </div>
    </div>
  );
}

export default header;
