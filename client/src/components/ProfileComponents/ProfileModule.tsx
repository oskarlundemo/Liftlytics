

type ProfileProps = {
    children: any;
}

export const ProfileModule = ({children}:ProfileProps) => {

    return (
        <section className="profile-module">
            {children}
        </section>
    )
}