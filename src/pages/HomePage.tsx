import PageSectionTitle from "@/components/PageSectionTitle/PageSectionTitle";
import PopularMovieContent from "@/components/PopularContent/PopularMovieContent";
import PopularSeriesContent from "@/components/PopularContent/PopularSeriesContent";
import styled from "styled-components";

export default function HomePage() {
  return (
    <Wrapper>
      <PageSectionTitle title="filmes populares" />
      <PopularMovieContent />
      <PageSectionTitle title="séries populares" />
      <PopularSeriesContent />
    </Wrapper>
  );
}

const Wrapper = styled.div`
    padding: 10px;
`;
