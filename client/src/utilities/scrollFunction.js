const scrollFunction = function(classString = "body-padding") {
  //   document.getElementsByTagName("html, body").animate(
  //     {
  //       scrollTop: document.getElementByClassName(classString)
  //     },
  //     1000
  //   );
  console.log(
    `the body's current position is ${
      document.body.scrollTop
    } and the ludus position is ${
      document.getElementsByClassName(classString).scrollTop
    }`
  );
  document.body.scrollTop = document.getElementsByClassName(
    classString
  ).scrollTop;
};

export default scrollFunction;
