import styled from "styled-components";
import useUser from './useUser';

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

export default function UserAvatar() {

  const {user,isPending} = useUser();
  const {avatar,full_name} = user ?? {};
  const iavatar = avatar ? process.env.REACT_APP_AVATAR_IMAGE_BASE_URL +"/"+ avatar : "./default-user.jpg"

  return (
    <StyledUserAvatar>
      <Avatar src={iavatar} alt="@user-avatar" />
      <p style={{fontWeight: 700}}>{full_name}</p>
    </StyledUserAvatar>
  )
}
