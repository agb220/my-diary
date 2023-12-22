import Image from 'next/image'

interface ButtonProps{
  img?: string;
  title?: string;
  classname?: string;
}

const Button = (props: ButtonProps) => {
  return (
    <button className={`${props.classname} ${props.title ? "px-4 py-2 rounded font-display" : ""}`}>
      {props.img ?
        <Image src={props.img} alt={'icon button'} width={18} height={18}/> :
        <span>{ props.title}</span>}
    </button>
  )
}

export default Button;