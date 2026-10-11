import type { GithubUser } from "../../types/githubUser"

interface UserProfileProps{
    user:GithubUser
}

const UserProfile = ({user}:UserProfileProps)=>{
    const displayName = user.name?.trim() || user.login
    const bio = user.bio?.trim()

    return(
        <section
            aria-label={`Perfil de ${displayName}`}
            className="mt-[33px] flex w-[804px] max-w-full flex-col items-center gap-2 rounded-[25px] bg-[#d9d9d9] px-6 py-[19px] md:flex-row md:pr-[81px] md:pl-[47px]"
        >
            <img
                src={user.avatar_url}
                alt={`Foto de perfil de ${displayName}`}
                className="size-40 shrink-0 rounded-full border-2 border-[#005cff] object-cover md:size-[220px]"
            />

            <div className="w-full min-w-0 text-center md:text-left">
                <h2 className="mb-4 text-xl leading-[27px] font-bold wrap-break-word text-[#005cff]">
                    {displayName}
                </h2>

                {bio && (
                    <p className="text-[15px] leading-5 font-light wrap-break-word text-black">
                        {bio}
                    </p>
                )}
            </div>
        </section>
    )
}

export default UserProfile
