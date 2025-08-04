

type ProfileProps = {
    children: any;
}

export const ProfileModule = ({children}:ProfileProps) => {

    return (
        <section style={{boxShadow: 'var(--deafult-box-shadow)'}} className="profile-module">
            {children}
        </section>
    )
}