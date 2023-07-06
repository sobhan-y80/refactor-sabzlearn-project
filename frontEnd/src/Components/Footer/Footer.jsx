import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* <!-- Start Footer --> */}
      <div className="footer">
        <div className="w-full flex flex-col gap-16 px-10">
          <div className="footer__desc">
            <div className="row">
              <div className="col-12">
                <h4 className="footer__desc-title hpc__title">
                  ضمانت سبز لرن برای کلیه محصولات آموزشی
                </h4>
                <p className="footer__desc-text">
                  وقتی تازه شروع به یادگیری برنامه نویسی کردم. یکی از مشکلاتی که
                  در فرآیند یادگیری داشتم، کمبود آموزش های خوب با پشتیبانی قابل
                  قبول بود که باعث شد اون موقع تصمیم بگیرم اگر روزی توانایی مالی
                  و فنی قابل قبولی داشتم یک وب سایت برای حل این مشکل راه اندازی
                  کنم! و خب امروز آکادمی آموزش برنامه نویسی سبزلرن به عنوان یک
                  آکادمی خصوصی فعالیت میکنه و این به این معنی هست که هر مدرسی
                  اجازه تدریس در اون رو نداره و باید از فیلترینگ های خاص آکادمی
                  سبزلرن رد شه! این به این معنی هست که ما برامون فن بیان و نحوه
                  تعامل مدرس با دانشجو بسیار مهمه! ما در آکادمی سبزلرن تضمین
                  پشتیبانی خوب و با کیفیت رو به شما میدیم . چرا که مدرسین وب
                  سایت سبزلرن حتی برای پشتیبانی دوره های رایگان شون هم هزینه
                  دریافت میکنند و متعهد هستند که هوای کاربر های عزیز رو داشته
                  باشند
                </p>
              </div>
            </div>
          </div>
          <div className="footer__widget">
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-12 md:col-span-3 footer-widget__quick-access">
                <div className="row">
                  <div className="col-6">
                    <div className="footer__widget-item">
                      <NavLink href="#">
                        فروشگاه
                        <span className="hpc__popular">محبوب</span>
                      </NavLink>
                    </div>
                    <div className="footer__widget-item">
                      <NavLink href="#"> ارتباط با ما </NavLink>
                    </div>
                    <div className="footer__widget-item">
                      <NavLink href="#"> دربـــاره ما </NavLink>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="footer__widget-item">
                      <NavLink className="footer-widget__link" href="#">
                        مقالات
                      </NavLink>
                    </div>
                    <div className="footer__widget-item">
                      <NavLink className="footer-widget__link" href="#">
                        قوانین و مقررات
                      </NavLink>
                    </div>
                    <div className="footer__widget-item">
                      <NavLink className="footer-widget__link" href="#">
                        پایتون
                        <span className="hpc__new">جدید</span>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-4 footer-widget__working-hours">
                <h3 className="footer-widget__title">ساعات کاری</h3>
                <div className="footer-widget__text">
                  <p className="row">شنبه تا چهارشنبه 8 صبح تا 18 عصر</p>
                  <p className="row">پنج شنبه‌ها ساعت 8 صبح تا 12 ظهر</p>
                </div>
              </div>
              <div className="col-span-8 md:col-span-3  footer-widget__contact-us">
                <h3 className="footer-widget__title">ارتباط با ما</h3>
                <div className="footer-widget__text">
                  <div className="flex gap-5">
                    <span className="footer-widget-email-name">ایمیل</span>
                    <span className="footer-widget-email-adress">
                      <NavLink href="#" className="">
                        soobhanybi@gmail.com
                      </NavLink>
                    </span>
                  </div>
                  <div className="flex gap-5">
                    <span className="footer-widget-phone-name">
                      شماره همراه
                    </span>
                    <span className="footer-widget-phone-number">
                      09396007232
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-4 md:col-span-2 footer-widget__trust-symbol">
                <div className="footer-widget__namda-box">
                  <NavLink
                    className="footer-widget__link"
                    href="https://trustseal.enamad.ir/?id=274698&code=HYeEYWQTRWrm1YcxgLhn"
                  >
                    {/* <img src="images/namad/enamad-two-star.png" alt="" /> */}
                    <svg
                      width="104"
                      height="150"
                      viewBox="0 0 104 150"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                      <rect width="104" height="150" fill="url(#pattern0)" />
                      <defs>
                        <pattern
                          id="pattern0"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            xlinkHref="#image0_0_2"
                            transform="scale(0.00961538 0.00666667)"
                          />
                        </pattern>
                        <image
                          id="image0_0_2"
                          width="104"
                          height="150"
                          xlinkHref="data:image/png;base64,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"
                        />
                      </defs>
                    </svg>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-center footer__copyright">
            <p className="text-sm">
              این قالب صرفا جهت نمونه کار است و از سایت
              <NavLink
                href="https://sabzlearn.ir/"
                className="footer__link hpc__popular"
              >
                سبزلرن
              </NavLink>
              میباشد
            </p>
          </div>
        </div>
      </div>
      {/* <!-- Finish Footer --> */}
    </>
  );
};

export default Footer;
