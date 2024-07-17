const MemberList = () => {
  return (
    <>
      {/* Class List Menu */}
      <article className="relative w-full h-fit my-1 border border-forth shadow-sm shadow-gray-400 rounded-sm hover:cursor-pointer hover:bg-white">
        <div className="flex flex-col h-fit p-2">
          <h3 className="text-md text-forth font-bold">{className}</h3>
          <p className="text-sm text-third italic font-sans ml-1">{subject}</p>
        </div>
      </article>
    </>
  );
};

export default MemberList;
