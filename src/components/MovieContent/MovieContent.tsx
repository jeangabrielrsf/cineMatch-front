import styled from "styled-components"

export default function MovieContent(props: Readonly<{movie:any}>) {
    return (
        <Wrapper>
            <MoviePoster>
                <img src={import.meta.env.VITE_BASE_POSTER_URL + props.movie.poster_path} alt={props.movie.original_title} />
            </MoviePoster>
        </Wrapper>
    )

}

const Wrapper = styled.div`
`;

const MoviePoster = styled.div`
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
`;