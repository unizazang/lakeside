// 탑버튼 ======================================================
let topBtn = $("#go-top");

$(window).on("scroll", function () {
  btnFade(topBtn, 900);
});

topBtn.on("click", function (e) {
  e.preventDefault();
  $("html, body").stop().animate({ scrollTop: 0 }, 300);
});

// 탑버튼 끝 // 윤희 0202 ===========

// aside nav bar 시작 ================================================

let wholeSectionWrap = $("main"),
  asideNavWrapper = $(".aside-nav"),
  asideNav = asideNavWrapper.find("a"),
  sections = [],
  sectionsOST = [],
  currentIdx = 0,
  targetIdx;

function navArray() {
  asideNav.each(function () {
    let sectionLink = $(this).attr("href");
    sections.push($(sectionLink));

    sectionsOST.push($(sectionLink).offset().top);
  });
}

setTimeout(() => {
  navArray();
}, 500);

asideNav.click(function (e) {
  e.preventDefault();

  targetIdx = $(this).index();

  $("html, body").stop().animate({
    scrollTop: sectionsOST[targetIdx],
  });
});

// 스크롤양에 따라 보이고 안보임
function btnFade(btn, ost) {
  let scrAmt = $(window).scrollTop();

  if (scrAmt > ost) {
    btn.fadeIn();
  } else {
    btn.fadeOut();
  }
}

$(window).scroll(function () {
  let SCT = $(this).scrollTop();
  btnFade(asideNav, 500);

  $.each(sections, function (idx, item) {
    if (SCT >= item.offset().top - 300) {
      asideNav.removeClass("active");
      asideNav.eq(idx).addClass("active");
    }
  });
});

// ========================= aside bar 끝 // 0204 윤희

// ====================== 마우스아이콘 클릭 이벤트 //0206 윤희 =======================

let mouseIcon = $(".icon_mouse");
mouseIcon.click(function () {
  $("html, body").stop().animate({
    scrollTop: sectionsOST[0],
  });
});

//메뉴 시작 ======================================================

let menu = $(".menu"),
  menuBtn = menu.find(".button");

menuBtn.click(function () {
  menu.toggleClass("active");
  $(this).toggleClass("active");

  $("#menu-logo").delay(700).fadeIn();
});

//메뉴 끝 ======================================================

//위젯 시작 ======================================================

var widgetSwiper = new Swiper(".widget_box .swiper", {
  slidesPerView: 5,
  spaceBetween: 3,
  setWrapperSize: true,
  navigation: {
    nextEl: ".widget_box .swiper-button-next",
    prevEl: ".widget_box .swiper-button-prev",
  },
});
let target = $(".widget_box .swiper-wrapper");
//홀 스와이퍼

let newDate = new Date();
let year = newDate.getFullYear(); // 년도
let month = newDate.getMonth() + 1; // 월
let date = newDate.getDate(); // 날짜
let day = newDate.getDay(); // 요일
let today = `${year}-0${month}-${date}`;

let korWeek = new Array("일", "월", "화", "수", "목", "금", "토");
let weatherIcon = {
  "01d": "fa-sun",
  "01n": "fa-moon",
  "02d": "fa-cloud-sun",
  "02n": "fa-cloud-moon",
  "03d": "fa-cloud",
  "03n": "fa-cloud",
  "04d": "fa-cloud",
  "04n": "fa-cloud",
  "09d": "fa-cloud-showers-heavy",
  "09n": "fa-cloud-showers-heavy",
  "10d": "fa-cloud-sun-rain",
  "10n": "fa-cloud-moon-rain",
  "11d": "fa-cloud-bolt",
  "11n": "fa-cloud-bolt",
  "13d": "fa-snowflake",
  "13n": "fa-snowflake",
  "50d": "fa-smog",
  "50n": "fa-smog",
};

let Temp = "";
let TempArr = [];
let iconArr = [];

$.getJSON(
  "http://api.openweathermap.org/data/2.5/weather?lat=37.319579&lon=127.179104&appid=6683b822924895deb0d2f90cf228a02e&units=metric",
  function (result) {
    let minTemp = result.main.temp_min;
    let maxTemp = result.main.temp_max;
    let code = result.weather[0].icon;

    let todayWeatherIcon = `<i class="fa-solid ${weatherIcon[code]}"></i>`;

    let newDate = new Date(result.dt * 1000);
    let todayDate = ("0" + newDate.getDate()).substr(-2);
    let todayKorDate = korWeek[newDate.getDay()];

    let todayWeather = `
    <li class="d-flex gap-3">
    ${todayWeatherIcon}
    <span class="temp">
    <p><span>MAX </span>${maxTemp.toFixed(1)}<span>˚C</span></p>
    <p><span>MIN </span>${minTemp.toFixed(1)}<span>˚C</span></p>
    <span>
    </li>
    `;
    $(".widget_box .preview ul").prepend(todayWeather);

    let todayHTML = `
    <li class="swiper-slide">
    <a href="">
    <p class="date">${todayDate}</p>
    <p class="day">(${todayKorDate})</p>
    </a>
    </li>
    `;
    target.prepend(todayHTML);
  }
); //현재날씨

$.getJSON(
  "http://api.openweathermap.org/data/2.5/forecast?lat=37.319579&lon=127.179104&appid=6683b822924895deb0d2f90cf228a02e&units=metric",
  function (result) {
    console.log(result);
    let list = result.list;
    console.log(new Date());
    console.log(list);

    let convertDate = "";
    list.map((item) => {
      let newDate = new Date(item.dt * 1000);
      let year = newDate.getFullYear();
      let month = newDate.getMonth() + 1;
      let date = newDate.getDate();
      let day = newDate.getDay();
      let hour = newDate.getHours();
      let minutes = newDate.getMinutes();
      let seconds = newDate.getSeconds();
      function add0(n) {
        return n < 10 ? "0" + n : n;
      }
      let time = `${add0(hour)}:${add0(minutes)}:${add0(seconds)}`;
      convertDate = `${add0(year)}-${add0(month)}-${add0(date)} ${time}`;
      item.dt = convertDate;
    });

    let currentTime = new Date();
    let convertCurrentTime = `${currentTime.getFullYear()}-${(
      "0" +
      (currentTime.getMonth() + 1)
    ).substr(-2)}-${("0" + currentTime.getDate()).substr(-2)}`;
    console.log(convertCurrentTime);

    let filteredDay = list.reduce((acc, cur) => {
      console.log(acc);
      console.log(cur);
      const filter = acc.find(
        (item) => item.dt.substr(0, 10) === cur.dt.substr(0, 10)
      );
      if (!filter) {
        return acc.concat([cur]);
      } else {
        return acc;
      }
    }, []);

    console.log(filteredDay);
    if (filteredDay[0].dt.substr(0, 10) == convertCurrentTime) {
      filteredDay.shift();
    }

    // let date = "";
    let dateList = [];
    $.each(filteredDay, function (i) {
      let date = filteredDay[i].dt.substr(0, 10); // 각 날짜(년-월-일)

      dateList.push(date);

      let day = filteredDay[i].dt.substr(8, 2); //각 날짜의 일
      let korDay = korWeek[new Date(dateList[i]).getDay()];

      let trHTML = `
      <li class="swiper-slide">
      <a href="">
      <p class="date">${day}</p>
      <p class="day">(${korDay})</p>
      </a>
      </li>
      `;
      target.append(trHTML);
    }); //요일 리스트 가져오기

    console.log(dateList);
    console.log(date);
    let Temp = "";

    $.each(dateList, function (i) {
      Temp = list.filter(function (item) {
        return item.dt.substr(0, 10) == dateList[i];
      });
      console.log(Temp);
      let TempArr = [];
      let iconArr = [];
      Temp.map((item) => {
        TempArr.push(item.main.temp);
        console.log(item.dt.substr(-8) == "21:00:00");
        let confirm = item.dt.substr(-8) == "18:00:00";
        if (confirm == true) {
          iconArr.push(item.weather[0].icon);
        }
      });
      console.log(TempArr);
      console.log(iconArr);

      let icon = `<i class="fa-solid ${weatherIcon[iconArr]}"></i>`;
      let maxTemp = Math.max(...TempArr);
      let minTemp = Math.min(...TempArr);

      console.log(maxTemp);
      console.log(minTemp);

      trHTML = `
      <li class="d-flex gap-3">
      ${icon}
        <span class="temp">
          <p><span>MAX </span>${maxTemp.toFixed(1)}<span>˚C</span></p>
          <p><span>MIN </span>${minTemp.toFixed(1)}<span>˚C</span></p>
        <span>
      </li>
      `;
      $(".widget_box .preview ul").append(trHTML);
    });

    $(".widget_box .preview ul li").eq(0).find("> *").show();
    $(".widget_box .swiper-slide").eq(0).addClass("active");
    $(".widget_box .swiper-slide a").click(function (e) {
      e.preventDefault();
      $(this).parent().siblings().removeClass("active");
      $(this).parent().addClass("active");
      $(".widget_box .preview ul li > *").hide();
      let idx = $(this).parent().index();
      $(".widget_box .preview ul li").eq(idx).find("> *").show();
    });

    //preview - icon
    let previewIcon = $(".preview ul >li:first-child .fa-solid").clone();
    console.log(previewIcon);
    let previewIconBox = $(".today_icon");
    let previewIconHTML = `<i class="fa-solid ${weatherIcon[previewIcon]}"></i>`;
    previewIconBox.append(previewIcon);
    menuBtn.append(previewIcon.clone());

    //preview - temp
    let todayTemp = $(".preview ul >li:first-child .temp").html();
    let previewTemp = `<div class="d-flex justify-content-center">${todayTemp}</div>`;
    let previewTempBox = $(".today_temp");

    previewTempBox.html(previewTemp);
    console.log(previewTemp);

    //preview - date
    let previewDateBox = $(".today_date");
    let previewDateHTML = `<div class="d-flex justify-content-center "><p>0${newDate.getDate()}</p><p>(${
      korWeek[day]
    })</p></div>`;
    previewDateBox.html(previewDateHTML);
  }
); //5일 예보

$(".widget_box").hover(
  function () {
    $(this)
      .find(".preview_widget")
      .stop()
      .animate({ left: "-90px" }, 500, "easeInBack", function () {
        $(this).prev().stop().animate({ left: "0" });
      });
  },
  function () {
    $(this)
      .find(".weather_cast")
      .stop()
      .animate({ left: "-253px" }, 400, "linear", function () {
        $(this).next().stop().animate({ left: "-40px" });
      });
  }
);

// 위젯 끝 ======================================================

//반응형 메뉴
if (matchMedia("screen and (max-width: 500px)").matches) {
  let menus = menu.find(".menus");
  menus
    .find("li:nth-child(3)")
    .html(`<a href="" class="main_menu">오시는길</a>`);
  menus.find("li:nth-child(4)").hide();
  let previewIconClone = $(".weather_cast .preview ul li").text();
  menuBtn.addClass("d-flex");
}

// ============================
