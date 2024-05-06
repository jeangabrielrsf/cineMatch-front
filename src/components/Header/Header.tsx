import UserAvatarIcon from "@/icons/UserAvatarIcon";
import { Container, Logo, MenuItems, UserIcon, Item } from "./HeaderStyle";

export default function Header() {
    return (
        <Container>
            <Logo>
                CINEMATCH
            </Logo>
            <MenuItems>
                <Item>Filmes</Item>
                <Item>Séries</Item>
                <Item>Minhas curtidas</Item>
            </MenuItems>
            <UserIcon>
                <UserAvatarIcon />
            </UserIcon>
        </Container>
    );
}


