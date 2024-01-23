export const Intro = () => {
  const content = {
    title: "About us", 
    subTitle: "How fun, you found our about and contact page!",
    text: `This page is a full stack final project of Technigos Boot Camp in Web
      Developement of 2023. And if you haven't noticed, is not an actual web
      shop but a demo version. If you like something, or if you've got
      something on your mind, don't be shy to contact the developers! They
      are super nice!`,
  }
  return (
    <section className="intro-wrapper">
      <div className="intro-section section-container">
        <h1>{content.title}</h1>
        <div className="h3-sub-title">
          {content.subTitle}
        </div>
        <p className="about-p">
          {content.text}
        </p>
      </div>
    </section>
  );
};
