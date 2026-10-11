import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"
import type { GithubUser } from "../../types/githubUser"
import UserProfile from "../UserProfile"


const SearchForm = ()=>{

    const [username,setUsername] = useState<string>("")
    const [user,setUser] = useState<GithubUser | null>(null)
    const [errorMessage,setErrorMessage] = useState<string>("")
    const [isLoading,setIsLoading] = useState<boolean>(false)

    const handleUsernameChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setUsername(e.target.value)
    }

    const handleSearch = async(
        event:React.FormEvent<HTMLFormElement>
    ):Promise<void>=>{
        event.preventDefault()

        if(isLoading){
            return
        }

        const trimmedUsername = username.trim()

        setUser(null)
        setErrorMessage("")

        if(trimmedUsername === ""){
            toast.error("Digite um nome de usuário do GitHub",{
                autoClose:3000,
                hideProgressBar:true
            })
            return
        }

        setIsLoading(true)

        try{
            const response = await axios.get<GithubUser>(
                `https://api.github.com/users/${encodeURIComponent(trimmedUsername)}`
            )

            if(!response.data.login){
                toast.error("Resposta inesperada do GitHub. Tente novamente mais tarde",{
                    autoClose:3000
                })
                return
            }

            setUser(response.data)

        }catch(error){

            if(axios.isAxiosError(error) && error.response?.status === 404){
                setErrorMessage(
                    "Nenhum perfil foi encontrado com esse nome de usuário.\nTente novamente"
                )
                return
            }

            console.error("Erro ao buscar usuário",error)

            if(axios.isAxiosError(error)){

                if(!error.response){
                    toast.error("Erro ao conectar com o servidor",{
                        autoClose:3000
                    })
                    return
                }

                const isRateLimited =
                    error.response.status === 429 ||
                    (error.response.status === 403 && error.response.headers["x-ratelimit-remaining"] === "0")

                if(isRateLimited){
                    toast.error("Limite de requisições do GitHub atingido. Aguarde alguns minutos",{
                        autoClose:3000
                    })
                    return
                }
            }

            toast.error("Resposta inesperada do GitHub. Tente novamente mais tarde",{
                autoClose:3000
            })

        }finally{
            setIsLoading(false)
        }
    }

    return(
        <div className="flex w-full flex-col items-center">
            <form
                onSubmit={handleSearch}
                className="relative h-[62px] w-[503px] max-w-full"
            >
                <label htmlFor="username" className="sr-only">
                    Nome de usuário do GitHub
                </label>

                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Digite um usuário do Github"
                    autoComplete="off"
                    spellCheck={false}
                    className="h-full w-full rounded-[10px] border border-[#ddd] bg-white pr-16 sm:pr-20 pl-4 text-sm sm:text-xl font-semibold text-black placeholder:text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    aria-label="Buscar perfil"
                    className="absolute top-0 right-0 flex h-[62px] w-[62px] cursor-pointer items-center justify-center rounded-[10px] border border-[#ddd] bg-[#005cff] focus:outline-none focus:ring-2 focus:ring-white disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <span
                            className="size-[22px] animate-spin rounded-full border-2 border-white border-t-transparent"
                            aria-hidden="true"
                        />
                    ) : (
                        <svg
                            width="19"
                            height="19"
                            viewBox="0 0 18.698 18.698"
                            fill="white"
                            aria-hidden="true"
                        >
                            <path d="M8.363 0C8.699 0.048 9.037 0.083 9.371 0.147C10.989 0.454 12.375 1.206 13.529 2.377C14.578 3.443 15.271 4.71 15.569 6.179C15.944 8.025 15.685 9.785 14.76 11.429C14.464 11.955 14.089 12.438 13.75 12.94C13.718 12.952 13.686 12.964 13.654 12.976C13.714 13.007 13.787 13.026 13.833 13.071C15.365 14.575 16.897 16.081 18.423 17.59C18.533 17.698 18.607 17.841 18.698 17.967V18.223C18.618 18.46 18.455 18.613 18.223 18.698H17.967C17.82 18.594 17.656 18.508 17.529 18.384C15.998 16.886 14.472 15.381 12.945 13.879C12.906 13.841 12.866 13.805 12.819 13.761C12.766 13.797 12.715 13.829 12.668 13.865C11.653 14.638 10.515 15.143 9.26 15.357C7.385 15.676 5.601 15.396 3.943 14.442C2.218 13.449 1.021 12.011 0.381 10.122C0.191 9.561 0.076 8.984 0.032 8.393C0.028 8.346 0.011 8.3 0 8.253V7.231C0.011 7.178 0.025 7.126 0.033 7.073C0.079 6.767 0.106 6.457 0.17 6.154C0.475 4.707 1.153 3.455 2.185 2.399C3.345 1.213 4.739 0.454 6.371 0.145C6.692 0.085 7.017 0.048 7.34 0H8.363ZM1.207 7.702C1.222 7.973 1.221 8.2 1.248 8.423C1.416 9.835 1.954 11.087 2.935 12.124C4.652 13.937 6.774 14.618 9.205 14.145C11.336 13.731 12.929 12.504 13.873 10.532C14.824 8.544 14.766 6.535 13.701 4.614C12.609 2.645 10.886 1.523 8.651 1.248C6.887 1.031 5.264 1.46 3.842 2.538C2.122 3.841 1.266 5.597 1.207 7.702Z" />
                        </svg>
                    )}
                </button>

                {isLoading && (
                    <span role="status" className="sr-only">
                        Buscando perfil...
                    </span>
                )}
            </form>

            {errorMessage && (
                <div
                    role="alert"
                    className="mt-[33px] flex min-h-[88px] w-[710px] max-w-full items-center justify-center rounded-[10px] bg-[#d9d9d9] px-4 py-[17px] text-center text-xl leading-[27px] font-normal whitespace-pre-line text-[#ff0000]"
                >
                    {errorMessage}
                </div>
            )}

            {user && <UserProfile user={user}/>}
        </div>
    )
}

export default SearchForm
