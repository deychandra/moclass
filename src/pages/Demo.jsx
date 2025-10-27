import React from "react";

const Demo = () => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div>
            <label className="font-medium text-sm text-[#333] mb-1 block">
              Full name
            </label>
            <input
              name="name"
              className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mt-3">
            <div>
              <label className="font-medium text-sm text-[#333] mb-1 block">
                Email
              </label>
              <input
                name="email"
                className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                type="email"
              />
            </div>

            <div>
              <label className="font-medium text-sm text-[#333] mb-1 block">
                Phone
              </label>
              <input
                name="phone"
                className="shadow-none p-[11px] bg-white text-[#484848] border border-[#DDD] rounded-[3px] text-[14px] w-full outline-0 "
                type="tel"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Demo;
