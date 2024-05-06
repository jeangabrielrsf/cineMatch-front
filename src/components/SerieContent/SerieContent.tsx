import styled from "styled-components";

export default function SerieContent(props: Readonly<{serie:any}>) {
    return (
        <SeriePoster>
            <img src={import.meta.env.VITE_BASE_POSTER_URL + props.serie.poster_path} alt={props.serie.original_title} />
        </SeriePoster>
    );
}

const SeriePoster = styled.div`
    margin: 5px 10px;
    img {
        width: 100%;
        height: 250px;
        object-fit: cover;
    }

    &:hover{
        cursor: pointer;
        filter: brightness(110%);
        transform: scale(1.05);
    }
`