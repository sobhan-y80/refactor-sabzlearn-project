import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* <!-- Start Footer --> */}
      <div className="footer hpc__section">
        <div className="w-full flex flex-col gap-16">
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
                    <img src="images/namad/enamad-two-star.png" alt="" />
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
