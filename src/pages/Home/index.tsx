import logo from "../../assets/images/github-mark.png"
import wordmark from "../../assets/images/github-wordmark.png"
import SearchForm from "../../components/SearchForm"

export default function Home(){
    return(
        <div className="relative min-h-screen overflow-hidden bg-[#1f1f1f] pb-8 font-['Nunito_Sans']">

            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-[28px] left-[71px] hidden h-[225px] w-[239px] bg-[radial-gradient(circle_at_3px_3px,#272727_0_3px,transparent_3.5px)] bg-[length:14.56px_13.67px] lg:block"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-[-268px] right-[-254px] size-[888px] bg-[radial-gradient(closest-side,#005cff,transparent)]"
            />

            <div className="relative mx-auto mt-[137px] min-h-[537px] w-[calc(100%-2rem)] max-w-[1156px] bg-black shadow-[0_4px_4px_rgba(0,0,0,0.25)] max-sm:mt-12">
                <div className="relative z-20 flex flex-col items-center px-4 py-12">
                    <h1 className="flex items-center gap-[11px] text-white">
                        <img
                            src={logo}
                            alt=""
                            className="size-[40px] sm:size-[58px]"
                        />
                        <span className="text-[40px] leading-none font-semibold sm:w-[147px] sm:text-[60px]">
                            Perfil
                        </span>
                        <img
                            src={wordmark}
                            alt="GitHub"
                            className="ml-1 h-[30px] w-[107px] sm:h-[45px] sm:w-[160px]"
                        />
                    </h1>

                    <div className="mt-[18px] flex w-full justify-center">
                        <SearchForm/>
                    </div>
                </div>
            </div>

            <div
                aria-hidden="true"
                className="pointer-events-none absolute top-[198px] left-[-415px] z-10 size-[674px] bg-[radial-gradient(closest-side,#005cff,transparent)]"
            />
        </div>
    )
}
