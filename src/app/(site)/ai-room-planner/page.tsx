import React from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Công nghệ AI | Neuronest",
  description: "Ướm thử đồ nội thất vào căn phòng của bạn với công nghệ AI tiên tiến.",
};

const AiRoomPlannerPage = () => {
  return (
    <main>
      <Breadcrumb title="Công nghệ AI" pages={["Công nghệ AI"]} />
      
      <section className="py-20 lg:py-25">
        <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col gap-10">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-dark mb-4">
                Trải nghiệm ướm thử nội thất AI
              </h2>
              <p className="text-body-color max-w-2xl mx-auto">
                Công nghệ AI tiên tiến của chúng tôi cho phép bạn hình dung đồ nội thất trong chính căn phòng của mình trước khi mua. 
                Chỉ cần tải lên ảnh căn phòng của bạn và chọn sản phẩm, AI sẽ giúp bạn sắp xếp và phối cảnh hoàn hảo.
              </p>
            </div>

            <div className="bg-gray-100 rounded-lg p-10 text-center border-2 border-dashed border-gray-300">
              <div className="mb-6">
                <svg
                  className="w-16 h-16 mx-auto text-blue"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-dark mb-2">
                Tính năng đang được phát triển
              </h3>
              <p className="text-gray-500 mb-6">
                Chúng tôi đang hoàn thiện công nghệ này để mang đến trải nghiệm tốt nhất cho bạn.
                <br />
                Vui lòng quay lại sau!
              </p>
              <button className="bg-blue text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-all font-medium">
                Sản phẩm mới
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AiRoomPlannerPage;
