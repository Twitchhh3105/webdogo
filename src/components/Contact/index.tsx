"use client";
import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { useLanguage } from "@/hooks/useLanguage";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <>
      <Breadcrumb title={t.contact} pages={[t.contact]} />

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col xl:flex-row gap-7.5">
            <div className="xl:max-w-[370px] w-full bg-white rounded-xl shadow-1 overflow-hidden">
              <div className="py-5 px-4 sm:px-7.5 border-b border-gray-3 bg-gray-50">
                <p className="font-bold text-xl text-dark">
                  {t.contactInfo}
                </p>
              </div>

              <div className="p-4 sm:p-7.5 flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue/5 flex items-center justify-center shrink-0 text-blue">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark mb-1">{t.phone}</h4>
                    <p className="text-dark-4 text-sm">(+84) 123 456 789</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue/5 flex items-center justify-center shrink-0 text-blue">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark mb-1">Email</h4>
                    <p className="text-dark-4 text-sm">support@neuronest.vn</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue/5 flex items-center justify-center shrink-0 text-blue">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark mb-1">{t.address}</h4>
                    <p className="text-dark-4 text-sm">{t.footerAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:max-w-[770px] w-full bg-white rounded-xl shadow-1 p-4 sm:p-7.5 xl:p-10">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                  <div className="w-full">
                    <label htmlFor="firstName" className="block mb-2.5 font-medium text-dark">
                      {t.firstName} <span className="text-red">*</span>
                    </label>

                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder={t.firstName}
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-blue focus:bg-white focus:shadow-input transition-all"
                    />
                  </div>

                  <div className="w-full">
                    <label htmlFor="lastName" className="block mb-2.5 font-medium text-dark">
                      {t.lastName} <span className="text-red">*</span>
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder={t.lastName}
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-blue focus:bg-white focus:shadow-input transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                  <div className="w-full">
                    <label htmlFor="subject" className="block mb-2.5 font-medium text-dark">
                      {t.subject}
                    </label>

                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      placeholder={t.typeSubject}
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-blue focus:bg-white focus:shadow-input transition-all"
                    />
                  </div>

                  <div className="w-full">
                    <label htmlFor="phone" className="block mb-2.5 font-medium text-dark">
                      {t.phone}
                    </label>

                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder={t.phone}
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-blue focus:bg-white focus:shadow-input transition-all"
                    />
                  </div>
                </div>

                <div className="mb-7.5">
                  <label htmlFor="message" className="block mb-2.5 font-medium text-dark">
                    {t.message}
                  </label>

                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    placeholder={t.typeMessage}
                    className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-blue focus:bg-white focus:shadow-input transition-all"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="inline-flex font-bold text-white bg-blue py-4 px-10 rounded-lg ease-out duration-200 hover:bg-blue-dark shadow-lg hover:shadow-blue/20 transition-all transform hover:-translate-y-1 active:translate-y-0"
                >
                  {t.sendMessage}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
