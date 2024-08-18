
interface Props {
    title?: string;
    subtitle?: string;
    className?: string;
}

export const Title = ({title, subtitle, className}: Props) => {
  return (
    <div className={`mt-3 ${className}`}>
        <h1 className={`text-2xl sm:text-4xl font-bold my-5 dark:text-white text-black`}>
            {title}<span className="text-blue-500">.</span>
        </h1>
        {
            subtitle && (
                <h3 className="text-lg sm:text-xl mb-5 text-black dark:text-white">{ subtitle }</h3>
            )
        }
    </div>
  )
}
