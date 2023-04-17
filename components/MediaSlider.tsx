import { SvgArrowLeft, SvgArrowRight } from './Svgs';

interface Props {
  id: string;
  children: JSX.Element[] | JSX.Element;
}

export default function MediaSlider({ id, children }: Props) {
  const slideToLeft = () => {
    const slider = document.getElementById(id);
    if (slider) slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideToRight = () => {
    const slider = document.getElementById(id);
    if (slider) slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <div
        onClick={slideToLeft}
        className={`z-10 hidden sm:block absolute top-1/2 left-2 cursor-pointer`}
      >
        <SvgArrowLeft />
      </div>

      <div
        id={id}
        className="mx-2 sm:mx-16 my-3 overflow-x-auto sm:overflow-hidden scroll-smooth"
      >
        {children}
      </div>

      <div
        onClick={slideToRight}
        className={`z-10 hidden sm:block absolute top-1/2 right-2 cursor-pointer`}
      >
        <SvgArrowRight />
      </div>
    </>
  );
}
