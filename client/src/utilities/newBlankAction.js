const newBlankAction = () => {
  return {
    id: Date.now() * Math.random(),
    title: "Blank",
    image: "/img/erics-images/favicon.svg"
  };
};
export default newBlankAction;
