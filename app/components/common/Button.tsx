import Image from 'next/image'

interface ButtonProps{
    img?: string;
    title?: string;
}

const Button = (props: ButtonProps) => {
  return (
    <button>
      {props.img ?
        <Image src={props.img} alt={'icon button'} width={18} height={18}/> :
        <span>{ props.title}</span>}
    </button>
  )
}

export default Button;