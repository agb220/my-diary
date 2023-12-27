import Image from "next/image";

interface DayStateProps{
  day?: boolean | undefined;
  onClick?: () => void;
}

const DayState = (props: DayStateProps) => {
    let image: [string, string, number?] = ['/images/down-arrow.svg', "in progress duty", 18];
  
    if (props.day === true) {
        image =  ['/images/checked.svg', "checked duty", 18];
    }

    if (props.day === false) {
        image =  ['/images/cancel.svg', "cancel duty", 18];
    }


    const [src, alt, size] = image;

  return (
    <div className="flex items-center justify-center h-9">
      <Image src={src} alt={alt} width={size} height={size}/>      
    </div>
  )
}

export default DayState;