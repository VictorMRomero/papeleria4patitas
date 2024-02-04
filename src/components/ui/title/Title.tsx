import { titleFont } from "@/config/fonts";

interface Props {
    title: string;
    subtitle?: string;
    className?: string;
}

export const Title = ({title, subtitle, className}: Props) => {
  return (
    <div className={`mt-3`}>
        <h1 className={`text-xl sm:text-4xl font-bold my-5`}>
            {title}
        </h1>
        {
            subtitle && (
                <h3 className="text-xl mb-5">{ subtitle }</h3>
            )
        }
    </div>
  )
}
