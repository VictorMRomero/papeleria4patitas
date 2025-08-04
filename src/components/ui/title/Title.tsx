
interface Props {
    title?: string;
    subtitle?: string;
    className?: string;
}

export const Title = ({title, subtitle, className}: Props) => {
  return (
    <div className={`mt-3 ${className}`}>
            {title && (
            <h1 className={`text-xl md:text-2xl lg:text-4xl font-bold my-5 text-gray-800`}>
                {title}<span className="text-blue-500">.</span>
            </h1>
            )}
        {
            subtitle && (
                <h3 className="text-lg md:text-xl lg:text-2xl mb-5 text-gray-600">{ subtitle }</h3>
            )
        }
    </div>
  )
}
