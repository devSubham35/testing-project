
const Wrapper = ({ children }: any) => {
    return (
        <div className="w-[90%] md:w-[45rem] lg:w-[60rem] xl:w-[70rem] h-full">
            {children}
        </div>
    )
}

export default Wrapper