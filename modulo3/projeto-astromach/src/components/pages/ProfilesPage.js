import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL, ALUNO } from "../constants/url"

function ProfilesPage() {

    const [profile, setProfile] = useState(undefined)

    useEffect(() => {
        getProfile()

    }, [])

    const getProfile = () => {

        const url = `${BASE_URL}/${ALUNO}/person`

        axios
            .get(url)
            .then((response) => {
                setProfile(response.data.profile)
            })
            .catch((error) => {
                alert("tente novamente")
                console.log(error.message)
            })
    }

    const chooseProfile = (profileId, choice) => {

        const url = `${BASE_URL}/${ALUNO}/choose-person`

        const body = {
            id: profileId,
            choice: choice
        }

        axios
            .post(url, body)
            .then((response) => {
                if (body.choice && response.data.isMatch)
                    alert("Deu match!")
                getProfile()
            })
            .catch((error) => {
                console.log(error.message)
            })
    }
    const resetProfiles = () => {
        const url = `${BASE_URL}/${ALUNO}/clear`

        axios
            .put(url)
            .then(() => {
                alert("Perfis resetados com sucesso")
                getProfile()
            })
            .catch((error) => {
                console.log(error.message)
            })
    }

    const profileCard = profile ? (
        <section>
           
            <p>{profile.name}, {profile.age}</p>
            <p>{profile.bio}</p>
            <div className="botoes-like-dislike" >
                <button onClick={() => chooseProfile(profile.id, false)}>Dislike</button>
                <img
                src={profile.photo}
                alt={profile.photo_alt}
                height={"240px"}
            >
            </img>
                <button onClick={() => chooseProfile(profile.id, true)} >Like</button>
            </div>
        </section>
    ) : (
        <div>
            <h3>Acabaram os matchs.Clique em 'Resetar Perfis' para reiniciar </h3>
            <button onClick={() => resetProfiles()} >Resetar Perfils</button>
        </div>
    )

    return (
        <div>
            <h1>Perfis</h1>
            {profileCard}
            <br />

        </div>
    )

}
export default ProfilesPage