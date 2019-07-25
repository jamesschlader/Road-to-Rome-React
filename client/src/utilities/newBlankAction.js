const newBlankAction = () => {
  return {
    id: Date.now() * Math.random(),
    title: "Blank",
    image: "/img/erics-images/favicon.svg",
    name: "fatigue",
    value: 0,
    speed: 0
  };
};
export default newBlankAction;
