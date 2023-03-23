const addDayBtn = document.querySelector("#add");
const removeDayBtn = document.querySelector("#remove");
const tableHeader = document.querySelectorAll(".table-header");
const tableRow = document.querySelectorAll(".table-row");
const table = document.querySelector('table')

let dateCount = 0;
let mondaysWednesdaysFridays = [];
let startDate;

addDayBtn.addEventListener("click", () => {
  mondaysWednesdaysFridays = getMondaysWednesdaysFridays(
    startDate,
    dateCount + 1
  );

  tableHeader.forEach((th) => {
    th.innerHTML += `<th>${mondaysWednesdaysFridays[
      th.childElementCount - 2
    ].join(" ")}</th>`;
  });
  dateCount++;
  tableRow.forEach((tr) => {
    tr.innerHTML += `<td class="rate" style="background-color:red;">0</td>`;
  });

  const tableRate = document.querySelectorAll(".rate");
  writeRate(tableRate);

  average();

  calcTotalDays(dateCount)
  caclMissedLessons()
  calcAverageMark()
});

removeDayBtn.addEventListener("click", () => {
  tableHeader.forEach((th) => {
    if (th.childElementCount > 2) {
      th.removeChild(th.lastElementChild);
      dateCount--
      calcTotalDays(dateCount)
    }
  });
  tableRow.forEach((tr) => {
    if (tr.childElementCount > 2) {
      tr.removeChild(tr.lastElementChild);
    }
  });
  average();
  caclMissedLessons()
  calcAverageMark()
});

function writeRate(rates) {
  rates.forEach((rate) => {
    rate.addEventListener("click", () => {
      const num = prompt("Rate");
      if (num > 5) {
        rate.textContent = 5;
      } else if (num < 0) {
        rate.textContent = 0;
      } else if(num === '') {
        rate.textContent = 0
      } else if(isNaN(num)) {
        rate.textContent = 0
      } else {
        rate.textContent = num;
      }
      rate.style.backgroundColor = "green";
      average();
      caclMissedLessons()
      calcAverageMark()
    });
  });
}

function average() {
  tableRow.forEach((row) => {
    let rates = row.querySelectorAll(".rate");
    let averages = row.querySelectorAll(".average");
    averages.forEach((average) => {
      let num = 0;
      rates.forEach((rate) => {
        num += +rate.textContent;
        average.textContent = (
          num / row.querySelectorAll(".rate").length
        ).toFixed(2);
      });
    });
  });
}

function getMondaysWednesdaysFridays(startDate = new Date("2022-12-05"), num) {
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const result = [];
  let currentDate = new Date(startDate);
  let i = 0;

  while (i < num) {
    const dayOfWeek = currentDate.getDay();
    if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
      result.push([
        weekday[currentDate.getDay()],
        currentDate.getDate(),
        months[currentDate.getMonth()],
      ]);
      i++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return result;
}

const totalDays = document.querySelector('#total-days-span')
const missedLessons = document.querySelector('#missed-lessons-span')
const averageMark = document.querySelector('#average-mark-span')
const totalStudents = document.querySelector('#total-students-span')


function calcTotalDays(num) {
  totalDays.textContent= num
}

function caclMissedLessons() {
  let reds = 0
  const table = document.querySelector('table')
  const rates = table.querySelectorAll('.rate')
  rates.forEach((rate)=> {
    if(rate.style.backgroundColor === 'red') {
      reds++
    } 
  })
 missedLessons.textContent = reds
}

function calcAverageMark() {
  let marks = 0
  const table = document.querySelector('table')
  const rates = table.querySelectorAll('.rate')
  rates.forEach((rate)=> {
    marks += +rate.textContent
  })

  if(isNaN(marks / rates.length)) {
    averageMark.textContent = 0.00
  } else {
    averageMark.textContent = (marks / rates.length).toFixed(2)
  }

  // averageMark.textContent = (marks / rates.length).toFixed(2)
}

function calcTotalStudents() {
  const fullNames = document.querySelectorAll('.fullname')
  totalStudents.textContent = fullNames.length
}

calcTotalStudents()

tableRow.forEach((row)=> {
  row.addEventListener('mouseover', ()=> {
    tableRow.forEach((row)=> {
      row.querySelectorAll('td').forEach((td)=>{
        // td.style.opacity = 0.5
        td.style.color = 'black'
      })
    })
    row.querySelectorAll('td').forEach((td)=> {
      // td.style.opacity = 1
      td.style.color = 'white'
    })
  })
})

tableRow.forEach((row)=> {
  row.addEventListener('mouseout', ()=> {
    tableRow.forEach((row)=> {
      row.querySelectorAll('td').forEach((td)=>{
        // td.style.opacity = 1
        td.style.color = 'black'
      })
    })
  })
})
