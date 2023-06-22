function fetchData() {
  let temp = document.getElementById("input");
  let input = temp.value.split(",");
  brickswithwater(input);
  Onlywater(input);
}

function createGraph(xaxis, yaxis, id) {
  var dom = document.getElementById(id);
  var myChart = echarts.init(dom, null, {
    renderer: "canvas",
    useDirtyRect: false,
  });
  var option;
  option = {
    xAxis: {
      type: "category",
      data: xaxis,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: yaxis,
        type: "bar",
      },
    ],
  };
  if (option && typeof option === "object") {
    myChart.setOption(option);
  }
  window.addEventListener("resize", myChart.resize);
}

function waterQuantity(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] != "-") {
      sum += parseInt(arr[i]);
    }
  }
  return sum;
}

function brickswithwater(arr) {
  let firstCase = [];
  let secondCase = [];
  let finalCase = [];
  let result = [];
  let lastvalueoffirstcase = 0;
  let lastvalueosecondcase = 0;

  for (let i = 0; i < arr.length; i++) {
    let value = arr[i];
    if (value == 0) {
      firstCase.push(lastvalueoffirstcase);
    } else {
      firstCase.push("-");
      lastvalueoffirstcase = value;
    }
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    let value = arr[i];
    if (value == 0) {
      secondCase[i] = lastvalueosecondcase;
    } else {
      secondCase[i] = "-";
      lastvalueosecondcase = value;
    }
  }

  for (let i = 0; i < arr.length; i++) {
    let fisrt = firstCase[i];
    let second = secondCase[i];
    let value = arr[i];
    if (value == "-") {
      finalCase.push(value);
    } else {
      finalCase.push(fisrt - second > 0 ? second : fisrt);
    }
  }

  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];
    if (val == 0) {
      result.push({
        value: finalCase[i],
        itemStyle: {
          color: "blue",
        },
      });
    } else {
      result.push({
        value: val,
        itemStyle: {
          color: "gray",
        },
      });
    }
  }

  createGraph(arr, result, "chart1");
  let temp = document.getElementById("waterquantity");
  let txt = (temp.innerHTML = `Total Water Quantity is ${waterQuantity(
    finalCase
  )}`);
  document.body.append(txt);
}

function Onlywater(arr) {
  let firstCase = [];
  let secondCase = [];
  let finalCase = [];
  let result = [];
  let lastvalueoffirstcase = 0;
  let lastvalueosecondcase = 0;

  for (let i = 0; i < arr.length; i++) {
    let value = arr[i];
    if (value == 0) {
      firstCase.push(lastvalueoffirstcase);
    } else {
      firstCase.push("-");
      lastvalueoffirstcase = value;
    }
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    let value = arr[i];
    if (value == 0) {
      secondCase[i] = lastvalueosecondcase;
    } else {
      secondCase[i] = "-";
      lastvalueosecondcase = value;
    }
  }

  for (let i = 0; i < arr.length; i++) {
    let fisrt = firstCase[i];
    let second = secondCase[i];
    let value = arr[i];
    if (value == "-") {
      finalCase.push(value);
    } else {
      finalCase.push(fisrt - second > 0 ? second : fisrt);
    }
  }

  for (let i = 0; i < arr.length; i++) {
    let val = arr[i];
    if (val == 0) {
      result.push({
        value: finalCase[i],
        itemStyle: {
          color: "blue",
        },
      });
    } else {
      result.push({
        value: val - finalCase[i],
        itemStyle: {
          color: "gray",
        },
      });
    }
  }

  createGraph(arr, result, "chart2");
}
