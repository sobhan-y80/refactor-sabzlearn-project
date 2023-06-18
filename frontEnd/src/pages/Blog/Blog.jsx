import React from "react";
import "./Blog.css";
import Header from "../../Components/Header/Header";
import BreadCrumb from "../../Components/BreadCrumb/BreadCrumb";
import Footer from "../../Components/Footer/Footer";

const Blog = () => {
  return (
    <>
      <Header></Header>
      <BreadCrumb></BreadCrumb>

      {/* <!-- Start Main --> */}
      <main className="main">
        <div className="w-full px-10">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 md:col-span-8 order-2 md:order-1">
              <div className="main__content">
                <div className="article">
                  <div className="article__header">
                    <div className="article-header__img-wrapper">
                      <img
                        src="images/blog/html.png"
                        alt="html"
                        className="article-hader__img object-contain"
                      />
                    </div>
                    <div className="article-header__category">
                      <ul className="article-header__category-list">
                        <li className="article-header__category-item hpc__category-item">
                          <a href="#" className="article-header__link">
                            اچ تی ام ال
                          </a>
                        </li>
                        <li className="article-header__category-item hpc__category-item">
                          <a href="#" className="article-header__link">
                            طراحی سایت
                          </a>
                        </li>
                        <li className="article-header__category-item hpc__category-item">
                          <a href="#" className="article-header__link">
                            سی اس اس
                          </a>
                        </li>
                        <li className="article-header__category-item hpc__category-item">
                          <a href="#" className="article-header__link">
                            جاوا اسکریپت
                          </a>
                        </li>
                      </ul>
                    </div>
                    <h1 className="article-header__title">کد پاپ آپ Html</h1>
                    <div className="hpc__entry-divider"></div>
                    <div className="article-header__article-info">
                      <div className="article-info__author">
                        <span className="article-info__author-name">
                          نویسنده :
                        </span>
                        <span className="article-info__author-text">
                          محمد امین سعیدی راد
                        </span>
                      </div>
                      <div className="article-info__published">
                        <span className="article-info__published-name">
                          تاریخ انتشار:
                        </span>
                        <span className="article-info__published-text">
                          2022/01/09
                        </span>
                      </div>
                    </div>
                    <p className="article-header__desc hpc__paragrapg">
                      کد پاپ آپ Html اگر با وب سایت های مختلف سر و کار داشته
                      باشید و روزانه به وب سایت های متفاوتی مراجعه کنید، قطعا یک
                      باکسی (Box) مشاهده کرده اید که برای نمایش پیغام خاصی باز
                      می شود. به همین باکس یا صفحه ای که برای نمایش پیغام یا
                      اطلاعیه خاصی باز می شود، پاپ آپ گفته می شود که در وب سایت
                      های مختلف می تواند کاربرد های جالبی داشته باشد. همچنین
                      دوره اموزش HTML رو میتونید از طریق وب سایت سبزلرن به صورت
                      کامل اموزش ببینید .
                    </p>
                  </div>
                  <div className="article__read-box">
                    <h2 className="read-box__title animate__animated animate__flash animate__infinite">
                      آنچه در این مقاله خواهید خواند
                    </h2>
                    <ul className="article__read-box-list">
                      <li className="article__read-box-item">
                        <a href="#" className="article__read-box-link">
                          <span className="read-box-link__count">1</span>
                          <span className="read-box-link__text">
                            پاپ آپ چیست و چطور ساخته می شود؟
                          </span>
                        </a>
                      </li>
                      <li className="article__read-box-item">
                        <a href="#" className="article__read-box-link">
                          <span className="read-box-link__count">2</span>
                          <span className="read-box-link__text">
                            چرا به پاپ آپ نیاز داریم؟
                          </span>
                        </a>
                      </li>
                      <li className="article__read-box-item">
                        <a href="#" className="article__read-box-link">
                          <span className="read-box-link__count">3</span>
                          <span className="read-box-link__text">
                            پاپ آپ های ساده با زبان جاوا اسکریپت
                          </span>
                        </a>
                      </li>
                      <li className="article__read-box-item">
                        <a href="#" className="article__read-box-link">
                          <span className="read-box-link__count">4</span>
                          <span className="read-box-link__text">
                            تکه کد پاپ آپ Html و Css
                          </span>
                        </a>
                      </li>
                      <li className="article__read-box-item">
                        <a href="#" className="article__read-box-link">
                          <span className="read-box-link__count">5</span>
                          <span className="read-box-link__text">
                            کد پاپ آپ Html و Css با استفاده از کتابخانه ها
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <section className="article__section">
                    <p className="article__paragrapg hpc__paragrapg">
                      در این مقاله سورس کد پاپ آپ Html را به روش های مختلفی
                      پیاده سازی پیاده سازی می کنیم تا شما عزیزان بتوانید در وب
                      سایت هایی که توسعه می دهید، در صورت نیاز از پاپ آپ های
                      مختلفی استفاده بکنید.
                    </p>
                  </section>
                  <section className="article__section">
                    <img
                      src="images/blog/code-pop.png"
                      alt="blog"
                      className="article__img object-contan"
                    />

                    <p className="article__paragrapg-title">
                      پاپ آپ چیست و چطور ساخته می شود؟
                    </p>
                    <p className="article__paragrapg">
                      همان طور که در قسمت قبلی گفته شد، پاپ آپ (Pop Up) همان
                      پنجره ها و باکس هایی است که در هر وب سایتی برای نمایش
                      اطلاعیه، پیغام و خبر خاصی به کاربر استفاده می شود.
                    </p>
                    <p className="article__paragrapg">
                      در حوزه برنامه نویسی وب، می توان پاپ آپ ها را به کمک زبان
                      های Html و Css طراحی کرد و سپس با زبان برنامه نویسی جاوا
                      اسکریپت در هر زمان و موقعیت دلخواهی آن ها را نمایش داد.
                    </p>
                  </section>
                  <section className="article__section">
                    <p className="article__paragrapg-title">
                      چرا به پاپ آپ نیاز داریم؟
                    </p>
                    <p className="article__paragrapg">
                      در هر کدام از وب سایت های فروشگاهی، آموزشی، مجله ای و …
                      ممکن است در موقعیت ها و شرایط خاصی نیاز داشته باشید که
                      اطلاعیه یا پیغام خاصی را به کاربر نمایش دهید. در همچین
                      حالتی اگر در همان تب (Tab) که کاربر به وب سایت شما مراجعه
                      کرده است صفحه ای دیگر باز کنید، کاربر محتوای اصلی وب سایت
                      را از دست داده و کمی از وب سایتتان دلخور و ناراحت می شود.
                      برای مواجه نشدن با همچین مشکلی، از صفحات پاپ آپ استفاده می
                      کنیم.
                    </p>
                    <p className="article__paragrapg">
                      اما توجه داشته باشید که استفاده بیش از حد از صفحات پاپ آپ
                      نارضایتی و اعتراض کاربران را به دنبال دارد. حتی کاربران به
                      آن دسته از وب سایت هایی که استفاده زیادی از پاپ آپ می کنند
                      علاقه ای نداشته و حد الامکان سعی می کنند به آن ها مراجعه
                      نکنند. پس سعی کنید استفاده صفحات پاپ آپ را به حداقل
                      برسانید و تا زمانی که به پاپ آپ نیازی نداشتید، از آن
                      استفاده نکنید.
                    </p>
                  </section>
                  <section className="article__section">
                    <p className="article__paragrapg-title">
                      پاپ آپ های ساده با زبان جاوا اسکریپت
                    </p>
                    <p className="article__paragrapg">
                      شما با زبان برنامه نویسی جاوا اسکریپت خالی (خام و بدون
                      استفاده از کتابخانه یا فریمورک) نیز می توانید پاپ آپ هایی
                      را پیاده سازی کنید، اما پاپ آپ های بسیار ساده و خشک. جاوا
                      اسکریپت برای ساخت پاپ آپ 3 متد alert، confirm و prompt را
                      در اختیار شما قرار می دهد که در ادامه به نحوه استفاده از
                      هر کدام می پردازیم.
                    </p>

                    <p className="article__paragrapg-sub">
                      متد alert برای ساخت پاپ آپ
                    </p>
                    <p className="article__paragrapg">
                      متد alert از شما یک مقداری را به عنوان ورودی دریافت کرده و
                      آن را در یک باکس خشک و خالی نمایش می دهد:
                    </p>
                    <pre className="article__paragrapg-pre">
                      ("پیام مورد نظر را اینجا وارد کنید")alert
                    </pre>

                    <p className="article__paragrapg-sub">
                      با اجرای متد alert صفحه ای مثل تصویر زیر به کاربر نمایش
                      داده می شود:
                    </p>

                    <img
                      src="images/blog/pp1.png"
                      alt="pp1"
                      className="article__img-sub object-contan"
                    />
                    <p className="article__paragrapg-sub">
                      متد confirm برای ساخت پاپ آپ
                    </p>
                    <p className="article__paragrapg">
                      از متد confirm زمانی استفاده می شود که قصد داشته باشید
                      سوالی را از کاربر بپرسید که جواب آن فقط “بله” یا “خیر”
                      باشد که اصطلاحا به این دسته از سوالات Yes / No Question
                      گفته می شود. متد confirm نیز مثل متد alert یک مقداری
                      (سوالی) را از شما دریافت کرده و آن را همراه با دکمه هایی
                      Ok و Cancel به کاربر نمایش می دهد که کاربر می تواند یکی از
                      دکمه ها را به عنوان پاسخ انتخاب کند:
                    </p>
                    <img
                      src="images/blog/pp2.png"
                      alt="pp2"
                      className="article__img-sub object-contan"
                    />
                    <p className="article__paragrapg-sub">
                      متد prompt برای ساخت پاپ آپ
                    </p>
                    <p className="article__paragrapg">
                      متد prompt نیز یکی از متد های نمایش پاپ آپ است و زمانی
                      استفاده می شود که قصد دریافت اطلاعاتی مثل نام، سن، آدرس،
                      شماره تماس و … از کاربر را داشته باشیم. پس در این روش یک
                      اینپوت هم برای وارد کردن اطلاعات به کاربر نمایش داده می
                      شود.
                    </p>
                    <p className="article__paragrapg">
                      متد prompt دو عدد ورودی دارد که اولی عنوان یا همان تایتل
                      پاپ آپ است و ورودی دوم آن مقدار دیفالت (پیش فرض) است:
                    </p>

                    <pre className="article__paragrapg-pre">
                      prompt('Please Enter Your Age: ', 18)
                    </pre>
                  </section>
                  <section className="article__section">
                    <p className="article__paragrapg-sub">سخن پایانی</p>

                    <p className="article__paragrapg">
                      در این مقاله سعی کردیم در مورد نحوه نوشتن کد پاپ آپ Html
                      Css و همچنان جاوا اسکریپت و نحوه استفاده از آن صحبت کنیم و
                      امیدواریم برای شما عزیزان مفید بوده باشد. برای درک بهتر
                      این مفاهیم، پیشنهاد می کنم ویدئوی مربوط به این مقاله را
                      مطالعه کرده و در صورت وجود هر گونه ابهام و سوال، برامون
                      کامنت کنید.
                    </p>
                  </section>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 order-1 md:order-2">
              <div className="courses-info">
                {/* <!-- Start Course Info --> */}
                <div className="course-info">
                  <span className="course-info__courses-title hpc__title">
                    پر امتیازترین دوره ها
                  </span>
                  <ul className="course-info__courses-list">
                    <li className="course-info__courses-item">
                      <a
                        href="#"
                        className="course-info__course-high-score-link course-info__courses-link"
                      >
                        <div className="course-info__courses-img-wrapper">
                          <img
                            src="images/courses/git-github.jpg"
                            alt="Course Cover"
                            className="course-info__courses-img"
                          />
                        </div>

                        <span className="course-info__courses-text">
                          گیت و گیتهاب
                        </span>
                      </a>
                    </li>
                    <li className="course-info__courses-item">
                      <a
                        href="#"
                        className="course-info__course-high-score-link course-info__courses-link"
                      >
                        <div className="course-info__courses-img-wrapper">
                          <img
                            src="images/courses/next-js.png"
                            alt="Course Cover"
                            className="course-info__courses-img"
                          />
                        </div>

                        <span className="course-info__courses-text">
                          آموزش next js
                        </span>
                      </a>
                    </li>
                    <li className="course-info__courses-item">
                      <a
                        href="#"
                        className="course-info__course-high-score-link course-info__courses-link"
                      >
                        <div className="course-info__courses-img-wrapper">
                          <img
                            src="images/courses/node-js.jpg"
                            alt="Course Cover"
                            className="course-info__courses-img"
                          />
                        </div>

                        <span className="course-info__courses-text">
                          آموزش node js
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
                {/* <!-- Finish Course Info --> */}

                {/* <!-- Start Course Info --> */}
                <div className="course-info">
                  <span className="course-info__courses-title hpc__title">
                    جدیدترین مقالات
                  </span>
                  <ul className="last-articles__list course-info__courses-list">
                    <li className="last-articles__item course-info__courses-item">
                      <a
                        href="#"
                        className="last-articles__link course-info__courses-link"
                      >
                        جدیدترین مقالات جاوااسکریپت نحوه پیاده سازی قالب سبزلرن
                      </a>
                    </li>
                    <li className="last-articles__item course-info__courses-item">
                      <a
                        href="#"
                        className="last-articles__link course-info__courses-link"
                      >
                        جدیدترین مقالات جاوااسکریپت نحوه پیاده سازی قالب سبزلرن
                      </a>
                    </li>
                    <li className="last-articles__item course-info__courses-item">
                      <a
                        href="#"
                        className="last-articles__link course-info__courses-link"
                      >
                        جدیدترین مقالات جاوااسکریپت نحوه پیاده سازی قالب سبزلرن
                      </a>
                    </li>
                  </ul>
                </div>
                {/* <!-- Finish Course Info --> */}
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <!-- Finish Main --> */}

      <Footer></Footer>
    </>
  );
};

export default Blog;
